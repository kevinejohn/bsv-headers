# bsv-headers

[![NPM Package](https://img.shields.io/npm/v/bsv-headers.svg?style=flat-square)](https://www.npmjs.org/package/bsv-headers)

Determine longest bitcoin chain and query block order

## Note

You must use node.js v12+

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
  maxReorgDepth: 1000, // How far back to recalculate longest chain after adding new block headers. Set to 0 to always recalculate from genesis (slower)
});

// const buf = Buffer.from(/* <an 80 byte bitcoin block header> */)
// headers.addHeader({ buf, /* hash: <Optional: 32 byte buffer or 64 char string hex string of buf block hash. Used for performance> */ })
// // ...
// // Add all block headers
// // ...
// headers.addHeader({ buf, /* hash: <Optional: 32 byte buffer or 64 char string hex string of buf block hash. Used for performance> */ })

const tip = headers.getTip();
console.log(`Chain tip: ${tip.height} ${tip.hash}`);

const hash = headers.getHash(0);
console.log(`Block 0 hash: ${hash}`);

const height = headers.getHeight(
  "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f"
);
console.log(
  `Block 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f height: ${height}`
);

const header1 = headers.getHeader({
  hash: "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
});
const header2 = headers.getHeader({ height: 0 });
console.log(header1, header2);

headers.invalidateBlock(
  "00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048"
);
console.log(headers.getTip());
```

## Tests

`npm test`

## Future features

- Validate block difficulty
