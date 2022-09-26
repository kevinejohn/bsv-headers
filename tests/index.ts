import Headers from "../src";
import assert from "assert";
import * as bsv from "bsv-minimal";

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

const headers = new Headers();
console.log(headers.getFromHeaderArray());
assert.equal(headers.getTip().height, 0);

for (let i = 0; i < headerHexs.length; i++) {
  const buf = Buffer.from(headerHexs[i], "hex");
  headers.addHeader({ buf });
  const processed = headers.process();
  if (i === 0) {
    assert.equal(processed, undefined); // Already added in new Headers()
  } else {
    assert.equal(processed && processed.height, i - 1);
  }

  assert.equal(headers.getTip().height, i);
  console.log(`Tip: ${i}`);
}

console.log(headers.getFromHeaderArray());

for (let i = 0; i < headerHexs.length; i++) {
  const hash = headers.getHash(i);
  const buf = Buffer.from(headerHexs[i], "hex");
  const header = bsv.Header.fromBuffer(buf);

  assert.equal(hash, header.getHash(true));
  // console.log(`${i}: ${header.getHash().reverse().toString("hex")}`);
  console.log(`${i} ${header.getHash(true)}`);
}

const prevTip = headers.getTip();
for (let i = 0; i < headerReorg.length; i++) {
  const buf = Buffer.from(headerReorg[i], "hex");
  const header = bsv.Header.fromBuffer(buf);
  headers.addHeader({ header });
  // console.log(`Reorg ${i} ${header.getHash().reverse().toString("hex")}`);
  console.log(`${i} ${header.getHash(true)}`);
}
const lastTip = headers.process();
assert(lastTip);
const currentTip = headers.getTip();
assert.equal(prevTip.height, 9);
assert.equal(lastTip.height, 7); // Re-org after height 7
assert.equal(
  lastTip.hash,
  "0000000071966c2b1d065fd446b1e485b2c9d9594acd2007ccbd5441cfc89444"
); // Re-org after height 7
assert.equal(currentTip.height, 10);
assert.equal(
  currentTip.hash,
  "2b14928f3d59cb1e4185f38f54ad9b9af627432c9f1f055f33d60340aa145565"
);

assert.equal(headers.getHeight(), 10);
for (let i = 0; i <= headers.getHeight(); i++) {
  const hash = headers.getHash(i);
  let header;
  if (i <= 7) {
    header = bsv.Header.fromBuffer(Buffer.from(headerHexs[i], "hex"));
  } else {
    header = bsv.Header.fromBuffer(Buffer.from(headerReorg[i - 8], "hex"));
  }
  console.log(`Check: ${i} ${hash}: ${header.getHash(true)}`);
  assert.equal(hash, header.getHash(true));
}

headers.invalidateBlock(
  "cc251fcf382fe27a4bcc00635a7a5ef06f3a6453e3372c945197f4a91b6766ad"
);
assert.equal(headers.getHeight(), 9);
for (let i = 0; i <= headers.getHeight(); i++) {
  const hash = headers.getHash(i);
  let header = bsv.Header.fromBuffer(Buffer.from(headerHexs[i], "hex"));
  console.log(`Check: ${i} ${hash}: ${header.getHash(true)}`);
  assert.equal(hash, header.getHash(true));
}

headers.invalidateBlock(
  "0000000071966c2b1d065fd446b1e485b2c9d9594acd2007ccbd5441cfc89444"
);
assert.equal(headers.getHeight(), 6);
for (let i = 0; i <= headers.getHeight(); i++) {
  const hash = headers.getHash(i);
  let header = bsv.Header.fromBuffer(Buffer.from(headerHexs[i], "hex"));
  console.log(`Check: ${i} ${hash}: ${header.getHash(true)}`);
  assert.equal(hash, header.getHash(true));
}

console.log(`Tests passed`);
