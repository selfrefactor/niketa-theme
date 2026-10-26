/**
 * Rewrites the "## Screens" section of README.md from package.json themes.
 *
 * The section is generated, never hand-edited: each block is title →
 * standalone Marketplace link → screenshot, built from theme-names.js.
 * Running it twice produces no diff.
 *
 * Usage:
 *   node src/e2e-screenshots/update-readme.js          (write)
 *   node src/e2e-screenshots/update-readme.js --check  (exit 1 when stale)
 */

const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('node:path')
const { screenUrl, standaloneUrl, themeTitle } = require('./theme-names')

const ROOT = resolve(__dirname, '../..')
const README_PATH = resolve(ROOT, 'README.md')
const PACKAGE_JSON = resolve(ROOT, 'package.json')

const SCREENS_HEADING = '## Screens'

function renderThemeBlock(label) {
  return [
    `### ${themeTitle(label)}`,
    `[As a standalone version](${standaloneUrl(label)})`,
    `![VSCode theme screen](${screenUrl(label)})`,
  ].join('\n\n')
}

function renderScreensSection(themes) {
  const blocks = themes
    .map(({ label }) => ({ label, title: themeTitle(label) }))
    .sort((a, b) => (a.title > b.title ? 1 : -1))
    .map(({ label }) => renderThemeBlock(label))

  return `${SCREENS_HEADING}\n\n${blocks.join('\n\n')}\n`
}

/**
 * Replace the screens section, keeping the blank line before the next heading.
 */
function replaceScreensSection(readme, section) {
  const start = readme.indexOf(`${SCREENS_HEADING}\n`)
  if (start === -1) {
    throw new Error(`README.md has no "${SCREENS_HEADING}" heading`)
  }

  const nextHeading = readme.indexOf('\n## ', start + SCREENS_HEADING.length)
  const end = nextHeading === -1 ? readme.length : nextHeading

  return readme.slice(0, start) + section + readme.slice(end)
}

function main() {
  const checkOnly = process.argv.includes('--check')
  const pkg = JSON.parse(readFileSync(PACKAGE_JSON, 'utf-8'))
  const themes = pkg.contributes?.themes

  if (!themes || themes.length === 0) {
    console.error('No themes found in package.json contributes.themes')
    process.exit(1)
  }

  const readme = readFileSync(README_PATH, 'utf-8')
  const updated = replaceScreensSection(readme, renderScreensSection(themes))

  if (updated === readme) {
    console.log('README.md screens section is up to date')
    return
  }

  if (checkOnly) {
    console.error('README.md screens section is out of date — run "yarn screens:readme"')
    process.exit(1)
  }

  writeFileSync(README_PATH, updated)
  console.log(`README.md screens section updated (${themes.length} themes)`)
}

if (require.main === module) main()

module.exports = {
  README_PATH,
  renderScreensSection,
  renderThemeBlock,
  replaceScreensSection,
}
