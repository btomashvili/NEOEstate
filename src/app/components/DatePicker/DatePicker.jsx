/* eslint react/prop-types:0 */
import React, { PropTypes } from 'react'
import Datepicker from 'react-datepicker'
import './DatePicker.scss'

const Button = props => (
  <button type="button" className="datepicker__control" onClick={props.onClick} disabled={props.disabled}>
    {props.value}
  </button>
)

const DatePicker = props => (
  <div className={`datepicker-wrapper ${props.wrapperClass}`}>
    {props.label && (
      <label htmlFor={props.name} className="datepicker__label">
        {props.label}
      </label>
    )}
    <div
      className={`datepicker ${props.hasError ? 'datepicker--has-error' : ''} ${
        props.hasIcon ? 'datepicker--has-icon' : ''
      } ${props.className} ${props.required ? 'datepicker--required' : ''} ${
        props.disabled ? 'datepicker--disabled' : ''
      }`}
    >
      {props.hasIcon && (
        <span className="datepicker__control-icon">
          <img src={props.icon} alt={props.name} />
        </span>
      )}
      <Datepicker
        customInput={<Button disabled={props.disabled} onClick={e => e.preventDefault()} />}
        className="datepicker__control"
        dateFormat={props.dateFormat}
        onChange={date => props.onChange(date)}
        selected={props.value}
        showMonthDropdown
        showYearDropdown
        scrollableYearDropdown
        dropdownMode="select"
      />
    </div>
    <div className="datepicker__message">{props.message}</div>
  </div>
)

DatePicker.defaultProps = {
  hasIcon: false,
  hasAddon: false,
  className: '',
  wrapperClass: '',
  label: false,
  required: false,
  disabled: false,
}

DatePicker.PropTypes = {
  className: PropTypes.string,
  hasIcon: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.name,
  customInput: PropTypes.element,
  value: PropTypes.string,
  dateInput: PropTypes.string,
  dateFormat: PropTypes.string,
}

export default DatePicker
