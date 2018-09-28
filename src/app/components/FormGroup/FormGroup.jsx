/* eslint react/prop-types:0 */
import React, { PropTypes } from 'react'
import './FormGroup.scss'

// const FormGroup = props => (
//     <form
//       action=""
//       className={`form-group ${props.className}`}
//       onSubmit={props.onSubmit}
//     >
//         {props.children}
//     </form>
// )

const FormGroup = props => <div className={`form-group ${props.className}`}>{props.children}</div>

const FormGroupRow = props => (
  <div className={`form-group__row ${props.className}`}>
    {props.sectionTitle && (
      <h4 className="heading heading--space-top-xs heading--sm heading--space-bottom-xs heading--waikawa-gray">
        {props.sectionTitle}
      </h4>
    )}
    {props.children}
  </div>
)

const FormGroupCol = props => (
  <div className={`form-group__col ${props.className ? props.className : ''}`}>{props.children}</div>
)

FormGroup.defaultProps = {
  className: '',
}

FormGroupRow.defaultProps = {
  className: '',
  sectionTitle: '',
}

export { FormGroup, FormGroupRow, FormGroupCol }
