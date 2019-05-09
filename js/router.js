const getSetData = require('./routes/GetSetData')
const readTree = require('./routes/readTree')

module.exports = socket => {
  const getFileDataDone = data => {
    socket.emit('server:GetFileDataDone', data)
  }
  const onGetFileData = data => {
    getSetData.getFileData(data, getFileDataDone)
  }
  socket.on('client:getFileData', onGetFileData)

  const getTreeDataDone = data => {
    socket.emit('server:GetTreeDataDone', data)
  }
  const onGetTreeData = () => {
    getSetData.getData('FileTree', getTreeDataDone)
  }
  socket.on('client:getTreeData', onGetTreeData)

  const onReadTree = () => {
    readTree(onGetTreeData)
  }
  socket.on('client:readTree', onReadTree)

  const getTreeDataStateDone = data => {
    socket.emit('server:GetTreeDataStateDone', data)
  }
  const onGetTreeDataState = () => {
    getSetData.getData('FileTreeState', getTreeDataStateDone)
  }
  socket.on('client:getTreeDataState', onGetTreeDataState)

  const onSetTreeDataState = data => {
    getSetData.setData('FileTreeState', data)
  }
  socket.on('client:setTreeDataState', onSetTreeDataState)
}
