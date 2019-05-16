import { connect } from 'react-redux'

import FileComponent from '../../components/file'
import { getCurrentFile } from '../../selectors'

const mapStateToProps = state => ({
  fileData: getCurrentFile(state)
})

export default connect(
  mapStateToProps,
  null
)(FileComponent)
