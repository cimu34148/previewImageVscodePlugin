const vscode = require('vscode');


function activate(context) {

	let disposable = vscode.languages.registerHoverProvider(['*'], {
		provideHover(document, position) {
			const line = position.line
			const lineText = document.lineAt(line)
			const word = lineText.text.trim()

			const reg = /\.(png|jpg|jpeg|gif|svg|bmp|ico|webp)/

			const imgUrl = word.split(' ').filter(text => {
				if(reg.test(text)) {
					return text
				}
			}).map(item => {
				const httpPos = item.indexOf('http://')
				const httpsPos = httpPos > -1 ? httpPos : item.indexOf('https://')
				if(httpsPos > -1) {
					let result = item.slice(httpsPos)
					const dotReg = /('|"|,)$/
					while(dotReg.test(result)) {
						result = result.replace(dotReg, '')
					}
					return result
				}
			})
			
			console.log(imgUrl)
			if(imgUrl) {
				return new vscode.Hover(`![](${imgUrl})`)
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
