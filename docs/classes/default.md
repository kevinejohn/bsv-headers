[**bsv-headers**](../README.md)

***

[bsv-headers](../README.md) / default

# Class: default

Defined in: [index.ts:332](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L332)

## Constructors

### Constructor

> **new default**(`opts?`): `Headers`

Defined in: [index.ts:353](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L353)

#### Parameters

##### opts?

[`HeadersOptions`](../interfaces/HeadersOptions.md) = `{}`

#### Returns

`Headers`

## Methods

### addHeader()

> **addHeader**(`__namedParameters`): `boolean`

Defined in: [index.ts:500](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L500)

#### Parameters

##### \_\_namedParameters

[`AddHeaderOptions`](../interfaces/AddHeaderOptions.md)

#### Returns

`boolean`

***

### getChainWork()

> **getChainWork**(`hash?`): `bigint`

Defined in: [index.ts:740](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L740)

#### Parameters

##### hash?

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`bigint`

***

### getChildren()

> **getChildren**(`hash`): `string`[]

Defined in: [index.ts:735](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L735)

#### Parameters

##### hash

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`string`[]

***

### getFromHeaderArray()

> **getFromHeaderArray**(): `string`[]

Defined in: [index.ts:701](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L701)

#### Returns

`string`[]

***

### getHash()

> **getHash**(`height`): `string`

Defined in: [index.ts:689](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L689)

#### Parameters

##### height

`number`

#### Returns

`string`

***

### getHeader()

> **getHeader**(`__namedParameters`): `Header` \| `undefined`

Defined in: [index.ts:717](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L717)

#### Parameters

##### \_\_namedParameters

[`GetHeaderOptions`](../interfaces/GetHeaderOptions.md)

#### Returns

`Header` \| `undefined`

***

### getHeaderBuffer()

> **getHeaderBuffer**(`__namedParameters`): `Buffer`\<`ArrayBufferLike`\> \| `undefined`

Defined in: [index.ts:722](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L722)

#### Parameters

##### \_\_namedParameters

[`GetHeaderOptions`](../interfaces/GetHeaderOptions.md)

#### Returns

`Buffer`\<`ArrayBufferLike`\> \| `undefined`

***

### getHeaderMeta()

> **getHeaderMeta**(`hashOrHeight`): [`HeaderMeta`](../interfaces/HeaderMeta.md) \| `undefined`

Defined in: [index.ts:727](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L727)

#### Parameters

##### hashOrHeight

`string` \| `number` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

[`HeaderMeta`](../interfaces/HeaderMeta.md) \| `undefined`

***

### getHeight()

> **getHeight**(`hash?`): `number`

Defined in: [index.ts:677](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L677)

#### Parameters

##### hash?

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`number`

***

### getInvalidBlocks()

> **getInvalidBlocks**(): `string`[]

Defined in: [index.ts:749](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L749)

#### Returns

`string`[]

***

### getTip()

> **getTip**(): `object`

Defined in: [index.ts:696](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L696)

#### Returns

`object`

##### hash

> **hash**: `string`

##### height

> **height**: `number`

***

### hasHeader()

> **hasHeader**(`hash`): `boolean`

Defined in: [index.ts:713](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L713)

#### Parameters

##### hash

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

***

### invalidateBlock()

> **invalidateBlock**(`hash`): `void`

Defined in: [index.ts:652](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L652)

#### Parameters

##### hash

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`void`

***

### process()

> **process**(): \{ `bits`: `Buffer`; `buffer`: `Buffer`; `chainWork?`: `bigint`; `hash`: `string`; `height?`: `number`; `next`: `string`[]; `prev`: `string`; `time`: `number`; `work`: `bigint`; \} \| `undefined`

Defined in: [index.ts:546](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L546)

#### Returns

\{ `bits`: `Buffer`; `buffer`: `Buffer`; `chainWork?`: `bigint`; `hash`: `string`; `height?`: `number`; `next`: `string`[]; `prev`: `string`; `time`: `number`; `work`: `bigint`; \} \| `undefined`

***

### toJSON()

> **toJSON**(): [`SerializedHeaders`](../interfaces/SerializedHeaders.md)

Defined in: [index.ts:753](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L753)

#### Returns

[`SerializedHeaders`](../interfaces/SerializedHeaders.md)

***

### fromJSON()

> `static` **fromJSON**(`data`, `opts?`): `Headers`

Defined in: [index.ts:403](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L403)

#### Parameters

##### data

[`SerializedHeaders`](../interfaces/SerializedHeaders.md)

##### opts?

[`HeadersOptions`](../interfaces/HeadersOptions.md) = `{}`

#### Returns

`Headers`
