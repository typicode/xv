import assert from 'node:assert/strict'

const add = (a, b) => a + b

export function testAdd() {
  assert.equal(add(1, 2), 3)
}
