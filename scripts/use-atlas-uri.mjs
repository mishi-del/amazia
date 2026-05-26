import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pasteFile = path.join(root, 'atlas-connection.txt')
const envFile = path.join(root, '.env')

const raw = fs.readFileSync(pasteFile, 'utf8')
const line = raw
  .split(/\r?\n/)
  .map((l) => l.trim())
  .find((l) => l.startsWith('mongodb'))

if (!line || line.includes('PASTE_YOUR') || line.includes('XXXXX') || line.includes('YOUR_PASSWORD')) {
  console.error('')
  console.error('Could not find a real Atlas link in atlas-connection.txt')
  console.error('Open MongoDB Atlas → Cluster0 → Connect → Drivers → copy → paste on its own line.')
  console.error('')
  process.exit(1)
}

let env = fs.readFileSync(envFile, 'utf8')
if (/^MONGODB_URI=.*/m.test(env)) {
  env = env.replace(/^MONGODB_URI=.*/m, `MONGODB_URI=${line}`)
} else {
  env += `\nMONGODB_URI=${line}\n`
}
fs.writeFileSync(envFile, env)
console.log('Done! .env now uses your MongoDB Atlas database.')
console.log('Run START-AMAZIA.bat again.')
