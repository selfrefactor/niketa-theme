/**
 * E2E Screenshot Generator for Niketa Light Themes
 *
 * For each theme in themes/*.json, generates a VS Code-like screenshot
 * showing highlighted sample code (JS + HTML + CSS + JSON) with sidebar.
 *
 * Uses Shiki (TextMate grammar highlighting, same engine as VS Code)
 * and Puppeteer (headless Chromium) for the screenshot.
 *
 * Usage: node src/e2e-screenshots/generate-screenshots.js
 */

const { createHighlighter } = require('shiki')
const puppeteer = require('puppeteer-core')
const { readFileSync, readdirSync, mkdirSync, existsSync, rmSync } = require('fs')
const { resolve } = require('node:path')

const THEMES_DIR = resolve(__dirname, '../../themes')
const SAMPLES_DIR = resolve(__dirname, 'samples')
const RAW_SCREENS_DIR = resolve(__dirname, '../../files/raw_screens')

const SAMPLE_FILES = [
  { lang: 'javascript', file: resolve(SAMPLES_DIR, 'sample.js') },
  { lang: 'html',       file: resolve(SAMPLES_DIR, 'sample.html') },
  { lang: 'css',        file: resolve(SAMPLES_DIR, 'sample.css') },
  { lang: 'json',       file: resolve(SAMPLES_DIR, 'sample.json') },
]

function findChromium() {
  const candidates = [
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/snap/bin/chromium',
  ]
  for (const p of candidates) {
    if (existsSync(p)) return p
  }
  try {
    const { execSync } = require('child_process')
    const result = execSync('which chromium chromium-browser google-chrome 2>/dev/null', {
      encoding: 'utf-8',
    })
    const match = result.trim().split('\n')[0]
    if (match) return match
  } catch {}
  return '/usr/bin/chromium'
}

function buildCombinedSample() {
  const parts = []
  for (const { lang, file } of SAMPLE_FILES) {
    const code = readFileSync(file, 'utf-8').trim()
    parts.push(`// ── ${lang.toUpperCase()} ──────────────────────────\n${code}`)
  }
  return parts.join('\n\n')
}

async function generateHighlightedHtml(highlighter, themeJson, combinedCode) {
  return highlighter.codeToHtml(combinedCode, {
    lang: 'javascript',
    theme: themeJson,
  })
}

/**
 * Build a full HTML page with VS Code editor + sidebar (light theme variant).
 */
