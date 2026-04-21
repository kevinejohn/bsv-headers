[**bsv-headers**](../README.md)

***

[bsv-headers](../README.md) / SerializedHeaders

# Interface: SerializedHeaders

Defined in: [index.ts:86](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L86)

## Properties

### chain

> **chain**: `Record`\<`string`, `string`\>

Defined in: [index.ts:102](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L102)

***

### genesis

> **genesis**: `string`

Defined in: [index.ts:99](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L99)

***

### headers

> **headers**: [`SerializedHeaderEntry`](SerializedHeaderEntry.md)[]

Defined in: [index.ts:101](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L101)

***

### invalidatedBlock

> **invalidatedBlock**: `boolean`

Defined in: [index.ts:106](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L106)

***

### invalidBlocks

> **invalidBlocks**: `string`[]

Defined in: [index.ts:100](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L100)

***

### options

> **options**: `object`

Defined in: [index.ts:88](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L88)

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

Defined in: [index.ts:105](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L105)

***

### tip

> **tip**: `object`

Defined in: [index.ts:104](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L104)

#### hash

> **hash**: `string`

#### height

> **height**: `number`

***

### unlinked

> **unlinked**: `string`[]

Defined in: [index.ts:103](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L103)

***

### version

> **version**: `1`

Defined in: [index.ts:87](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L87)
