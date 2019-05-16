/* eslint-disable new-cap */
import { getFileDataDone, getTreeDataDone } from '.'

let socket = null

export const wsMiddleware = () => {
  return next => action => {
    if (socket) {
      switch (action.type) {
        case 'ApiReadTree':
          socket.emit('client:readTree', {})
          break
        case 'ApiGetFileData':
          socket.emit('client:getFileData', action.data)
          break
        case 'ApiGetTreeData':
          socket.emit('client:getTreeData')
          break
        case 'ApiSetTreeData':
          socket.emit('client:setTreeData', action.data)
          break
        default:
          break
      }
    }
    return next(action)
  }
}

export const startWs = store => {
  socket = new io()

  socket.on('server:GetFileDataDone', data => {
    store.dispatch(getFileDataDone(data.fileData))
  })

  socket.on('server:GetTreeDataDone', data => {
    store.dispatch(getTreeDataDone(data))
  })
}
