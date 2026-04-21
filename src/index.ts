import * as bsv from "bsv-minimal";

export const GENESIS_HEADER =
  "0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab5f49ffff001d1dac2b7c";

export type ChainTicker = "BTC" | "BCH" | "BSV";
export type NetworkName = "mainnet" | ChainTicker;
export type DifficultyAlgorithm = "legacy" | "cash";

export const FORK_BLOCK_HASHES: Record<ChainTicker, string[]> = {
  BTC: [
    "00000000000000000019f112ec0a9982926f1258cdcc558dd7c3b7e5dc7fa148",
  ],
  BCH: [
    "000000000000000000651ef99cb9fcbe0dadde1d424bd9f15ff20136191a5eec",
    "0000000000000000004626ff6e3b936941d341c5932ece4357eeccac44e6d56c",
  ],
  BSV: [
    "000000000000000000651ef99cb9fcbe0dadde1d424bd9f15ff20136191a5eec",
    "000000000000000001d956714215d96ffc00e0afda4cd0a96c96f8d802b1662b",
  ],
};

export interface HeadersLogger {
  debug?: (message: string) => void;
  warn?: (message: string) => void;
}

export interface HeaderMeta {
  hash: string;
  prev: string;
  next: string[];
  bits: string;
  time: number;
  work: bigint;
  chainWork?: bigint;
  height?: number;
}

export interface ExpectedBitsContext {
  hash: string;
  header: bsv.Header;
  height: number;
  previous: HeaderMeta;
  headers: Headers;
}

export type ExpectedBitsFn = (
  context: ExpectedBitsContext
) => string | Buffer | undefined;

export interface NetworkOptions {
  name?: string;
  genesisHeader?: string | Buffer | bsv.Header;
  difficultyExceptionHashes?: (string | Buffer)[];
  difficultyAlgorithm?: DifficultyAlgorithm;
  cashForkHeight?: number;
  cashDaaActivationHeight?: number;
  asertActivationHeight?: number;
  asertHalfLife?: number;
  maxTarget?: string | Buffer | bigint;
  targetSpacing?: number;
  retargetInterval?: number;
  targetTimespan?: number;
  validateDifficulty?: boolean;
  getExpectedBits?: ExpectedBitsFn;
}

export interface HeadersOptions {
  genesisHeader?: string | Buffer | bsv.Header;
  invalidBlocks?: string[];
  maxReorgDepth?: number;
  maxTarget?: string | Buffer | bigint;
  network?: NetworkName | NetworkOptions;
  difficultyExceptionHashes?: (string | Buffer)[];
  difficultyAlgorithm?: DifficultyAlgorithm;
  cashForkHeight?: number;
  cashDaaActivationHeight?: number;
  asertActivationHeight?: number;
  asertHalfLife?: number;
  targetSpacing?: number;
  retargetInterval?: number;
  targetTimespan?: number;
  validateDifficulty?: boolean;
  validateProofOfWork?: boolean;
  getExpectedBits?: ExpectedBitsFn;
  logger?: HeadersLogger | false | null;
}

export interface AddHeaderOptions {
  buf?: Buffer;
  header?: bsv.Header;
  hash?: string | Buffer;
  genesis?: boolean;
}

export interface GetHeaderOptions {
  hash?: string | Buffer;
  height?: number;
}

export interface SerializedHeaderEntry {
  hash: string;
  prev: string;
  next: string[];
  bits: string;
  time: number;
  buffer: string;
  work: string;
  chainWork?: string;
  height?: number;
}

export interface SerializedHeaders {
  version: 1;
  options: {
    genesisHeader: string;
    maxReorgDepth: number;
    maxTarget: string;
    targetSpacing: number;
    retargetInterval: number;
    targetTimespan: number;
    validateDifficulty: boolean;
    validateProofOfWork: boolean;
    difficultyExceptionHashes: string[];
    difficultyAlgorithm: DifficultyAlgorithm;
    cashForkHeight?: number;
    cashDaaActivationHeight?: number;
    asertActivationHeight?: number;
    asertHalfLife?: number;
    network?: string;
  };
  genesis: string;
  invalidBlocks: string[];
  headers: SerializedHeaderEntry[];
  chain: Record<string, string>;
  unlinked: string[];
  tip: { height: number; hash: string };
  processed: boolean;
  invalidatedBlock: boolean;
}

type HeaderEntry = {
  hash: string;
  prev: string;
  next: string[];
  bits: Buffer;
  time: number;
  buffer: Buffer;
  work: bigint;
  chainWork?: bigint;
  height?: number;
  asertAnchor?: AsertAnchor;
};

type AsertAnchor = {
  height: number;
  parentTime: number;
  target: bigint;
};

type ResolvedNetworkOptions = {
  name?: string;
  genesisHeader: string | Buffer | bsv.Header;
  difficultyExceptionHashes: (string | Buffer)[];
  difficultyAlgorithm: DifficultyAlgorithm;
  cashForkHeight?: number;
  cashDaaActivationHeight?: number;
  asertActivationHeight?: number;
  asertHalfLife?: number;
  maxTarget?: string | Buffer | bigint;
  targetSpacing: number;
  retargetInterval: number;
  targetTimespan: number;
  validateDifficulty: boolean;
  getExpectedBits?: ExpectedBitsFn;
};

