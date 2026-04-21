import Headers from "../src";
import assert from "assert";
import * as bsv from "bsv-minimal";

type TestFn = () => void;
const tests: { name: string; fn: TestFn }[] = [];

function test(name: string, fn: TestFn) {
  tests.push({ name, fn });
}

const headerHexs = [
  "0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab5f49ffff001d1dac2b7c", // 0 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
  "010000006fe28c0ab6f1b372c1a6a246ae63f74f931e8365e15a089c68d6190000000000982051fd1e4ba744bbbe680e1fee14677ba1a3c3540bf7b1cdb606e857233e0e61bc6649ffff001d01e36299", // 1 00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048
  "010000004860eb18bf1b1620e37e9490fc8a427514416fd75159ab86688e9a8300000000d5fdcc541e25de1c7a5addedf24858b8bb665c9f36ef744ee42c316022c90f9bb0bc6649ffff001d08d2bd61", // 2 000000006a625f06636b8bb6ac7b960a8d03705d1ace08b1a19da3fdcc99ddbd
  "01000000bddd99ccfda39da1b108ce1a5d70038d0a967bacb68b6b63065f626a0000000044f672226090d85db9a9f2fbfe5f0f9609b387af7be5b7fbb7a1767c831c9e995dbe6649ffff001d05e0ed6d", // 3 0000000082b5015589a3fdf2d4baff403e6f0be035a5d9742c1cae6295464449
  "010000004944469562ae1c2c74d9a535e00b6f3e40ffbad4f2fda3895501b582000000007a06ea98cd40ba2e3288262b28638cec5337c1456aaf5eedc8e9e5a20f062bdf8cc16649ffff001d2bfee0a9", // 4 000000004ebadb55ee9096c9a2f8880e09da59c0d68b1c228da88e48844a1485
  "0100000085144a84488ea88d221c8bd6c059da090e88f8a2c99690ee55dbba4e00000000e11c48fecdd9e72510ca84f023370c9a38bf91ac5cae88019bee94d24528526344c36649ffff001d1d03e477", // 5 000000009b7262315dbf071787ad3656097b892abffd1f95a1a022f896f533fc
  "01000000fc33f596f822a0a1951ffdbf2a897b095636ad871707bf5d3162729b00000000379dfb96a5ea8c81700ea4ac6b97ae9a9312b2d4301a29580e924ee6761a2520adc46649ffff001d189c4c97", // 6 000000003031a0e73735690c5a1ff2a4be82553b2a12b776fbd3a215dc8f778d
  "010000008d778fdc15a2d3fb76b7122a3b5582bea4f21f5a0c693537e7a03130000000003f674005103b42f984169c7d008370967e91920a6a5d64fd51282f75bc73a68af1c66649ffff001d39a59c86", // 7 0000000071966c2b1d065fd446b1e485b2c9d9594acd2007ccbd5441cfc89444
  "010000004494c8cf4154bdcc0720cd4a59d9c9b285e4b146d45f061d2b6c967100000000e3855ed886605b6d4a99d5fa2ef2e9b0b164e63df3c4136bebf2d0dac0f1f7a667c86649ffff001d1c4b5666", // 8 00000000408c48f847aa786c2268fc3e6ec2af68e8468a34a28c61b7f1de0dc6
  "01000000c60ddef1b7618ca2348a46e868afc26e3efc68226c78aa47f8488c4000000000c997a5e56e104102fa209c6a852dd90660a20b2d9c352423edce25857fcd37047fca6649ffff001d28404f53", // 9 000000008d9dc510f23c2657fc4f67bea30078cc05a90eb89e84cc475c080805
];

