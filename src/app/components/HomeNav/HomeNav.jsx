/* eslint react/prop-types:0 */
import React, { Component, PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'
import './HomeNav.scss'

class HomeNavUserpanel extends Component {
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
          ref={(el) => {
            this.userpanelDropdown = el
          }}
        >
          <span className="home-nav__userpanel-name">{this.props.name}</span>
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

const HomeNavBar = props => <nav className="home-nav">{props.children}</nav>

const HomeNavLogo = () => (
  <Link to="/" className="home-nav__logo">
    {''}
  </Link>
)

const HomeNavList = props => (
  <ul className={`home-nav__list ${props.showNav ? 'home-nav__list--visible' : ''}`}>{props.children}</ul>
)
const HomeNavHamburger = props => (
  <button
    className={`home-nav__hamburger ${props.showNav ? 'home-nav__hamburger--active' : ''}`}
    onClick={e => props.onClick(e)}
  >
    <span className="home-nav__hamburger-line" />
    <span className="home-nav__hamburger-line" />
    <span className="home-nav__hamburger-line" />
  </button>
)
const HomeNavListItem = props => (
  <li className="home-nav__list-item">
    {props.to === '/' ? (
      <IndexLink to={props.to} className={`home-nav__list-item-link ${props.className}`} activeClassName="active">
        {props.children}
      </IndexLink>
    ) : (
      <Link to={props.to} className={`home-nav__list-item-link ${props.className}`} activeClassName="active">
        {props.children}
      </Link>
    )}
  </li>
)

HomeNavListItem.defaultProps = {
  className: '',
  HomeNavList: false,
}

HomeNavListItem.PropTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
}

HomeNavUserpanel.PropTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  onPanelClick: PropTypes.func.isRequired,
  onClick: PropTypes.func,
}

HomeNavUserpanel.defaultProps = {
  to: false,
  onClick: () => false,
  onPanelClick: () => false,
}

export { HomeNavBar, HomeNavLogo, HomeNavList, HomeNavListItem, HomeNavUserpanel, HomeNavHamburger }
