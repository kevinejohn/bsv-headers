const bsv = require('bsv-minimal')

const GENESIS_HEADER = '0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab5f49ffff001d1dac2b7c'

class Headers {
  constructor(opts = {}) {
    const {
      genesisHeader = GENESIS_HEADER,
      invalidBlocks = [],
      maxReorgDepth = 1000
    } = opts
    this.invalidBlocks = new Set(invalidBlocks)
    this.maxReorgDepth = maxReorgDepth
    this.headers = {}
    this.chain = {}

    let header
    if (typeof genesisHeader === 'string') {
      const buf = Buffer.from(genesisHeader, 'hex')
      header = this.addHeader({ buf })
    } else if (Buffer.isBuffer(genesisHeader)) {
      header = this.addHeader({ buf: genesisHeader })
    } else {
      header = this.addHeader({ header: genesisHeader })
    }
    this.genesisHash = header.hashHex
  }

  addHeader({ buf, header = false, hash = false }) {
    if (hash) hash = hash.toString('hex')
    if (this.headers[hash]) return this.headers[hash]
    if (!header) header = bsv.Header.fromBuffer(buf)
    header.hashHex = hash || header.getHash().toString('hex')
    if (!hash && this.headers[header.hashHex])
      return this.headers[header.hashHex]
    if (this.invalidBlocks.has(header.hashHex)) {
      console.log(`Did not add invalid header: ${header.hashHex}`)
      return false
    }
    header.prevHashHex = header.prevHash.toString('hex')
    header.nextHash = []
    const prevHeader = this.headers[header.prevHashHex]
    if (prevHeader) {
      prevHeader.nextHash.push(header.hashHex)
      header.processed = true
    } else {
      this.missedHeader = true
    }
    this.headers[header.hashHex] = header
    this.processed = false
    return header
  }

  process() {
    if (this.processed) return
    if (this.missedHeader) {
      for (const hash in this.headers) {
        const header = this.headers[hash]
        const prevHeader = this.headers[header.prevHashHex]
        if (!header.processed && prevHeader) {
          prevHeader.nextHash.push(header.hashHex)
          header.processed = true
        }
      }
      this.missedHeader = false
    }
    let startingHash = this.genesisHash
    let startingHeight = 0
    if (this.maxReorgDepth > 0 && this.tip && !this.invalidatedBlock) {
      startingHeight = Math.max(0, this.tip.height - this.maxReorgDepth)
      const hash = this.chain[`${startingHeight}`]
      if (this.headers[hash]) startingHash = hash
    }
    if (!this.headers[startingHash])
      throw Error(`Missing starting block ${startingHash}`)
    let hashes = [startingHash]
    let longestChain
    let height = startingHeight
    while (hashes.length > 0) {
      const nextHashes = []
      for (const hash of hashes) {
        const header = this.headers[hash]
        if (header.height < height) {
          console.log(`Detected loop in header ${height} ${hash}`)
          continue // Loop. Ignore header
        }
        header.height = height
        let added = 0
        for (const hash of header.nextHash) {
          if (this.headers[hash]) {
            nextHashes.push(hash)
            added++
          }
        }
        if (added === 0) longestChain = header
      }
      hashes = nextHashes
      height++
    }
    let indexHeader = longestChain
    while (indexHeader) {
      if (indexHeader.height < startingHeight) break
      this.chain[`${indexHeader.height}`] = indexHeader.hashHex
      indexHeader = this.headers[indexHeader.prevHashHex]
    }
    this.tip = longestChain
    this.processed = true
    this.invalidatedBlock = false
  }

  invalidateBlock(hash) {
    hash = hash.toString('hex')
    const header = this.headers[hash]
    delete this.headers[hash]
    if (header) {
      console.log(`Invalidating block ${header.height}, ${hash}`)
      const heightHash = this.chain[`${header.height}`]
      if (header.hashHex === heightHash) {
        for (let height = header.height; height <= this.tip.height; height++) {
          const hash = this.chain[`${height}`]
          console.log(`Invalidating block ${height}, ${hash}`)
          delete this.chain[`${height}`]
          delete this.headers[hash]
        }
      }
    } else {
      console.log(`Invalidating block ${hash}`)
    }
    this.invalidBlocks.add(hash)
    this.processed = false
    this.invalidatedBlock = true
  }

  getHeight(hash = false) {
    this.process()
    if (hash) {
      hash = hash.toString('hex')
      if (!this.headers[hash]) throw Error(`Missing header`)
      return this.headers[hash].height
    } else {
      return this.getTip().height
    }
  }

  getHash(height) {
    this.process()
    const hash = this.chain[`${height}`]
    const header = this.headers[hash]
    if (!header) throw Error(`Missing height`)
    return header.hashHex
  }

  getHeader({ height = false, hash = false }) {
    if (typeof height === 'number') hash = this.getHash(height)
    const header = this.headers[hash]
    if (!header) throw Error(`Missing header`)
    return header
  }

  getTip() {
    this.process()
    if (!this.tip) throw Error(`No tip`)
    const { hashHex: hash, height } = this.tip
    return { hash, height }
  }
}

module.exports = Headers
