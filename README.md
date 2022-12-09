[![Node.js CI](https://github.com/typicode/xv/actions/workflows/node.js.yml/badge.svg)](https://github.com/typicode/xv/actions/workflows/node.js.yml) [![install size](https://packagephobia.com/badge?p=xv)](https://packagephobia.com/result?p=xv)


<p align="center">
  <br>
  <img src="xv.svg" alt="xv" height=50>
  <br>
  <br>
</p>

> xv is a blazingly fast test runner that works differently

## Features

- __Simple__ - zero-config, no API to learn, out of the box ESM/CJS support
- __TypeScript__ - no complex setup, xv works with TypeScript + ESM
- __Blazingly fast__ - with almost zero abstractions, xv is one of the fastest test runners
- __Different__ - simply export test functions, doesn't hide console logs, raw errors, ... 
- __Lightweight__ - 2kB for the runner code and no dependencies
- __Unix philosophy™__ - `do one thing well`, xv is _only_ a test runner

Used by [lowdb](https://github.com/typicode/lowdb) (local JSON database), [steno](https://github.com/typicode/steno) (fast file writer) and other [awesome projects](https://github.com/typicode/xv/network/dependents).

## Install

```sh
npm install xv --save-dev
```

## Usage

Create a test file and use Node's built-in [`assert`](https://nodejs.org/api/assert.html) module:

```js
// src/add.test.js
import assert from 'node:assert/strict'
import add from './add.js'

// This is plain Node code, there's no xv API
export function testAdd() {
  assert.equal(add(1, 2), 3)
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

When provided with a directory, xv will look for files named:

* `*.test.js`
* `test.js`
* `*.test.ts`
* `test.ts`

And run exported functions sequentially.

## TypeScript

### With TypeScript + [ts-node](https://typestrong.org/ts-node/)

```sh
npm install ts-node --save-dev
```

```json
{
  "scripts": {
    "test": "xv --loader=ts-node/esm src"
  }
}
```

### With TypeScript only

Compile your `.ts` files using `tsc` and run `xv` on compiled `.js` files. 

For example, assuming your compiled files are in `lib/`, edit `package.json` to run `xv` after `tsc`:

```diff
{
  "scripts": {
-   "test": "xv src"
+   "test": "tsc && xv lib"
  }
}
```

If you're publishing to npm, edit `package.json` to exclude compiled test files:

```diff
{
  "files": [
    "lib",
+   "!lib/**/*.test.js",
+   "!lib/**/test.js"
  ]
}
```

## Common JS

xv can also test CJS code.

```js
// src/add.test.js
const assert = require('assert').strict;
const add = require('./add')

// This is plain Node code, there's no xv API
exports.testAdd = function() {
  assert.equal(add(1, 2), 3)
}
```

## Watch mode

xv doesn't integrate a watch mode. If the feature is needed, it's recommended to use tools like [watchexec](https://github.com/watchexec/watchexec) or [chokidar-cli](https://github.com/open-cli-tools/chokidar-cli) to re-run xv when there are changes.
