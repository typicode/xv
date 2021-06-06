import { AssertionError } from 'assert'

export async function test(
  title: string,
  fn: () => void | Promise<void>,
): Promise<void> {
  try {
    await fn()
  } catch (err) {
    if (err instanceof AssertionError) {
      console.log('  x', title)
      console.log(err.message)
      console.log(
        err.stack
          ?.split('\n')
          .filter((s) => !s.includes('xv/'))
          .join('\n'),
      )
    }
    throw err
  }
  console.log('   ', title)
}
