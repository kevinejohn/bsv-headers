[**bsv-headers**](../README.md)

***

[bsv-headers](../README.md) / HeadersOptions

# Interface: HeadersOptions

Defined in: [index.ts:67](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L67)

## Properties

### cashDaaActivationHeight?

> `optional` **cashDaaActivationHeight?**: `number`

Defined in: [index.ts:76](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L76)

***

### cashForkHeight?

> `optional` **cashForkHeight?**: `number`

Defined in: [index.ts:75](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L75)

***

### difficultyAlgorithm?

> `optional` **difficultyAlgorithm?**: [`DifficultyAlgorithm`](../type-aliases/DifficultyAlgorithm.md)

Defined in: [index.ts:74](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L74)

***

### difficultyExceptionHashes?

> `optional` **difficultyExceptionHashes?**: (`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

Defined in: [index.ts:73](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L73)

***

### genesisHeader?

> `optional` **genesisHeader?**: `string` \| `Header` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [index.ts:68](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L68)

***

### getExpectedBits?

> `optional` **getExpectedBits?**: [`ExpectedBitsFn`](../type-aliases/ExpectedBitsFn.md)

Defined in: [index.ts:82](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L82)

***

### invalidBlocks?

> `optional` **invalidBlocks?**: `string`[]

Defined in: [index.ts:69](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L69)

***

### logger?

> `optional` **logger?**: `false` \| [`HeadersLogger`](HeadersLogger.md) \| `null`

Defined in: [index.ts:83](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L83)

***

### maxReorgDepth?

> `optional` **maxReorgDepth?**: `number`

Defined in: [index.ts:70](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L70)

***

### maxTarget?

> `optional` **maxTarget?**: `string` \| `bigint` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [index.ts:71](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L71)

***

### network?

> `optional` **network?**: [`NetworkName`](../type-aliases/NetworkName.md) \| [`NetworkOptions`](NetworkOptions.md)

Defined in: [index.ts:72](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L72)

***

### retargetInterval?

> `optional` **retargetInterval?**: `number`

Defined in: [index.ts:78](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L78)

***

### targetSpacing?

> `optional` **targetSpacing?**: `number`

Defined in: [index.ts:77](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L77)

***

### targetTimespan?

> `optional` **targetTimespan?**: `number`

Defined in: [index.ts:79](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L79)

***

### validateDifficulty?

> `optional` **validateDifficulty?**: `boolean`

Defined in: [index.ts:80](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L80)

***

### validateProofOfWork?

> `optional` **validateProofOfWork?**: `boolean`

Defined in: [index.ts:81](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L81)
