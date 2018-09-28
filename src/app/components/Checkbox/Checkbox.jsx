/* eslint react/prop-types:0 */

import React, { PropTypes } from 'react'
import './Checkbox.scss'

const Checkbox = props => (
  <div className="checkbox">
    <span className={`checkbox__input ${props.checked ? 'checkbox__input--checked' : ''}`}>
      <input type="checkbox" classID={props.name} value={props.value} onChange={() => props.onChange(props.value)} />
    </span>
    {props.label && <label className="checkbox__label" htmlFor={props.name} />}
  </div>
)

Checkbox.defaultProps = {
  label: false,
  onChange: () => false,
  value: '',
  checked: false,
}
Checkbox.PropTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
}
export default Checkbox
