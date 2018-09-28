import React, { PropTypes } from 'react'
import './Push.scss'

const Push = props => (
  <div className={`push-wrapper ${props.wrapperClass}`}>
    {props.label && <label className={`push__label ${props.labelClass}`}>{props.label}</label>}
    <div className={`push  ${props.className}`}>
      <div className="push__control">
        <div
          className={`push__control-off ${props.checked === false ? 'push__control-active' : ''}`}
          onClick={() => props.onClick(false)}
        >
          off
        </div>
        <div
          className={`push__control-on ${props.checked === true ? 'push__control-active' : ''}`}
          onClick={() => props.onClick(true)}
        >
          on
        </div>
      </div>
    </div>
  </div>
)
Push.defaultProps = {
  wrapperClass: '',
  labelClass: '',
  className: '',
}

Push.propTypes = {
  wrapperClass: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  labelClass: PropTypes.string,
  checked: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Push
