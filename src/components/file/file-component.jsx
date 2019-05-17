/* eslint-disable react/no-danger */
import React from 'react'

const FileView = ({ fileData }) => {
  const fileHtml = { __html: fileData }
  return (
    <div className="file-view">
      <div className="file-view-html" dangerouslySetInnerHTML={fileHtml} />
    </div>
  )
}

export default FileView
