import React from 'react'
import { findDOMNode } from 'react-dom'
import './Tooltip.scss'

export default class Tooltip extends React.Component {
  render() {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        'data-tooltip': this.props.text,
        className: `${child.props.className} has-tooltip ${
          this.props.align ? `has-tooltip--${this.props.align}` : 'has-tooltip--left'
        }`,
      })
    )[0]
  }
}
