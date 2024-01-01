const { readJson } = require('fs-extra')

async function fromImportedTheme(start, end){
  const { tokenColors } = await readJson(`${ __dirname }/assets/external-theme.json`)
  if (typeof start !== 'number' || typeof end !== 'number') return tokenColors
  console.log(start, end, tokenColors.length, 'start, end, tokenColors.length')
  const toReturn = tokenColors.slice(start, end)

  return toReturn
}

exports.fromImportedTheme = fromImportedTheme
