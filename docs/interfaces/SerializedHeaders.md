[**bsv-headers**](../README.md)

***

[bsv-headers](../README.md) / SerializedHeaders

# Interface: SerializedHeaders

Defined in: [index.ts:110](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L110)

## Properties

### chain

> **chain**: `Record`\<`string`, `string`\>

Defined in: [index.ts:130](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L130)

***

### genesis

> **genesis**: `string`

Defined in: [index.ts:127](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L127)

***

### headers

> **headers**: [`SerializedHeaderEntry`](SerializedHeaderEntry.md)[]

Defined in: [index.ts:129](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L129)

***

### invalidatedBlock

> **invalidatedBlock**: `boolean`

Defined in: [index.ts:134](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L134)

***

### invalidBlocks

> **invalidBlocks**: `string`[]

Defined in: [index.ts:128](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L128)

***

### options

> **options**: `object`

Defined in: [index.ts:112](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L112)

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

Defined in: [index.ts:133](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L133)

***

### tip

> **tip**: `object`

Defined in: [index.ts:132](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L132)

#### hash

> **hash**: `string`

#### height

> **height**: `number`

***

### unlinked

> **unlinked**: `string`[]

Defined in: [index.ts:131](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L131)

***

### version

> **version**: `1`

Defined in: [index.ts:111](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L111)
