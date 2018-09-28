import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withTranslate } from 'react-redux-multilingual'
import * as commonActions from '../../../../modules/common/actions/commonActions'
import { FormGroup } from '../../../../components/FormGroup/FormGroup'
import Dropdown from '../../../../components/Dropdown/Dropdown'
import { Input } from '../../../../components/Input/Input'
import Button from '../../../../components/Button/Button'
import timezones from '../../../../resources/constants/timezones'
import './Register.scss'
import { signUpRequest, updateFieldValue, userLoginRequest } from '../../actions/currentUserActions'
import { ruleRunnerImmutable, run } from '../../../../utils/ruleRunner'
import { required, minLength, invalidEmail, mustMatch } from '../../../../utils/rules'

const fieldValidations = [
  ruleRunnerImmutable('fullName', 'Full Name', required),
  ruleRunnerImmutable('timezone', 'Timezone', required),
  ruleRunnerImmutable('email', 'Email', invalidEmail),
  ruleRunnerImmutable('password', 'Password', required, minLength(6)),
  ruleRunnerImmutable('confirmPassword', 'Password Confirmation', mustMatch('password', 'confirmPassword')),
]

class Register extends Component {
  constructor(props) {
    super(props)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.redirectLogin = this.redirectLogin.bind(this)
  }

  componentDidMount() {
    this.props.stateLookupListRequest()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.props.updateFieldValue('validationErrors', run(nextProps.data, fieldValidations), 'register')
    }

    if (nextProps.confirmEmailShow && this.props.confirmEmailShow !== nextProps.confirmEmailShow) {
      this.props.updateFieldValue('showErrors', false, 'register')
      this.props.updateFieldValue('message.text', '', 'register')
      this.props.updateFieldValue('confirmEmailShow', false, 'register')

      // this.redirectLogin()
      const data = this.props.data.toJS()
      nextProps.userLoginRequest(data)
    }

    if (nextProps.isLoggedIn && this.props.isLoggedIn !== nextProps.isLoggedIn) {
      browserHistory.push('/')
    }
  }

  onFormSubmit(e) {
    e.preventDefault()
    this.props.updateFieldValue('validationErrors', run(this.props.data, fieldValidations), 'register')

    this.props.updateFieldValue('showErrors', true, 'register')
    this.props.updateFieldValue('message.text', '', 'register')

    setTimeout(() => {
      if (this.props.validationErrors.size > 0) return
      const data = this.props.data.toJS()

      this.props.signUpRequest(data)
    }, 100)
  }

  redirectLogin() {
    this.props.updateFieldValue('showErrors', false, 'register')
    this.props.updateFieldValue('message.text', '', 'register')
    this.props.updateFieldValue('confirmEmailShow', false, 'register')
    this.props.showSnackbar('Check your inbox.')
    browserHistory.push('/login')
  }

  errorFor(field) {
    return this.props.validationErrors.get(field)
  }

  showError(field) {
    return this.props.showErrors && this.props.validationErrors.get(field) !== undefined
  }

  handleFieldChanged(field, value) {
    return (e) => {
      this.props.updateFieldValue(field, value || (e ? e.target.value : null), 'register.data')
    }
  }

  handleUseCompanyDetailsInReport(field) {
    this.props.updateFieldValue(field, !this.props.data.get('useCompanyDetailsInReport'), 'register.data')
  }

  getTimezoneValue() {
    const timezoneMap = this.props.data.get('timezone')

    if (!timezoneMap) {
      return null
    }

    const value = timezoneMap.get('value')
    const abbr = timezoneMap.get('abbr')
    const offset = timezoneMap.get('offset')
    const isdst = timezoneMap.get('isdst')
    const text = timezoneMap.get('text')
    const utc = timezoneMap.get('utc')

    return {
      value,
      abbr,
      offset,
      isdst,
      text,
      utc,
    }
  }

  render() {
    return (
      <div className="register-page">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header">Register</div>
              <div className="card-body">
                <form onSubmit={this.onFormSubmit}>
                  <FormGroup>
                    <p>Get started with simple, friendly tenant walkthru inspections at your fingertips.</p>
                  </FormGroup>
                  <FormGroup>
                    <Input
                      placeholder="Enter Company Name"
                      label="Company Name"
                      name="fullName"
                      type="text"
                      isRequired
                      hasAsterisk
                      value={this.props.data.get('fullName')}
                      onChange={this.handleFieldChanged('fullName')}
                      message={this.errorFor('fullName')}
                      hasError={this.showError('fullName')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      placeholder="Enter Email"
                      label="Email"
                      name="email"
                      type="email"
                      isRequired
                      hasAsterisk
                      value={this.props.data.get('email')}
                      onChange={this.handleFieldChanged('email')}
                      message={this.errorFor('email')}
                      hasError={this.showError('email')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      placeholder="Enter Password"
                      label="Password"
                      name="password"
                      type="password"
                      value={this.props.data.get('password')}
                      isRequired
                      hasAsterisk
                      onChange={this.handleFieldChanged('password')}
                      message={this.errorFor('password')}
                      hasError={this.showError('password')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      placeholder="Confirm Password"
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      value={this.props.data.get('confirmPassword')}
                      isRequired
                      hasAsterisk
                      onChange={this.handleFieldChanged('confirmPassword')}
                      message={this.errorFor('confirmPassword')}
                      hasError={this.showError('confirmPassword')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      placeholder="Enter Cell Phone"
                      label="Cell Phone"
                      name="phone"
                      type="text"
                      value={this.props.data.get('phone')}
                      onChange={this.handleFieldChanged('phone')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Dropdown
                      placeholder="Timezone"
                      label="Timezone"
                      onChange={val => this.handleFieldChanged('timezone', val)()}
                      value={this.getTimezoneValue()}
                      options={{ toJS: () => timezones }}
                      labelKey={'text'}
                      message={this.errorFor('timezone')}
                      hasError={this.showError('timezone')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button type="submit" className="btn btn-primary btn-block">
                      Sign up
                    </Button>
                  </FormGroup>
                </form>
              </div>
              <div className="card-footer text-muted">
                <Link to="/login" className="btn btn-link">
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  signUpRequest: PropTypes.func,
  data: PropTypes.object,
  validationErrors: PropTypes.object,
  showErrors: PropTypes.bool,
  updateFieldValue: PropTypes.func,
  confirmEmailShow: PropTypes.bool,
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      signUpRequest,
      updateFieldValue,
      userLoginRequest,
      showSnackbar: (title, message) => dispatch(commonActions.showSnackbar(title, message)),
      stateLookupListRequest: () => dispatch(commonActions.stateLookupListRequest()),
    },
    dispatch
  )
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.currentUser.get('isLoggedIn'),
    data: state.currentUser.getIn(['register', 'data']),
    validationErrors: state.currentUser.getIn(['register', 'validationErrors']),
    registerDone: state.currentUser.getIn(['register', 'done']),
    showErrors: state.currentUser.getIn(['register', 'showErrors']),
    message: state.currentUser.getIn(['register', 'message']),
    confirmEmailShow: state.currentUser.getIn(['register', 'confirmEmailShow']),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(Register))
