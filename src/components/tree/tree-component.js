import React from 'react'
import TreeView from '../common/TreeView'

const TreeComponent = ({ selectTreeNode, setTreeNodeClosed, treeData }) => {
  const options = {
    icon: { sun: 'dev', leaf: 'home', snow: 'sys' },
    typeName: ['node', 'type']
  }
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
