/* eslint-disable new-cap */
import { getFileDataDone, getTreeDataDone } from '.'

let socket = null

export const wsMiddleware = () => {
  return next => action => {
    if (socket) {
      switch (action.type) {
        case 'ApiReadTree':
          socket.emit('client:ReadTree', {})
          break
        case 'ApiGetFileData':
          socket.emit('client:GetFileData', action.data)
          break
        case 'ApiGetTreeData':
          socket.emit('client:GetTreeData')
          break
        case 'ApiSetTreeData':
          socket.emit('client:SetTreeData', action.data)
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
    if (typeof data.message === 'string')
      store.dispatch({ type: 'ApiReadTree' })
    else store.dispatch(getTreeDataDone(data))
  })
}
