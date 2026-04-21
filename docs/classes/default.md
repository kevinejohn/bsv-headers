[**bsv-headers**](../README.md)

***

[bsv-headers](../README.md) / default

# Class: default

Defined in: [index.ts:306](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L306)

## Constructors

### Constructor

> **new default**(`opts?`): `Headers`

Defined in: [index.ts:327](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L327)

#### Parameters

##### opts?

[`HeadersOptions`](../interfaces/HeadersOptions.md) = `{}`

#### Returns

`Headers`

## Methods

### addHeader()

> **addHeader**(`__namedParameters`): `boolean`

Defined in: [index.ts:474](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L474)

#### Parameters

##### \_\_namedParameters

[`AddHeaderOptions`](../interfaces/AddHeaderOptions.md)

#### Returns

`boolean`

***

### getChainWork()

> **getChainWork**(`hash?`): `bigint`

Defined in: [index.ts:714](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L714)

#### Parameters

##### hash?

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`bigint`

***

### getChildren()

> **getChildren**(`hash`): `string`[]

Defined in: [index.ts:709](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L709)

#### Parameters

##### hash

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`string`[]

***

### getFromHeaderArray()

> **getFromHeaderArray**(): `string`[]

Defined in: [index.ts:675](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L675)

#### Returns

`string`[]

***

### getHash()

> **getHash**(`height`): `string`

Defined in: [index.ts:663](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L663)

#### Parameters

##### height

`number`

#### Returns

`string`

***

### getHeader()

> **getHeader**(`__namedParameters`): `Header` \| `undefined`

Defined in: [index.ts:691](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L691)

#### Parameters

##### \_\_namedParameters

[`GetHeaderOptions`](../interfaces/GetHeaderOptions.md)

#### Returns

`Header` \| `undefined`

***

### getHeaderBuffer()

> **getHeaderBuffer**(`__namedParameters`): `Buffer`\<`ArrayBufferLike`\> \| `undefined`

Defined in: [index.ts:696](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L696)

#### Parameters

##### \_\_namedParameters

[`GetHeaderOptions`](../interfaces/GetHeaderOptions.md)

#### Returns

`Buffer`\<`ArrayBufferLike`\> \| `undefined`

***

### getHeaderMeta()

> **getHeaderMeta**(`hashOrHeight`): [`HeaderMeta`](../interfaces/HeaderMeta.md) \| `undefined`

Defined in: [index.ts:701](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L701)

#### Parameters

##### hashOrHeight

`string` \| `number` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

[`HeaderMeta`](../interfaces/HeaderMeta.md) \| `undefined`

***

### getHeight()

> **getHeight**(`hash?`): `number`

Defined in: [index.ts:651](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L651)

#### Parameters

##### hash?

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`number`

***

### getInvalidBlocks()

> **getInvalidBlocks**(): `string`[]

Defined in: [index.ts:723](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L723)

#### Returns

`string`[]

***

### getTip()

> **getTip**(): `object`

Defined in: [index.ts:670](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L670)

#### Returns

`object`

##### hash

> **hash**: `string`

##### height

> **height**: `number`

***

### hasHeader()

> **hasHeader**(`hash`): `boolean`

Defined in: [index.ts:687](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L687)

#### Parameters

##### hash

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

***

### invalidateBlock()

> **invalidateBlock**(`hash`): `void`

Defined in: [index.ts:626](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L626)

#### Parameters

##### hash

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`void`

***

### process()

> **process**(): \{ `bits`: `Buffer`; `buffer`: `Buffer`; `chainWork?`: `bigint`; `hash`: `string`; `height?`: `number`; `next`: `string`[]; `prev`: `string`; `time`: `number`; `work`: `bigint`; \} \| `undefined`

Defined in: [index.ts:520](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L520)

#### Returns

\{ `bits`: `Buffer`; `buffer`: `Buffer`; `chainWork?`: `bigint`; `hash`: `string`; `height?`: `number`; `next`: `string`[]; `prev`: `string`; `time`: `number`; `work`: `bigint`; \} \| `undefined`

***

### toJSON()

> **toJSON**(): [`SerializedHeaders`](../interfaces/SerializedHeaders.md)

Defined in: [index.ts:727](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L727)

#### Returns

[`SerializedHeaders`](../interfaces/SerializedHeaders.md)

***

### fromJSON()

> `static` **fromJSON**(`data`, `opts?`): `Headers`

Defined in: [index.ts:377](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L377)

#### Parameters

##### data

[`SerializedHeaders`](../interfaces/SerializedHeaders.md)

##### opts?

[`HeadersOptions`](../interfaces/HeadersOptions.md) = `{}`

#### Returns

`Headers`
