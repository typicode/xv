import assert from 'node:assert/strict'

const sub = (a, b) => a - b

export function testSub() {
  assert.equal(sub(3, 2), 1)
}
