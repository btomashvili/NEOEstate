import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import './Button.scss'

class ToolButton extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return this.props.to ? (
      <Link className={`toolbar-button ${this.props.className}`} to={this.props.to}>
        {this.props.icon && <img className="toolbar-button__icon" src={this.props.icon} alt="" />}
        {this.props.content && <span className="toolbar-button__label">{this.props.content}</span>}
      </Link>
    ) : (
      <button
        className={`toolbar-button ${this.props.className} ${this.props.active && 'toolbar-button--active'}`}
        onClick={e => this.props.onClick(e)}
        ref={(el) => {
          this.button = el
        }}
      >
        {this.props.icon && <img className="toolbar-button__icon" src={this.props.icon} alt="" />}
        {this.props.content && <span className="toolbar-button__label">{this.props.content}</span>}
      </button>
    )
  }
}

ToolButton.PropTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool,
}

ToolButton.defaultProps = {
  to: '',
  onClick: () => false,
  className: '',
  active: false,
}

export default ToolButton
