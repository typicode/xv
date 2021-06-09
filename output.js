// Used to test xv output
import { strict as assert } from 'assert'

import { test } from './lib/index.js'

await test('should add', () => {
  assert.equal(1 + 1, 2)
})

// await test('should add (failing)', () => {
//   assert.equal(1 + 1, 0)
// })

function foo() {
  throw new Error()
}

await test('generic error', () => {
  foo()
})
