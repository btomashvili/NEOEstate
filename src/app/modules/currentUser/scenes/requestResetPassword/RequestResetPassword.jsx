import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withTranslate } from 'react-redux-multilingual'
import { FormGroup } from '../../../../components/FormGroup/FormGroup'
import { Input } from '../../../../components/Input/Input'
import Button from '../../../../components/Button/Button'
import loginIcon from '../../../../resources/assets/images/icons/input-login.svg'
import './RequestResetPassword.scss'
import { updateFieldValue, resetPasswordRequest } from '../../actions/currentUserActions'
import { ruleRunnerImmutable, run } from '../../../../utils/ruleRunner'
import { required, invalidEmail } from '../../../../utils/rules'

const fieldValidations = [ruleRunnerImmutable('email', 'email', required, invalidEmail)]

class RequestResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.done && this.props.done !== nextProps.done) {
      browserHistory.push('/login')
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    this.props.updateFieldValue('validationErrors', run(this.props.data, fieldValidations), 'requestChangePassword')

    this.props.updateFieldValue('showErrors', true, 'requestChangePassword')
    this.props.updateFieldValue('message.text', '', 'requestChangePassword')

    setTimeout(() => {
      if (this.props.validationErrors.size > 0) return
      const data = this.props.data.toJS()
      this.props.resetPasswordRequest(data)
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
      this.props.updateFieldValue(field, value || e.target.value, 'requestChangePassword.data')
    }
  }
  render() {
    return (
      <div className="login-page">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header">Request Reset Password</div>
              <div className="card-body">
                <form onSubmit={this.onFormSubmit}>
                  <FormGroup>
                    <p>Enter your email address and check your email to reset your password</p>
                  </FormGroup>
                  <FormGroup>
                    <Input
                      placeholder="Your email "
                      name="email"
                      type="email"
                      value={this.props.data.get('email')}
                      hasIcon
                      icon={loginIcon}
                      wrapperClass="input-wrapper--block"
                      className="input--lg input--has-shadow-lg input--heather"
                      onChange={this.handleFieldChanged('email')}
                      message={this.errorFor('email')}
                      hasError={this.showError('email')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button className="btn btn-primary btn-block">Send</Button>
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

RequestResetPassword.propTypes = {
  data: PropTypes.object,
  validationErrors: PropTypes.object,
  showErrors: PropTypes.bool,
  updateFieldValue: PropTypes.func,
  //   message: PropTypes.object,
  done: PropTypes.bool,
}

function mapStateToProps(state) {
  return {
    data: state.currentUser.getIn(['requestChangePassword', 'data']),
    validationErrors: state.currentUser.getIn(['requestChangePassword', 'validationErrors']),
    showErrors: state.currentUser.getIn(['requestChangePassword', 'showErrors']),
    message: state.currentUser.getIn(['requestChangePassword', 'message']),
    done: state.currentUser.getIn(['requestChangePassword', 'done']),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      resetPasswordRequest,
      updateFieldValue,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(RequestResetPassword))
