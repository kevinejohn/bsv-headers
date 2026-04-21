[**bsv-headers**](../README.md)

***

[bsv-headers](../README.md) / default

# Class: default

Defined in: [index.ts:448](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L448)

## Constructors

### Constructor

> **new default**(`opts?`): `Headers`

Defined in: [index.ts:475](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L475)

#### Parameters

##### opts?

[`HeadersOptions`](../interfaces/HeadersOptions.md) = `{}`

#### Returns

`Headers`

## Methods

### addHeader()

> **addHeader**(`__namedParameters`): `boolean`

Defined in: [index.ts:647](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L647)

#### Parameters

##### \_\_namedParameters

[`AddHeaderOptions`](../interfaces/AddHeaderOptions.md)

#### Returns

`boolean`

***

### getChainWork()

> **getChainWork**(`hash?`): `bigint`

Defined in: [index.ts:887](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L887)

#### Parameters

##### hash?

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`bigint`

***

### getChildren()

> **getChildren**(`hash`): `string`[]

Defined in: [index.ts:882](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L882)

#### Parameters

##### hash

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`string`[]

***

### getFromHeaderArray()

> **getFromHeaderArray**(): `string`[]

Defined in: [index.ts:848](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L848)

#### Returns

`string`[]

***

### getHash()

> **getHash**(`height`): `string`

Defined in: [index.ts:836](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L836)

#### Parameters

##### height

`number`

#### Returns

`string`

***

### getHeader()

> **getHeader**(`__namedParameters`): `Header` \| `undefined`

Defined in: [index.ts:864](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L864)

#### Parameters

##### \_\_namedParameters

[`GetHeaderOptions`](../interfaces/GetHeaderOptions.md)

#### Returns

`Header` \| `undefined`

***

### getHeaderBuffer()

> **getHeaderBuffer**(`__namedParameters`): `Buffer`\<`ArrayBufferLike`\> \| `undefined`

Defined in: [index.ts:869](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L869)

#### Parameters

##### \_\_namedParameters

[`GetHeaderOptions`](../interfaces/GetHeaderOptions.md)

#### Returns

`Buffer`\<`ArrayBufferLike`\> \| `undefined`

***

### getHeaderMeta()

> **getHeaderMeta**(`hashOrHeight`): [`HeaderMeta`](../interfaces/HeaderMeta.md) \| `undefined`

Defined in: [index.ts:874](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L874)

#### Parameters

##### hashOrHeight

`string` \| `number` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

[`HeaderMeta`](../interfaces/HeaderMeta.md) \| `undefined`

***

### getHeight()

> **getHeight**(`hash?`): `number`

Defined in: [index.ts:824](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L824)

#### Parameters

##### hash?

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`number`

***

### getInvalidBlocks()

> **getInvalidBlocks**(): `string`[]

Defined in: [index.ts:896](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L896)

#### Returns

`string`[]

***

### getTip()

> **getTip**(): `object`

Defined in: [index.ts:843](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L843)

#### Returns

`object`

##### hash

> **hash**: `string`

##### height

> **height**: `number`

***

### hasHeader()

> **hasHeader**(`hash`): `boolean`

Defined in: [index.ts:860](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L860)

#### Parameters

##### hash

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

***

### invalidateBlock()

> **invalidateBlock**(`hash`): `void`

Defined in: [index.ts:799](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L799)

#### Parameters

##### hash

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`void`

***

### process()

> **process**(): \{ `bits`: `Buffer`; `buffer`: `Buffer`; `chainWork?`: `bigint`; `hash`: `string`; `height?`: `number`; `next`: `string`[]; `prev`: `string`; `time`: `number`; `work`: `bigint`; \} \| `undefined`

Defined in: [index.ts:693](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L693)

#### Returns

\{ `bits`: `Buffer`; `buffer`: `Buffer`; `chainWork?`: `bigint`; `hash`: `string`; `height?`: `number`; `next`: `string`[]; `prev`: `string`; `time`: `number`; `work`: `bigint`; \} \| `undefined`

***

### toJSON()

> **toJSON**(): [`SerializedHeaders`](../interfaces/SerializedHeaders.md)

Defined in: [index.ts:900](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L900)

#### Returns

[`SerializedHeaders`](../interfaces/SerializedHeaders.md)

***

### fromJSON()

> `static` **fromJSON**(`data`, `opts?`): `Headers`

Defined in: [index.ts:539](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L539)

#### Parameters

##### data

[`SerializedHeaders`](../interfaces/SerializedHeaders.md)

##### opts?

[`HeadersOptions`](../interfaces/HeadersOptions.md) = `{}`

#### Returns

`Headers`
