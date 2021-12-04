# deno_erajp

Deno porting of [go-erajp](https://github.com/mattn/go-erajp).\
Deno modules for japanese era.\
(日本の元号を扱う為のライブラリである[go-erajp](https://github.com/mattn/go-erajp)をDeno向けに移植したものです。)

## Usage

```typescript
import { toEraFromTime } from "./mod.ts";

console.log(toEraFromTime(new Date())); // 令和
console.log(toEraFromTime(new Date("2019/5/1"))); // 令和
console.log(toEraFromTime(new Date("2019/4/30"))); // 平成
```

## Test

`--unstable` option needs to be added.

```sh
deno test --unstable
```

## Thank you

The implementation in this repository is a port of the implementation in
[this repository (go-erajp)](https://github.com/mattn/go-erajp) for Deno.

## Licence

MIT

The Licence is MIT, according to the license of
[go-erajp](https://github.com/mattn/go-erajp).
