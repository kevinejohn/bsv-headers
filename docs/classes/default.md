[bsv-headers](../README.md) / default

# Class: default

## Table of contents

### Constructors

- [constructor](default.md#constructor)

### Properties

- [chain](default.md#chain)
- [genesis](default.md#genesis)
- [genesisHeader](default.md#genesisheader)
- [headers](default.md#headers)
- [invalidBlocks](default.md#invalidblocks)
- [invalidatedBlock](default.md#invalidatedblock)
- [maxReorgDepth](default.md#maxreorgdepth)
- [processed](default.md#processed)
- [tip](default.md#tip)
- [unlinked](default.md#unlinked)

### Methods

- [addHeader](default.md#addheader)
- [getFromHeaderArray](default.md#getfromheaderarray)
- [getHash](default.md#gethash)
- [getHeight](default.md#getheight)
- [getTip](default.md#gettip)
- [invalidateBlock](default.md#invalidateblock)
- [process](default.md#process)

## Constructors

### constructor

• **new default**(`opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`HeadersOptions`](../interfaces/HeadersOptions.md) |

#### Defined in

[index.ts:40](https://github.com/andrewrjohn/bsv-headers/blob/master/src/index.ts#L40)

## Properties

### chain

• **chain**: `Record`<`string`, `string`\>

#### Defined in

[index.ts:32](https://github.com/andrewrjohn/bsv-headers/blob/master/src/index.ts#L32)

___

### genesis

• **genesis**: `string`

#### Defined in

[index.ts:36](https://github.com/andrewrjohn/bsv-headers/blob/master/src/index.ts#L36)

___

### genesisHeader

• **genesisHeader**: `default`

#### Defined in

[index.ts:37](https://github.com/andrewrjohn/bsv-headers/blob/master/src/index.ts#L37)

___

### headers

• **headers**: `Record`<`string`, { `hash`: `string` ; `height?`: `number` ; `next`: `string`[] ; `prev`: `string`  }\>

#### Defined in

[index.ts:28](https://github.com/andrewrjohn/bsv-headers/blob/master/src/index.ts#L28)

___

### invalidBlocks

• **invalidBlocks**: `Set`<`string`\>

#### Defined in

[index.ts:26](https://github.com/andrewrjohn/bsv-headers/blob/master/src/index.ts#L26)

___

### invalidatedBlock

• **invalidatedBlock**: `boolean`

#### Defined in

[index.ts:35](https://github.com/andrewrjohn/bsv-headers/blob/master/src/index.ts#L35)

___

### maxReorgDepth

• **maxReorgDepth**: `number`

#### Defined in

[index.ts:27](https://github.com/andrewrjohn/bsv-headers/blob/master/src/index.ts#L27)

___

### processed

• **processed**: `boolean`

#### Defined in

[index.ts:34](https://github.com/andrewrjohn/bsv-headers/blob/master/src/index.ts#L34)

___

### tip

• **tip**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hash` | `string` |
| `height` | `number` |

#### Defined in

[index.ts:38](https://github.com/andrewrjohn/bsv-headers/blob/master/src/index.ts#L38)

___

### unlinked

• **unlinked**: `Record`<`string`, { `hash`: `string` ; `next`: `string`[] ; `prev`: `string`  }\>

#### Defined in

[index.ts:33](https://github.com/andrewrjohn/bsv-headers/blob/master/src/index.ts#L33)

## Methods

### addHeader

▸ **addHeader**(`__namedParameters`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`AddHeaderOptions`](../interfaces/AddHeaderOptions.md) |

#### Returns

`boolean`

#### Defined in

[index.ts:67](https://github.com/andrewrjohn/bsv-headers/blob/master/src/index.ts#L67)

___

### getFromHeaderArray

▸ **getFromHeaderArray**(): `string`[]

#### Returns

`string`[]

#### Defined in

[index.ts:210](https://github.com/andrewrjohn/bsv-headers/blob/master/src/index.ts#L210)

___

### getHash

▸ **getHash**(`height`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `height` | `number` |

#### Returns

`string`

#### Defined in

[index.ts:198](https://github.com/andrewrjohn/bsv-headers/blob/master/src/index.ts#L198)

___

### getHeight

▸ **getHeight**(`hash?`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash?` | `string` \| `Buffer` |

#### Returns

`number`

#### Defined in

[index.ts:185](https://github.com/andrewrjohn/bsv-headers/blob/master/src/index.ts#L185)

___

### getTip

▸ **getTip**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `hash` | `string` |
| `height` | `number` |

#### Defined in

[index.ts:205](https://github.com/andrewrjohn/bsv-headers/blob/master/src/index.ts#L205)

___

### invalidateBlock

▸ **invalidateBlock**(`hash`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` \| `Buffer` |

#### Returns

`void`

#### Defined in

[index.ts:159](https://github.com/andrewrjohn/bsv-headers/blob/master/src/index.ts#L159)

___

### process

▸ **process**(): `undefined` \| { `hash`: `string` ; `height?`: `number` ; `next`: `string`[] ; `prev`: `string`  }

#### Returns

`undefined` \| { `hash`: `string` ; `height?`: `number` ; `next`: `string`[] ; `prev`: `string`  }

#### Defined in

[index.ts:99](https://github.com/andrewrjohn/bsv-headers/blob/master/src/index.ts#L99)
