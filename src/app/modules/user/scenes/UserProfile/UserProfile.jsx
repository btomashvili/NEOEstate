import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
// import AvatarEditor from 'react-avatar-editor'
// import { getCurrentRouteTitle } from '../../../../utils/helper'
import './UserProfile.scss'
import { FormGroupRow, FormGroupCol } from '../../../../components/FormGroup/FormGroup'
import { Input } from '../../../../components/Input/Input'
import MyAvatarEditor from '../../../../components/AvatarEditor/MyAvatarEditor'
import Button from '../../../../components/Button/Button'
import {
  fetchUserRequest,
  updateFieldValue,
  changePasswordRequest,
  userUpdateRequest,
} from '../../../currentUser/actions/currentUserActions'
// import Upload from '../../../../components/Upload/Upload'
import Dropdown from '../../../../components/Dropdown/Dropdown'

import { uploadUserAvatarRequest } from '../../../user/actions/userActions'
import { ruleRunnerImmutable, run } from '../../../../utils/ruleRunner'
import { required, invalidEmail, mustMatch, minLength } from '../../../../utils/rules'
// import { invalidPhone } from '../../../../utils/errorMessages'

const fieldValidations = [
  ruleRunnerImmutable('fullName', 'Full Name', required),
  ruleRunnerImmutable('email', 'Email', required, invalidEmail),
]

