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
- ✨ __Modern__ - native ESM support
- 🔰 __Simple & straightforward__ - no API to learn, zero-config
- ⚡ __Super fast__ - with almost zero abstractions, `xv` is fast as Node
- 🦉 Extracted from [lowdb](https://github.com/typicode/lowdb)
- 💖 [GitHub Sponsors](https://github.com/sponsors/typicode)

## Install

```sh
npm install xv --save-dev
yarn add xv --dev
```

## Usage

Create a test file `src/add.test.js` and use Node's built-in [`assert`](https://nodejs.org/api/assert.html) module:

```js
import { strict as assert } from 'assert' // Node <=16
// import assert from 'assert/strict'     // Node >=16

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

_`xv` is extremely simple, there's nothing else to learn._

## Convention

When provided a directory, `xv` will look for files named `*.test.js` (or `test.js`) and run exported functions sequentially.

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
