[bsv-headers](../README.md) / default

# Class: default

## Table of contents

### Constructors

- [constructor](default.md#constructor)

### Properties

- [chain](default.md#chain)
- [genesis](default.md#genesis)
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

| Name   | Type                                                |
| :----- | :-------------------------------------------------- |
| `opts` | [`HeadersOptions`](../interfaces/HeadersOptions.md) |

#### Defined in

[index.ts:36](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L36)

## Properties

### chain

• **chain**: `Record`<`string`, `string`\>

#### Defined in

[index.ts:29](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L29)

---

### genesis

• `Optional` **genesis**: `string`

#### Defined in

[index.ts:33](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L33)

---

### headers

• **headers**: `Record`<`string`, [`Header`](../interfaces/Header.md)\>

#### Defined in

[index.ts:28](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L28)

---

### invalidBlocks

• **invalidBlocks**: `Set`<`string`\>

#### Defined in

[index.ts:26](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L26)

---

### invalidatedBlock

• **invalidatedBlock**: `boolean`

#### Defined in

[index.ts:32](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L32)

---

### maxReorgDepth

• **maxReorgDepth**: `number`

#### Defined in

[index.ts:27](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L27)

---

### processed

• **processed**: `boolean`

#### Defined in

[index.ts:31](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L31)

---

### tip

• `Optional` **tip**: [`Header`](../interfaces/Header.md)

#### Defined in

[index.ts:34](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L34)

---

### unlinked

• **unlinked**: `Record`<`string`, [`Header`](../interfaces/Header.md)\>

#### Defined in

[index.ts:30](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L30)

## Methods

### addHeader

▸ **addHeader**(`opts`): `boolean`

#### Parameters

| Name   | Type                                                    |
| :----- | :------------------------------------------------------ |
| `opts` | [`AddHeaderOptions`](../interfaces/AddHeaderOptions.md) |

#### Returns

`boolean`

#### Defined in

[index.ts:60](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L60)

---

### getFromHeaderArray

▸ **getFromHeaderArray**(): `string`[]

#### Returns

`string`[]

#### Defined in

[index.ts:203](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L203)

---

### getHash

▸ **getHash**(`height`): `string`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `height` | `number` |

#### Returns

`string`

#### Defined in

[index.ts:190](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L190)

---

### getHeight

▸ **getHeight**(`hash?`): `undefined` \| `number`

#### Parameters

| Name    | Type                 |
| :------ | :------------------- |
| `hash?` | `string` \| `Buffer` |

#### Returns

`undefined` \| `number`

#### Defined in

[index.ts:179](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L179)

---

### getTip

▸ **getTip**(): [`Header`](../interfaces/Header.md)

#### Returns

[`Header`](../interfaces/Header.md)

#### Defined in

[index.ts:197](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L197)

---

### invalidateBlock

▸ **invalidateBlock**(`hash`): `void`

#### Parameters

| Name   | Type                 |
| :----- | :------------------- |
| `hash` | `string` \| `Buffer` |

#### Returns

`void`

#### Defined in

[index.ts:153](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L153)

---

### process

▸ **process**(): `undefined` \| [`Header`](../interfaces/Header.md)

#### Returns

`undefined` \| [`Header`](../interfaces/Header.md)

#### Defined in

[index.ts:97](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L97)
