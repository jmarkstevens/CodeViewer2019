/* eslint-disable react/no-danger */
import React from 'react'

const FileView = ({ fileData }) => {
  const htmlDivSty = { width: '100%' }
  if (fileData.startsWith('<pre>')) htmlDivSty.overflow = 'hidden'
  else htmlDivSty.overflow = 'auto'
  const fileHtml = { __html: fileData }
  return (
    <div className="file-view">
      <div dangerouslySetInnerHTML={fileHtml} style={htmlDivSty} />
    </div>
  )
}

export default FileView
