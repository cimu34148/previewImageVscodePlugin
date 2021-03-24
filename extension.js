const vscode = require('vscode');

/**
 * 
 * 目前只能识别 一行里只有一个图片地址的情况
 */
function activate(context) {

	let disposable = vscode.languages.registerHoverProvider(['*'], {
		provideHover(document, position) {
			const
				{ character, line } = position,
				lineText = document.lineAt(line),
				word = lineText.text,
				reg = /\.(png|jpg|jpeg|gif|svg|bmp|ico|webp)/;

			let imgUrl = word.split(' ').filter(text => {
				if(reg.test(text)) {
					return text
				}
			})[0]

			if(!imgUrl) return
			
			// 截取开头
			const prefix = ['http', 'https']
			let prefixPos = ''
			for(let i = 0;i < prefix.length;i++) {
				prefixPos = imgUrl.indexOf(prefix[i])
				if(prefixPos > -1) {
					break
				}
			}
			
			// 截取结尾
			if(prefixPos && prefixPos > -1) {
				let result = imgUrl.slice(prefixPos)
				const dotReg = /('|"|,|\)|;)$/
				while(dotReg.test(result)) {
					result = result.replace(dotReg, '')
				}
				imgUrl = result
			}

			
			if(imgUrl) {
				// 判断用户hover的坐标是否在图片地址内
				const startPos = word.indexOf(imgUrl)
				const endPos = startPos + (imgUrl.length - 1)
				if(character <= endPos && startPos <= character) {
					return new vscode.Hover(`![](${imgUrl})`)
				}
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
