/* eslint react/prop-types:0 */
/* eslint no-undef:0 */
import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import './MainLayout.scss'
// import Logo from '../../../resources/assets/images/logo.png'

import { updateFieldValue as updateCurrentUserFieldValue }
from '../../../modules/currentUser/actions/currentUserActions'

import { injectNOS } from '@nosplatform/api-functions/lib/react'

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

    this.props.nos.getAddress()
      .then((e) => {
        this.props.updateCurrentUserFieldValue('isLoggedIn', true)
        this.props.updateCurrentUserFieldValue('walletAddress', e)
        this.props.updateCurrentUserFieldValue('data.email', e)
      })
    console.log('window.NOS.ASSETS;', window.NOS.ASSETS)
    this.props.nos.getBalance({ asset: window.NOS.ASSETS.NEO })
     .then((e) => {
       console.log('neo', e)
       this.props.updateCurrentUserFieldValue('data.neo', e)
     })
    this.props.nos.getBalance({ asset: window.NOS.ASSETS.GAS })
     .then((e) => {
       console.log('gas', e)
       this.props.updateCurrentUserFieldValue('data.gas', e)
     })
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
    return (
      <Link to="/" className="navbar-brand" href="#">
        <span>GNOS</span>
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
               
              </ul>
              <ul className="navbar-nav mr-auto">
                {this.props.isLoggedIn && (
                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/samples">
                      Samples
                    </Link>
                  </li>
                )}
              </ul>

              <ul className="navbar-nav mr-auto">
                {this.props.isLoggedIn && (
                  <li className="nav-item">
                    <span className="nav-link text-light" to="#">
                      NEO: {this.props.currentUser.get('neo')}
                    </span>
                  </li>
                )}
              </ul>

              <ul className="navbar-nav mr-auto">
                {this.props.isLoggedIn && (
                  <li className="nav-item">
                    <span className="nav-link text-light" to="#">
                      GAS: {this.props.isLoggedIn && this.props.currentUser ? this.props.currentUser.get('gas') : ''}
                    </span>
                  </li>
                )}
              </ul>


              <div className="navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav mr-auto" />
                <ul className="navbar-nav main-wrapper-dropdown" ref={dropdown => (this.dropdown = dropdown)}>
                  {this.props.isLoggedIn && (
                    <li
                      className="nav-item float-right main-wrapper-dropdown-li"
                      onClick={() => this.setState({ dropdown: !this.state.dropdown })}
                      style={{ alignItems: 'center' }}
                    >
                      <span className="main-wrapper-dropdown-email text-light">
                        {this.props.isLoggedIn && this.props.currentUser ? this.props.currentUser.get('email') : ''}
                      </span>
                      <i className="fa fa-user-o main-wrapper-address-logo text-light" aria-hidden="true" />
                    </li>
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
  currentUserId: state.currentUser.getIn(['data', 'id']),
  currentUser: state.currentUser.get('data'),
})

const mapDispatchToProps = dispatch => ({
  updateCurrentUserFieldValue: (field, value, parent, isDelete) => dispatch(updateCurrentUserFieldValue(field, value, parent, isDelete)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectNOS(withTranslate(MainLayout)))
