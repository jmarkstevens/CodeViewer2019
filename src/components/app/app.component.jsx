import React from 'react'

import FileContainer from '../../containers/file'
import TreeContainer from '../../containers/tree'

const AppComponent = () => {
  return (
    <div className="app-container">
      <div className="tree-container">
        <TreeContainer />
      </div>
      <div className="file-container">
        <FileContainer />
      </div>
    </div>
  )
}

export default AppComponent
