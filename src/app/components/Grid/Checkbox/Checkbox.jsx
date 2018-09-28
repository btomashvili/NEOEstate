/* eslint react/prefer-stateless-function:0 */
import React from 'react'
import classNames from 'classnames'
import './Checkbox.scss'

export default class Checkbox extends React.Component {
  render() {
    const checkboxClassList = classNames('table-checkbox', {
      'table-checkbox--gradient': this.props.gradient,
    })

    return (
      <label className={checkboxClassList}>
        {/* <input className="table-checkbox__input" type="checkbox" {...this.props} />*/}
        <input
          className="table-checkbox__input"
          onChange={this.props.onChange}
          type="checkbox"
          checked={this.props.checked ? 'checked' : ''}
        />
        <span className="table-checkbox__circle" />
      </label>
    )
  }
}

Checkbox.defaltProps = {
  checked: false,
}
