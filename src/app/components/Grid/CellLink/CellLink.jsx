import React from 'react'
import Tooltip from '../../Tooltip/Tooltip'
import './CellLink.scss'
import { Link } from 'react-router'

export default class CellLink extends React.Component {
  state = {
    showTooltip: false,
  }

  componentDidMount() {
    const element = this.cellLink

    this.setState({
      showTooltip: element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth,
    })
  }

  getAnchorMarkup = () => {
    const type = this.props.type ? `${this.props.type}:` : ''

    return (
      <Link
        ref={(el) => {
          this.cellLink = el
        }}
        className="cell-link"
        href={`${type + this.props.children}`}
      >
        {this.props.children}
      </Link>
    )
  }

  render() {
    return this.state.showTooltip ? (
      <Tooltip text={this.props.tooltip} align="bottom">
        <span style={{ display: 'block' }}>{this.getAnchorMarkup()}</span>
      </Tooltip>
    ) : (
      this.getAnchorMarkup()
    )
  }
}

CellLink.propTypes = {
  type: React.PropTypes.oneOf(['mailto', 'tel', 'skype']),
}

CellLink.defaultProps = {
  type: '',
  tooltip: '',
}