const headerReorg = [
  "010000004494c8cf4154bdcc0720cd4a59d9c9b285e4b146d45f061d2b6c967100000000c997a5e56e104102fa209c6a852dd90660a20b2d9c352423edce25857fcd37047fca6649ffff001d28404f53", // 8 cc251fcf382fe27a4bcc00635a7a5ef06f3a6453e3372c945197f4a91b6766ad. Fake header for testing. No PoW
  "01000000ad66671ba9f49751942c37e353643a6ff05e7a5a6300cc4b7ae22f38cf1f25ccc997a5e56e104102fa209c6a852dd90660a20b2d9c352423edce25857fcd37047fca6649ffff001d28404f53", // 9 5ee058e695f267fd89e7e3bc211624889af395c62244f1a680821b7c721d4340. Fake header for testing. No PoW
  "0100000040431d727c1b8280a6f14422c695f39a88241621bce3e789fd67f295e658e05ec997a5e56e104102fa209c6a852dd90660a20b2d9c352423edce25857fcd37047fca6649ffff001d28404f53", // 10 2b14928f3d59cb1e4185f38f54ad9b9af627432c9f1f055f33d60340aa145565. Fake header for testing. No PoW
];

function getHeaderHash(headerHex: string): string {
  return bsv.Header.fromBuffer(Buffer.from(headerHex, "hex")).getHash(true);
}

function replaceBits(headerHex: string, rawBitsHex: string): string {
  const buf = Buffer.from(headerHex, "hex");
  Buffer.from(rawBitsHex, "hex").copy(buf, 72);
  return buf.toString("hex");
}

function replacePrevHash(headerHex: string, prevHash: string): string {
  const buf = Buffer.from(headerHex, "hex");
  Buffer.from(prevHash, "hex").reverse().copy(buf, 4);
  return buf.toString("hex");
}

function syntheticHash(index: number): string {
  return index.toString(16).padStart(64, "0");
}

function syntheticHeader(
  hash: string,
  prevHash: string,
  index: number,
  bitsHex = "1d00ffff"
): bsv.Header {
  const buf = Buffer.from(headerHexs[0], "hex");
  Buffer.from(prevHash, "hex").reverse().copy(buf, 4);
  buf.writeUInt32LE(1231006505 + index, 68);
  Buffer.from(bitsHex, "hex").reverse().copy(buf, 72);
  buf.writeUInt32LE(index, 76);
  return {
    prevHash: Buffer.from(prevHash, "hex"),
    bits: Buffer.from(bitsHex, "hex"),
    time: 1231006505 + index,
    toBuffer: () => Buffer.from(buf),
    getHash: (hexStr?: boolean) =>
      hexStr ? hash : Buffer.from(hash, "hex"),
  } as unknown as bsv.Header;
}

function buildHeadersWithMainChain(): Headers {
  const headers = new Headers();
  for (const headerHex of headerHexs) {
    headers.addHeader({ buf: Buffer.from(headerHex, "hex") });
  }
  return headers;
}

function buildHeadersWithReorg(): Headers {
  const headers = new Headers({ validateProofOfWork: false });
  for (const headerHex of headerHexs) {
    headers.addHeader({ buf: Buffer.from(headerHex, "hex") });
  }
  for (const headerHex of headerReorg) {
    headers.addHeader({ buf: Buffer.from(headerHex, "hex") });
  }
  headers.process();
  return headers;
}

test("tracks the main chain with proof-of-work validation enabled", () => {
  const headers = buildHeadersWithMainChain();
  assert.equal(headers.getTip().height, 9);
  for (let i = 0; i < headerHexs.length; i++) {
    assert.equal(headers.getHash(i), getHeaderHash(headerHexs[i]));
  }
});

test("reorganizes to a longer synthetic branch when PoW validation is disabled", () => {
  const headers = buildHeadersWithReorg();
  assert.equal(headers.getTip().height, 10);
  assert.equal(headers.getHash(8), getHeaderHash(headerReorg[0]));
  assert.equal(headers.getHash(10), getHeaderHash(headerReorg[2]));
});

test("invalidates active branches and falls back to surviving work", () => {
  const headers = buildHeadersWithReorg();
  headers.invalidateBlock(getHeaderHash(headerReorg[0]));
  assert.equal(headers.getHeight(), 9);
  assert.equal(headers.getHash(9), getHeaderHash(headerHexs[9]));

  headers.invalidateBlock(getHeaderHash(headerHexs[7]));
  assert.equal(headers.getHeight(), 6);
  assert.equal(headers.getHash(6), getHeaderHash(headerHexs[6]));
});

