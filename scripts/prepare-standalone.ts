import { cp, mkdir } from 'node:fs/promises'
import path from 'node:path'

const standaloneDir = path.resolve('.next/standalone')

await mkdir(path.join(standaloneDir, '.next'), { recursive: true })
await Promise.all([
  cp(path.resolve('public'), path.join(standaloneDir, 'public'), { recursive: true }),
  cp(path.resolve('.next/static'), path.join(standaloneDir, '.next/static'), { recursive: true }),
])

console.log('Standalone server assets prepared.')
