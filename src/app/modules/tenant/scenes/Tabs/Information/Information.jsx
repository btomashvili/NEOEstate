import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { FormGroup } from '../../../../../components/FormGroup/FormGroup'
import { Input } from '../../../../../components/Input/Input'
import InputNumberVobi from '../../../../../components/InputNumberVobi/InputNumberVobi'
import AutocompleteInput from '../../../../../components/AutocompleteInput/AutocompleteInput'
import {
  goToTab,
  updateFieldValue,
  tentantListRequest,
  addTenantRequest,
  updateTenantRequest,
} from '../../../actions/tenantActions'

import { ruleRunnerImmutable, run } from '../../../../../utils/ruleRunner'
import { required, invalidEmail, invalidPhone } from '../../../../../utils/rules'

import './Information.scss'

// const DEFAULT_DAYS_TO_COMPLETE = 5

const fieldValidations = [
  ruleRunnerImmutable('information.firstName', 'First Name', required),
  ruleRunnerImmutable('information.lastName', 'Last Name', required),
  ruleRunnerImmutable('information.email', 'Email', required, invalidEmail),
  ruleRunnerImmutable('information.phone', 'Phone', required, invalidPhone),
  ruleRunnerImmutable('information.lease.leaseBegins', 'Lease Begins', required, invalidPhone),
]