function buildPageHtml(highlightedHtml, themeJson) {
  const editorBg = themeJson.colors?.['editor.background'] || '#FFFFFF'
  const editorFg = themeJson.colors?.['editor.foreground'] || '#000000'
  const sidebarBg = themeJson.colors?.['sideBar.background'] || '#F3F3F3'
  const sidebarFg = themeJson.colors?.['sideBar.foreground'] || '#333333'
  const sidebarTitleFg = themeJson.colors?.['sideBarTitle.foreground'] || '#666666'
  const statusBarBg = themeJson.colors?.['statusBar.background'] || '#0066B8'
  const statusBarFg = themeJson.colors?.['statusBar.foreground'] || '#FFFFFF'
  const tabActiveBg = themeJson.colors?.['tab.activeBackground'] || '#FFFFFF'
  const tabInactiveBg = themeJson.colors?.['tab.inactiveBackground'] || '#ECECEC'

  const fileTree = `
    <div class="section-header">EXPLORER</div>
    <div class="tree">
      <div class="tree-item dir open">
        <span class="arrow">▾</span>
        <span class="icon folder-open">📂</span>
        <span>niketa-theme</span>
      </div>
      <div class="tree-children">
        <div class="tree-item dir open">
          <span class="arrow">▾</span>
          <span class="icon folder-open">📂</span>
          <span>src</span>
        </div>
        <div class="tree-children">
          <div class="tree-item dir">
            <span class="arrow">▸</span>
            <span class="icon folder">📁</span>
            <span>assets</span>
          </div>
          <div class="tree-item file active">
            <span class="icon file">📄</span>
            <span>sample.js</span>
          </div>
          <div class="tree-item file">
            <span class="icon file">📄</span>
            <span>utils.js</span>
          </div>
          <div class="tree-item file">
            <span class="icon file">📄</span>
            <span>styles.css</span>
          </div>
        </div>
        <div class="tree-item dir">
          <span class="arrow">▸</span>
          <span class="icon folder">📁</span>
          <span>themes</span>
        </div>
        <div class="tree-item file">
          <span class="icon file">📄</span>
          <span>package.json</span>
        </div>
      </div>
    </div>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #e8e8e8;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  .editor-window {
    border-radius: 10px;
    overflow: hidden;
    width: 1240px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.15);
  }

  .title-bar {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    background: #f0f0f0;
    border-bottom: 1px solid rgba(0,0,0,0.08);
  }
  .title-bar .dots {
    display: flex;
    gap: 8px;
    margin-right: 20px;
  }
  .title-bar .dot {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .title-bar .dot.red { background: #ff5f56; }
  .title-bar .dot.yellow { background: #ffbd2e; }
  .title-bar .dot.green { background: #27c93f; }
  .title-bar .filename {
    color: rgba(0,0,0,0.4);
    font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace;
    font-size: 13px;
  }

  .window-body {
    display: flex;
    flex-direction: row;
    height: 560px;
  }

  .sidebar {
    width: 260px;
    background: ${sidebarBg};
    color: ${sidebarFg};
    border-right: 1px solid rgba(0,0,0,0.08);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }
  .sidebar .section-header {
    padding: 10px 16px 6px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: ${sidebarTitleFg};
    text-transform: uppercase;
  }
  .sidebar .tree { padding: 0 0 0 8px; flex: 1; overflow: auto; }
  .tree-item {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    font-size: 13px;
    line-height: 24px;
    cursor: default;
    color: ${sidebarFg};
    white-space: nowrap;
  }
  .tree-item .arrow { width: 16px; text-align: center; font-size: 10px; opacity: 0.6; flex-shrink: 0; }
  .tree-item .icon { width: 16px; text-align: center; font-size: 13px; flex-shrink: 0; }
  .tree-item.active {
    background: rgba(0,0,0,0.06);
    color: #000;
    position: relative;
  }
  .tree-item.active::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: #0078d4;
  }
  .tree-children { padding-left: 20px; }

  .editor-pane {
    flex: 1;
    background: ${editorBg};
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .editor-tabs {
    display: flex;
    background: ${tabInactiveBg};
    border-bottom: 1px solid rgba(0,0,0,0.08);
    padding: 0;
  }
  .editor-tab {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    font-size: 12px;
    color: rgba(0,0,0,0.4);
    border-right: 1px solid rgba(0,0,0,0.06);
    cursor: default;
  }
  .editor-tab.active {
    background: ${tabActiveBg};
    color: ${editorFg};
    border-bottom: 1px solid ${tabActiveBg};
    margin-bottom: -1px;
  }
  .editor-tab .tab-icon { font-size: 11px; }
  .editor-tab .tab-close { opacity: 0.4; font-size: 14px; margin-left: 4px; }

  .editor-content {
    flex: 1;
    overflow: auto;
    padding: 8px 0;
  }
  .editor-content pre.shiki {
    background: transparent !important;
    padding: 0 16px !important;
    margin: 0 !important;
    font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace !important;
    font-size: 13px !important;
    line-height: 1.7 !important;
  }
  .editor-content pre.shiki code { background: transparent !important; }

  .status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2px 12px;
    background: ${statusBarBg};
    color: ${statusBarFg};
    font-size: 12px;
    height: 24px;
  }
  .status-bar .status-left,
  .status-bar .status-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .status-bar .status-item { opacity: 0.85; }
</style>
</head>
<body>
  <div class="editor-window">
    <div class="title-bar">
      <div class="dots">
        <div class="dot red"></div>
        <div class="dot yellow"></div>
        <div class="dot green"></div>
      </div>
      <span class="filename">sample.js — niketa-theme</span>
    </div>
    <div class="window-body">
      <div class="sidebar">${fileTree}</div>
      <div class="editor-pane">
        <div class="editor-tabs">
          <div class="editor-tab active">
            <span class="tab-icon">📄</span> sample.js <span class="tab-close">×</span>
          </div>
          <div class="editor-tab">
            <span class="tab-icon">📄</span> utils.js <span class="tab-close">×</span>
          </div>
          <div class="editor-tab">
            <span class="tab-icon">📄</span> styles.css <span class="tab-close">×</span>
          </div>
        </div>
        <div class="editor-content">${highlightedHtml}</div>
      </div>
    </div>
    <div class="status-bar">
      <div class="status-left">
        <span class="status-item">main</span>
        <span class="status-item">◎</span>
      </div>
      <div class="status-right">
        <span class="status-item">JavaScript</span>
        <span class="status-item">UTF-8</span>
        <span class="status-item">Spaces: 2</span>
        <span class="status-item">Ln 1, Col 1</span>
      </div>
    </div>
  </div>
</body>
</html>`
}

async function generateAllScreenshots() {
  console.log('E2E Screenshot Generator — Niketa Light')
  console.log('=' .repeat(50))

  // Start from a clean directory so no stale screenshot can be copied forward
  rmSync(RAW_SCREENS_DIR, { recursive: true, force: true })
  mkdirSync(RAW_SCREENS_DIR, { recursive: true })

  const chromiumPath = findChromium()
  console.log(`Chromium: ${chromiumPath}\n`)

  const themeFiles = readdirSync(THEMES_DIR)
    .filter(f => f.endsWith('.json'))
    .sort()

  if (themeFiles.length === 0) {
    console.error('No theme JSONs found in', THEMES_DIR)
    process.exit(1)
  }

  console.log(`Found ${themeFiles.length} themes\n`)
  const combinedCode = buildCombinedSample()

  console.log('Launching browser...')
  const browser = await puppeteer.launch({
    executablePath: chromiumPath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  console.log('Browser ready\n')

  let success = 0
  let failure = 0

  for (const themeFile of themeFiles) {
    const themeName = themeFile.replace('.json', '')
    const themePath = resolve(THEMES_DIR, themeFile)
    const outputPath = resolve(RAW_SCREENS_DIR, `${themeName}.png`)

    process.stdout.write(`  ${themeName}... `)

    try {
      const themeJson = JSON.parse(readFileSync(themePath, 'utf-8'))
      const themeHighlighter = await createHighlighter({
        langs: ['javascript', 'html', 'css', 'json'],
        themes: [themeJson],
      })
      const highlightedHtml = await generateHighlightedHtml(themeHighlighter, themeJson, combinedCode)
      const pageHtml = buildPageHtml(highlightedHtml, themeJson)

      const dataUri = 'data:text/html;base64,' + Buffer.from(pageHtml).toString('base64')
      await page.goto(dataUri, { waitUntil: 'load', timeout: 15000 })
      await page.screenshot({ path: outputPath, fullPage: false })

      success++
      console.log('✓')
    } catch (err) {
      failure++
      console.log(`✗ ${err.message}`)
    }
  }

  await browser.close()
  console.log(`\nDone! ${success} succeeded, ${failure} failed`)
  console.log(`Screenshots saved to ${RAW_SCREENS_DIR}`)

  // A partial run must not be copied into files/ by populate-screens.js
  if (failure > 0) process.exit(1)
}

generateAllScreenshots().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
