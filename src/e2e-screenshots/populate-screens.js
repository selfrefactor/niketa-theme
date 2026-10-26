/**
 * Populate screens: copy files/raw_screens/*.png → files/{name}.png
 * with correct theme names from package.json contributes.themes.
 *
 * Raw screens are named after the theme file (themes/KozmicBlues.json →
 * raw_screens/KozmicBlues.png) and are mapped directly to dot.case
 * (files/kozmic.blues.png). No index-based guessing, so a stray raw file
 * can never shift every screenshot onto the wrong theme.
 *
 * Usage: node src/e2e-screenshots/populate-screens.js
 */

const { readdirSync, copyFileSync, existsSync, mkdirSync } = require('fs')
const { resolve, basename } = require('node:path')
const { dotCase } = require('./theme-names')

const ROOT = resolve(__dirname, '../..')
const FILES_DIR = resolve(ROOT, 'files')
const RAW_SCREENS_DIR = resolve(FILES_DIR, 'raw_screens')
const PACKAGE_JSON = resolve(ROOT, 'package.json')

/**
 * raw file name → expected dot.case destination name
 */
function buildThemeMap(themes) {
  const map = new Map()
  for (const { label, path } of themes) {
    map.set(basename(path, '.json'), dotCase(label))
  }
  return map
}

function main() {
  const pkg = require(PACKAGE_JSON)
  const themes = pkg.contributes?.themes

  if (!themes || themes.length === 0) {
    console.error('No themes found in package.json contributes.themes')
    process.exit(1)
  }

  if (!existsSync(RAW_SCREENS_DIR)) {
    console.error(`Raw screens directory not found: ${RAW_SCREENS_DIR}`)
    console.error('Run "yarn screenshots" first')
    process.exit(1)
  }

  const rawFiles = readdirSync(RAW_SCREENS_DIR)
    .filter(f => f.endsWith('.png'))
    .sort()

  if (rawFiles.length === 0) {
    console.error('No PNG files found in raw_screens/')
    process.exit(1)
  }

  mkdirSync(FILES_DIR, { recursive: true })

  const themeMap = buildThemeMap(themes)
  const copied = new Set()

  for (const rawFile of rawFiles) {
    const rawName = rawFile.replace('.png', '')
    const destName = themeMap.get(rawName)

    if (!destName) {
      console.warn(`  Skipping ${rawFile}: no matching theme in package.json`)
      continue
    }

    copyFileSync(
      resolve(RAW_SCREENS_DIR, rawFile),
      resolve(FILES_DIR, `${destName}.png`),
    )
    copied.add(rawName)
    console.log(`  ${rawFile} → ${destName}.png`)
  }

  const missing = [...themeMap.keys()].filter(rawName => !copied.has(rawName))
  if (missing.length > 0) {
    console.error(`\nMissing screenshots for: ${missing.join(', ')}`)
    process.exit(1)
  }

  console.log(`\nCopied ${copied.size} screenshots`)
}

main()
