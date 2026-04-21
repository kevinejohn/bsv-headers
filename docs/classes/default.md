[**bsv-headers**](../README.md)

***

[bsv-headers](../README.md) / default

# Class: default

Defined in: [index.ts:441](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L441)

## Constructors

### Constructor

> **new default**(`opts?`): `Headers`

Defined in: [index.ts:468](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L468)

#### Parameters

##### opts?

[`HeadersOptions`](../interfaces/HeadersOptions.md) = `{}`

#### Returns

`Headers`

## Methods

### addHeader()

> **addHeader**(`__namedParameters`): `boolean`

Defined in: [index.ts:640](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L640)

#### Parameters

##### \_\_namedParameters

[`AddHeaderOptions`](../interfaces/AddHeaderOptions.md)

#### Returns

`boolean`

***

### getChainWork()

> **getChainWork**(`hash?`): `bigint`

Defined in: [index.ts:880](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L880)

#### Parameters

##### hash?

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`bigint`

***

### getChildren()

> **getChildren**(`hash`): `string`[]

Defined in: [index.ts:875](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L875)

#### Parameters

##### hash

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`string`[]

***

### getFromHeaderArray()

> **getFromHeaderArray**(): `string`[]

Defined in: [index.ts:841](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L841)

#### Returns

`string`[]

***

### getHash()

> **getHash**(`height`): `string`

Defined in: [index.ts:829](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L829)

#### Parameters

##### height

`number`

#### Returns

`string`

***

### getHeader()

> **getHeader**(`__namedParameters`): `Header` \| `undefined`

Defined in: [index.ts:857](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L857)

#### Parameters

##### \_\_namedParameters

[`GetHeaderOptions`](../interfaces/GetHeaderOptions.md)

#### Returns

`Header` \| `undefined`

***

### getHeaderBuffer()

> **getHeaderBuffer**(`__namedParameters`): `Buffer`\<`ArrayBufferLike`\> \| `undefined`

Defined in: [index.ts:862](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L862)

#### Parameters

##### \_\_namedParameters

[`GetHeaderOptions`](../interfaces/GetHeaderOptions.md)

#### Returns

`Buffer`\<`ArrayBufferLike`\> \| `undefined`

***

### getHeaderMeta()

> **getHeaderMeta**(`hashOrHeight`): [`HeaderMeta`](../interfaces/HeaderMeta.md) \| `undefined`

Defined in: [index.ts:867](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L867)

#### Parameters

##### hashOrHeight

`string` \| `number` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

[`HeaderMeta`](../interfaces/HeaderMeta.md) \| `undefined`

***

### getHeight()

> **getHeight**(`hash?`): `number`

Defined in: [index.ts:817](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L817)

#### Parameters

##### hash?

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`number`

***

### getInvalidBlocks()

> **getInvalidBlocks**(): `string`[]

Defined in: [index.ts:889](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L889)

#### Returns

`string`[]

***

### getTip()

> **getTip**(): `object`

Defined in: [index.ts:836](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L836)

#### Returns

`object`

##### hash

> **hash**: `string`

##### height

> **height**: `number`

***

### hasHeader()

> **hasHeader**(`hash`): `boolean`

Defined in: [index.ts:853](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L853)

#### Parameters

##### hash

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

***

### invalidateBlock()

> **invalidateBlock**(`hash`): `void`

Defined in: [index.ts:792](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L792)

#### Parameters

##### hash

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`void`

***

### process()

> **process**(): \{ `bits`: `Buffer`; `buffer`: `Buffer`; `chainWork?`: `bigint`; `hash`: `string`; `height?`: `number`; `next`: `string`[]; `prev`: `string`; `time`: `number`; `work`: `bigint`; \} \| `undefined`

Defined in: [index.ts:686](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L686)

#### Returns

\{ `bits`: `Buffer`; `buffer`: `Buffer`; `chainWork?`: `bigint`; `hash`: `string`; `height?`: `number`; `next`: `string`[]; `prev`: `string`; `time`: `number`; `work`: `bigint`; \} \| `undefined`

***

### toJSON()

> **toJSON**(): [`SerializedHeaders`](../interfaces/SerializedHeaders.md)

Defined in: [index.ts:893](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L893)

#### Returns

[`SerializedHeaders`](../interfaces/SerializedHeaders.md)

***

### fromJSON()

> `static` **fromJSON**(`data`, `opts?`): `Headers`

Defined in: [index.ts:532](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L532)

#### Parameters

##### data

[`SerializedHeaders`](../interfaces/SerializedHeaders.md)

##### opts?

[`HeadersOptions`](../interfaces/HeadersOptions.md) = `{}`

#### Returns

`Headers`