const pswFieldValidations = [
  ruleRunnerImmutable('oldPassword', 'Old Password', required),
  ruleRunnerImmutable('password', 'New Password', required, minLength(6)),
  ruleRunnerImmutable('confirmPassword', 'Confirm New Password', mustMatch('password', 'New Password')),
]

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.onPasswordFormSubmit = this.onPasswordFormSubmit.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
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
      this.handleAvatar()
      this.props.fetchUserRequest()
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

  handleUseCompanyDetailsInReport(field) {
    this.props.updateFieldValue(field, !this.props.data.get('useCompanyDetailsInReport'), 'data')
  }

  handleSetEditorRef = (editor) => {
    // console.log('handleSetEditorRef =>>', editor)
    if (editor) this.editor = editor
  }

  handleAvatar = (data) => {
    const avatar = this.editor.getImageScaledToCanvas().toDataURL()
    const userID = this.props.currentUserId
    // const rect = this.editor.getCroppingRect()
    this.props.uploadUserAvatarRequest(avatar, userID)
  }

  render() {
    return (
      <div className="profile-page">
        <div className="row">
          <div className="col-md-12">
            <h4>Company Profile</h4>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div>
              <form onSubmit={this.onFormSubmit}>
                {/* <h4 className="heading heading--waikawa-gray heading--md" >Update Profile</h4> */}
                <FormGroupRow>
                  <FormGroupCol className="form-group__col--full-width">
                    <Input
                      type="text"
                      name="fullName"
                      label="Company name"
                      isRequired
                      value={this.props.data.get('fullName')}
                      onChange={this.handleFieldChanged('fullName')}
                      message={this.errorFor('fullName')}
                      hasError={this.showError('fullName')}
                    />
                  </FormGroupCol>
                </FormGroupRow>
                <FormGroupRow>
                  <FormGroupCol className="form-group__col--full-width">
                    <Input
                      type="text"
                      name="phone"
                      label="Cell Phone"
                      isRequired
                      value={this.props.data.get('phone')}
                      onChange={this.handleFieldChanged('phone')}
                      message={this.errorFor('phone')}
                      hasError={this.showError('phone')}
                    />
                  </FormGroupCol>
                </FormGroupRow>
                <FormGroupRow>
                  <FormGroupCol className="form-group__col--full-width">
                    <Input
                      type="text"
                      name="email"
                      label={this.props.translate('email')}
                      className="input--has-shadow-lg input--dove-gray input--rounded"
                      labelClass="input__label--sm"
                      value={this.props.data.get('email')}
                      isRequired
                      onChange={this.handleFieldChanged('email')}
                      message={this.errorFor('email')}
                      hasError={this.showError('email')}
                    />
                  </FormGroupCol>
                </FormGroupRow>
                <FormGroupRow>
                  <FormGroupCol className="form-group__col--full-width">
                    <span className="data-label in-progress">
                      Do you want to use your company name & logo on the report?{' '}
                    </span>
                    <input
                      type="checkbox"
                      id="useCompanyDetailsInReport"
                      onChange={() => this.handleUseCompanyDetailsInReport('useCompanyDetailsInReport')}
                      checked={this.props.data.get('useCompanyDetailsInReport')}
                    />
                    <label
                      className={`switch ${!this.props.data.get('useCompanyDetailsInReport')}`}
                      htmlFor="useCompanyDetailsInReport"
                    >
                      Toggle
                    </label>
                  </FormGroupCol>
                </FormGroupRow>
                <FormGroupRow>
                  <FormGroupCol className="form-group__col--full-width">
                    <Input
                      type="text"
                      name="address"
                      label="Street address"
                      className="input--has-shadow-lg input--dove-gray input--rounded"
                      labelClass="input__label--sm"
                      value={this.props.data.get('address')}
                      onChange={this.handleFieldChanged('address')}
                    />
                  </FormGroupCol>
                </FormGroupRow>
                <FormGroupRow>
                  <FormGroupCol className="form-group__col--full-width">
                    <Input
                      type="text"
                      name="city"
                      label="City"
                      className="input--has-shadow-lg input--dove-gray input--rounded"
                      labelClass="input__label--sm"
                      value={this.props.data.get('city')}
                      onChange={this.handleFieldChanged('city')}
                    />
                  </FormGroupCol>
                </FormGroupRow>
                <FormGroupRow>
                  <FormGroupCol className="form-group__col--full-width">
                    <Dropdown
                      placeholder="State"
                      label="State"
                      labelKey={'value2'}
                      valueKey="value"
                      options={this.props.states}
                      onChange={selected => this.handleFieldChanged('state', selected)()}
                      value={this.props.data.get('state')}
                    />
                  </FormGroupCol>
                </FormGroupRow>
                <FormGroupRow>
                  <FormGroupCol className="form-group__col--full-width">
                    <Input
                      placeholder="Zip"
                      label="Zip code"
                      name="zip"
                      value={this.props.data.get('zip')}
                      onChange={this.handleFieldChanged('zip')}
                    />
                  </FormGroupCol>
                </FormGroupRow>

                <FormGroupRow>
                  <Button
                    type="submit"
                    className="button--block button--picton-blue  button--padding-lg"
                    onClick={this.onFormSubmit}
                    isLoading={this.props.isLoading}
                  >
                    {this.props.translate('update')}
                  </Button>
                </FormGroupRow>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div style={{ marginLeft: 60, marginTop: 40 }}>
              <MyAvatarEditor companyLogo={this.props.companyLogo} handleSetEditorRef={this.handleSetEditorRef} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.currentUser.get('isLoading'),
  validationErrors: state.currentUser.get('validationErrors'),
  states: state.common.get('states'),
  showErrors: state.currentUser.get('showErrors'),
  userData: state.currentUser.get('data'),
  data: state.currentUser.get('data'),
  changePassword: state.currentUser.getIn(['changePassword', 'data']),
  avatarIsLoading: state.currentUser.get('avatarIsLoading'),
  currentUserId: state.currentUser.getIn(['data', 'id']),
  companyLogo: state.currentUser.getIn(['data', 'logo']),
})

const mapDispatchToProps = dispatch => ({
  fetchUserRequest: () => dispatch(fetchUserRequest()),
  updateFieldValue: (field, value, parent, isDelete) => dispatch(updateFieldValue(field, value, parent, isDelete)),
  uploadUserAvatarRequest: (avatar, userID) => dispatch(uploadUserAvatarRequest(avatar, userID)),
  userUpdateRequest: data => dispatch(userUpdateRequest(data)),
  changePasswordRequest: data => dispatch(changePasswordRequest(data)),
})

UserProfile.propTypes = {
  translate: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(UserProfile))
