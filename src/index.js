const bsv = require('bsv-minimal')

const GENESIS_HEADER =
  '0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab5f49ffff001d1dac2b7c'

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
    this.unlinked = {}
    this.processed = false
    this.invalidatedBlock = false

    if (typeof genesisHeader === 'string') {
      const buf = Buffer.from(genesisHeader, 'hex')
      this.addHeader({ genesis: true, buf })
    } else if (Buffer.isBuffer(genesisHeader)) {
      this.addHeader({ genesis: true, buf: genesisHeader })
    } else {
      this.addHeader({ genesis: true, header: genesisHeader })
    }
  }

  addHeader({ buf, header = false, hash = false, genesis = false }) {
    if (hash) hash = hash.toString('hex')
    if (this.headers[hash]) return false
    if (!header) header = bsv.Header.fromBuffer(buf)
    if (!hash) hash = header.getHash().toString('hex')
    if (this.headers[hash]) return false
    if (this.invalidBlocks.has(hash)) {
      console.log(`Did not add invalid header: ${hash}`)
      return false
    }
    const item = { hash }
    item.prev = header.prevHash.toString('hex')
    item.next = []
    this.headers[hash] = item
    this.processed = false
    if (genesis) {
      this.genesis = hash
    } else {
      const prev = this.headers[item.prev]
      if (prev) {
        prev.next.push(hash)
        return true
      } else {
        this.unlinked[hash] = item
      }
    }
    return false
  }

  process() {
    if (this.processed) return
    for (const hash in this.unlinked) {
      const item = this.unlinked[hash]
      if (this.headers[item.prev]) {
        this.headers[item.prev].next.push(hash)
        delete this.unlinked[hash]
      }
    }
    let startingHash = this.genesis
    let height = 0
    if (this.maxReorgDepth > 0 && this.tip && !this.invalidatedBlock) {
      height = Math.max(0, this.tip.height - this.maxReorgDepth)
      const hash = this.chain[`${height}`]
      if (this.headers[hash]) startingHash = hash
    }
    if (!this.headers[startingHash]) {
      throw Error(`Missing starting block ${startingHash}`)
    }
    let hashes = [startingHash]
    while (hashes.length > 0) {
      const nextHashes = []
      for (const hash of hashes) {
        const item = this.headers[hash]
        if (item.height && item.height < height) {
          console.log(`Detected loop in header ${height} ${hash}`)
          continue // Loop. Ignore header
        }
        item.height = height
        let added = 0
        for (const hash of item.next) {
          if (this.headers[hash]) {
            nextHashes.push(hash)
            added++
          }
        }
        if (added === 0) this.tip = item
      }
      hashes = nextHashes
      height++
    }
    let index = this.tip
    while (index) {
      if (this.chain[`${index.height}`] === index.hash) break
      this.chain[`${index.height}`] = index.hash
      index = this.headers[index.prev]
    }
    this.processed = true
    this.invalidatedBlock = false
  }

  invalidateBlock(hash) {
    hash = hash.toString('hex')
    const header = this.headers[hash]
    delete this.headers[hash]
    delete this.unlinked[hash]
    if (header) {
      console.log(`Invalidating block ${header.height}, ${hash}`)
      const heightHash = this.chain[`${header.height}`]
      if (hash === heightHash) {
        for (let height = header.height; height <= this.tip.height; height++) {
          const hash = this.chain[`${height}`]
          console.log(`Invalidating block ${height}, ${hash}`)
          delete this.chain[`${height}`]
          delete this.headers[hash]
        }
      }
      this.invalidBlocks.add(hash)
      this.processed = false
      this.invalidatedBlock = true
    } else {
      console.log(`Invalidating block ${hash}`)
    }
  }

  getHeight(hash = false) {
    this.process()
    if (hash) {
      hash = hash.toString('hex')
      if (!this.headers[hash]) throw Error(`No height`)
      return this.headers[hash].height
    } else {
      return this.getTip().height
    }
  }

  getHash(height) {
    this.process()
    const hash = this.chain[`${height}`]
    if (!this.headers[hash]) throw Error(`No hash`)
    return hash
  }

  getTip() {
    this.process()
    if (!this.tip) throw Error(`No tip`)
    return this.tip
  }
}

module.exports = Headers
