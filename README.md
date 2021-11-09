<p align="center">
  <br>
  <br>
  <img src="xv.svg" alt="xv" height=50>
  <br>
  <br>
  <br>
</p>

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

```js
// package.json
{
  "scripts": {
    "test": "xv src"
  }
}
```

Run your tests:

```sh
npm test               # run all test files in ./src
npx xv src/add.test.js # run a single test file
```

## Why?

- 🔰 __Friendlier__ - zero-config, no API to learn, simple conventions
- 🐦 __Lighweight__ - [`40 LOC`](https://github.com/typicode/xv/blob/main/src/bin.ts), with zero dependencies
- ⚡ __Super fast__ - with almost zero abstractions, `xv` is as fast as Node
- 🦉 Runs test in [lowdb](https://github.com/typicode/lowdb), [steno](https://github.com/typicode/steno) and other [awesome projects](https://github.com/typicode/xv/network/dependents)
- 👍 Supports ESM and TypeScript

## Convention

When provided a directory, `xv` will look for files named `*.test.js` or `test.js` and run exported functions sequentially.

## TypeScript

To use `xv` with TypeScript, compile your `.ts` files and run `xv` directly on compiled `.js`. This has the benefit of __testing code that is really published__.

For example, assuming your compiled files are in `lib/` :

```js
// tsconfig.json
{
  "compilerOptions": {
    "outDir": "./lib"
  }
}
```

Edit `package.json` to run `xv` after `tsc`:

```js
// package.json
{
  "scripts": {
    "build": "rm -rf lib && tsc",
    "test": "npm run build && xv lib" // run test files in lib/
  }
}
```

If you're publishing to npm, exclude test files:

```js
// package.json
{
  "files": [
    "lib",
    // exclude compiled test files
    "!lib/**/*.test.js",
    "!lib/**/test.js"
  ]
}
```

You can run `npm publish --dry` to check that it's working (nothing is going to be published with the `--dry` option).
