/* eslint react/prop-types:0 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class DashboardNavUserpanel extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.props.bindRef(this.userpanelDropdown)
  }
  render() {
    const styles =
      this.props.avatar !== '' && this.props.avatar != null
        ? { background: `url(${this.props.avatar}) no-repeat center center` }
        : {}
    return (
      <div className="home-nav__userpanel">
        <div
          className="home-nav__userpanel-info"
          onClick={e => this.props.onPanelClick(e)}
          data-name={this.props.dataName}
          ref={(el) => {
            this.userpanelDropdown = el
          }}
        >
          <span className="home-nav__userpanel-name">
            <div>
              {this.props.username}
              <small className="home-nav__userpanel-role">{this.props.userRole}</small>
            </div>
          </span>
          <div className="home-nav__userpanel-avatar" style={styles} />
        </div>
        <ul
          className={`home-nav__userpanel-dropdown ${
            this.props.showDropdown ? 'home-nav__userpanel-dropdown--visible' : ''
          }`}
        >
          {this.props.dropdown.map((item, key) => (
            <li key={key} className="home-nav__userpanel-dropdown-item">
              {item.to ? (
                <Link className="home-nav__userpanel-dropdown-link" to={item.to}>
                  <img src={item.icon} alt="" /> <span>{item.text}</span>
                </Link>
              ) : (
                <Link className="home-nav__userpanel-dropdown-link" onClick={e => this.props.onClick(e)}>
                  <img src={item.icon} alt="" /> <span>{item.text}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

DashboardNavUserpanel.PropTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  onPanelClick: PropTypes.func.isRequired,
  onClick: PropTypes.func,
}

DashboardNavUserpanel.defaultProps = {
  to: false,
  onClick: () => false,
  onPanelClick: () => false,
}

export default DashboardNavUserpanel
