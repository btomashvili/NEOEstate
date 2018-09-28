/* eslint react/prop-types:0 */
// import 'rc-input-number/assets/index.css'
import React, { PropTypes } from 'react'
// import InputNumber from 'rc-input-number'
import './InputNumberVobi.scss'

const InputNumberVobi = props => (
  <div className={`input-wrapper ${props.wrapperClass}`}>
    {props.label && <label htmlFor={props.name}>{props.label}</label>}
    {props.hasAsterisk && <span className="input__required" />}
    <input
      min={0}
      max={1000}
      style={{ width: 100 }}
      value={props.value}
      id={props.name}
      placeholder={props.placeholder}
      onChange={e => props.onChange(e)}
      disabled={props.disabled}
      readOnly={props.readOnly}
    />
    <small className="form-text text-danger">{props.message}</small>
  </div>
)

InputNumberVobi.defaultProps = {
  hasIcon: false,
  hasAddon: false,
  className: '',
  wrapperClass: '',
  labelClass: '',
  label: false,
  required: false,
  value: '',
  disabled: false,
}

InputNumberVobi.PropTypes = {
  className: PropTypes.string,
  hasIcon: PropTypes.bool,
  required: PropTypes.bool,
  icon: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  hasAddon: PropTypes.bool,
  onChange: PropTypes.func,
  max: PropTypes.number,
  labelClass: PropTypes.string,
}

export default InputNumberVobi
