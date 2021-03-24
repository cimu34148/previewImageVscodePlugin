function getWord(document, position) {
  const line = position.line
	const lineText = document.lineAt(line)
	const word = lineText.text

  return word
}

function getUri(word) {
  if(!word) return;

  const reg = /\.(png|jpg|jpeg|gif|svg|bmp|ico|webp)/
  let uri = word.split(' ').filter(text => {
    if(reg.test(text)) {
      return text
    }
  })[0]

  return splitUri(uri)
}

function splitUri(uri) {
  if(!uri) return;

  const prefix = ['http', 'https', './', '../']
  let prefixPos = ''

  for(let i = 0;i < prefix.length;i++) {
    prefixPos = uri.indexOf(prefix[i])
    if(prefixPos > -1) {
      break
    }
  }

  if(prefixPos && prefixPos > -1) {
    let result = uri.slice(prefixPos)
    const dotReg = /('|"|,|\)|;|\})$/
    while(dotReg.test(result)) {
      result = result.replace(dotReg, '')
    }
    uri = result
  }
  return uri
}

function isShowHover(word, uri, character) {
  const startPos = word.indexOf(uri)
	const endPos = startPos + (uri.length - 1)

  if(character <= endPos && startPos <= character) {
    return true
  }

  return false
}

module.exports = {
  getWord,
  getUrl,
  splitUri,
  isShowHover
}