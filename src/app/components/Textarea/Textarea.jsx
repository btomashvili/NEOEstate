import React, { PropTypes } from 'react'
import './Textarea.scss'

const Textarea = props => (
  <div className={`textarea-wrapper ${props.wrapperClass}`}>
    {props.label && (
      <label htmlFor={props.name} className="textarea__label">
        {props.label}
      </label>
    )}
    <div
      className={`input ${props.hasError ? 'input--has-error' : ''} ${props.hasIcon ? 'input--has-icon' : ''} ${
        props.className
      } ${props.required ? 'input--required' : ''}`}
    >
      {props.hasIcon && (
        <span className="textarea__control-icon">
          <img src={props.icon} alt={props.name} />
        </span>
      )}
      <textarea
        className="textarea__control"
        rows={props.row}
        placeholder={props.placeholder}
        name={props.name}
        maxLength={props.max}
        classID={props.name}
        onChange={e => props.onChange(e)}
        value={props.value || ''}
      />
    </div>
    <div className="textarea__message">{props.message}</div>
  </div>
)

Textarea.defaultProps = {
  hasIcon: false,
  className: '',
  wrapperClass: '',
  label: false,
  required: false,
  max: '20',
  value: '',
  onChange: () => false,
}

Textarea.propTypes = {
  wrapperClass: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  message: PropTypes.string,
  hasIcon: PropTypes.bool,
  hasError: PropTypes.bool,
  required: PropTypes.bool,
  icon: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  row: PropTypes.number,
  max: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default Textarea