const TWO = BigInt(2);
const MAX_UINT256 = TWO ** BigInt(256) - BigInt(1);
const WORK_BASE = TWO ** BigInt(256);
const CASH_FORK_HEIGHT = 478559;
const CASH_DAA_ACTIVATION_HEIGHT = 504032;
const BCH_ASERT_ACTIVATION_HEIGHT = 661648;
const BCH_ASERT_HALF_LIFE = 2 * 24 * 60 * 60;
const ALL_FORK_BLOCK_HASHES = Array.from(
  new Set(Object.values(FORK_BLOCK_HASHES).flat())
);

const MAINNET_NETWORK: ResolvedNetworkOptions = {
  name: "mainnet",
  genesisHeader: GENESIS_HEADER,
  difficultyExceptionHashes: ALL_FORK_BLOCK_HASHES,
  difficultyAlgorithm: "legacy",
  targetSpacing: 10 * 60,
  retargetInterval: 2016,
  targetTimespan: 14 * 24 * 60 * 60,
  validateDifficulty: true,
};

const NETWORKS: Record<NetworkName, ResolvedNetworkOptions> = {
  mainnet: MAINNET_NETWORK,
  BTC: {
    ...MAINNET_NETWORK,
    name: "BTC",
    difficultyExceptionHashes: FORK_BLOCK_HASHES.BTC,
  },
  BCH: {
    ...MAINNET_NETWORK,
    name: "BCH",
    difficultyExceptionHashes: FORK_BLOCK_HASHES.BCH,
    difficultyAlgorithm: "cash",
    cashForkHeight: CASH_FORK_HEIGHT,
    cashDaaActivationHeight: CASH_DAA_ACTIVATION_HEIGHT,
    asertActivationHeight: BCH_ASERT_ACTIVATION_HEIGHT,
    asertHalfLife: BCH_ASERT_HALF_LIFE,
  },
  BSV: {
    ...MAINNET_NETWORK,
    name: "BSV",
    difficultyExceptionHashes: FORK_BLOCK_HASHES.BSV,
    difficultyAlgorithm: "cash",
    cashForkHeight: CASH_FORK_HEIGHT,
    cashDaaActivationHeight: CASH_DAA_ACTIVATION_HEIGHT,
  },
};

function resolveNetwork(
  network: NetworkName | NetworkOptions | undefined
): ResolvedNetworkOptions {
  if (!network) return MAINNET_NETWORK;
  if (typeof network === "string") {
    const resolved = NETWORKS[network];
    if (!resolved) throw Error(`Unknown network ${network}`);
    return resolved;
  }
  const base =
    network.name && network.name in NETWORKS
      ? NETWORKS[network.name as NetworkName]
      : MAINNET_NETWORK;
  return {
    ...base,
    ...network,
    difficultyExceptionHashes:
      network.difficultyExceptionHashes || base.difficultyExceptionHashes,
    genesisHeader: network.genesisHeader || base.genesisHeader,
  };
}

function normalizeHash(hash: Buffer | string): string {
  return Buffer.isBuffer(hash) ? hash.toString("hex") : hash.toLowerCase();
}

function normalizeBits(bits: Buffer | string): Buffer {
  return Buffer.isBuffer(bits)
    ? Buffer.from(bits)
    : Buffer.from(bits.toLowerCase(), "hex");
}

function normalizeTarget(target: string | Buffer | bigint): bigint {
  if (typeof target === "bigint") return target;
  if (Buffer.isBuffer(target)) return BigInt(`0x${target.toString("hex")}`);
  const hex = target.toLowerCase().replace(/^0x/, "");
  return BigInt(`0x${hex}`);
}

function bigintToHex(value: bigint): string {
  return value.toString(16);
}

function compactToTarget(bits: Buffer): bigint {
  if (bits.length !== 4) throw Error("Invalid bits length");
  const exponent = bits[0];
  const mantissa = (bits[1] << 16) | (bits[2] << 8) | bits[3];
  if (mantissa === 0) throw Error("Invalid bits target");
  if (mantissa & 0x800000) throw Error("Negative bits target");

  let target = BigInt(mantissa);
  if (exponent <= 3) {
    target >>= BigInt(8 * (3 - exponent));
  } else {
    target <<= BigInt(8 * (exponent - 3));
  }

  if (target <= BigInt(0) || target > MAX_UINT256) {
    throw Error("Invalid bits target");
  }
  return target;
}

function targetToCompact(target: bigint): Buffer {
  if (target <= BigInt(0) || target > MAX_UINT256) {
    throw Error("Invalid target");
  }

  let hex = target.toString(16);
  if (hex.length % 2) hex = `0${hex}`;
  let size = hex.length / 2;
  let compact: bigint;
  if (size <= 3) {
    compact = target << BigInt(8 * (3 - size));
  } else {
    compact = target >> BigInt(8 * (size - 3));
  }

  if (compact & BigInt(0x800000)) {
    compact >>= BigInt(8);
    size++;
  }

  compact |= BigInt(size) << BigInt(24);
  const buf = Buffer.alloc(4);
  buf.writeUInt32BE(Number(compact));
  return buf;
}

