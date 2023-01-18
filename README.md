<p align="center">
  <br>
  <img src="xv.svg" alt="xv" height=50>
  <br>
  <br>
</p>

[![Node.js CI](https://github.com/typicode/xv/actions/workflows/node.js.yml/badge.svg)](https://github.com/typicode/xv/actions/workflows/node.js.yml) [![install size](https://packagephobia.com/badge?p=xv)](https://packagephobia.com/result?p=xv)

> A tiny (~80LOC of TypeScript) test runner focused on simplicity and speed

```sh
$ xv ./src
src/add.test.js: 0.103ms
src/sub.test.js: 0.064ms
```

_Extracted from [lowdb](https://github.com/typicode/lowdb). One of the fastest test runner according to this [benchmark](https://github.com/icetbr/comparing-testing-libraries)._

## Why

If you've used other test runners, you probably have spent a significant amount of time reading docs, configuring, maintaining and debugging them.

By being extremely simple, xv gets out of your way and lets you be productive faster. In fact, the whole project documentation fits in this page ;)

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

Run tests:

```sh
npm test                # run all test files in ./src
npx xv src/add.test.js  # run a single test file
```

## Convention

By default, xv will look for files named: `*.test.js`, `test.js`, `*.test.ts` and `test.ts`

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

```json
{
  "scripts": {
    "test": "tsc && xv lib"
  }
}
```

If you're publishing to npm, edit `package.json` to exclude compiled test files:

```json
{
  "files": [
    "lib",
    "!lib/**/*.test.js",
    "!lib/**/test.js"
  ]
}
```

## Common JS

```js
// src/add.test.js
const assert = require('assert').strict;
const add = require('./add')

exports.testAdd = function() {
  assert.equal(add(1, 2), 3)
}
```

## Watch mode

xv doesn't have a watch mode. If the feature is needed, it's recommended to use tools like [watchexec](https://github.com/watchexec/watchexec) or [chokidar-cli](https://github.com/open-cli-tools/chokidar-cli) to re-run xv when there are changes.
