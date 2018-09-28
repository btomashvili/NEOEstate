import React from 'react'
import moment from 'moment'
import ReactDatePicker from 'react-datepicker'
import './DateRangePicker.scss'
import { isDescendant } from '../helpers/dom'

export default class DateRangePicker extends React.Component {
  state = {
    open: false,
    from: null,
    to: null,
  }

  hidePicker = () => {
    this.setState({
      open: false,
    })
  }

  onStartDateSelect = (date) => {
    this.setState({
      from: date,
    })

    setTimeout(this.triggerRangeSelect, 0)
  }

  onEndDateSelect = (date) => {
    this.setState({
      to: date,
    })

    setTimeout(this.triggerRangeSelect, 0)
  }

  getData = () => {
    if (this.state.from && this.state.to) {
      return {
        from: this.state.from.toDate(),
        to: this.state.to.toDate(),
      }
    }

    return null
  }

  triggerRangeSelect = () => {
    if (this.state.from && this.state.to) {
      this.props.onRangeSelect({
        from: this.state.from.toDate(),
        to: this.state.to.toDate(),
      })
      this.hidePicker()
    }
  }

  getDisplayText = () => {
    if (this.state.from && this.state.to) {
      return `${moment(this.state.from).format('MM/DD/YYYY')} - ${moment(this.state.to).format('MM/DD/YYYY')}`
    }

    return ''
  }

  togglePicker = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  handlePickerBehavior = (e) => {
    if (!isDescendant(this.pickerContainer, e.target) && e.target != this.trigger) {
      this.hidePicker()
    }
  }

  componentDidMount = () => {
    this.trigger.addEventListener('click', this.togglePicker)
    document.addEventListener('click', this.handlePickerBehavior)
  }

  componentWillUnmount() {
    this.trigger.removeEventListener('click', this.togglePicker)
    document.removeEventListener('click', this.handlePickerBehavior)
  }

  render() {
    return (
      <div className={`${this.props.className} date-range-picker`}>
        <input
          style={{ width: '100%', paddingRight: 13 }}
          className="date-range-picker"
          readOnly
          ref={(c) => {
            this.trigger = c
          }}
          placeholder={this.props.placeholder}
          type="text"
          value={this.getDisplayText()}
        />
        {this.state.open && (
          <div
            className={`date-range-picker__body ${this.props.right ? 'date-range-picker__body--right' : ''}`}
            ref={(c) => {
              this.pickerContainer = c
            }}
          >
            <ReactDatePicker
              inline
              selected={this.state.from || this.props.from}
              selectsStart
              startDate={this.state.from}
              endDate={this.state.to}
              onChange={this.onStartDateSelect}
            />

            <ReactDatePicker
              inline
              selected={this.state.to || this.props.to}
              selectsEnd
              startDate={this.state.from}
              endDate={this.state.to}
              minDate={this.state.from}
              onChange={this.onEndDateSelect}
            />
          </div>
        )}
      </div>
    )
  }
}

DateRangePicker.propTypes = {
  onRangeSelect: React.PropTypes.func,
  minDate: React.PropTypes.string,
  maxDate: React.PropTypes.string,
}

DateRangePicker.defaultProps = {
  onRangeSelect: (data) => {
    // console.log('selected data:', data);
  },
  right: false,
}
