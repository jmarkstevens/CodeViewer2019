import React from 'react'

import TreeContainer from '../../containers/tree'

const AppComponent = () => {
  return (
    <div className="app-container">
      <div className="tree-container">
        <TreeContainer />
      </div>
      <div className="file-container">
        FileContainer{/* <FileContainer /> */}
      </div>
    </div>
  )
}

export default AppComponent
