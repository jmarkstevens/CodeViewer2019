const getSetData = require('./routes/GetSetData')
const readTree = require('./routes/readTree')

module.exports = socket => {
  const getFileDataDone = data => {
    socket.emit('server:GetFileDataDone', data)
  }
  const onGetFileData = data => {
    getSetData.getFileData(data, getFileDataDone)
  }
  socket.on('client:GetFileData', onGetFileData)

  const getTreeDataDone = data => {
    socket.emit('server:GetTreeDataDone', data)
  }
  const onGetTreeData = () => {
    getSetData.getData('FileTree', getTreeDataDone)
  }
  socket.on('client:GetTreeData', onGetTreeData)

  const onReadTree = () => {
    readTree(onGetTreeData)
  }
  socket.on('client:ReadTree', onReadTree)

  const onSetTreeData = data => {
    getSetData.setData('FileTree', data)
  }
  socket.on('client:SetTreeData', onSetTreeData)
}
