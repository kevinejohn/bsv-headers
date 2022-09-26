import * as bsv from "bsv-minimal";

export const GENESIS_HEADER =
  "0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab5f49ffff001d1dac2b7c";

export interface HeadersOptions {
  genesisHeader?: string | Buffer | bsv.Header;
  invalidBlocks?: string[];
  maxReorgDepth?: number;
}

export interface AddHeaderOptions {
  buf?: Buffer;
  header?: bsv.Header;
  hash?: string | Buffer;
  genesis?: boolean;
}

export default class Headers {
  invalidBlocks: Set<string>;
  maxReorgDepth: number;
  headers: Record<
    string,
    { hash: string; prev: string; next: string[]; height?: number }
  >;
  chain: Record<string, string>;
  unlinked: Record<string, { hash: string; prev: string; next: string[] }>;
  processed: boolean;
  invalidatedBlock: boolean;
  genesis: string;
  genesisHeader: bsv.Header;
  tip: { height: number; hash: string };

  constructor(opts: HeadersOptions = {}) {
    const {
      genesisHeader = GENESIS_HEADER,
      invalidBlocks = [],
      maxReorgDepth = 1000,
    } = opts;
    this.invalidBlocks = new Set(invalidBlocks);
    this.maxReorgDepth = maxReorgDepth;
    this.headers = {};
    this.chain = {};
    this.unlinked = {};
    this.processed = false;
    this.invalidatedBlock = false;

    if (typeof genesisHeader === "string") {
      const buf = Buffer.from(genesisHeader, "hex");
      this.genesisHeader = bsv.Header.fromBuffer(buf);
    } else if (Buffer.isBuffer(genesisHeader)) {
      this.genesisHeader = bsv.Header.fromBuffer(genesisHeader);
    } else {
      this.genesisHeader = genesisHeader;
    }
    this.addHeader({ genesis: true, header: this.genesisHeader });
    this.genesis = this.genesisHeader.getHash(true);
    this.tip = this.getTip();
  }

  addHeader({ header, buf, hash, genesis }: AddHeaderOptions) {
    if (hash) hash = hash.toString("hex");
    if (hash && this.headers[hash]) return false;
    if (!header && !buf) throw Error(`Missing header`);
    if (!header && buf) header = bsv.Header.fromBuffer(buf);
    if (!hash && header) hash = header.getHash(true);
    if (hash && this.headers[hash]) return false;
    if (hash && this.invalidBlocks.has(hash)) {
      console.log(`Did not add invalid header: ${hash}`);
      return false;
    }
    if (!header) throw Error("Missing header");
    if (!hash) throw Error("Missing hash");
    const item = {
      hash,
      prev: header.prevHash.toString("hex"),
      next: [] as string[],
    };
    this.headers[hash] = item;
    this.processed = false;
    if (!genesis) {
      const prev = this.headers[item.prev];
      if (prev) {
        prev.next.push(hash);
        return true;
      } else {
        this.unlinked[hash] = item;
      }
    }
    return false;
  }

  process() {
    if (this.processed) return;
    for (const hash in this.unlinked) {
      const item = this.unlinked[hash];
      if (this.headers[item.prev]) {
        this.headers[item.prev].next.push(hash);
        delete this.unlinked[hash];
      }
    }
    let startingHash = this.genesis;
    if (!startingHash) throw Error("Missing startingHash");
    let height = 0;
    if (this.maxReorgDepth > 0 && this.tip && !this.invalidatedBlock) {
      height = Math.max(0, (this.tip.height || 0) - this.maxReorgDepth);
      const hash = this.chain[`${height}`];
      if (this.headers[hash]) startingHash = hash;
    }
    if (!this.headers[startingHash]) {
      throw Error(`Missing starting block ${startingHash}`);
    }
    let hashes = [startingHash];
    let index;
    while (hashes.length > 0) {
      const nextHashes = [];
      for (const hash of hashes) {
        const item = this.headers[hash];
        if (item.height && item.height < height) {
          console.log(`Detected loop in header ${height} ${hash}`);
          continue; // Loop. Ignore header
        }
        item.height = height;
        let added = 0;
        for (const hash of item.next) {
          if (this.headers[hash]) {
            nextHashes.push(hash);
            added++;
          }
        }
        if (added === 0) {
          index = item;
          this.tip = { height: item.height, hash: item.hash };
        }
      }
      hashes = nextHashes;
      height++;
    }
    while (index) {
      if (this.chain[`${index.height}`] === index.hash) break;
      this.chain[`${index.height}`] = index.hash;
      if (!this.headers[index.prev]) break;
      index = this.headers[index.prev];
    }
    this.processed = true;
    this.invalidatedBlock = false;
    if (index) return index;

    if (!this.genesis) throw Error("Missing genesis header");
    if (this.headers[this.genesis]) return this.headers[this.genesis];
  }

  invalidateBlock(hash: Buffer | string) {
    hash = hash.toString("hex");
    const header = this.headers[hash];
    delete this.headers[hash];
    delete this.unlinked[hash];
    if (header) {
      console.log(`Invalidating block ${header.height}, ${hash}`);
      const heightHash = this.chain[`${header.height}`];
      if (hash === heightHash) {
        if (!header.height || !this.tip.height)
          throw Error("Missing header or tip height");
        for (let height = header.height; height <= this.tip.height; height++) {
          const hash = this.chain[`${height}`];
          console.log(`Invalidating block ${height}, ${hash}`);
          delete this.chain[`${height}`];
          delete this.headers[hash];
        }
      }
      this.invalidBlocks.add(hash);
      this.processed = false;
      this.invalidatedBlock = true;
    } else {
      console.log(`Invalidating block ${hash}`);
    }
  }

  getHeight(hash?: string | Buffer): number {
    this.process();
    if (hash) {
      hash = hash.toString("hex");
      if (!this.headers[hash]) throw Error(`No height`);
      const height = this.headers[hash].height;
      if (height === undefined) throw Error(`No height`);
      return height;
    } else {
      return this.getTip().height;
    }
  }

  getHash(height: number): string {
    this.process();
    const hash = this.chain[`${height}`];
    if (!this.headers[hash]) throw Error(`No hash`);
    return hash;
  }

  getTip(): { height: number; hash: string } {
    this.process();
    return this.tip;
  }

  getFromHeaderArray(): string[] {
    // https://en.bitcoin.it/wiki/Protocol_documentation#getblocks
    const hashes: string[] = [];
    let step = 1;
    const tipHeight = this.getHeight();
    for (let i = tipHeight; i > 0; i -= step) {
      if (hashes.length >= 10) step *= 2;
      hashes.push(this.getHash(i));
    }
    hashes.push(this.getHash(0));
    return hashes;
  }
}
