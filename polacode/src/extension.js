const fs = require('fs')
const path = require('path')
const vscode = require('vscode')
const { homedir } = require('os')

const writeSerializedBlobToFile = (serializeBlob, fileName) => {
  const bytes = new Uint8Array(serializeBlob.split(','))
  fs.writeFileSync(fileName, Buffer.from(bytes))
}

const P_TITLE = 'Polacode 📸'

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context){
  const htmlPath = path.resolve(context.extensionPath, 'webview/index.html')

  let lastUsedImageUri = vscode.Uri.file(path.resolve(homedir(), 'Desktop/code.png'))
  let panel

  vscode.window.registerWebviewPanelSerializer('polacode', {
    async deserializeWebviewPanel(_panel, state){
      panel = _panel
      panel.webview.html = getHtmlContent(htmlPath)
      panel.webview.postMessage({
        type      : 'restore',
        innerHTML : state.innerHTML,
        bgColor   : context.globalState.get('polacode.bgColor', '#2e3440'),
      })
      setupMessageListeners()
    },
  })

  vscode.commands.registerCommand('polacode.activate', () => {
    panel = vscode.window.createWebviewPanel('polacode', P_TITLE, 2, {
      enableScripts      : true,
      localResourceRoots : [ vscode.Uri.file(path.join(context.extensionPath, 'webview')) ],
    })

    panel.webview.html = getHtmlContent(htmlPath)

    setupMessageListeners()

    const fontFamily = 'Operator Mono'
    // const fontFamily = vscode.workspace.getConfiguration('editor').fontFamily
    const bgColor = vscode.workspace.getConfiguration('editor').background
    panel.webview.postMessage({
      type : 'init',
      fontFamily,
      bgColor,
    })
  })

  function setupMessageListeners(){
    panel.webview.onDidReceiveMessage(({ type, data }) => {
      switch (type){
      case 'shoot':
        vscode.window
          .showSaveDialog({
            defaultUri : lastUsedImageUri,
            filters    : { Images : [ 'png' ] },
          })
          .then(uri => {
            if (uri){
              writeSerializedBlobToFile(data.serializedBlob, uri.fsPath)
              lastUsedImageUri = uri
            }
          })
        break
      case 'updateBgColor':
        context.globalState.update('polacode.bgColor', data.bgColor)
        break
      }
    })
  }
}

function getHtmlContent(htmlPath){
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8')

  return htmlContent.replace(/script src="([^"]*)"/g, (match, src) => {
    const realSource = 'vscode-resource:' + path.resolve(htmlPath, '..', src)

    return `script src="${ realSource }"`
  })
}

exports.activate = activate
