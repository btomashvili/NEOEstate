import React, { PropTypes } from 'react'
import './Radio.scss'

const Radio = props => (
  <div className={`radio ${props.className ? props.className : ''}`}>
    <label htmlFor={props.id} className={`radio__label ${props.labelClass ? props.labelClass : ''}`}>
      {props.label}
    </label>
    <div className={`radio__control ${props.hasError ? 'radio__control--hasError' : ''}`}>
      <input
        className="radio__control-input"
        type="radio"
        value={props.value}
        name={props.name}
        id={props.id}
        defaultChecked={props.checked ? 'checked' : ''}
        onChange={props.onChange}
        classID={props.id}
      />
      <span className={`radio__control-btn ${props.checked ? 'radio__control-btn--checked' : ''}`} />
    </div>
  </div>
)

Radio.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  checked: PropTypes.bool,
  editable: PropTypes.bool,
  value: PropTypes.any,
  id: PropTypes.string,
  onChange: PropTypes.func,
  labelClass: PropTypes.string,
}

export default Radio
