import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TreeComponent from '../../components/tree'
import { selectTreeNode, setTreeNodeClosed } from '../../actions'
import { getCurrentTreeNode, getTreeData } from '../../selectors'

const mapStateToProps = state => ({
  currentTreeNode: getCurrentTreeNode(state),
  treeData: getTreeData(state)
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectTreeNode,
      setTreeNodeClosed
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeComponent)
