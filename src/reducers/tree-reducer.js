import lodash from 'lodash'
import traverse from 'traverse'

function getSelected(tree) {
  let result = null
  lodash.each(tree, node => {
    if (node.selected) result = node
    if (result == null && node.children && node.children.length > 0)
      result = getSelected(node.children)
  })
  return result
}

function gotTreeData(treedata) {
  let _currentTreeNode = getSelected(treedata)
  // eslint-disable-next-line prefer-destructuring
  if (_currentTreeNode == null) _currentTreeNode = treedata[0]
  return { treeData: treedata, currentTreeNode: _currentTreeNode }
}

function getNodeIndex(_treeData, treeNode) {
  let treeData = _treeData
  const nodeID = treeNode.nodeid
  if (lodash.isEmpty(nodeID)) {
    return []
  }

  const nodeIdArray = nodeID.split('/')
  let searchID = nodeIdArray.shift()
  const nodeIndex = []
  let index
  let nextSearchID

  while (searchID) {
    if (!treeData) {
      return []
    }
    const treeItem = lodash.find(treeData, { nodeid: searchID })
    index = lodash.indexOf(treeData, treeItem)
    if (index < 0) {
      return []
    }
    nodeIndex.push(index)
    nextSearchID = nodeIdArray.shift()
    if (nextSearchID) {
      searchID += `/${nextSearchID}`
      treeData = treeData[index].children
      if (treeData) {
        nodeIndex.push('children')
      }
    } else searchID = nextSearchID
  }

  return nodeIndex
}

function selectTreeNode(treeData, _currentTreeNode, treeNode) {
  const nodeIndex1 = getNodeIndex(treeData, _currentTreeNode)
  nodeIndex1.push('selected')
  traverse(treeData).set(nodeIndex1, false)
  const nodeIndex2 = getNodeIndex(treeData, treeNode)
  nodeIndex2.push('selected')
  traverse(treeData).set(nodeIndex2, true)

  return { treeData, currentTreeNode: treeNode }
}

function setTreeNodeClosed(_treeData, treeNode) {
  const nodeIndex = getNodeIndex(_treeData, treeNode)
  nodeIndex.push('closed')
  let visible = traverse(_treeData).get(nodeIndex)
  if (typeof visible === 'undefined') visible = false
  else visible = !visible
  if (visible) traverse(_treeData).set(nodeIndex, true)
  else traverse(_treeData).set(nodeIndex, false)

  return { treeData: _treeData }
}

const initialTreeState = {
  treeData: [],
  currentTreeNode: { title: 'not selected' }
}

export default function handleActions(state = initialTreeState, action) {
  const treeState = Object.assign({}, state)
  const treeCopy = treeState.treeData.slice(0)
  const currentCopy = Object.assign({}, treeState.currentTreeNode)
  switch (action.type) {
    case 'GetTreeDataDone': {
      const newTreeData = gotTreeData(action.data)
      return { ...state, ...newTreeData }
    }
    case 'SelectTreeNode': {
      const selectTreeData = selectTreeNode(treeCopy, currentCopy, action.node)
      return { ...state, ...selectTreeData }
    }
    case 'SetTreeNodeClosed': {
      const closedTreeData = setTreeNodeClosed(treeCopy, action.node)
      return { ...state, ...closedTreeData }
    }
    default:
      return state
  }
}
