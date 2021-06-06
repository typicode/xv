#!/usr/bin/env node
import fg from 'fast-glob'
import { join } from 'path'

const glob = process.argv[2] || ''
const entries = fg.sync(glob)

for (const entry of entries) {
  console.log(entry)
  try {
    await import(join(process.cwd(), entry))
  } catch {
    process.exit(1)
  }
}
