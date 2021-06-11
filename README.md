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
- No config, only one function `test()`, simple
- Pure ESM package
- Used in [lowdb](https://github.com/typicode/lowdb) and [steno](https://github.com/typicode/steno)

_Requires Node v14.13.1+_

## Install

Install `xv`:

```sh
npm install xv --save-dev
yarn add xv --dev
```

## Usage

Create a test file `src/add.test.js` and use Node's built-in [`assert`](https://nodejs.org/api/assert.html) module.

If you need your tests to be compatible with __Node 14 and 16__:

```js
import { strict as assert } from 'assert' 
import { test } from 'xv'

await test('should add', () => {
  assert.equal(1 + 2, 3)
})
```

If you're working with __Node 16 and later only__, you can simplify your code:

```js
import { equal } from 'assert/strict' 
import { test } from 'xv'

await test('should add', () => {
  equal(1 + 2, 3)
})
```

In `package.json`, edit `test` script:

```json
{
  "scripts": {
    "test": "xv 'src/**/*.test.js'"
   }
}
```

```sh
npm test             # Run all .test.js files in src/    
node src/add.test.js # Run specific test file
```

__That's all there is to know... for real :)__

_Note_ `xv` is a pure ESM package, read [this](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) if you're getting `ERR_REQUIRE_ESM` error.

## Early access for Sponsors

For a limited time `xv` is available to Sponsors only. Once the goal of 70 sponsors is reached (currently 55), I'll release it under MIT for everyone 🎉

__If you like this project and my work, please help me reach this goal by [becoming a sponsor here](https://github.com/sponsors/typicode). Thank you!__ 

_Note: if you're already sponsoring me via [husky](https://github.com/typicode/husky), feel free to use `xv` in any type of project._

## TypeScript

If you're using TypeScript, compile your `.ts` and run `xv` directly on compiled `.js` files.

Assuming you have the following `tsconfig.json`:

```json
{
  "compilerOptions": {
    "outDir": "./lib",
    "module": "ESNext"
  }
}
```

Edit `package.json` to exclude test files from being published andrun `tsc` before `xv`:

```js
{
  "files": [
    "lib",
    "!lib/**/*.test.*" // exclude test files
  ],
  "scripts": {
    "build": "rm -rf lib && tsc",
    "test": "npm run build && xv 'lib/**/*.test.js'"
  }
}
```