function getProofOfWork(target: bigint): bigint {
  return WORK_BASE / (target + BigInt(1));
}

function isValidProofOfWork(hash: string, target: bigint): boolean {
  return BigInt(`0x${hash}`) <= target;
}

function getDescendantHashes(
  headers: Record<string, HeaderEntry>,
  hash: string
): Set<string> {
  const hashes = new Set<string>([hash]);
  const queue = [hash];
  while (queue.length > 0) {
    const nextHash = queue.shift();
    if (!nextHash) continue;
    const header = headers[nextHash];
    if (!header) continue;
    for (const childHash of header.next) {
      if (!hashes.has(childHash)) {
        hashes.add(childHash);
        queue.push(childHash);
      }
    }
  }
  return hashes;
}

function getAncestorChainWork(
  headers: Record<string, HeaderEntry>,
  hash: string
): bigint {
  let header = headers[hash];
  if (!header) throw Error(`Missing header ${hash}`);
  if (header.chainWork !== undefined) return header.chainWork;

  const path: HeaderEntry[] = [];
  const seen = new Set<string>();
  while (header && header.chainWork === undefined) {
    if (seen.has(header.hash)) throw Error(`Loop detected in header chain`);
    seen.add(header.hash);
    path.push(header);
    header = headers[header.prev];
  }

  let chainWork = header?.chainWork || BigInt(0);
  for (let i = path.length - 1; i >= 0; i--) {
    chainWork += path[i].work;
    path[i].chainWork = chainWork;
  }
  return path[0].chainWork!;
}

function getAncestorHeight(
  headers: Record<string, HeaderEntry>,
  hash: string
): number | undefined {
  let header = headers[hash];
  if (!header) return undefined;
  if (header.height !== undefined) return header.height;

  const path: HeaderEntry[] = [];
  const seen = new Set<string>();
  while (header && header.height === undefined) {
    if (seen.has(header.hash)) return undefined;
    seen.add(header.hash);
    path.push(header);
    header = headers[header.prev];
  }
  if (!header || header.height === undefined) return undefined;

  let height = header.height;
  for (let i = path.length - 1; i >= 0; i--) {
    height++;
    path[i].height = height;
  }
  return path[0].height;
}

function getAncestorAtHeight(
  headers: Record<string, HeaderEntry>,
  hash: string,
  height: number
): HeaderEntry | undefined {
  let header = headers[hash];
  while (header && header.height !== undefined && header.height > height) {
    header = headers[header.prev];
  }
  return header && header.height === height ? header : undefined;
}

function getMedianTimePast(
  headers: Record<string, HeaderEntry>,
  hash: string
): number | undefined {
  const times: number[] = [];
  let header = headers[hash];
  for (let i = 0; i < 11 && header; i++) {
    times.push(header.time);
    header = headers[header.prev];
  }
  if (times.length === 0) return undefined;
  times.sort((a, b) => a - b);
  return times[Math.floor(times.length / 2)];
}

function getSuitableBlock(
  headers: Record<string, HeaderEntry>,
  hash: string
): HeaderEntry | undefined {
  const block2 = headers[hash];
  const block1 = block2 ? headers[block2.prev] : undefined;
  const block0 = block1 ? headers[block1.prev] : undefined;
  if (!block0 || !block1 || !block2) return undefined;
  return [block0, block1, block2].sort((a, b) => a.time - b.time)[1];
}

function cloneMeta(header: HeaderEntry): HeaderMeta {
  return {
    hash: header.hash,
    prev: header.prev,
    next: [...header.next],
    bits: header.bits.toString("hex"),
    time: header.time,
    work: header.work,
    chainWork: header.chainWork,
    height: header.height,
  };
}

export default class Headers {
  private invalidBlockHashes: Set<string>;
  private maxReorgDepth: number;
  private headerEntries: Record<string, HeaderEntry>;
  private bestChain: Record<string, string>;
  private unlinkedEntries: Record<string, HeaderEntry>;
  private processed: boolean;
  private invalidatedBlock: boolean;
  private maxTarget: bigint;
  private targetSpacing: number;
  private retargetInterval: number;
  private targetTimespan: number;
  private validateDifficulty: boolean;
  private validateProofOfWork: boolean;
  private difficultyExceptionHashes: Set<string>;
  private difficultyAlgorithm: DifficultyAlgorithm;
  private cashForkHeight?: number;
  private cashDaaActivationHeight?: number;
  private asertActivationHeight?: number;
  private asertHalfLife?: number;
  private expectedBits?: ExpectedBitsFn;
  private logger?: HeadersLogger;
  private networkName?: string;
  private genesis: string;
  private genesisHeader: bsv.Header;
  private tip: { height: number; hash: string };

