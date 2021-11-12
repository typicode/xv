<p align="center">
  <br>
  <img src="xv.svg" alt="xv" height=50>
  <br>
  <br>
</p>

## Why

- __User-friendly__ - zero-config, no API to learn, simple conventions
- __Extremely lighweight__ - [`40 LOC`](https://github.com/typicode/xv/blob/main/src/bin.ts) and no dependencies
- __Super fast__ - with almost zero abstractions, `xv` is as fast as Node

Used in [lowdb](https://github.com/typicode/lowdb), [steno](https://github.com/typicode/steno) and other [awesome projects](https://github.com/typicode/xv/network/dependents). Supports ESM and TypeScript.


## Install

```sh
npm install xv --save-dev
```

## Usage

Create a test file and use Node's built-in [`assert`](https://nodejs.org/api/assert.html) module:

```js
// src/add.test.js
import { strict as assert } from 'assert'

export function testAdd() {
  assert.equal(1 + 2, 3)
}
```

Edit `package.json`:

```json
{
  "scripts": {
    "test": "xv src"
  }
}
```

Run all test files:

```sh
npm test
```

Run a single test file:

```sh
npx xv src/add.test.js 
```

## Convention

When provided a directory, `xv` will look for files named `*.test.js` or `test.js` and run exported functions sequentially.

## TypeScript

To use `xv` with TypeScript, compile your `.ts` files and run `xv` directly on compiled `.js`. This has the benefit of __testing code that is really published__.

For example, assuming your compiled files are in `lib/`, edit `package.json` to run `xv` after `tsc`:

```json
{
  "scripts": {
    "test": "tsc && xv lib"
  }
}
```

If you're publishing to npm, edit `package.json`to exclude compiled test files:

```json
{
  "files": [
    "lib",
    "!lib/**/*.test.js",
    "!lib/**/test.js"
  ]
}
```

You can run `npm publish --dry` to check that it's working (nothing is going to be published with the `--dry` option).
