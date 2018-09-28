/* eslint react/prop-types:0 */
/* eslint no-undef:0 */
import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import './MainLayout.scss'
import Logo from '../../../resources/assets/images/logo.png'

class MainLayout extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      dropdown: false,
      isLoggedIn: true,
      collapsed: false,
    }
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false)
  }

  handleClick(event) {
    if (!(this.dropdown && this.dropdown.contains(event.target))) {
      this.setState({ dropdown: false })
    }
  }

  toggleNav() {
    this.setState({ collapsed: !this.state.collapsed })
  }

  renderNavbarHeader() {
    // console.log('this.props.location.pathname =>>', this.props.content.props.location.pathname)
    if (this.props.content.props.route.path === '/:inviteCode') {
      return (
        <Link to={this.props.content.props.location.pathname} className="navbar-brand" href="#">
          <img src={Logo} height="30" className="d-inline-block align-top" alt="" />
        </Link>
      )
    }
    return (
      <Link to="/" className="navbar-brand" href="#">
        <span>NEO</span>
      </Link>
    )
  }

  render() {
    return (
      <div className="main-wrapper">
        <nav className="navbar navbar-dark bg-primary fixed-top navbar-expand-lg">
          <div className="container">
            {this.renderNavbarHeader()}
            <button className="navbar-toggler" type="button" onClick={() => this.toggleNav()}>
              <span className="navbar-toggler-icon" />
            </button>
            <div className={`${!this.state.collapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNavDropdown">
              <ul className="navbar-nav mr-auto">
                {this.props.isLoggedIn && (
                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/tenants">
                      Properties
                    </Link>
                  </li>
                )}
                {/* {this.props.isLoggedIn &&
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/billing">Billing</Link>
                                </li>
                            } */}

              </ul>
              {/* <ul className="navbar-nav">
                            {this.props.isLoggedIn &&
                            <li
                              className="nav-item float-right main-wrapper-dropdown-li"
                              onClick={() => this.setState({ dropdown: !this.state.dropdown })}
                            >
                              <span className="main-wrapper-dropdown-email">
                                  {this.props.isLoggedIn && this.props.currentUser ? this.props.currentUser.get('email') : ''}
                              </span>
                              <i className="fa fa-user-o main-wrapper-dropdown-logo" aria-hidden="true" />
                              <span className="main-wrapper-dropdown-logo-arrow" />
                            </li>

                            <li className="nav-item float-right">
                                <a className="nav-link text-light btn-icon" onClick={this.props.handlerLogOut}>
                                    <i className="fa fa-sign-out" aria-hidden="true" />
                                    Logout
                                </a>
                            </li>
                          }
                        </ul> */}

              <div className="navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav mr-auto" />
                <ul className="navbar-nav main-wrapper-dropdown" ref={dropdown => (this.dropdown = dropdown)}>
                  {this.props.isLoggedIn && (
                    <li
                      className="nav-item float-right main-wrapper-dropdown-li"
                      onClick={() => this.setState({ dropdown: !this.state.dropdown })}
                    >
                      <span className="main-wrapper-dropdown-email text-light">
                        {this.props.isLoggedIn && this.props.currentUser ? this.props.currentUser.get('email') : ''}
                      </span>
                      <i className="fa fa-user-o main-wrapper-dropdown-logo text-light" aria-hidden="true" />
                      <span className="main-wrapper-dropdown-logo-arrow" />
                    </li>
                  )}
                  {this.state.dropdown && (
                    <div className="main-wrapper-dropdown-content">
                      <Link to="/profile" onClick={() => this.setState({ dropdown: false })}>
                        Profile
                      </Link>
                      <Link to="/change-password" onClick={() => this.setState({ dropdown: false })}>
                        Change password
                      </Link>
                      <a
                        href="#"
                        onClick={() => {
                          this.setState({ dropdown: false })
                          this.props.handlerLogOut()
                        }}
                      >
                        {' '}
                        Logout{' '}
                      </a>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <div className="container">
          {React.cloneElement(this.props.content, { handlerLogOut: this.props.handlerLogOut })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  // currentUserAvatar: state.wizard.getIn(['socialMedia', 'data', 'picture']),
  currentUserId: state.currentUser.getIn(['data', 'id']),
  currentUser: state.currentUser.get('data'),
  // wizardUserRole: state.wizard.getIn(['user', 'role']),
  // inbox: state.inbox.getIn(['lookup', 'list']),
  // listOfOnlineUsers: state.user.get('listOfOnlineUsers'),
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(MainLayout))
