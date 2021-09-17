const bsv = require('bsv-minimal')

const GENESIS_BLOCK =
  '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f'

class Headers {
  constructor(opts = {}) {
    const {
      genesisHash = GENESIS_BLOCK,
      invalidBlocks = [],
      maxReorgDepth = 1000
    } = opts
    this.genesisHash = genesisHash
    this.invalidBlocks = new Set(invalidBlocks)
    this.maxReorgDepth = maxReorgDepth
    this.headers = {}
    this.chain = {}
    this.processed = true
  }

  addHeader({ buf, hash = false }) {
    if (hash) hash = hash.toString('hex')
    if (this.headers[hash]) return this.headers[hash]
    const header = bsv.Header.fromBuffer(buf)
    header.hashHex = hash || header.getHash().toString('hex')
    if (!hash && this.headers[header.hashHex])
      return this.headers[header.hashHex]
    if (this.invalidBlocks.has(header.hashHex)) throw Error(`Invalid block`)
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
      throw Error(`Missing starting block ${this.startingHash}`)
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
