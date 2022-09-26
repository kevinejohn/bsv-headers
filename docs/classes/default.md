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

[index.ts:34](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L34)

## Properties

### chain

• **chain**: `Record`<`string`, `string`\>

#### Defined in

[index.ts:26](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L26)

___

### genesis

• **genesis**: `string`

#### Defined in

[index.ts:30](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L30)

___

### genesisHeader

• **genesisHeader**: `default`

#### Defined in

[index.ts:31](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L31)

___

### headers

• **headers**: `Record`<`string`, { `hash`: `string` ; `height?`: `number` ; `next`: `string`[] ; `prev`: `string`  }\>

#### Defined in

[index.ts:22](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L22)

___

### invalidBlocks

• **invalidBlocks**: `Set`<`string`\>

#### Defined in

[index.ts:20](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L20)

___

### invalidatedBlock

• **invalidatedBlock**: `boolean`

#### Defined in

[index.ts:29](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L29)

___

### maxReorgDepth

• **maxReorgDepth**: `number`

#### Defined in

[index.ts:21](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L21)

___

### processed

• **processed**: `boolean`

#### Defined in

[index.ts:28](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L28)

___

### tip

• **tip**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hash` | `string` |
| `height` | `number` |

#### Defined in

[index.ts:32](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L32)

___

### unlinked

• **unlinked**: `Record`<`string`, { `hash`: `string` ; `next`: `string`[] ; `prev`: `string`  }\>

#### Defined in

[index.ts:27](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L27)

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

[index.ts:61](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L61)

___

### getFromHeaderArray

▸ **getFromHeaderArray**(): `string`[]

#### Returns

`string`[]

#### Defined in

[index.ts:204](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L204)

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

[index.ts:192](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L192)

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

[index.ts:179](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L179)

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

[index.ts:199](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L199)

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

[index.ts:153](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L153)

___

### process

▸ **process**(): `undefined` \| { `hash`: `string` ; `height?`: `number` ; `next`: `string`[] ; `prev`: `string`  }

#### Returns

`undefined` \| { `hash`: `string` ; `height?`: `number` ; `next`: `string`[] ; `prev`: `string`  }

#### Defined in

[index.ts:93](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L93)
