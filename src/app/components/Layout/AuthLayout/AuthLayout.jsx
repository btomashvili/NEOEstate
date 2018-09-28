import React, { Component, PropTypes } from 'react'
import './AuthLayout.scss'

class AuthLayout extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div className="auth-layout auth-layout--center">{this.props.content}</div>
  }
}

AuthLayout.propTypes = {
  content: PropTypes.element,
}

export default AuthLayout
