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
				const prefix = ['http', 'https']
				let prefixPos = ''
				for(let i = 0;i < prefix.length;i++) {
					prefixPos = item.indexOf(prefix[i])
					if(prefixPos > -1) {
						break
					}
				}

				if(prefixPos && prefixPos > -1) {
					let result = item.slice(prefixPos)
					const dotReg = /('|"|,|\)|;)$/
					while(dotReg.test(result)) {
						result = result.replace(dotReg, '')
					}
					return result
				}
			})
			
			if(imgUrl && imgUrl.length) {
				return new vscode.Hover(`![](${imgUrl[0]})`)
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
