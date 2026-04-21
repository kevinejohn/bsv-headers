[**bsv-headers**](../README.md)

***

[bsv-headers](../README.md) / SerializedHeaders

# Interface: SerializedHeaders

Defined in: [index.ts:114](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L114)

## Properties

### chain

> **chain**: `Record`\<`string`, `string`\>

Defined in: [index.ts:136](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L136)

***

### genesis

> **genesis**: `string`

Defined in: [index.ts:133](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L133)

***

### headers

> **headers**: [`SerializedHeaderEntry`](SerializedHeaderEntry.md)[]

Defined in: [index.ts:135](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L135)

***

### invalidatedBlock

> **invalidatedBlock**: `boolean`

Defined in: [index.ts:140](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L140)

***

### invalidBlocks

> **invalidBlocks**: `string`[]

Defined in: [index.ts:134](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L134)

***

### options

> **options**: `object`

Defined in: [index.ts:116](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L116)

#### asertActivationHeight?

> `optional` **asertActivationHeight?**: `number`

#### asertHalfLife?

> `optional` **asertHalfLife?**: `number`

#### cashDaaActivationHeight?

> `optional` **cashDaaActivationHeight?**: `number`

#### cashForkHeight?

> `optional` **cashForkHeight?**: `number`

#### difficultyAlgorithm

> **difficultyAlgorithm**: [`DifficultyAlgorithm`](../type-aliases/DifficultyAlgorithm.md)

#### difficultyExceptionHashes

> **difficultyExceptionHashes**: `string`[]

#### genesisHeader

> **genesisHeader**: `string`

#### maxReorgDepth

> **maxReorgDepth**: `number`

#### maxTarget

> **maxTarget**: `string`

#### network?

> `optional` **network?**: `string`

#### retargetInterval

> **retargetInterval**: `number`

#### targetSpacing

> **targetSpacing**: `number`

#### targetTimespan

> **targetTimespan**: `number`

#### validateDifficulty

> **validateDifficulty**: `boolean`

#### validateProofOfWork

> **validateProofOfWork**: `boolean`

***

### processed

> **processed**: `boolean`

Defined in: [index.ts:139](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L139)

***

### tip

> **tip**: `object`

Defined in: [index.ts:138](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L138)

#### hash

> **hash**: `string`

#### height

> **height**: `number`

***

### unlinked

> **unlinked**: `string`[]

Defined in: [index.ts:137](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L137)

***

### version

> **version**: `1`

Defined in: [index.ts:115](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L115)
