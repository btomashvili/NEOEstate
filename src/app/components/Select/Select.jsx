/* eslint react/prop-types:0 */

import React, { Component, PropTypes } from 'react'
import './Select.scss'

class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      placeholder: '',
    }
  }
  render() {
    const selectedValue = this.props.data.filter(item => item.get(this.props.dataKey) === this.props.selected)
    const selectedKey = selectedValue.size > 0 ? selectedValue.keySeq().first() : ''
    return (
      <div className="select-wrapper">
        {this.props.label && <label className="select__label">{this.props.label}</label>}
        <div
          className={`select ${this.props.className} ${this.props.hasError ? 'select--has-error' : ''} ${
            this.props.readOnly ? 'select--readonly' : ''
          } ${this.state.visible ? 'select--visible' : ''} ${this.props.required ? 'select--required' : ''} ${
            this.props.disabled ? 'select--disabled' : ''
          }`}
        >
          <div
            className={`select__selected
                    ${this.props.visa && this.props.visa === 'YES' ? 'select__selected--YES' : ''}
                    ${this.props.visa && this.props.visa === 'NO' ? 'select__selected--NO' : ''}
                  `}
            onClick={() => {
              if (!this.props.disabled) {
                this.setState({ visible: !this.state.visible })
              }
            }}
          >
            <span className="select__selected-item">
              {this.props.selected && selectedValue.size > 0
                ? selectedValue.getIn([selectedKey, this.props.dataValue])
                : this.props.placeholder}
            </span>
          </div>
          <ul id="selectList" className={'select__list'}>
            {this.props.data.map((item, key) => (
              <li
                key={key}
                className="select__list-item"
                data-value={item.get(this.props.dataKey)}
                onClick={() => {
                  this.props.onChange(item.get(this.props.dataKey), item)
                  this.setState({ visible: false })
                }}
              >
                {this.props.dataText
                  ? this.props.dataText.split(',').map(val => `${item.get(val)} `)
                  : item.get(this.props.dataValue)}
              </li>
            ))}
          </ul>
        </div>
        {this.props.visa &&
          this.props.visa === 'YES' && (
            <div className="select__message select__message--YES">
              you will require a visa to enter Hungary, please click here{' '}
              <a target="_blank" href="http://konzuliszolgalat.kormany.hu/en">
                (http://konzuliszolgalat.kormany.hu/en)
              </a>{' '}
              for further information
            </div>
          )}
        {this.props.visa &&
          this.props.visa === 'NO' && (
            <div className="select__message select__message--NO">you will not require a visa to enter Hungary</div>
          )}
        <div className="select__message">{this.props.message}</div>
      </div>
    )
  }
}
Select.defaultProps = {
  className: '',
  required: false,
  dataText: false,
}

Select.PropTypes = {
  className: PropTypes.string,
  required: PropTypes.bool,
}

export default Select
