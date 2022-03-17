# deno_erajp

[![Deno CI](https://github.com/shinshin86/deno_erajp/actions/workflows/main.yml/badge.svg)](https://github.com/shinshin86/deno_erajp/actions/workflows/main.yml)

Deno porting of [go-erajp](https://github.com/mattn/go-erajp).\
Deno modules for japanese era.\
(日本の元号を扱う為のライブラリである[go-erajp](https://github.com/mattn/go-erajp)をDeno向けに移植したものです。)

## Usage

```typescript
// example.ts
import { toEraFromTime } from "./mod.ts";

console.log(toEraFromTime(new Date())); // 令和
console.log(toEraFromTime(new Date("2019/5/1"))); // 令和
console.log(toEraFromTime(new Date("2019/4/30"))); // 平成
```

`--allow-read` option needs to be added.

```sh
deno run --allow-read example.ts
```

## Test

```sh
deno test --allow-read
```

If the version is older than 1.18, add `--unstable`.

```sh
deno test --allow-read --unstable
```

## Thank you

The implementation in this repository is a port of the implementation in
[this repository (go-erajp)](https://github.com/mattn/go-erajp) for Deno.

## Licence

[MIT](https://github.com/shinshin86/deno_erajp/blob/main/LICENSE)

The Licence is MIT, according to the license of
[go-erajp](https://github.com/mattn/go-erajp).
