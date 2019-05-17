const fs = require('fs')

const Remarkable = require('remarkable')

const remark = new Remarkable()

const Highlights = require('highlights')

const highlighter = new Highlights()

const config = require('../../config.json')

let configRoot
switch (process.platform) {
  case 'darwin':
    configRoot = config.darwin
    break
  case 'linux':
    configRoot = config.linux
    break
  case 'win32':
    configRoot = config.win32
    break
  default:
    break
}
const { dataRoot, readRoot } = configRoot

module.exports.getFileData = (clientData, doneCallBack) => {
  const filePath = readRoot + clientData.filePath
  function fileReadCallBack(err, data) {
    if (err) return doneCallBack({ fileData: 'folder' })

    const inData = data.toString()
    const inFile = clientData.filePath
    let outData = ''
    if (inFile.endsWith('.js')) {
      outData = highlighter.highlightSync({
        fileContents: inData,
        scopeName: 'source.js'
      })
    } else if (inFile.endsWith('.jsx')) {
      outData = highlighter.highlightSync({
        fileContents: inData,
        scopeName: 'source.js'
      })
    } else if (inFile.endsWith('.ts')) {
      outData = highlighter.highlightSync({
        fileContents: inData,
        scopeName: 'source.js'
      })
    } else if (inFile.endsWith('.tsx')) {
      outData = highlighter.highlightSync({
        fileContents: inData,
        scopeName: 'source.js'
      })
    } else if (inFile.endsWith('.json')) {
      outData = highlighter.highlightSync({
        fileContents: inData,
        scopeName: 'source.json'
      })
    } else if (inFile.endsWith('.css')) {
      outData = highlighter.highlightSync({
        fileContents: inData,
        scopeName: 'source.css'
      })
    } else if (inFile.endsWith('.scss')) {
      outData = highlighter.highlightSync({
        fileContents: inData,
        scopeName: 'source.css'
      })
    } else if (inFile.endsWith('.html')) {
      outData = highlighter.highlightSync({
        fileContents: inData,
        scopeName: 'text.html.basic'
      })
    } else {
      outData = remark.render(inData)
    }

    return doneCallBack({ fileData: outData })
  }
  fs.readFile(filePath, fileReadCallBack)
}

module.exports.getData = (fileName, doneCallBack) => {
  const filePath = `${dataRoot}/${fileName}.json`
  const jsonReadCallBack = (err, data) => {
    if (err) return doneCallBack({ message: 'Data readFile error' })
    const jsonData = JSON.parse(data.toString())
    return doneCallBack(jsonData)
  }
  fs.readFile(filePath, jsonReadCallBack)
}

module.exports.setData = (fileName, data, doneCallBack) => {
  const filePath = `${dataRoot}/${fileName}.json`
  const writeFileCallBack = err => {
    if (err) return doneCallBack({ message: 'Data writeFile error', filePath })
    if (doneCallBack) return doneCallBack({ setResponse: 'ok' })
    return null
  }
  fs.writeFile(filePath, JSON.stringify(data, null, 2), writeFileCallBack)
}
