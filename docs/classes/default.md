[**bsv-headers**](../README.md)

***

[bsv-headers](../README.md) / default

# Class: default

Defined in: [index.ts:329](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L329)

## Constructors

### Constructor

> **new default**(`opts?`): `Headers`

Defined in: [index.ts:350](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L350)

#### Parameters

##### opts?

[`HeadersOptions`](../interfaces/HeadersOptions.md) = `{}`

#### Returns

`Headers`

## Methods

### addHeader()

> **addHeader**(`__namedParameters`): `boolean`

Defined in: [index.ts:497](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L497)

#### Parameters

##### \_\_namedParameters

[`AddHeaderOptions`](../interfaces/AddHeaderOptions.md)

#### Returns

`boolean`

***

### getChainWork()

> **getChainWork**(`hash?`): `bigint`

Defined in: [index.ts:737](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L737)

#### Parameters

##### hash?

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`bigint`

***

### getChildren()

> **getChildren**(`hash`): `string`[]

Defined in: [index.ts:732](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L732)

#### Parameters

##### hash

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`string`[]

***

### getFromHeaderArray()

> **getFromHeaderArray**(): `string`[]

Defined in: [index.ts:698](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L698)

#### Returns

`string`[]

***

### getHash()

> **getHash**(`height`): `string`

Defined in: [index.ts:686](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L686)

#### Parameters

##### height

`number`

#### Returns

`string`

***

### getHeader()

> **getHeader**(`__namedParameters`): `Header` \| `undefined`

Defined in: [index.ts:714](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L714)

#### Parameters

##### \_\_namedParameters

[`GetHeaderOptions`](../interfaces/GetHeaderOptions.md)

#### Returns

`Header` \| `undefined`

***

### getHeaderBuffer()

> **getHeaderBuffer**(`__namedParameters`): `Buffer`\<`ArrayBufferLike`\> \| `undefined`

Defined in: [index.ts:719](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L719)

#### Parameters

##### \_\_namedParameters

[`GetHeaderOptions`](../interfaces/GetHeaderOptions.md)

#### Returns

`Buffer`\<`ArrayBufferLike`\> \| `undefined`

***

### getHeaderMeta()

> **getHeaderMeta**(`hashOrHeight`): [`HeaderMeta`](../interfaces/HeaderMeta.md) \| `undefined`

Defined in: [index.ts:724](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L724)

#### Parameters

##### hashOrHeight

`string` \| `number` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

[`HeaderMeta`](../interfaces/HeaderMeta.md) \| `undefined`

***

### getHeight()

> **getHeight**(`hash?`): `number`

Defined in: [index.ts:674](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L674)

#### Parameters

##### hash?

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`number`

***

### getInvalidBlocks()

> **getInvalidBlocks**(): `string`[]

Defined in: [index.ts:746](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L746)

#### Returns

`string`[]

***

### getTip()

> **getTip**(): `object`

Defined in: [index.ts:693](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L693)

#### Returns

`object`

##### hash

> **hash**: `string`

##### height

> **height**: `number`

***

### hasHeader()

> **hasHeader**(`hash`): `boolean`

Defined in: [index.ts:710](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L710)

#### Parameters

##### hash

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

***

### invalidateBlock()

> **invalidateBlock**(`hash`): `void`

Defined in: [index.ts:649](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L649)

#### Parameters

##### hash

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`void`

***

### process()

> **process**(): \{ `bits`: `Buffer`; `buffer`: `Buffer`; `chainWork?`: `bigint`; `hash`: `string`; `height?`: `number`; `next`: `string`[]; `prev`: `string`; `time`: `number`; `work`: `bigint`; \} \| `undefined`

Defined in: [index.ts:543](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L543)

#### Returns

\{ `bits`: `Buffer`; `buffer`: `Buffer`; `chainWork?`: `bigint`; `hash`: `string`; `height?`: `number`; `next`: `string`[]; `prev`: `string`; `time`: `number`; `work`: `bigint`; \} \| `undefined`

***

### toJSON()

> **toJSON**(): [`SerializedHeaders`](../interfaces/SerializedHeaders.md)

Defined in: [index.ts:750](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L750)

#### Returns

[`SerializedHeaders`](../interfaces/SerializedHeaders.md)

***

### fromJSON()

> `static` **fromJSON**(`data`, `opts?`): `Headers`

Defined in: [index.ts:400](https://github.com/kevinejohn/bsv-headers/blob/master/src/index.ts#L400)

#### Parameters

##### data

[`SerializedHeaders`](../interfaces/SerializedHeaders.md)

##### opts?

[`HeadersOptions`](../interfaces/HeadersOptions.md) = `{}`

#### Returns

`Headers`