test("rejects mismatched caller-supplied hashes", () => {
  const headers = new Headers();
  assert.throws(
    () =>
      headers.addHeader({
        buf: Buffer.from(headerHexs[1], "hex"),
        hash: "11".repeat(32),
      }),
    /Header hash mismatch/
  );

  const validHeaderHash = getHeaderHash(headerHexs[1]);
  assert.equal(
    headers.addHeader({
      buf: Buffer.from(headerHexs[1], "hex"),
      hash: validHeaderHash.toUpperCase(),
    }),
    true
  );
  assert.equal(headers.getHash(1), validHeaderHash);
});

test("rejects invalid proof-of-work and too-easy targets by default", () => {
  const warnings: string[] = [];
  const headers = new Headers({ logger: { warn: (message) => warnings.push(message) } });
  for (let i = 1; i <= 7; i++) {
    headers.addHeader({ buf: Buffer.from(headerHexs[i], "hex") });
  }

  const invalidProofOfWorkHash = getHeaderHash(headerReorg[0]);
  assert.equal(
    headers.addHeader({ buf: Buffer.from(headerReorg[0], "hex") }),
    false
  );
  assert(headers.getInvalidBlocks().includes(invalidProofOfWorkHash));

  const highTargetHeaderHex = replaceBits(headerHexs[1], "ffff001e");
  const highTargetHash = getHeaderHash(highTargetHeaderHex);
  assert.equal(
    headers.addHeader({ buf: Buffer.from(highTargetHeaderHex, "hex") }),
    false
  );
  assert(headers.getInvalidBlocks().includes(highTargetHash));
  assert(warnings.length >= 2);
});

test("validates expected difficulty unless a network rule hook overrides it", () => {
  const highWorkHeaderHex = replaceBits(headerHexs[1], "ffff001c");
  const rejected = new Headers({ validateProofOfWork: false });
  assert.equal(
    rejected.addHeader({ buf: Buffer.from(highWorkHeaderHex, "hex") }),
    false
  );

  const accepted = new Headers({
    validateProofOfWork: false,
    getExpectedBits: ({ height }) => (height === 1 ? "1c00ffff" : undefined),
  });
  assert.equal(
    accepted.addHeader({ buf: Buffer.from(highWorkHeaderHex, "hex") }),
    true
  );
});

test("ignores difficulty mismatch for the BCH/BSV fork block", () => {
  const forkHash =
    "000000000000000000651ef99cb9fcbe0dadde1d424bd9f15ff20136191a5eec";
  const genesisHash = getHeaderHash(headerHexs[0]);
  const rejected = new Headers({ validateProofOfWork: false });
  assert.equal(
    rejected.addHeader({
      header: syntheticHeader(syntheticHash(100), genesisHash, 100, "1c00ffff"),
    }),
    false
  );

  const accepted = new Headers({ validateProofOfWork: false });
  assert.equal(
    accepted.addHeader({
      header: syntheticHeader(forkHash, genesisHash, 100, "1c00ffff"),
    }),
    true
  );
  assert.equal(accepted.getHash(1), forkHash);
});

test("selects accumulated work over height", () => {
  const headers = new Headers({
    validateDifficulty: false,
    validateProofOfWork: false,
  });
  for (const headerHex of headerHexs) {
    headers.addHeader({ buf: Buffer.from(headerHex, "hex") });
  }

  const highWorkHeaderHex = replaceBits(headerHexs[1], "ffff001c");
  const highWorkHash = getHeaderHash(highWorkHeaderHex);
  assert.equal(
    headers.addHeader({ buf: Buffer.from(highWorkHeaderHex, "hex") }),
    true
  );
  assert.equal(headers.getTip().height, 1);
  assert.equal(headers.getTip().hash, highWorkHash);
  assert.equal(headers.getHash(1), highWorkHash);
  assert.throws(() => headers.getHash(2), /No hash/);
});

test("remembers invalidations before the header is seen", () => {
  const headers = new Headers();
  const futureInvalidHash = getHeaderHash(headerHexs[1]);
  headers.invalidateBlock(futureInvalidHash);
  assert.equal(
    headers.addHeader({ buf: Buffer.from(headerHexs[1], "hex") }),
    false
  );
  assert.equal(headers.getHeight(), 0);
});

