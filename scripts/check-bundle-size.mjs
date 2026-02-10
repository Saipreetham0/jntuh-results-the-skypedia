import fs from 'fs'
import path from 'path'

const root = process.cwd()
const chunksDir = path.join(root, '.next/static/chunks')
const cssDir = path.join(root, '.next/static/css')
const budgetKb = Number(process.env.BUNDLE_BUDGET_KB || 12000)

const exts = new Set(['.js', '.css'])

function sumFiles(dir) {
  if (!fs.existsSync(dir)) return 0
  let total = 0
  const stack = [dir]
  while (stack.length) {
    const current = stack.pop()
    const entries = fs.readdirSync(current, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(current, entry.name)
      if (entry.isDirectory()) {
        stack.push(full)
        continue
      }
      const ext = path.extname(entry.name)
      if (!exts.has(ext)) continue
      const stat = fs.statSync(full)
      total += stat.size
    }
  }
  return total
}

const jsBytes = sumFiles(chunksDir)
const cssBytes = sumFiles(cssDir)
const totalBytes = jsBytes + cssBytes
const totalKb = Math.ceil(totalBytes / 1024)

const report = [
  '# Bundle Size Report',
  '',
  `Budget (KB): ${budgetKb}`,
  `Total JS+CSS (KB): ${totalKb}`,
  `JS+CSS Bytes: ${totalBytes}`,
  '',
  `Chunks dir: ${fs.existsSync(chunksDir) ? 'found' : 'missing'}`,
  `CSS dir: ${fs.existsSync(cssDir) ? 'found' : 'missing'}`,
].join('\n')

fs.writeFileSync(path.join(root, 'bundle-report.md'), report)

if (totalKb > budgetKb) {
  console.error(`Bundle size ${totalKb}KB exceeds budget ${budgetKb}KB`)
  process.exit(1)
}

console.log(`Bundle size ${totalKb}KB within budget ${budgetKb}KB`)
