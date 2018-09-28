import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import './UserProfile.scss'
import { FormGroupRow, FormGroupCol } from '../../../../components/FormGroup/FormGroup'
import { Input } from '../../../../components/Input/Input'
import Button from '../../../../components/Button/Button'
import {
  updateFieldValue,
  changePasswordRequest,
  userUpdateRequest,
} from '../../../currentUser/actions/currentUserActions'

import { ruleRunnerImmutable, run } from '../../../../utils/ruleRunner'
import { required, invalidEmail, mustMatch, minLength } from '../../../../utils/rules'

const fieldValidations = [
  ruleRunnerImmutable('fullName', 'Full Name', required),
  ruleRunnerImmutable('email', 'Email', required, invalidEmail),
]

const pswFieldValidations = [
  ruleRunnerImmutable('oldPassword', 'Old Password', required),
  ruleRunnerImmutable('password', 'New Password', required, minLength(6)),
  ruleRunnerImmutable('confirmPassword', 'Confirm New Password', mustMatch('password', 'New Password')),
]

class UserSettings extends Component {
  constructor(props) {
    super(props)
    this.onPasswordFormSubmit = this.onPasswordFormSubmit.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.state = {}
  }
  onPasswordFormSubmit(e) {
    e.preventDefault()
    this.props.updateFieldValue('validationErrors', run(this.props.changePassword, pswFieldValidations), '')

    this.props.updateFieldValue('showErrors', true, '')
    this.props.updateFieldValue('message.text', '', '')

    setTimeout(() => {
      if (this.props.validationErrors.size > 0) return
      const data = this.props.changePassword.toJS()
      this.props.changePasswordRequest(data)
    }, 100)
  }
  onFormSubmit(e) {
    e.preventDefault()

    this.props.updateFieldValue('validationErrors', run(this.props.data, fieldValidations), '')

    this.props.updateFieldValue('showErrors', true, '')
    this.props.updateFieldValue('message.text', '', '')

    setTimeout(() => {
      if (this.props.validationErrors.size > 0) return
      const data = this.props.userData.toJS()
      this.props.userUpdateRequest(data)
    }, 100)
  }

  errorFor(field) {
    return this.props.validationErrors.get(field)
  }

  showError(field) {
    return this.props.showErrors && this.props.validationErrors.get(field) !== undefined
  }
  handleFieldChanged(field, value, parent = 'data') {
    return (e) => {
      this.props.updateFieldValue(field, value || e.target.value, parent)
    }
  }

  render() {
    return (
      <div className="profile-page">
        <div className="row">
          <div className="col-md-12">
            <h4>Account Settings</h4>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={this.onPasswordFormSubmit}>
              <h4 className="heading heading--waikawa-gray heading--md">{this.props.translate('change_password')}</h4>
              <FormGroupRow>
                <FormGroupCol className="form-group__col--full-width">
                  <Input
                    type="password"
                    name="oldPassword"
                    label={this.props.translate('oldPassword')}
                    className="input--has-shadow-lg input--dove-gray input--rounded"
                    labelClass="input__label--sm"
                    value={this.props.changePassword.get('oldPassword')}
                    isRequired
                    onChange={e => this.handleFieldChanged('oldPassword', e.target.value, 'changePassword.data')(e)}
                    message={this.errorFor('oldPassword')}
                    hasError={this.showError('oldPassword')}
                  />
                </FormGroupCol>
              </FormGroupRow>
              <FormGroupRow>
                <FormGroupCol className="form-group__col--full-width">
                  <Input
                    type="password"
                    name="password"
                    label={this.props.translate('newPassword')}
                    className="input--has-shadow-lg input--dove-gray input--rounded"
                    labelClass="input__label--sm"
                    value={this.props.changePassword.get('password')}
                    isRequired
                    onChange={e => this.handleFieldChanged('password', e.target.value, 'changePassword.data')(e)}
                    message={this.errorFor('password')}
                    hasError={this.showError('password')}
                  />
                </FormGroupCol>
              </FormGroupRow>
              <FormGroupRow>
                <FormGroupCol className="form-group__col--full-width">
                  <Input
                    type="password"
                    name="confirmPassword"
                    label={this.props.translate('confirmPassword')}
                    className="input--has-shadow-lg input--dove-gray input--rounded"
                    labelClass="input__label--sm"
                    value={this.props.changePassword.get('confirmPassword')}
                    isRequired
                    onChange={e => this.handleFieldChanged('confirmPassword', e.target.value, 'changePassword.data')(e)}
                    message={this.errorFor('confirmPassword')}
                    hasError={this.showError('confirmPassword')}
                  />
                </FormGroupCol>
              </FormGroupRow>
              <FormGroupRow>
                <Button type="submit" className="button--block button--picton-blue  button--padding-lg">
                  {this.props.translate('change_password')}
                </Button>
              </FormGroupRow>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.currentUser.get('isLoading'),
  validationErrors: state.currentUser.get('validationErrors'),
  showErrors: state.currentUser.get('showErrors'),
  userData: state.currentUser.get('data'),
  data: state.currentUser.get('data'),
  changePassword: state.currentUser.getIn(['changePassword', 'data']),
  avatarIsLoading: state.currentUser.get('avatarIsLoading'),
  currentUserId: state.currentUser.getIn(['data', 'id']),
})

const mapDispatchToProps = dispatch => ({
  updateFieldValue: (field, value, parent, isDelete) => dispatch(updateFieldValue(field, value, parent, isDelete)),
  userUpdateRequest: data => dispatch(userUpdateRequest(data)),
  changePasswordRequest: data => dispatch(changePasswordRequest(data)),
})

UserSettings.propTypes = {
  translate: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(UserSettings))
