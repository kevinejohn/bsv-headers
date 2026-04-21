# bsv-headers

[![NPM Package](https://img.shields.io/npm/v/bsv-headers.svg?style=flat-square)](https://www.npmjs.org/package/bsv-headers)

Determine the best-work bitcoin header chain and query block order

## Note

You must use node.js v18+

## Install

```sh
npm i bsv-headers
```

## Docs

- [View TypeScript documentation here](docs/README.md)

## Use

```js
const BsvHeaders = require("bsv-headers").default;

const headers = new BsvHeaders({
  genesisHeader: "<Buffer or hex string of genesis header>",
  invalidBlocks: [],
  maxReorgDepth: 1000, // How far back to recalculate the best-work chain. Set to 0 to always recalculate from genesis (slower)
  validateProofOfWork: true, // Reject headers whose hash does not satisfy their compact target
  validateDifficulty: true, // Reject headers whose bits do not match the active network rules
  network: "mainnet", // Or "BTC", "BCH", "BSV", or a custom network config
  maxTarget: undefined, // Optional maximum target. Defaults to the genesis header target
  logger: undefined, // Optional { debug, warn } callbacks. Quiet by default
});

// const buf = Buffer.from(/* <an 80 byte bitcoin block header> */)
// headers.addHeader({ buf, /* hash: <Optional: 32 byte buffer or 64 char hex string matching buf. Used for performance> */ })
// // ...
// // Add all block headers
// // ...
// headers.addHeader({ buf, /* hash: <Optional: 32 byte buffer or 64 char hex string matching buf. Used for performance> */ })

const tip = headers.getTip();
console.log(`Chain tip: ${tip.height} ${tip.hash}`);

const hash = headers.getHash(0);
console.log(`Block 0 hash: ${hash}`);

const header1 = headers.getHeader({ height: 1 });
const header2 = headers.getHeader({
  hash: "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
});
console.log(header1, header2);

const height = headers.getHeight(
  "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f"
);
console.log(
  `Block 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f height: ${height}`
);

headers.invalidateBlock(
  "00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048"
);
console.log(headers.getTip());

const snapshot = headers.toJSON();
const restored = BsvHeaders.fromJSON(snapshot);
console.log(restored.getTip());
```

## Network rules

By default, `bsv-headers` uses legacy mainnet-style difficulty retargeting. Built-in ticker networks adjust the expected difficulty rules for their known fork eras:

- proof-of-work must satisfy the compact target in each header
- compact targets may not exceed `maxTarget`
- `BTC` uses legacy Bitcoin retargeting
- `BCH` and `BSV` use legacy retargeting before the BCH split, BCH Emergency Difficulty Adjustment from height 478559, and CW-144 from the Nov 2017 DAA activation
- configured fork blocks skip only the expected-`bits` comparison:
  - `BTC`: `00000000000000000019f112ec0a9982926f1258cdcc558dd7c3b7e5dc7fa148`
  - `BCH`: `000000000000000000651ef99cb9fcbe0dadde1d424bd9f15ff20136191a5eec`, `0000000000000000004626ff6e3b936941d341c5932ece4357eeccac44e6d56c`
  - `BSV`: `000000000000000000651ef99cb9fcbe0dadde1d424bd9f15ff20136191a5eec`, `000000000000000001d956714215d96ffc00e0afda4cd0a96c96f8d802b1662b`

For chains or eras with different rules, pass a custom network config, `difficultyExceptionHashes`, or a `getExpectedBits` callback. The callback receives the candidate header, height, previous header metadata, and the `Headers` instance, and should return the expected compact bits as a 4-byte buffer or hex string.

## Public state

Internal chain indexes are private. Use `getHeader`, `getHeaderBuffer`, `getHeaderMeta`, `getChildren`, `getChainWork`, `getInvalidBlocks`, `hasHeader`, `toJSON`, and `fromJSON` instead of mutating internal state.

## Security boundaries

This package validates header hashes, proof-of-work, best-work selection, and configured difficulty rules. It is still a header manager, not a full node: callers are responsible for choosing the right network rules, persisting trusted snapshots appropriately, validating block contents, and handling peer/network policy.

## Tests

`npm test`

## Future features

- Built-in network configs for additional BSV eras and test networks
