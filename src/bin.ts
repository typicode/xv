#!/usr/bin/env node
import { lstat, opendir } from 'fs/promises'
import { basename, dirname, join } from 'path'

async function* walk(dir: string): AsyncGenerator<string> {
  for await (const d of await opendir(dir)) {
    const entry = join(dir, d.name)
    if (d.isDirectory()) yield* walk(entry)
    else if (d.isFile()) yield entry
  }
}

async function runTestFile(file: string): Promise<void> {
  for (const value of Object.values(await import(join(process.cwd(), file)))) {
    if (typeof value === 'function') {
      try {
        await value()
      } catch (e) {
        if (e instanceof Error) console.error(e.stack)
      }
    }
  }
}

async function run(arg = '.') {
  if ((await lstat(arg)).isFile()) {
    return runTestFile(arg)
  }
  for await (const file of walk(arg)) {
    if (
      !dirname(file).includes('node_modules') &&
      (basename(file) === 'test.js' || file.endsWith('.test.js'))
    ) {
      console.log(file)
      await runTestFile(file)
    }
  }
}

void run(process.argv[2])
