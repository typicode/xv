#!/usr/bin/env node
import { fork } from 'node:child_process'
import { promises as fs } from 'node:fs'
import { basename, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const regexp = /^test\.(js|ts)$|\.test\.(js|ts)$/

function parse(argv: string[]): [string[], string[]] {
  const execArgv: string[] = []
  const args = argv.filter((arg) => {
    if (arg.startsWith('--')) {
      execArgv.push(arg)
      return false
    }
    return true
  })
  return [execArgv, args]
}

function forkProcess(execArgv: string[], args: string[]) {
  const child = fork(fileURLToPath(import.meta.url), args, {
    execArgv,
    stdio: 'inherit',
  })
  child.on('exit', (code) => process.exit(code ?? 0))
  child.on('error', (err) => {
    throw err
  })
}

async function* walk(dir: string): AsyncGenerator<string> {
  for await (const d of await fs.opendir(dir)) {
    const entry = join(dir, d.name)
    if (d.isDirectory() && d.name !== 'node_modules') yield* walk(entry)
    else if (d.isFile()) yield entry
  }
}

async function runTestFile(file: string): Promise<void> {
  const functions = []
  for (const v of Object.values(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await import(pathToFileURL(file).toString()),
  )) {
    if (typeof v === 'function') functions.push(v)
  }
  if (functions.length === 0) {
    console.log(`${file}: no tests found!`)
  } else {
    console.time(file)
    for (const fn of functions) {
      try {
        await fn()
      } catch (e) {
        console.error(e instanceof Error ? e.stack : e)
        process.exit(1)
      }
    }
    console.timeEnd(file)
  }
}

async function run(paths: string[]) {
  for (const p of paths) {
    if ((await fs.lstat(p)).isFile()) {
      return runTestFile(p)
    }
    for await (const file of walk(p)) {
      if (regexp.test(basename(file))) {
        await runTestFile(file)
      }
    }
  }
}

const [execArgv, args] = parse(process.argv.slice(2))
if (!args.length) args.push('.')
if (execArgv.length) {
  forkProcess(execArgv, args)
} else {
  void run(args)
}
