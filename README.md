<h1 align="center">
  <br>
  <br>
  <img src="xv.svg" alt="xv" height=50>
  <br>
  <br>
  <br>
</h1>

[![Node.js CI](https://github.com/typicode/xv/actions/workflows/node.js.yml/badge.svg)](https://github.com/typicode/xv/actions/workflows/node.js.yml)

Setting up and maintaining a test framework can sometimes be complex and time consuming. I've created `xv` to be a test runner that is __low maintainance, easy to setup and use__. 

`xv` is great for __small and medium projects__.

## Features

- 🐦 __Lighweight__ - [`40 LOC`](https://github.com/typicode/xv/blob/main/src/bin.ts), with zero dependencies
- ✨ __Modern__ - ESM support without extra config
- 🔰 __Simple__ - no API to learn, zero-config
- ⚡ __Super fast__ - `~0.03s`


Used in [lowdb](https://github.com/typicode/lowdb), [steno](https://github.com/typicode/steno) and [husky-init](https://github.com/typicode/husky-init).

_Requires Node v12.20.0+_

_Please help me build OSS 👉 [GitHub Sponsors](https://github.com/sponsors/typicode)_

## Install

```sh
npm install xv --save-dev
yarn add xv --dev
```

## Usage

Create a test file `src/add.test.js` and use Node's built-in [`assert`](https://nodejs.org/api/assert.html) module:

```js
import { strict as assert } from 'assert' // Node <=16
// import { equal } from 'assert/strict'  // Node >=16

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

Run your tests:

```sh
npm test               # run all test files in ./src
npx xv src/add.test.js # run a single test file
```

## Convention

When provided a directory, `xv` will look for files named `*.test.js` and `test.js`.

## TypeScript

If you're using TypeScript, compile your `.ts` and run `xv` directly on compiled `.js` files.

Assuming you have the following `tsconfig.json`:

```json
{
  "compilerOptions": {
    "outDir": "./lib"
  }
}
```

Edit `package.json` to exclude test files from being published and run `tsc` before `xv`:

```js
{
  "files": [
    "lib",
    // exclude test files
    "!lib/**/*.test.js",
    "!lib/**/test.js"
  ],
  "scripts": {
    "build": "rm -rf lib && tsc",
    "test": "npm run build && xv lib"
  }
}
```