class Information extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filled: this.props.data.getIn(['property', 'id']),
    }
    this.handleDaysToComplete = this.handleDaysToComplete.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.reloadData !== nextProps.reloadData && nextProps.reloadData) {
      this.setState({
        filled: this.props.data.getIn(['property', 'id']),
      })
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault()

    this.props.updateFieldValue('validationErrors', run(this.props.data, fieldValidations), 'currentItem')

    this.props.updateFieldValue('showErrors', true, 'currentItem')
    this.props.updateFieldValue('message.text', '', 'currentItem')

    setTimeout(() => {
      if (this.props.validationErrors.size > 0) return
      const data = this.props.data.get('information').toJS()
      if (!data.id) {
        this.props.addTenantRequest(data)
      } else if (data.lease && data.lease._id) {
        // console.log(data)
        this.props.updateTenantRequest(data.id, data.lease._id, data)
      }
      this.props.goToTab(1)
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
      this.props.updateFieldValue(field, value || e.target.value, 'currentItem.data')
    }
  }

  handleDaysToComplete(value) {
    // console.log('EEE => ', value)
    this.props.updateFieldValue('information.lease.daysToComplete', value, 'currentItem.data')
    const leaseBegins = this.props.data.getIn(['information', 'lease', 'leaseBegins'])
    const leaseExpires = moment(moment(leaseBegins).format('YYYY-MM-DD'))
      .add(value, 'days')
      .format('YYYY-MM-DD')
    this.props.updateFieldValue('information.lease.leaseExpires', leaseExpires, 'currentItem.data')
  }

  handleDatePicker(e) {
    const daysToComplete =
      this.props.data.getIn(['information', 'lease', 'daysToComplete']) || this.props.defaultNumberOfDaysToComplete
    // console.log('DAYSTO COMPLETE : ', daysToComplete)
    const leaseExpires = moment(e.format('YYYY-MM-DD'))
      .add(daysToComplete, 'days')
      .format('YYYY-MM-DD')
    this.props.updateFieldValue('information.lease.leaseBegins', e.format('YYYY-MM-DD'), 'currentItem.data')
    this.props.updateFieldValue('information.lease.leaseExpires', leaseExpires, 'currentItem.data')
  }

  searchTenant(value) {
    const query = {
      where: {
        firstName: { $regex: value, $options: 'i' },
      },
      limit: 10,
    }
    this.props.tentantListRequest(query)
  }

  handleAutocomplete(value, item) {
    if (!item) {
      this.props.updateFieldValue('information.firstName', value, 'currentItem.data')
      this.props.updateFieldValue('information.id', '', 'currentItem.data')
    } else if (item) {
      const info = item
      delete info.lease
      this.handleFieldChanged('information', info)()
    }
    this.setState({ filled: item })
  }

  render() {
    // console.log('Days to Complete =>>', this.props.defaultNumberOfDaysToComplete)
    const tenants = typeof this.props.tenants.toJS === 'function' ? this.props.tenants.toJS() : this.props.tenants
    return (
      <div className="tab-content">
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={this.onFormSubmit} autoComplete="off">
              <FormGroup>
                <AutocompleteInput
                  label="First name"
                  dataKey="firstName"
                  data={tenants}
                  value={this.props.data.getIn(['information', 'firstName'])}
                  onChange={(value, item) => {
                    this.handleAutocomplete(value, item)
                    this.searchTenant(value)
                  }}
                  message={this.errorFor('information.firstName')}
                  hasError={this.showError('information.firstName')}
                  renderItem={(item, isHighlighted) => (
                    <div className={`dropdown-item item ${isHighlighted ? 'bg-primary text-light' : ''}`} key={item.id}>
                      {' '}
                      {item.firstName} {item.lastName}
                    </div>
                  )}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  placeholder="Enter last name"
                  label="Last Name"
                  name="lastName"
                  type="text"
                  isRequired
                  value={this.props.data.getIn(['information', 'lastName'])}
                  onChange={this.handleFieldChanged('information.lastName')}
                  message={this.errorFor('information.lastName')}
                  hasError={this.showError('information.lastName')}
                  readOnly={this.state.filled}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  placeholder="Enter cell phone"
                  label="Cell Phone"
                  name="phone"
                  type="text"
                  isRequired
                  value={this.props.data.getIn(['information', 'phone'])}
                  onChange={this.handleFieldChanged('information.phone')}
                  message={this.errorFor('information.phone')}
                  hasError={this.showError('information.phone')}
                  readOnly={this.state.filled}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  placeholder="Enter Email"
                  label="Email"
                  name="email"
                  type="email"
                  isRequired
                  value={this.props.data.getIn(['information', 'email'])}
                  onChange={this.handleFieldChanged('information.email')}
                  message={this.errorFor('information.email')}
                  hasError={this.showError('information.email')}
                  readOnly={this.state.filled}
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="datepicker">Date of WalkThru</label>
                <br />
                <DatePicker
                  minDate={moment().subtract(4, 'days')}
                  className="form-control datepicker"
                  selected={
                    this.props.data.getIn(['information', 'lease', 'leaseBegins'])
                      ? moment(this.props.data.getIn(['information', 'lease', 'leaseBegins']))
                      : null
                  }
                  onChange={e => this.handleDatePicker(e)}
                />
                {this.showError('information.lease.leaseBegins') && (
                  <small className="form-text text-danger">{this.errorFor('information.lease.leaseBegins')}</small>
                )}
              </FormGroup>
              <FormGroup>
                <label>Days to Complete</label>
              </FormGroup>
              <FormGroup>
                <InputNumberVobi
                  placeholder="Days to Complete"
                  name="daysToComplete"
                  id="daysToComplete"
                  value={
                    this.props.data.getIn(['information', 'lease', 'daysToComplete']) ||
                    this.props.defaultNumberOfDaysToComplete
                  }
                  onChange={this.handleDaysToComplete}
                  message={this.errorFor('information.lease.daysToComplete')}
                  hasError={this.showError('information.lease.daysToComplete')}
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="datepicker"> Due Date </label>
                <br />
                <DatePicker
                  readOnly
                  className="form-control datepicker"
                  disabled
                  selected={
                    this.props.data.getIn(['information', 'lease', 'leaseExpires'])
                      ? moment(this.props.data.getIn(['information', 'lease', 'leaseExpires']))
                      : null
                  }
                />
                {this.showError('information.lease.leaseExpires') && (
                  <small className="form-text text-danger">{this.errorFor('information.lease.leaseExpires')}</small>
                )}
              </FormGroup>

              <FormGroup>
                <button className="btn btn-danger btn-block" type="submit">
                  Next
                </button>
              </FormGroup>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.tenant.getIn(['currentItem', 'data']),
  tenants: state.tenant.get('tenants'),
  validationErrors: state.tenant.getIn(['currentItem', 'validationErrors']),
  showErrors: state.tenant.getIn(['currentItem', 'showErrors']),
  message: state.tenant.getIn(['currentItem', 'message']),
  isLoading: state.tenant.get('isLoading'),
  reloadData: state.tenant.get('reloadData'),
  states: state.common.get('states'),
  defaultNumberOfDaysToComplete: state.currentUser.getIn(['data', 'defaultNumberOfDaysToComplete']),
})

const mapDispatchToProps = dispatch => ({
  updateFieldValue: (field, value, parent, isDelete) => dispatch(updateFieldValue(field, value, parent, isDelete)),
  tentantListRequest: query => dispatch(tentantListRequest(query)),
  addTenantRequest: data => dispatch(addTenantRequest(data)),
  updateTenantRequest: (id, lease, data) => dispatch(updateTenantRequest(id, lease, data)),
  goToTab: index => dispatch(goToTab(index)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(Information))