test("removes side-branch descendants after invalidating their parent", () => {
  const headers = buildHeadersWithReorg();
  const oldBranchHash = getHeaderHash(headerHexs[8]);
  const oldBranchTipHash = getHeaderHash(headerHexs[9]);
  assert.equal(headers.getHeight(oldBranchTipHash), 9);
  headers.invalidateBlock(oldBranchHash);
  assert.throws(() => headers.getHeight(oldBranchTipHash), /No height/);
  assert.equal(headers.getHeight(), 10);
});

test("removes descendants when a deferred parent fails validation", () => {
  const invalidParent = replaceBits(headerHexs[2], "ffff001c");
  const invalidParentHash = getHeaderHash(invalidParent);
  const descendant = replacePrevHash(headerHexs[3], invalidParentHash);
  const descendantHash = getHeaderHash(descendant);
  const headers = new Headers({ validateProofOfWork: false });

  assert.equal(headers.addHeader({ buf: Buffer.from(invalidParent, "hex") }), false);
  assert.equal(headers.addHeader({ buf: Buffer.from(descendant, "hex") }), true);
  assert.equal(headers.hasHeader(invalidParentHash), true);
  assert.equal(headers.hasHeader(descendantHash), true);

  assert.equal(headers.addHeader({ buf: Buffer.from(headerHexs[1], "hex") }), true);
  headers.process();
  assert.equal(headers.hasHeader(invalidParentHash), false);
  assert.equal(headers.hasHeader(descendantHash), false);
});

test("processes deep unlinked chains without overflowing the call stack", () => {
  const count = 15000;
  const headers = new Headers({
    validateProofOfWork: false,
    getExpectedBits: () => "1d00ffff",
  });
  const genesisHash = getHeaderHash(headerHexs[0]);
  for (let i = count; i >= 1; i--) {
    const hash = syntheticHash(i);
    const prevHash = i === 1 ? genesisHash : syntheticHash(i - 1);
    headers.addHeader({ header: syntheticHeader(hash, prevHash, i) });
  }

  assert.equal(headers.getHeight(), count);
  assert.equal(headers.getHash(count), syntheticHash(count));
});

test("exposes read-only header lookups and metadata", () => {
  const headers = buildHeadersWithMainChain();
  const hash = getHeaderHash(headerHexs[1]);
  assert.equal(headers.hasHeader(hash), true);
  assert.equal(headers.getHeader({ hash })?.getHash(true), hash);
  assert.equal(headers.getHeader({ height: 1 })?.getHash(true), hash);
  assert.equal(headers.getHeaderBuffer({ height: 1 })?.toString("hex"), headerHexs[1]);
  assert.equal(headers.getHeaderMeta(hash)?.hash, hash);
  assert.equal(headers.getChildren(getHeaderHash(headerHexs[0]))[0], hash);
  assert(headers.getChainWork(hash) > BigInt(0));
  assert(headers.getChainWork() >= headers.getChainWork(hash));
});

test("serializes and restores header state", () => {
  const headers = buildHeadersWithReorg();
  const restored = Headers.fromJSON(headers.toJSON(), {
    validateProofOfWork: false,
  });
  assert.equal(restored.getTip().height, headers.getTip().height);
  assert.equal(restored.getTip().hash, headers.getTip().hash);
  assert.equal(restored.getHash(10), headers.getHash(10));
  assert.equal(restored.getChainWork().toString(), headers.getChainWork().toString());
});

test("rejects tampered serialized headers", () => {
  const headers = buildHeadersWithMainChain();
  const snapshot = headers.toJSON();
  const entry = snapshot.headers.find((header) => header.height === 1);
  assert(entry);
  entry.hash = "22".repeat(32);
  assert.throws(() => Headers.fromJSON(snapshot), /Serialized header hash mismatch/);
});

let failures = 0;
for (const { name, fn } of tests) {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (err) {
    failures++;
    console.error(`not ok - ${name}`);
    console.error(err);
  }
}

if (failures > 0) {
  process.exitCode = 1;
} else {
  console.log(`${tests.length} tests passed`);
}
