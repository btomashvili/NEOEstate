/* eslint jsx-a11y/label-has-for:0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import { FormGroup } from '../../../../../components/FormGroup/FormGroup'
import Dropdown from '../../../../../components/Dropdown/Dropdown'
import { Input } from '../../../../../components/Input/Input'
import AutocompleteInput from '../../../../../components/AutocompleteInput/AutocompleteInput'

import { goToTab, updateFieldValue, propertyListRequest, addPropertyRequest } from '../../../actions/tenantActions'
import { ruleRunnerImmutable, run } from '../../../../../utils/ruleRunner'
import { required } from '../../../../../utils/rules'

const fieldValidations = [
  ruleRunnerImmutable('property.street', 'Street Address', required),
  ruleRunnerImmutable('property.city', 'City', required),
  ruleRunnerImmutable('property.zip', 'Zip', required),
  ruleRunnerImmutable('property.state', 'State', required),
  ruleRunnerImmutable('property.housingType', 'Housing Type', required),
]

class Property extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filled: this.props.data.getIn(['property', 'id']),
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    this.props.updateFieldValue('validationErrors', run(this.props.data, fieldValidations), 'currentItem')

    this.props.updateFieldValue('showErrors', true, 'currentItem')
    this.props.updateFieldValue('message.text', '', 'currentItem')

    setTimeout(() => {
      if (this.props.validationErrors.size > 0) return
      const data = this.props.data.get('property').toJS()
      if (!data.id) {
        this.props.addPropertyRequest(data)
      }
      this.props.goToTab(2)
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
      this.props.updateFieldValue(field, value || (e && e.target && e.target.value) || null, 'currentItem.data')
    }
  }

  searchProperty(value) {
    const query = {
      where: {
        street: { $regex: value, $options: 'i' },
      },
      limit: 10,
    }
    this.props.propertyListRequest(query)
  }

  handleAutocomplete(value, item) {
    if (!item) {
      this.props.updateFieldValue('street', value, 'currentItem.data.property')
      this.props.updateFieldValue('id', '', 'currentItem.data.property')
    } else if (item) {
      this.handleFieldChanged('property', item)()
    } else {
      this.props.updateFieldValue('id', '', 'currentItem.data.property')
    }
    this.setState({ filled: item })
  }

  render() {
    const properties =
      typeof this.props.properties.toJS === 'function' ? this.props.properties.toJS() : this.props.properties
    return (
      <div className="tab-content">
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={this.onFormSubmit}>
              <FormGroup>
                <AutocompleteInput
                  label="Street address"
                  dataKey="street"
                  data={properties}
                  value={this.props.data.getIn(['property', 'street'])}
                  onChange={(value, item) => {
                    this.handleAutocomplete(value, item)
                    this.searchProperty(value)
                  }}
                  message={this.errorFor('property.street')}
                  hasError={this.showError('property.street')}
                  renderItem={(item, isHighlighted) => (
                    <div className={`dropdown-item item ${isHighlighted ? 'bg-primary text-light' : ''}`} key={item.id}>
                      {item.street}
                    </div>
                  )}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  placeholder="Enter city"
                  label="City"
                  name="city"
                  type="text"
                  isRequired
                  value={this.props.data.getIn(['property', 'city'])}
                  onChange={this.handleFieldChanged('property.city')}
                  message={this.errorFor('property.city')}
                  hasError={this.showError('property.city')}
                  readOnly={this.state.filled}
                />
              </FormGroup>
              <div className="form-group row">
                <div className="col-md-6">
                  <Dropdown
                    placeholder="State"
                    labelKey={'value2'}
                    label="State"
                    valueKey="value"
                    message={this.errorFor('property.state')}
                    hasError={this.showError('property.state')}
                    options={this.props.states}
                    onChange={selected => this.handleFieldChanged('property.state', selected)()}
                    value={this.props.data.getIn(['property', 'state'])}
                    disabled={this.state.filled}
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    placeholder="Enter zip"
                    label="Zip code"
                    name="zip"
                    type="text"
                    isRequired
                    value={this.props.data.getIn(['property', 'zip'])}
                    onChange={this.handleFieldChanged('property.zip')}
                    message={this.errorFor('property.zip')}
                    hasError={this.showError('property.zip')}
                    readOnly={this.state.filled}
                  />
                </div>
              </div>
              <FormGroup>
                <label>Housing Type</label>
                <Dropdown
                  placeholder="Housing type"
                  labelKey="title"
                  valueKey="title"
                  searchable={false}
                  options={this.props.housingTypes}
                  onChange={selected => this.handleFieldChanged('property.housingType', selected)()}
                  value={this.props.data.getIn(['property', 'housingType'])}
                  hasError={this.showError('property.housingType')}
                  message={this.errorFor('property.housingType')}
                  disabled={this.state.filled}
                  required
                />
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
  properties: state.tenant.get('properties'),
  validationErrors: state.tenant.getIn(['currentItem', 'validationErrors']),
  showErrors: state.tenant.getIn(['currentItem', 'showErrors']),
  message: state.tenant.getIn(['currentItem', 'message']),
  isLoading: state.tenant.get('isLoading'),
  states: state.common.get('states'),
  housingTypes: state.common.get('housingTypes'),
})

const mapDispatchToProps = dispatch => ({
  updateFieldValue: (field, value, parent, isDelete) => dispatch(updateFieldValue(field, value, parent, isDelete)),
  //   addTenantRequest: data => dispatch(addTenantRequest(data)),
  goToTab: data => dispatch(goToTab(data)),
  propertyListRequest: data => dispatch(propertyListRequest(data)),
  addPropertyRequest: data => dispatch(addPropertyRequest(data)),
})

Property.propTypes = {
  //   translate: PropTypes.func,
  //   roleList: PropTypes.object,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(Property))
