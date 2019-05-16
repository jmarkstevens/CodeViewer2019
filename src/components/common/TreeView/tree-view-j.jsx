import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import lodashGet from 'lodash/get'

const TreeRootSty = { lineHeight: '21px' }
const liSty = { listStyleType: 'none' }
const ulSty = { WebkitPaddingStart: '16px' }
const ulStyle = { WebkitPaddingStart: '16px' }
const iconStyBase = {
  background: "url('./img/sun.ico') 0/16px no-repeat"
}

const defaultColors = {
  parent: '#AF90A5',
  parentSelected: '#7BB53B',
  endnode: '#afac87',
  endnodeSelected: '#b58900'
}

class TreeViewNode extends React.Component {
  static propTypes = {
    node: PropTypes.shape({}).isRequired,
    titleClick: PropTypes.func.isRequired
  }

  state = { visible: false }

  iconHandler = () => {
    const { node, titleClick } = this.props
    const { visible } = this.state
    if (node.children && node.children.length > 0) {
      this.setState({ visible: !visible })
    } else {
      titleClick(node)
    }
  }

  clickHandler = () => {
    const { node, titleClick } = this.props
    titleClick(node)
  }

  render() {
    const { customColors, node, options, titleClick } = this.props
    const { visible } = this.state
    const titleSty = { margin: '1px 0' }
    let childNodes
    let hasChildren = false
    if (node.children && node.children.length > 0) {
      childNodes = node.children.map(child => (
        <li key={child.filename} style={liSty}>
          <TreeViewNode
            customColors={customColors}
            node={child}
            options={options}
            titleClick={titleClick}
          />
        </li>
      ))
      hasChildren = true
    }
    if (hasChildren) {
      titleSty.color = node.selected
        ? customColors.parentSelected
        : customColors.parent
    } else {
      titleSty.color = node.selected
        ? customColors.endnodeSelected
        : customColors.endnode
    }

    let branch = null
    if (visible) {
      branch = (
        <ul id="ulStyle" key={node.filename} style={ulStyle}>
          {childNodes}
        </ul>
      )
    }

    const TreeNodePClass = classNames(
      'tree-node-p',
      {
        'tree-node-p-can-toggle': hasChildren
      },
      {
        'tree-node-p-no-toggle': !hasChildren
      }
    )
    const iconSty = Object.assign({}, iconStyBase)
    const iconType = lodashGet(this.props, options.typeName)
    if (iconType === options.icon.sun)
      iconSty.background = "url('./img/sun.ico') 0/16px no-repeat"
    else if (iconType === options.icon.leaf)
      iconSty.background = "url('./img/leaf.ico') 0/16px no-repeat"
    else if (iconType === options.icon.snow)
      iconSty.background = "url('./img/snow.ico') 0/16px no-repeat"
    // else iconSty.background = "url('./img/sun.ico') 0/16px no-repeat";

    const titleName = node.title

    return (
      <div id="TreeNode">
        <div className={TreeNodePClass}>
          <div
            className="tree-node-icon"
            onClick={this.iconHandler}
            onKeyPress={this.iconHandler}
            role="button"
            style={iconSty}
            tabIndex={0}
          >
            &nbsp;
          </div>
          <div
            id="titleSty"
            onClick={this.clickHandler}
            onKeyPress={this.clickHandler}
            role="button"
            style={titleSty}
            tabIndex={0}
          >
            {titleName}
          </div>
        </div>
        {branch}
      </div>
    )
  }
}

const TreeView = props => {
  const { data, options, titleClick, customColors } = props
  const childNodes = data.map(child => (
    <li key={child.title} style={liSty}>
      <TreeViewNode
        customColors={customColors}
        node={child}
        options={options}
        titleClick={titleClick}
      />
    </li>
  ))
  return (
    <div id="TreeRootSty" style={TreeRootSty}>
      <ul id="ulSty" key="ulRoot" style={ulSty}>
        {childNodes}
      </ul>
    </div>
  )
}

TreeView.defaultProps = {
  customColors: defaultColors
}

TreeView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  options: PropTypes.shape({}).isRequired,
  titleClick: PropTypes.func.isRequired,
  customColors: PropTypes.shape({})
}

export default TreeView
