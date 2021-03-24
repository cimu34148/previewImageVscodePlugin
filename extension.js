const vscode = require('vscode')
const utils = require('./utils')

/**
 * 
 * 目前只能识别 一行里只有一个图片地址的情况
 * 不能识别本地图片
 */
function activate(context) {

	let disposable = vscode.languages.registerHoverProvider(['*'], {
		provideHover(document, position) {
			const word = utils.getWord(document, position)
			const uri = utils.getUri(word)
			if(!uri) return

			if(utils.isShowHover(word, uri, position.character)) {
				return new vscode.Hover(`![${uri}](${uri})`)
			}
		}
	})

	context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