  constructor(opts: HeadersOptions = {}) {
    const network = resolveNetwork(opts.network);
    const {
      genesisHeader = network.genesisHeader,
      invalidBlocks = [],
      maxReorgDepth = 1000,
      maxTarget = network.maxTarget,
      difficultyExceptionHashes = network.difficultyExceptionHashes,
      difficultyAlgorithm = network.difficultyAlgorithm,
      cashForkHeight = network.cashForkHeight,
      cashDaaActivationHeight = network.cashDaaActivationHeight,
      asertActivationHeight = network.asertActivationHeight,
      asertHalfLife = network.asertHalfLife,
      targetSpacing = network.targetSpacing,
      retargetInterval = network.retargetInterval,
      targetTimespan = network.targetTimespan,
      validateDifficulty = network.validateDifficulty,
      validateProofOfWork = true,
      getExpectedBits = network.getExpectedBits,
      logger,
    } = opts;

    this.invalidBlockHashes = new Set(
      invalidBlocks.map((hash) => normalizeHash(hash))
    );
    this.maxReorgDepth = maxReorgDepth;
    this.headerEntries = {};
    this.bestChain = {};
    this.unlinkedEntries = {};
    this.processed = false;
    this.invalidatedBlock = false;
    this.targetSpacing = targetSpacing;
    this.retargetInterval = retargetInterval;
    this.targetTimespan = targetTimespan || targetSpacing * retargetInterval;
    this.validateDifficulty = validateDifficulty;
    this.validateProofOfWork = validateProofOfWork;
    this.difficultyExceptionHashes = new Set(
      difficultyExceptionHashes.map((hash) => normalizeHash(hash))
    );
    this.difficultyAlgorithm = difficultyAlgorithm;
    this.cashForkHeight = cashForkHeight;
    this.cashDaaActivationHeight = cashDaaActivationHeight;
    this.asertActivationHeight = asertActivationHeight;
    this.asertHalfLife = asertHalfLife;
    this.expectedBits = getExpectedBits;
    this.logger = logger || undefined;
    this.networkName = network.name;

    if (typeof genesisHeader === "string") {
      const buf = Buffer.from(genesisHeader, "hex");
      this.genesisHeader = bsv.Header.fromBuffer(buf);
    } else if (Buffer.isBuffer(genesisHeader)) {
      this.genesisHeader = bsv.Header.fromBuffer(genesisHeader);
    } else {
      this.genesisHeader = genesisHeader;
    }
    this.maxTarget = maxTarget
      ? normalizeTarget(maxTarget)
      : compactToTarget(this.genesisHeader.bits);
    this.addHeader({ genesis: true, header: this.genesisHeader });
    this.genesis = this.genesisHeader.getHash(true);
    this.tip = this.getTip();
  }

  static fromJSON(data: SerializedHeaders, opts: HeadersOptions = {}): Headers {
    if (data.version !== 1) throw Error(`Unsupported serialized version`);
    const headers = new Headers({
      ...opts,
      genesisHeader: opts.genesisHeader || data.options.genesisHeader,
      invalidBlocks: data.invalidBlocks,
      maxReorgDepth: opts.maxReorgDepth ?? data.options.maxReorgDepth,
      maxTarget: opts.maxTarget ?? data.options.maxTarget,
      network:
        opts.network ||
        (data.options.network === "mainnet" ? data.options.network : undefined),
      difficultyExceptionHashes:
        opts.difficultyExceptionHashes ??
        data.options.difficultyExceptionHashes,
      difficultyAlgorithm:
        opts.difficultyAlgorithm ?? data.options.difficultyAlgorithm,
      cashForkHeight: opts.cashForkHeight ?? data.options.cashForkHeight,
      cashDaaActivationHeight:
        opts.cashDaaActivationHeight ?? data.options.cashDaaActivationHeight,
      asertActivationHeight:
        opts.asertActivationHeight ?? data.options.asertActivationHeight,
      asertHalfLife: opts.asertHalfLife ?? data.options.asertHalfLife,
      targetSpacing: opts.targetSpacing ?? data.options.targetSpacing,
      retargetInterval: opts.retargetInterval ?? data.options.retargetInterval,
      targetTimespan: opts.targetTimespan ?? data.options.targetTimespan,
      validateDifficulty:
        opts.validateDifficulty ?? data.options.validateDifficulty,
      validateProofOfWork:
        opts.validateProofOfWork ?? data.options.validateProofOfWork,
    });

    const serializedHeaders = [...data.headers].sort(
      (a, b) =>
        (a.height ?? Number.MAX_SAFE_INTEGER) -
        (b.height ?? Number.MAX_SAFE_INTEGER)
    );
    headers.invalidBlockHashes = new Set();
    headers.headerEntries = {};
    headers.bestChain = {};
    headers.unlinkedEntries = {};
    headers.processed = false;
    headers.invalidatedBlock = false;
    for (const serialized of data.headers) {
      const buffer = Buffer.from(serialized.buffer, "hex");
      const header = bsv.Header.fromBuffer(buffer);
      const actualHash = header.getHash(true);
      const serializedHash = normalizeHash(serialized.hash);
      if (serializedHash !== actualHash) {
        throw Error(`Serialized header hash mismatch`);
      }
      if (normalizeHash(serialized.prev) !== header.prevHash.toString("hex")) {
        throw Error(`Serialized header prev mismatch`);
      }
      if (!normalizeBits(serialized.bits).equals(header.bits)) {
        throw Error(`Serialized header bits mismatch`);
      }
    }

    for (const serialized of serializedHeaders) {
      const buffer = Buffer.from(serialized.buffer, "hex");
      const hash = bsv.Header.fromBuffer(buffer).getHash(true);
      const isGenesis = hash === headers.genesis;
      if (isGenesis && headers.headerEntries[hash]) continue;
      if (!headers.addHeader({ buf: buffer, genesis: isGenesis })) {
        if (!isGenesis && !headers.headerEntries[hash]) {
          throw Error(`Serialized header failed validation`);
        }
      }
    }

    headers.process();
    if (
      Object.keys(headers.bestChain).length !== Object.keys(data.chain).length
    ) {
      throw Error(`Serialized chain mismatch`);
    }
    for (const [height, hash] of Object.entries(data.chain)) {
      if (headers.bestChain[height] !== normalizeHash(hash)) {
        throw Error(`Serialized chain mismatch`);
      }
    }
    if (
      Object.keys(headers.unlinkedEntries).length !== data.unlinked.length
    ) {
      throw Error(`Serialized unlinked mismatch`);
    }
    for (const hash of data.unlinked) {
      const normalized = normalizeHash(hash);
      if (!headers.unlinkedEntries[normalized]) {
        throw Error(`Serialized unlinked mismatch`);
      }
    }
    if (headers.genesis !== normalizeHash(data.genesis)) {
      throw Error(`Serialized genesis mismatch`);
    }
    if (
      headers.tip.height !== data.tip.height ||
      headers.tip.hash !== normalizeHash(data.tip.hash)
    ) {
      throw Error(`Serialized tip mismatch`);
    }
    headers.invalidBlockHashes = new Set(
      data.invalidBlocks.map((hash) => normalizeHash(hash))
    );
    headers.processed = true;
    return headers;
  }

