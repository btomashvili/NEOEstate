import React from 'react'
import classNames from 'classnames'
import moment from 'moment'
import './ToolbarFilter.scss'
import DatePicker from '../../../DatePicker/DatePicker'

// import dropdownIcon from '../../../../assets/images/dropdown-icon.svg';
// import filterIcon from '../../../../assets/images/filter-icon.svg';

export default class ToolbarFilter extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.state = {
      openCategories: false,
      openTags: false,
      selectedCategoires: this.props.categoriesData ? this.props.categoriesData[0] : [],
      selectedTags: this.props.tagsData ? this.props.tagsData[0] : [],
    }
  }

  toggleSelect = (open) => {
    this.setState({
      [open]: !this.state[open],
    })
  }

  handleSelectTags = (key, value, type) => {
    this.setState({
      selectedTags: this.props.tagsData[key],
    })
    this.toggleSelect('openTags')
    this.props.onTagsChange(key, { tag: value })
  }

  handleSelectCategories = (key, value) => {
    this.setState({
      selectedCategoires: this.props.categoriesData[key],
    })
    this.toggleSelect('openCategories')
    this.props.onCategoriesChange(key, { role: value })
  }

  handleClick(event) {
    const { target } = event
    if (target === this.filterDropdownCategories || this.filterDropdownCategories.contains(target)) {
      if (
        target === this.selectDropdownCategories ||
        this.selectDropdownCategories.contains(target) ||
        (target === this.selectDropdownTags || this.selectDropdownTags.contains(target))
      ) {
      } else {
        this.setState({ openTags: false, openCategories: false })
      }
    } else if (target === this.props.filterButtonRef.button || this.props.filterButtonRef.button.contains(target)) {
      // alert(2);
    } else {
      this.props.onOutsideClick()
    }
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false)
  }

  handleFieldChanged(field, value, type = 'input') {
    if (type === 'datepicker') {
      return (date) => {
        this.props.updateFieldValue('query.where.createdAt', date)
        this.props.onDateChange({ createdAt: date })
      }
    }
  }

  handleClear() {
    this.props.onClear()
    this.setState({ selectedTags: this.props.tagsData[0], selectedCategoires: this.props.categoriesData[0] })
  }

  render() {
    // console.log(this.props.categoriesData, 'cccccc')
    const dateFilter =
      this.props.dateData === '' || typeof this.props.dateData === 'undefined' ? '' : moment(this.props.dateData)
    return (
      <div
        className={`filter ${this.props.open ? 'filter--open' : ''}`}
        ref={(el) => {
          this.filterDropdownCategories = el
        }}
      >
        <div className="filter__select" ref={el => (this.selectDropdownCategories = el)}>
          <span className="filter__select-chosen" onClick={() => this.toggleSelect('openCategories')}>
            {this.state.selectedCategoires || this.props.categoriesPlaceholder}
          </span>
          <ul className={`filter__select-list ${this.state.openCategories ? 'filter__select-list--open' : ''}`}>
            {this.props.categoriesData.map((item, key) => (
              <li key={key} className="filter__select-list-item" onClick={() => this.handleSelectCategories(key, item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {this.props.visibleTags && (
          <div className="filter__select" ref={el => (this.selectDropdownTags = el)}>
            <span className="filter__select-chosen" onClick={() => this.toggleSelect('openTags')}>
              {this.state.selectedTags || this.props.tagsPlaceholder}
            </span>
            <ul className={`filter__select-list ${this.state.openTags ? 'filter__select-list--open' : ''}`}>
              {this.props.tagsData.map((item, key) => (
                <li key={key} className="filter__select-list-item" onClick={() => this.handleSelectTags(key, item)}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* {console.log(dateFilter)}*/}
        <DatePicker
          className="filter__datepicker"
          value={dateFilter}
          dateFormat="YYYY-MM-DD"
          onChange={this.handleFieldChanged('createdAt', null, 'datepicker')}
        />
        <button onClick={this.handleClear} className="filter__clear-btn toolbar-button toolbar-button--sm">
          Show All
        </button>
      </div>
    )
  }
}

ToolbarFilter.propTypes = {
  data: React.PropTypes.array,
  onChoose: React.PropTypes.func,
  listPlaceholder: React.PropTypes.string,
  inputPlaceholder: React.PropTypes.string,
}
