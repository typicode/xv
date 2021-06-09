export async function test(
  title: string,
  fn: () => void | Promise<void>,
): Promise<void> {
  try {
    await fn()
  } catch (e) {
    // Fail
    console.log(`\tX ${title}`)
    if (e instanceof Error) {
      // Filter self from stack trace
      e.stack = e.stack
        ?.split('\n')
        .filter((s) => !s.includes(import.meta.url))
        .join('\n')

      // Log error
      console.error(e.stack)

      // Exit
      process.exit(1)
    }
    // Not an Error, throw as it is
    throw e
  }
  // Success
  console.log(`\t  ${title}`)
}
