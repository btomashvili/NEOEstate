import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
// import AvatarEditor from 'react-avatar-editor'
// import { getCurrentRouteTitle } from '../../../../utils/helper'
import './Settings.scss'
import { FormGroupRow, FormGroupCol, FormGroup } from '../../../../components/FormGroup/FormGroup'
import InputNumberVobi from '../../../../components/InputNumberVobi/InputNumberVobi'
import Button from '../../../../components/Button/Button'
import {
  fetchUserRequest,
  updateFieldValue,
  changePasswordRequest,
  userUpdateRequest,
} from '../../../currentUser/actions/currentUserActions'
import Dropdown from '../../../../components/Dropdown/Dropdown'
import { uploadUserAvatarRequest } from '../../../user/actions/userActions'
import { ruleRunnerImmutable, run } from '../../../../utils/ruleRunner'
import { required, invalidEmail } from '../../../../utils/rules'
import timezones from '../../../../resources/constants/timezones'

const fieldValidations = [
  ruleRunnerImmutable('fullName', 'Full Name', required),
  ruleRunnerImmutable('email', 'Email', required, invalidEmail),
]

class SettingsScreen extends Component {
  constructor(props) {
    super(props)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.handleDefaultDaysToComplete = this.handleDefaultDaysToComplete.bind(this)
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
      this.props.fetchUserRequest()
    }, 100)
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

  errorFor(field) {
    return this.props.validationErrors.get(field)
  }

  showError(field) {
    return this.props.showErrors && this.props.validationErrors.get(field) !== undefined
  }

  handleFieldChanged(field, value, parent = 'data') {
    return (e) => {
      this.props.updateFieldValue(field, value || (e ? e.target.value : null), parent)
    }
  }

  handleIsTurnedOnAddMissingRoomt(field) {
    this.props.updateFieldValue(field, !this.props.data.get('isTurnedOnAddMissingRoom'), 'data')
  }

  handleDefaultDaysToComplete(value) {
    console.log('handleDefaultDaysToComplete', value)

    console.log('EEE => ', value)
    this.props.updateFieldValue('data.defaultNumberOfDaysToComplete', value)
  }

  render() {
    return (
      <div className="settings-page">
        <div className="row">
          <div className="col-md-12">
            <h4>Settings</h4>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <div>
              <form onSubmit={this.onFormSubmit}>
                <FormGroup>
                  <label htmlFor={'daysToComplete'}>Default number days to complete Walkthru</label>
                </FormGroup>
                <FormGroup>
                  <InputNumberVobi
                    placeholder="Days to Complete"
                    name="daysToComplete"
                    id="daysToComplete"
                    value={this.props.data.get('defaultNumberOfDaysToComplete') || 5}
                    onChange={this.handleDefaultDaysToComplete}
                    message={this.errorFor('defaultNumberOfDaysToComplete')}
                    hasError={this.showError('defaultNumberOfDaysToComplete')}
                  />
                </FormGroup>
                <FormGroupRow>
                  <FormGroupCol className="form-group__col--full-width">
                    <span className="data-label in-progress">Tenants can add missing rooms during the Walkthru </span>
                    <input
                      type="checkbox"
                      id="isTurnedOnAddMissingRoom"
                      onChange={() => this.handleIsTurnedOnAddMissingRoomt('isTurnedOnAddMissingRoom')}
                      checked={this.props.data.get('isTurnedOnAddMissingRoom')}
                    />
                    <label
                      className={`switch ${!this.props.data.get('isTurnedOnAddMissingRoom')}`}
                      htmlFor="isTurnedOnAddMissingRoom"
                    >
                      Toggle
                    </label>
                  </FormGroupCol>
                </FormGroupRow>
                <FormGroupRow>
                  <FormGroupCol className="form-group__col--full-width">
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
                  </FormGroupCol>
                </FormGroupRow>
                <FormGroupRow>
                  <Button
                    type="submit"
                    className="button--block button--picton-blue  button--padding-lg"
                    onClick={this.onFormSubmit}
                    isLoading={this.props.isLoading}
                  >
                    Save
                  </Button>
                </FormGroupRow>
              </form>
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
  isTurnedOnAddMissingRoom: state.currentUser.get('isTurnedOnAddMissingRoom'),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(SettingsScreen))
