import React from 'react'
import TreeView from '../common/TreeView'

const TreeComponent = ({ selectTreeNode, setTreeNodeClosed, treeData }) => {
  const options = {
    icon: { sun: 'dev', leaf: 'home', snow: 'sys' },
    typeName: ['node', 'type']
  }
  if (typeof treeData === 'undefined' || treeData.length === 0) return null
  return (
    <div>
      <TreeView
        data={treeData}
        options={options}
        iconClick={setTreeNodeClosed}
        titleClick={selectTreeNode}
      />
    </div>
  )
}

export default TreeComponent
