/* eslint react/prop-types:0 */
import React, { PropTypes } from 'react'
import './Input.scss'

const Input = props => (
  <div className={`input-wrapper ${props.wrapperClass}`}>
    {props.label && <label htmlFor={props.name}>{props.label}</label>}
    {props.hasAsterisk && <span className="input__required" />}
    <input
      className="form-control"
      id={props.name}
      placeholder={props.placeholder}
      type={props.type}
      autoComplete="off"
      value={props.value}
      onChange={e => props.onChange(e)}
      onBlur={e => props.onBlur(e)}
      disabled={props.disabled}
      readOnly={props.readOnly}
      accept={props.accept}
      min={props.min}
    />
    <small className="form-text text-danger">{props.message}</small>
  </div>
)

const InputMultiple = props => (
  <div className="input-multiple">
    {props.label && <label className="input-multiple__label">{props.label}</label>}
    <div
      className={`input-multiple__content ${props.className} ${
        props.required ? 'input-multiple__content--required' : ''
      }`}
    >
      {props.children}
    </div>
  </div>
)

Input.defaultProps = {
  hasIcon: false,
  hasAddon: false,
  className: '',
  wrapperClass: '',
  labelClass: '',
  label: false,
  required: false,
  value: '',
  disabled: false,
  accept: '',
  onBlur: () => {},
}

Input.PropTypes = {
  className: PropTypes.string,
  hasIcon: PropTypes.bool,
  required: PropTypes.bool,
  icon: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  hasAddon: PropTypes.bool,
  onChange: PropTypes.func,
  max: PropTypes.number,
  labelClass: PropTypes.string,
  onBlur: PropTypes.func,
}

InputMultiple.defaultProps = {
  required: false,
}

export { InputMultiple, Input }
