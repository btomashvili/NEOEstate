/* eslint react/prop-types:0 */

import React, { Component, PropTypes } from 'react'
import Autocomplete from 'react-autocomplete'
import './AutocompleteInput.scss'

class AutocompleteInput extends Component {
  render() {
    return (
      <div className="">
        <label>{this.props.label}</label>
        <Autocomplete
          inputProps={{ className: 'form-control', autoComplete: 'OFF' }}
          wrapperStyle={{ position: 'relative', display: 'inline-block', width: '100%' }}
          value={this.props.value}
          items={this.props.data}
          getItemValue={item => item[this.props.dataKey]}
          onSelect={(value, item) => {
            this.props.onChange(value, item)
          }}
          onChange={(event, value) => {
            this.props.onChange(value)
          }}
          renderMenu={children => (
            <div className={`dropdown-menu dropdown-typehead ${!this.props.value.length ? 'hide' : ''}`}>
              {children}
              {!this.props.data.length && <div className="dropdown-item item">No results</div>}
            </div>
          )}
          renderItem={this.props.renderItem}
        />
        <small className="form-text text-danger">{this.props.message}</small>
      </div>
    )
  }
}
AutocompleteInput.defaultProps = {
  label: '',
  message: '',
  value: '',
  dataKey: '',
  // required: false,
  // dataText: false,
}

AutocompleteInput.PropTypes = {
  label: PropTypes.string,
  message: PropTypes.string,
  value: PropTypes.string,
  dataKey: PropTypes.string,
  onChange: PropTypes.func,
  // required: PropTypes.bool,
}

export default AutocompleteInput
