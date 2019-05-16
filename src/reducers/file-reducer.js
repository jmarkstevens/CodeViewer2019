const initialFileState = {
  fileData: ''
}

export default function handleActions(state = initialFileState, action) {
  const fileState = Object.assign({}, state)
  switch (action.type) {
    case 'GetFileDataDone':
      fileState.fileData = action.data
      return fileState
    case 'GetTreeDataDone':
      fileState.fileData = ''
      return fileState
    default:
      return state
  }
}
