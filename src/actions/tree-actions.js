export function selectTreeNode(node) {
  return (dispatch, getState) => {
    dispatch({ type: 'SelectTreeNode', node })
    dispatch({
      type: 'ApiSetTreeData',
      data: getState().TreeState.treeData
    })
    const { currentTreeNode } = getState().TreeState
    const filePath = currentTreeNode.nodeid
    dispatch({
      type: 'ApiGetFileData',
      data: { filePath, nodeid: currentTreeNode.nodeid }
    })
  }
}

export function setTreeNodeClosed(node) {
  return (dispatch, getState) => {
    dispatch({ type: 'SetTreeNodeClosed', node })
    dispatch({
      type: 'ApiSetTreeData',
      data: getState().TreeState.treeData
    })
  }
}

export function getTreeDataDone(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'GetTreeDataDone', data })
    dispatch(selectTreeNode(getState().TreeState.currentTreeNode))
  }
}
