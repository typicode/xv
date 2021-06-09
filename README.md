<h1 align="center">
  <img src="xv.svg" alt="xv" height=50>
</h1>

[![Node.js CI](https://github.com/typicode/xv/actions/workflows/node.js.yml/badge.svg)](https://github.com/typicode/xv/actions/workflows/node.js.yml)

Setting up and maintaining a test framework can sometimes be complex and time consuming. I've created `xv` to be a low maintainance, easy to setup and learn test lib/CLI. You can use it in small to medium projects.

## Features

- Pure ESM
- Extremely lightweight
- No config, only one function `test()`, simple
- Used in [lowdb](https://github.com/typicode/lowdb) and [steno](https://github.com/typicode/steno))

_Requires Node v14.13.1+_

## Usage

```sh
$ npm install xv --save-dev
$ yarn add xv --dev
```

```js
// src/add.test.js
import { strict as assert } from 'assert' // Works with Node 14 and 16
// import { equal } from 'assert/strict'  // Simpler but works with Node 16 only
import { test } from 'xv'
import { add } from './add.js'

await test('should add', () => {
  assert.equal(add(1, 1), 2)
})
```

```sh
$ xv 'src/**/*.test.js' # Run all .test.js files in src/
$ node src/add.test.js  # Run specific file
```

That's all... really :)

## Early access for Sponsors

For a limited time `xv` is available to Sponsors only. Once the goal of 70 sponsors is reached (currently 55), I'll release it under MIT for everyone 🎉

__If you like this project and my work, you can [become a sponsor here](https://github.com/sponsors/typicode).__ Thank you for your support!

Note: if you're already sponsoring [husky](https://github.com/typicode/husky), feel free to use `xv` in any type of project.

## Assertions

Use Node's built-in [`assert`](https://nodejs.org/api/assert.html) module.

If you're running tests with Node 14 AND 16, use the following style:

```js
import { assert as strict } from 'assert'
assert.equal(actual, expected)
```

If you're only working with Node 16, you can simplify the import:

```js
import { equal } from 'assert/strict'
equal(actual, expected)
```

## TypeScript

If you're using TypeScript, build your code before and run `xv` directly on compiled test files.

`tsconfig.json`

```json
{
  "compilerOptions": {
    "outDir": "./lib",
    "module": "ESNext"
  }
}
```

Edit `package.json` to exclude test files from being published.

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
