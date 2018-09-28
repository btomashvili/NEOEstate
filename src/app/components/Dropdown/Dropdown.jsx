/* eslint react/prop-types:0 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Select from 'react-select'
import 'react-select/dist/react-select.css'
import './Dropdown.scss'

class Dropdown extends Component {
  handleChange = (selectedOption) => {
    if (!selectedOption) {
      this.props.onChange(null)
    } else if (this.props.valueKey) {
      this.props.onChange(selectedOption[this.props.valueKey], selectedOption)
    } else {
      this.props.onChange(selectedOption)
    }
  }

  render() {
    const options = this.props.options.toJS()
    return (
      <div>
        {this.props.label && <label htmlFor="label">{this.props.label}</label>}
        <Select
          id="state-select"
          name="form-field-name"
          ref={(ref) => {
            this.select = ref
          }}
          onChange={this.handleChange}
          valueKey={this.props.valueKey}
          // required={this.props.required}
          labelKey={this.props.labelKey}
          value={this.props.value}
          placeholder={this.props.placeholder}
          options={options}
          clearable={!!this.props.value}
          searchable={this.props.searchable}
          disabled={!!this.props.disabled}
        />
        <small className="form-text text-danger">{this.props.message}</small>
      </div>
    )
  }
}
Dropdown.defaultProps = {
  searchable: true,
}

Dropdown.PropTypes = {
  onChange: PropTypes.func,
  searchable: PropTypes.bool,
}

export default Dropdown
