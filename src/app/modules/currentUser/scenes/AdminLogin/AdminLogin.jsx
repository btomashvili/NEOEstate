import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import { browserHistory, Link } from 'react-router'
import { bindActionCreators } from 'redux'
import loginIcon from '../../../../resources/assets/images/icons/input-login.svg'
import passwordIcon from '../../../../resources/assets/images/icons/password.svg'
import homeNavLogo from '../../../../resources/assets/images/home-nav-logo.svg'
import './AdminLogin.scss'
import { FormGroup, FormGroupRow, FormGroupCol } from '../../../../components/FormGroup/FormGroup'

import { Input } from '../../../../components/Input/Input'
import Button from '../../../../components/Button/Button'
import {
  fetchUserRequest,
  userLoginRequest,
  updateFieldValue,
  activeUserRequest,
} from '../../actions/currentUserActions'
import { ruleRunnerImmutable, run } from '../../../../utils/ruleRunner'
import { required, invalidEmail } from '../../../../utils/rules'

const fieldValidations = [
  ruleRunnerImmutable('email', 'Email', invalidEmail),
  ruleRunnerImmutable('password', 'Password', required),
]

class AdminLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.handleFieldChanged = this.handleFieldChanged.bind(this)
    this.showError = this.showError.bind(this)
    this.errorFor = this.errorFor.bind(this)
  }
  componentDidMount() {
    if (this.props.location.query && this.props.location.query.token) {
      const { token } = this.props.location.query
      this.props.activeUserRequest({ token })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn && this.props.isLoggedIn !== nextProps.isLoggedIn) {
      browserHistory.push('/')
    }
  }

  onFormSubmit(e) {
    e.preventDefault()
    // console.log('asds')
    this.props.updateFieldValue('alidationErrors', run(this.props.data, fieldValidations), 'login')

    this.props.updateFieldValue('showErrors', true, 'login')
    this.props.updateFieldValue('message.text', '', 'login')

    setTimeout(() => {
      if (this.props.validationErrors.size > 0) return
      const data = this.props.data.toJS()
      this.props.userLoginRequest(data)
    }, 100)
  }

  errorFor(field) {
    return this.props.validationErrors.get(field)
  }

  showError(field) {
    return this.props.showErrors && this.props.validationErrors.get(field) !== undefined
  }

  handleFieldChanged(field, value) {
    return (e) => {
      this.props.updateFieldValue(field, value || e.target.value, 'login.data')
    }
  }
  render() {
    return (
      <div className="admin-login__wrapper">
        <div className="admin-login__logo">
          <img className="pull--right" src={homeNavLogo} />
        </div>
        <div className="admin-login">
          <h4
            className="admin-login__heading
                  admin-login__heading--has-icon
                  admin-login__heading--waikawa-gray
                  admin-login__heading--lg
                  "
          >
            {this.props.translate('login')}
          </h4>
          <div className="admin-login__flex">
            <FormGroup>
              <FormGroupRow>
                <FormGroupCol className="form-group__col--full-width">
                  <Input
                    placeholder="Login"
                    name="email"
                    type="email"
                    hasIcon
                    icon={loginIcon}
                    wrapperClass="input-wrapper--block"
                    className="input--lg input--has-shadow-lg input--heather"
                    value={this.props.data.get('email')}
                    onChange={this.handleFieldChanged('email')}
                    message={this.errorFor('email')}
                    hasError={this.showError('email')}
                  />
                </FormGroupCol>
              </FormGroupRow>
              <FormGroupRow>
                <FormGroupCol className="form-group__col--full-width">
                  <Input
                    placeholder="Password"
                    name="password"
                    type="password"
                    hasIcon
                    icon={passwordIcon}
                    wrapperClass="input-wrapper--block"
                    className="input--lg input--has-shadow-lg input--heather"
                    value={this.props.data.get('password')}
                    onChange={this.handleFieldChanged('password')}
                    message={this.errorFor('password')}
                    hasError={this.showError('password')}
                  />
                </FormGroupCol>
              </FormGroupRow>
              <FormGroupRow>
                <FormGroupCol className="form-group__col--full-width">
                  <Button
                    type="button"
                    className="button--block button--red-violet  button--padding-lg"
                    onClick={this.onFormSubmit}
                  >
                    Login
                  </Button>
                </FormGroupCol>
              </FormGroupRow>
              <FormGroupRow>
                <FormGroupCol className="form-group__col--full-width">
                  <Link to="/forgot-password" className="link link--sm link--wild-blue-yonder pull--right">
                    Forgot your password?
                  </Link>
                </FormGroupCol>
              </FormGroupRow>
            </FormGroup>
            <div className="admin-login__icon" />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.currentUser.get('isLoggedIn'),
    data: state.currentUser.getIn(['login', 'data']),
    validationErrors: state.currentUser.getIn(['login', 'validationErrors']),
    showErrors: state.currentUser.getIn(['login', 'showErrors']),
    message: state.currentUser.getIn(['login', 'message']),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateFieldValue,
      userLoginRequest,
      activeUserRequest,
    },
    dispatch
  )
}

AdminLogin.propTypes = {
  translate: PropTypes.func,
  data: PropTypes.object,
  validationErrors: PropTypes.object,
  showErrors: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  updateFieldValue: PropTypes.func,
  message: PropTypes.object,
  userLoginRequest: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(AdminLogin))
