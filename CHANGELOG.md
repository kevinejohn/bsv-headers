# Changelog

## 3.0.0

### Breaking changes

- Requires Node.js 18 or newer.
- Header validation is stricter by default:
  - caller-supplied `hash` values must match the header bytes
  - proof-of-work is validated against each header's compact target
  - difficulty bits are validated against the active network rules
  - compact targets may not exceed `maxTarget`
- Best-chain selection now uses accumulated chainwork instead of height alone.
- Internal chain indexes are no longer public mutable API. Use the public helpers instead:
  - `hasHeader`
  - `getHeader`
  - `getHeaderBuffer`
  - `getHeaderMeta`
  - `getChildren`
  - `getChainWork`
  - `getInvalidBlocks`
  - `toJSON`
  - `fromJSON`
- Library logging is quiet by default. Pass `logger: { debug, warn }` to receive validation and invalidation messages.
- Synthetic or test-only headers may need `validateProofOfWork: false` and/or `validateDifficulty: false`.

### Added

- Added `getHeader` and `getHeaderBuffer` lookup by hash or height.
- Added snapshot persistence with `toJSON` and `Headers.fromJSON`.
- Added network and difficulty configuration:
  - `network`
  - `validateDifficulty`
  - `validateProofOfWork`
  - `maxTarget`
  - `targetSpacing`
  - `retargetInterval`
  - `targetTimespan`
  - `getExpectedBits`
- Added optional logger callbacks.
- Added package `exports` metadata.
- Added GitHub Actions CI for Node 18 and Node 22.
- Added named regression tests.

### Fixed

- Verified optional caller-supplied hashes instead of trusting them as block identity.
- Removed invalidated side-branch descendants so stale heights cannot be queried after invalidation.
- Remembered invalidations for hashes that have not been seen yet.
- Removed descendants when a deferred parent fails validation after connecting.
- Hardened snapshot restore by rebuilding state from header bytes and rejecting inconsistent serialized hashes, links, tips, and chain indexes.
- Removed the README example for a missing `getHeader` API by implementing the API for real.
- Replaced forced `console.log` output with optional logger callbacks.

### Dependencies

- Updated `bsv-minimal` to `^3.0.1`.
- Removed direct `source-map-support` dependency.
- Updated dev dependencies to current latest versions:
  - `@types/node`
  - `ts-node`
  - `typedoc`
  - `typedoc-plugin-markdown`
  - `typescript`
- Updated TypeScript configuration for TypeScript 6 and Node 18+.

### Notes

- The built-in `mainnet` rules implement legacy mainnet-style difficulty retargeting. For chains or eras with different rules, pass a custom network config or `getExpectedBits`.
- This package validates header hashes, proof-of-work, best-work selection, and configured difficulty rules. It is still a header manager, not a full node.
