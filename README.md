<h1 align="center">
  <br>
  <br>
  <img src="xv.svg" alt="xv" height=50>
  <br>
  <br>
  <br>
</h1>

[![Node.js CI](https://github.com/typicode/xv/actions/workflows/node.js.yml/badge.svg)](https://github.com/typicode/xv/actions/workflows/node.js.yml)

Setting up and maintaining a test framework can sometimes be complex and time consuming. I've created `xv` to be a low maintainance, easy to setup and learn test lib/CLI. Great for small and medium projects.

## Features

- Lightweight and fast
- Zero-config, zero-API, simple
- Used in [lowdb](https://github.com/typicode/lowdb) and [steno](https://github.com/typicode/steno)

_Requires Node v12.20.0+_

## Install

Install `xv`:

```sh
npm install xv --save-dev
yarn add xv --dev
```

## Usage

Create a test file `src/add.test.js` (or `src/test.js`) and use Node's built-in [`assert`](https://nodejs.org/api/assert.html) module.

If you need your tests to be compatible with **Node <=16**:

```js
import { strict as assert } from 'assert'

export function testAdd() {
  assert.equal(1 + 2, 3)
}
```

If you're targeting **Node >=16**, you can simplify your code:

```js
import { equal } from 'assert/strict'

export function testAdd() {
  equal(1 + 2, 3)
}
```

In `package.json`, edit `test` script:

```json
{
  "scripts": {
    "test": "xv src"
  }
}
```

```sh
npm test               # run all test files in ./src
npx xv src/add.test.js # run a single test file
```

**That's all there is to know... for real :)**

_Note_ `xv` is a pure ESM package, read [this](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

## Early access for Sponsors

For a limited time `xv` is available to Sponsors only. Once the goal of 70 sponsors is reached (currently 57), I'll release it under MIT for everyone 🎉

**If you like this project and my work, please help me reach this goal by [becoming a sponsor here](https://github.com/sponsors/typicode). Thank you!**

_Note: if you're already sponsoring me via [husky](https://github.com/typicode/husky), feel free to use `xv` in any type of project._

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

Edit `package.json` to exclude test files from being published andrun `tsc` before `xv`:

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
