import React from 'react'

const FileViewSty = {
  backgroundColor: '#001000',
  color: '#ccc',
  margin: '5px 20px',
  overflow: 'auto',
  width: '100%'
}

const FileCtrlSty = {
  marginBottom: '5%',
  width: '100%'
}

const FileView = ({ fileData }) => {
  const htmlDivSty = { width: '100%' }
  if (fileData.startsWith('<pre>')) htmlDivSty.overflow = 'hidden'
  else htmlDivSty.overflow = 'auto'
  const fileHtml = { __html: fileData }
  return (
    <div id="FileViewCtrlRenderSty" style={FileViewSty}>
      <div id="FileCtrlSty" style={FileCtrlSty}>
        <div dangerouslySetInnerHTML={fileHtml} style={htmlDivSty} />
      </div>
    </div>
  )
}

export default FileView
