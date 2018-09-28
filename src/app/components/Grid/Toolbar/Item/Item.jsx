import React from 'react'
import classNames from 'classnames'
import '../Toolbar.scss'

export default class ToolbarItem extends React.Component {
  render() {
    const itemClassList = classNames(
      'table-toolbar__item',
      this.props.align ? `table-toolbar__item--${this.props.align}` : '',
      {
        'table-toolbar__item--row-selector': this.props.selectAll,
      }
    )

    return <div className={`${itemClassList} ${this.props.className}`}>{this.props.children}</div>
  }
}

ToolbarItem.defaultProps = {
  className: '',
}
