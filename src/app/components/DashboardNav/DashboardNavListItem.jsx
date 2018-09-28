/* eslint react/prop-types:0 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class DashboardNavListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.props.bindRef(this.inboxDropdown)
  }
  render() {
    return (
      <li className="home-nav__list-item dashboard-navigation__list-item">
        {this.props.to ? (
          <Link
            to={this.props.to}
            className={`${this.props.className} home-nav__list-item-link`}
            activeClassName="active"
          >
            {this.props.children}
          </Link>
        ) : (
          <button
            onClick={e => this.props.onClick(e)}
            data-name={this.props.dataName}
            ref={(el) => {
              this.inboxDropdown = el
            }}
            className={`${this.props.className} home-nav__list-item-link`}
          >
            {this.props.children}
          </button>
        )}
        {this.props.dropdown && this.props.dropdown}
      </li>
    )
  }
}

DashboardNavListItem.defaultProps = {
  className: '',
  to: false,
  onClick: () => false,
  dropdown: false,
  bindRef: () => false,
}

DashboardNavListItem.PropTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default DashboardNavListItem
