/**
 * Single source of truth for how a theme label turns into file names,
 * README titles and Marketplace links.
 *
 * themes/CommunicationBreakdown.json
 *   → files/communication.breakdown.png
 *   → "### Communication Breakdown"
 *   → marketplace ...itemName=selfrefactor.CommunicationBreakdown
 */

const REPO_URL = 'https://github.com/selfrefactor/niketa-theme'
const MARKETPLACE_URL = 'https://marketplace.visualstudio.com/items?itemName'

/**
 * PascalCase → dot.case (e.g. "CommunicationBreakdown" → "communication.breakdown")
 */
function dotCase(label) {
  return label
    .replace(/([A-Z])/g, '.$1')
    .replace(/^\./, '')
    .toLowerCase()
}

/**
 * PascalCase → title case (e.g. "CommunicationBreakdown" → "Communication Breakdown")
 */
function themeTitle(label) {
  return label.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
}

function standaloneUrl(label) {
  return `${MARKETPLACE_URL}=selfrefactor.${label}`
}

function screenUrl(label) {
  return `${REPO_URL}/blob/master/files/${dotCase(label)}.png?raw=true`
}

function screenPath(label) {
  return `files/${dotCase(label)}.png`
}

module.exports = {
  dotCase,
  screenPath,
  screenUrl,
  standaloneUrl,
  themeTitle,
}
