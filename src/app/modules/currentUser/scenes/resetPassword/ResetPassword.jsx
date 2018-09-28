import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withTranslate } from 'react-redux-multilingual'
import { FormGroup } from '../../../../components/FormGroup/FormGroup'
import { Input } from '../../../../components/Input/Input'
import Button from '../../../../components/Button/Button'
import './ResetPassword.scss'
import { updateFieldValue, resetPasswordTokenRequest } from '../../actions/currentUserActions'

import { ruleRunnerImmutable, run } from '../../../../utils/ruleRunner'
import { required, minLength } from '../../../../utils/rules'

const fieldValidations = [ruleRunnerImmutable('password', 'password', required, minLength(6))]

class ResetPassword extends Component {
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
    this.props.updateFieldValue('validationErrors', run(this.props.data, fieldValidations), 'resetPassword')

    this.props.updateFieldValue('showErrors', true, 'resetPassword')
    this.props.updateFieldValue('message.text', '', 'resetPassword')

    setTimeout(() => {
      if (this.props.validationErrors.size > 0) return
      const data = this.props.data.toJS()
      data.token = this.props.location.query.token
      this.props.resetPasswordTokenRequest(data)
    }, 100)
  }

  errorFor(field) {
    return this.props.validationErrors.get(field)
  }

  showError(field) {
    return this.props.showErrors && this.props.validationErrors.get(field) !== undefined
  }

  handleFieldChanged(field, value, parent) {
    return (e) => {
      this.props.updateFieldValue(field, value || e.target.value, 'resetPassword.data')
    }
  }
  // render() {
  //   return (
  //     <FormGroup className="form-group--centered form-group--space-top-md">
  //       <h4 className="form-group__heading form-group__heading--lg form-group__heading--prussian-blue form-group__heading--has-icon">
  //         Reset Password
  //       </h4>
  //       <p className="text text--jumbo text--md text--space-bottom-sm">
  //         Enter your email address and check your email to reset your password
  //       </p>
  //       <FormGroupRow>
  //         <Input
  //           placeholder="New password "
  //           name="password"
  //           value={this.props.data.get("password")}
  //           type="password"
  //           hasIcon
  //           icon={loginIcon}
  //           wrapperClass="input-wrapper--block"
  //           className="input--lg input--has-shadow-lg input--heather"
  //           onChange={this.handleFieldChanged("password")}
  //           message={this.errorFor("password")}
  //           hasError={this.showError("password")}
  //         />
  //       </FormGroupRow>
  //       <FormGroupRow>
  //         <Button
  //           className="button--red-violet button--lg button--block"
  //           onClick={this.onFormSubmit}
  //         >
  //           Send
  //         </Button>
  //       </FormGroupRow>
  //       <FormGroupRow>
  //         <p className="text text--sm text--wild-blue-yonder align--right">
  //           Already have an account ? &nbsp;<Link
  //             to="/login"
  //             className="link link--underline link--waikawa-gray pull--right"
  //           >
  //             Sign In
  //           </Link>
  //         </p>
  //       </FormGroupRow>
  //     </FormGroup>
  //   );
  // }

  render() {
    return (
      <div className="login-page">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header">Reset password</div>
              <div className="card-body">
                <form onSubmit={this.onFormSubmit}>
                  <FormGroup>
                    <Input
                      placeholder="Enter Password"
                      label="New Password"
                      name="password"
                      type="password"
                      value={this.props.data.get('password')}
                      isRequired
                      onChange={this.handleFieldChanged('password')}
                      message={this.errorFor('password')}
                      hasError={this.showError('password')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button className="btn btn-primary btn-block">Send</Button>
                  </FormGroup>
                </form>
              </div>
              <div className="card-footer text-muted">
                <span>Already have an account?</span>
                <Link to="/login" className="btn btn-link">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ResetPassword.propTypes = {
  data: PropTypes.object,
  validationErrors: PropTypes.object,
  showErrors: PropTypes.bool,
  updateFieldValue: PropTypes.func,
  message: PropTypes.object,
  done: PropTypes.bool,
}

function mapStateToProps(state) {
  return {
    data: state.currentUser.getIn(['resetPassword', 'data']),
    validationErrors: state.currentUser.getIn(['resetPassword', 'validationErrors']),
    showErrors: state.currentUser.getIn(['resetPassword', 'showErrors']),
    message: state.currentUser.getIn(['resetPassword', 'message']),
    done: state.currentUser.getIn(['resetPassword', 'done']),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      resetPasswordTokenRequest,
      updateFieldValue,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(ResetPassword))