  addHeader({ header, buf, hash, genesis }: AddHeaderOptions): boolean {
    if (!header && !buf) throw Error(`Missing header`);
    if (!header && buf) header = bsv.Header.fromBuffer(buf);
    if (!header) throw Error("Missing header");

    const actualHash = header.getHash(true);
    if (hash && normalizeHash(hash) !== actualHash) {
      throw Error("Header hash mismatch");
    }
    hash = actualHash;
    if (this.headerEntries[hash]) return false;
    if (this.invalidBlockHashes.has(hash)) {
      this.log("debug", `Did not add invalid header: ${hash}`);
      return false;
    }

    const target = this.getValidatedTarget(hash, header);
    if (target === undefined) return false;

    const item: HeaderEntry = {
      hash,
      prev: header.prevHash.toString("hex"),
      next: [],
      bits: Buffer.from(header.bits),
      time: header.time,
      buffer: Buffer.from(header.toBuffer()),
      work: getProofOfWork(target),
    };
    this.headerEntries[hash] = item;
    this.processed = false;

    if (genesis) return false;

    const prev = this.headerEntries[item.prev];
    if (!prev) {
      this.unlinkedEntries[hash] = item;
      return false;
    }
    if (!this.validateConnectedHeader(item, prev)) {
      this.deleteHeaderTree(item);
      return false;
    }
    prev.next.push(hash);
    return true;
  }

  process():
    | undefined
    | {
        hash: string;
        prev: string;
        next: string[];
        bits: Buffer;
        time: number;
        buffer: Buffer;
        work: bigint;
        chainWork?: bigint;
        height?: number;
      } {
    if (this.processed) return;
    const previousTipHeight = this.tip ? this.tip.height : 0;
    for (const hash in this.unlinkedEntries) {
      const item = this.unlinkedEntries[hash];
      const prev = this.headerEntries[item.prev];
      if (!prev) continue;
      if (!this.validateConnectedHeader(item, prev)) {
        this.deleteHeaderTree(item);
        continue;
      }
      prev.next.push(hash);
      delete this.unlinkedEntries[hash];
    }

    let startingHash = this.genesis;
    if (!startingHash) throw Error("Missing startingHash");
    let height = 0;
    if (this.maxReorgDepth > 0 && this.tip && !this.invalidatedBlock) {
      height = Math.max(0, (this.tip.height || 0) - this.maxReorgDepth);
      const hash = this.bestChain[`${height}`];
      if (this.headerEntries[hash]) startingHash = hash;
    }
    if (!this.headerEntries[startingHash]) {
      throw Error(`Missing starting block ${startingHash}`);
    }
    const startingItem = this.headerEntries[startingHash];
    if (startingItem.chainWork === undefined || startingHash === this.genesis) {
      startingItem.chainWork = getAncestorChainWork(
        this.headerEntries,
        startingHash
      );
    }

    let hashes = [startingHash];
    let index;
    let best: HeaderEntry | undefined;
    while (hashes.length > 0) {
      const nextHashes = [];
      for (const hash of hashes) {
        const item = this.headerEntries[hash];
        if (item.chainWork === undefined) continue;
        if (item.height && item.height < height) {
          this.log("warn", `Detected loop in header ${height} ${hash}`);
          continue;
        }
        item.height = height;
        let added = 0;
        for (const nextHash of item.next) {
          const next = this.headerEntries[nextHash];
          if (next) {
            next.chainWork = item.chainWork + next.work;
            nextHashes.push(nextHash);
            added++;
          }
        }
        if (
          added === 0 &&
          (!best ||
            item.chainWork > best.chainWork! ||
            (item.chainWork === best.chainWork &&
              (item.height || 0) > (best.height || 0)))
        ) {
          best = item;
        }
      }
      hashes = nextHashes;
      height++;
    }
    index = best;
    if (index) {
      this.tip = { height: index.height || 0, hash: index.hash };
      for (
        let height = this.tip.height + 1;
        height <= previousTipHeight;
        height++
      ) {
        delete this.bestChain[`${height}`];
      }
    }
    while (index) {
      if (this.bestChain[`${index.height}`] === index.hash) break;
      this.bestChain[`${index.height}`] = index.hash;
      if (!this.headerEntries[index.prev]) break;
      index = this.headerEntries[index.prev];
    }
    this.processed = true;
    this.invalidatedBlock = false;
    if (index) return index;

    if (!this.genesis) throw Error("Missing genesis header");
    if (this.headerEntries[this.genesis]) return this.headerEntries[this.genesis];
  }

