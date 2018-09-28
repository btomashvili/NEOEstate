/* eslint react/prop-types:0 */

import React, { PropTypes } from 'react'
import './Button.scss'

const Button = props => (
  <button
    type={props.type}
    onClick={e => props.onClick(e)}
    className={`button ${props.className} ${props.isLoading ? 'button--isLoading' : ''}`}
  >
    {props.children}
    {props.isLoading && (
      <span className="button--isLoading-loader">
        <span className="button--isLoading-loader-dott" />
        <span className="button--isLoading-loader-dott" />
        <span className="button--isLoading-loader-dott" />
      </span>
    )}
  </button>
)

Button.defaultProps = {
  className: '',
  type: 'submit',
  isLoading: false,
  onClick: () => false,
}

Button.PropTypes = {
  className: PropTypes.string,
  children: PropTypes.object.isRequired,
  type: PropTypes.string,
  isLoading: PropTypes.bool,
}

export default Button
