<p align="center">
  <br>
  <img src="xv.svg" alt="xv" height=50>
  <br>
  <br>
</p>

## Why

- __User-friendly__ - zero-config, no API to learn, simple convention
- __Extremely lighweight__ - only [`40 lines of code`](https://github.com/typicode/xv/blob/main/src/bin.ts) and no dependencies
- __Blazingly fast__ - with almost zero abstractions, xv is as fast as Node
- __Stable__ - very low maintenance
- __Unix philosophy™__ - `do one thing well`, xv is _only_ a test runner

Used in [lowdb](https://github.com/typicode/lowdb), [steno](https://github.com/typicode/steno) and other [awesome projects](https://github.com/typicode/xv/network/dependents).

## A word on releases

xv being very simple by design, there probably won't be frequent updates (which is a good thing as it means less work for you). However, this doesn't mean  that the project is not maintained or not used, it's just (probably) feature complete as it is.

xv will be updated to follow the latest Node API changes or improvements.

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

When provided a directory, xv will look for files named `*.test.js` or `test.js` and run exported functions sequentially.

## TypeScript

To test TypeScript code, compile your `.ts` files and run `xv` on compiled `.js` files. 

For example, assuming your compiled files are in `lib/`, edit `package.json` to run `xv` after `tsc`:

```diff
{
  "scripts": {
-    "test": "xv src"
+    "test": "tsc && xv lib"
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

## Watch mode

xv doesn't integrate a watch mode, instead if the feature is needed, it's recommended to use tools like [watchexec](https://github.com/watchexec/watchexec) or [chokidar-cli](https://github.com/open-cli-tools/chokidar-cli)).