  invalidateBlock(hash: Buffer | string): void {
    hash = normalizeHash(hash);
    const header = this.headerEntries[hash];
    this.invalidBlockHashes.add(hash);
    if (header) {
      this.log("debug", `Invalidating block ${header.height}, ${hash}`);
      this.deleteHeaderTree(header);

      const heightHash = this.bestChain[`${header.height}`];
      if (hash === heightHash) {
        if (header.height === undefined || this.tip.height === undefined)
          throw Error("Missing header or tip height");
        for (let height = header.height; height <= this.tip.height; height++) {
          const chainHash = this.bestChain[`${height}`];
          this.log("debug", `Invalidating block ${height}, ${chainHash}`);
          delete this.bestChain[`${height}`];
        }
      }
      this.processed = false;
      this.invalidatedBlock = true;
    } else {
      this.log("debug", `Invalidating block ${hash}`);
    }
  }

  getHeight(hash?: string | Buffer): number {
    this.process();
    if (hash) {
      hash = normalizeHash(hash);
      const header = this.headerEntries[hash];
      if (!header) throw Error(`No height`);
      if (header.height === undefined) throw Error(`No height`);
      return header.height;
    }
    return this.getTip().height;
  }

  getHash(height: number): string {
    this.process();
    const hash = this.bestChain[`${height}`];
    if (!this.headerEntries[hash]) throw Error(`No hash`);
    return hash;
  }

  getTip(): { height: number; hash: string } {
    this.process();
    return { ...this.tip };
  }

