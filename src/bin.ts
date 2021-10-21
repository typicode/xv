#!/usr/bin/env node
import { promises as fs } from 'fs'
import { basename, join } from 'path'
import { pathToFileURL } from 'url'

async function* walk(dir: string): AsyncGenerator<string> {
  for await (const d of await fs.opendir(dir)) {
    const entry = join(dir, d.name)
    if (d.isDirectory() && d.name !== 'node_modules') yield* walk(entry)
    else if (d.isFile()) yield entry
  }
}

async function runTestFile(file: string): Promise<void> {
  for (const value of Object.values(
    await import(pathToFileURL(file).toString()),
  )) {
    if (typeof value === 'function') {
      try {
        await value()
      } catch (e) {
        console.error(e instanceof Error ? e.stack : e)
        process.exit(1)
      }
    }
  }
}

async function run(arg = '.') {
  if ((await fs.lstat(arg)).isFile()) {
    return runTestFile(arg)
  }
  for await (const file of walk(arg)) {
    if (
      basename(file) === 'test.js' ||
      file.endsWith('.test.js')
    ) {
      console.log(file)
      await runTestFile(file)
    }
  }
}

void run(process.argv[2])