  getFromHeaderArray(): string[] {
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

  hasHeader(hash: string | Buffer): boolean {
    return !!this.headerEntries[normalizeHash(hash)];
  }

  getHeader({ hash, height }: GetHeaderOptions): bsv.Header | undefined {
    const entry = this.getEntry({ hash, height });
    return entry ? bsv.Header.fromBuffer(entry.buffer) : undefined;
  }

  getHeaderBuffer({ hash, height }: GetHeaderOptions): Buffer | undefined {
    const entry = this.getEntry({ hash, height });
    return entry ? Buffer.from(entry.buffer) : undefined;
  }

  getHeaderMeta(hashOrHeight: string | Buffer | number): HeaderMeta | undefined {
    const entry =
      typeof hashOrHeight === "number"
        ? this.getEntry({ height: hashOrHeight })
        : this.headerEntries[normalizeHash(hashOrHeight)];
    return entry ? cloneMeta(entry) : undefined;
  }

  getChildren(hash: string | Buffer): string[] {
    const entry = this.headerEntries[normalizeHash(hash)];
    return entry ? [...entry.next] : [];
  }

  getChainWork(hash?: string | Buffer): bigint {
    this.process();
    const entry = hash
      ? this.headerEntries[normalizeHash(hash)]
      : this.headerEntries[this.tip.hash];
    if (!entry || entry.chainWork === undefined) throw Error("No chain work");
    return entry.chainWork;
  }

  getInvalidBlocks(): string[] {
    return [...this.invalidBlockHashes];
  }

  toJSON(): SerializedHeaders {
    this.process();
    return {
      version: 1,
      options: {
        genesisHeader: this.genesisHeader.toBuffer().toString("hex"),
        maxReorgDepth: this.maxReorgDepth,
        maxTarget: bigintToHex(this.maxTarget),
        targetSpacing: this.targetSpacing,
        retargetInterval: this.retargetInterval,
        targetTimespan: this.targetTimespan,
        validateDifficulty: this.validateDifficulty,
        validateProofOfWork: this.validateProofOfWork,
        difficultyExceptionHashes: [...this.difficultyExceptionHashes],
        difficultyAlgorithm: this.difficultyAlgorithm,
        cashForkHeight: this.cashForkHeight,
        cashDaaActivationHeight: this.cashDaaActivationHeight,
        asertActivationHeight: this.asertActivationHeight,
        asertHalfLife: this.asertHalfLife,
        network: this.networkName === "mainnet" ? this.networkName : undefined,
      },
      genesis: this.genesis,
      invalidBlocks: this.getInvalidBlocks(),
      headers: Object.values(this.headerEntries).map((entry) => ({
        hash: entry.hash,
        prev: entry.prev,
        next: [...entry.next],
        bits: entry.bits.toString("hex"),
        time: entry.time,
        buffer: entry.buffer.toString("hex"),
        work: entry.work.toString(),
        chainWork: entry.chainWork?.toString(),
        height: entry.height,
      })),
      chain: { ...this.bestChain },
      unlinked: Object.keys(this.unlinkedEntries),
      tip: { ...this.tip },
      processed: this.processed,
      invalidatedBlock: this.invalidatedBlock,
    };
  }

  private getEntry({ hash, height }: GetHeaderOptions): HeaderEntry | undefined {
    this.process();
    if (hash) return this.headerEntries[normalizeHash(hash)];
    if (height === undefined) throw Error("Missing hash or height");
    const chainHash = this.bestChain[`${height}`];
    return chainHash ? this.headerEntries[chainHash] : undefined;
  }

  private getValidatedTarget(
    hash: string,
    header: bsv.Header
  ): bigint | undefined {
    let target;
    try {
      target = compactToTarget(header.bits);
    } catch (err) {
      this.rejectHeader(hash, `Did not add header with invalid target: ${hash}`);
      return undefined;
    }
    if (target > this.maxTarget) {
      this.rejectHeader(hash, `Did not add header above max target: ${hash}`);
      return undefined;
    }
    if (this.validateProofOfWork && !isValidProofOfWork(hash, target)) {
      this.rejectHeader(
        hash,
        `Did not add header with invalid proof-of-work: ${hash}`
      );
      return undefined;
    }
    return target;
  }

  private validateConnectedHeader(
    entry: HeaderEntry,
    prev: HeaderEntry
  ): boolean {
    const prevHeight = getAncestorHeight(this.headerEntries, prev.hash);
    if (prevHeight === undefined) return true;
    entry.height = prevHeight + 1;
    if (!this.validateDifficulty) return true;

    const expectedBits = this.getExpectedBits(entry, prev);
    if (!entry.bits.equals(expectedBits)) {
      this.rejectHeader(
        entry.hash,
        `Did not add header with unexpected difficulty: ${entry.hash}`
      );
      return false;
    }
    return true;
  }

  private getExpectedBits(entry: HeaderEntry, prev: HeaderEntry): Buffer {
    if (this.difficultyExceptionHashes.has(entry.hash)) {
      return Buffer.from(entry.bits);
    }

    if (this.expectedBits) {
      const expected = this.expectedBits({
        hash: entry.hash,
        header: bsv.Header.fromBuffer(entry.buffer),
        height: entry.height || 0,
        previous: cloneMeta(prev),
        headers: this,
      });
      if (expected) return normalizeBits(expected);
    }

    if (
      this.difficultyAlgorithm === "cash" &&
      entry.height !== undefined &&
      entry.height >= (this.cashForkHeight || CASH_FORK_HEIGHT)
    ) {
      const cashDaaActivationHeight =
        this.cashDaaActivationHeight || CASH_DAA_ACTIVATION_HEIGHT;
      if (
        this.asertActivationHeight !== undefined &&
        entry.height >= this.asertActivationHeight
      ) {
        return this.getAsertExpectedBits(prev);
      }
      if (entry.height >= cashDaaActivationHeight) {
        return this.getCashDaaExpectedBits(prev);
      }
      return this.getEdaExpectedBits(entry, prev);
    }

    return this.getLegacyExpectedBits(entry, prev);
  }

  private getLegacyExpectedBits(entry: HeaderEntry, prev: HeaderEntry): Buffer {
    if (!entry.height || entry.height % this.retargetInterval !== 0) {
      return Buffer.from(prev.bits);
    }

    const firstHeight = entry.height - this.retargetInterval;
    const first = getAncestorAtHeight(
      this.headerEntries,
      prev.hash,
      firstHeight
    );
    if (!first) return Buffer.from(prev.bits);

    let actualTimespan = prev.time - first.time;
    const minTimespan = Math.floor(this.targetTimespan / 4);
    const maxTimespan = this.targetTimespan * 4;
    actualTimespan = Math.max(minTimespan, Math.min(maxTimespan, actualTimespan));

    const previousTarget = compactToTarget(prev.bits);
    let nextTarget =
      (previousTarget * BigInt(actualTimespan)) / BigInt(this.targetTimespan);
    if (nextTarget > this.maxTarget) nextTarget = this.maxTarget;
    return targetToCompact(nextTarget);
  }

  private getEdaExpectedBits(entry: HeaderEntry, prev: HeaderEntry): Buffer {
    if (entry.height && entry.height % this.retargetInterval === 0) {
      return this.getLegacyExpectedBits(entry, prev);
    }

    const powLimitBits = targetToCompact(this.maxTarget);
    if (prev.bits.equals(powLimitBits)) {
      return powLimitBits;
    }

    if (entry.height === undefined) return Buffer.from(prev.bits);
    const ancestor = getAncestorAtHeight(
      this.headerEntries,
      prev.hash,
      entry.height - 7
    );
    if (!ancestor) return Buffer.from(prev.bits);

    const prevMtp = getMedianTimePast(this.headerEntries, prev.hash);
    const ancestorMtp = getMedianTimePast(this.headerEntries, ancestor.hash);
    if (
      prevMtp === undefined ||
      ancestorMtp === undefined ||
      prevMtp - ancestorMtp < 12 * 60 * 60
    ) {
      return Buffer.from(prev.bits);
    }

    let nextTarget = compactToTarget(prev.bits);
    nextTarget += nextTarget >> BigInt(2);
    if (nextTarget > this.maxTarget) nextTarget = this.maxTarget;
    return targetToCompact(nextTarget);
  }

  private getCashDaaExpectedBits(prev: HeaderEntry): Buffer {
    const last = getSuitableBlock(this.headerEntries, prev.hash);
    if (!last || prev.height === undefined) return Buffer.from(prev.bits);

    const firstAncestor = getAncestorAtHeight(
      this.headerEntries,
      prev.hash,
      prev.height - 144
    );
    if (!firstAncestor) return Buffer.from(prev.bits);

    const first = getSuitableBlock(this.headerEntries, firstAncestor.hash);
    if (!first) return Buffer.from(prev.bits);

    let actualTimespan = last.time - first.time;
    const minTimespan = 72 * this.targetSpacing;
    const maxTimespan = 288 * this.targetSpacing;
    actualTimespan = Math.max(minTimespan, Math.min(maxTimespan, actualTimespan));

    const work = getAncestorChainWork(this.headerEntries, last.hash) -
      getAncestorChainWork(this.headerEntries, first.hash);
    if (work <= BigInt(0)) return Buffer.from(prev.bits);

    const projectedWork =
      (work * BigInt(this.targetSpacing)) / BigInt(actualTimespan);
    if (projectedWork <= BigInt(0)) return Buffer.from(prev.bits);

    let nextTarget = (WORK_BASE - projectedWork) / projectedWork;
    if (nextTarget > this.maxTarget) nextTarget = this.maxTarget;
    return targetToCompact(nextTarget);
  }

  private getAsertExpectedBits(prev: HeaderEntry): Buffer {
    if (prev.height === undefined) {
      return Buffer.from(prev.bits);
    }

    const anchor = this.getAsertAnchor(prev);
    if (!anchor) return Buffer.from(prev.bits);

    const timeDelta = BigInt(prev.time - anchor.parentTime);
    const heightDelta = BigInt(prev.height - anchor.height);
    const halfLife = BigInt(this.asertHalfLife || BCH_ASERT_HALF_LIFE);
    const radix = BigInt(1 << 16);
    let exponent =
      ((timeDelta - BigInt(this.targetSpacing) * (heightDelta + BigInt(1))) *
        radix) /
      halfLife;
    let numShifts = exponent >> BigInt(16);
    exponent -= numShifts * radix;

    const factor =
      ((BigInt("195766423245049") * exponent +
        BigInt("971821376") * exponent ** BigInt(2) +
        BigInt("5127") * exponent ** BigInt(3) +
        (BigInt(1) << BigInt(47))) >>
        BigInt(48)) +
      radix;

    numShifts -= BigInt(16);
    let nextTarget = anchor.target * factor;
    if (numShifts <= BigInt(0)) {
      nextTarget >>= -numShifts;
    } else {
      nextTarget <<= numShifts;
    }

    if (nextTarget <= BigInt(0)) return targetToCompact(BigInt(1));
    if (nextTarget > this.maxTarget) nextTarget = this.maxTarget;
    return targetToCompact(nextTarget);
  }

  private getAsertAnchor(prev: HeaderEntry): AsertAnchor | undefined {
    if (
      prev.height === undefined ||
      this.asertActivationHeight === undefined
    ) {
      return undefined;
    }

    const anchorHeight = this.asertActivationHeight - 1;
    if (prev.height < anchorHeight) return undefined;
    if (prev.asertAnchor) return prev.asertAnchor;

    const path: HeaderEntry[] = [];
    const seen = new Set<string>();
    let header: HeaderEntry | undefined = prev;
    let anchor: AsertAnchor | undefined;

    while (header) {
      if (header.asertAnchor) {
        anchor = header.asertAnchor;
        break;
      }
      if (header.height === anchorHeight) {
        const anchorParent = this.headerEntries[header.prev];
        if (!anchorParent) return undefined;
        anchor = {
          height: header.height,
          parentTime: anchorParent.time,
          target: compactToTarget(header.bits),
        };
        header.asertAnchor = anchor;
        break;
      }
      if (
        header.height === undefined ||
        header.height < anchorHeight ||
        seen.has(header.hash)
      ) {
        return undefined;
      }
      seen.add(header.hash);
      path.push(header);
      header = this.headerEntries[header.prev];
    }

    if (!anchor) return undefined;
    for (const entry of path) {
      entry.asertAnchor = anchor;
    }
    return anchor;
  }

  private deleteHeaderTree(entry: HeaderEntry): void {
    const hashes = getDescendantHashes(this.headerEntries, entry.hash);
    for (const hash of hashes) {
      delete this.headerEntries[hash];
      delete this.unlinkedEntries[hash];
    }
    const prev = this.headerEntries[entry.prev];
    if (prev) {
      prev.next = prev.next.filter((hash) => hash !== entry.hash);
    }
  }

  private rejectHeader(hash: string, message: string): void {
    this.invalidBlockHashes.add(hash);
    this.log("warn", message);
  }

  private log(level: "debug" | "warn", message: string): void {
    const logger = this.logger;
    if (!logger) return;
    if (level === "warn" && logger.warn) {
      logger.warn(message);
    } else if (level === "debug" && logger.debug) {
      logger.debug(message);
    }
  }
}
