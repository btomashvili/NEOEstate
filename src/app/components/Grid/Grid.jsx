import React from 'react'
import classNames from 'classnames'
import update from 'react-addons-update'
import './Grid.scss'
import Checkbox from '../Checkbox/Checkbox'

import Paging from './Paging/Paging'
import ActionsMenu from './ActionsMenu/ActionsMenu'
import DateRangePicker from '../DateRangePicker/DateRangePicker'
import Input from '../Input/Input'

export default class Grid extends React.Component {
  state = {
    currentPage: 1,
    filterKeys: {},
    sortFields: [],
  }

  getValue = (obj, key) => {
    const paths = key.split('.')
    let current = obj

    if (this.props.immutable) {
      return obj.getIn(paths)
    }
    for (let i = 0; i < paths.length; ++i) {
      if (current[paths[i]] == undefined) {
        return undefined
      }
      current = current[paths[i]]
    }

    return current
  }

  // switch page
  _setPage = page => () => {
    // if user clicks on the same page twice, deny it
    if (this.state.currentPage == page) {
      return
    }

    // set current page
    this.setState({
      currentPage: page,
    })

    // run callback to fetch new data and pass it down via props
    this.props.onPageSwitch(page, this.props.pageSize)
  }

  componentWillMount() {
    if (this.props.rowActions) {
      this.props.columnConfig.push({})
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPage != this.state.currentPage) {
      this.setState({ currentPage: nextProps.currentPage })
    }
  }

  constructor(props) {
    super(props)
    this.filters = {}
  }

  columnValue(column, item) {
    return this.getValue(item, column.dataKey) ? this.getValue(item, column.dataKey) : column.placeholder
  }

  // render template for each row of the table
  renderRow = (item, rowIndex) =>
    this.props.columnConfig.map((column, index) => (
      <td
        key={index}
        className={`table-data__align--${column.align || 'left'}${
          index == 0 && this.props.selectable ? ' row-selector' : ''
        }`}
      >
        {column.render ? column.render(this.columnValue(column, item), item, rowIndex) : this.columnValue(column, item)}
      </td>
    ))

  handleFieldChanged(field) {
    return (e) => {
      const newState = update(this.state.filterKeys, {
        [field]: { $set: e.target.value },
      })

      this.setState(
        update(this.state, {
          $merge: {
            filterKeys: newState,
          },
        })
      )
    }
  }

  handleFilterChange = () => {
    let _filter = {}

    for (const x in this.filters) {
      _filter = update(_filter, {
        $merge: {
          [x]:
            this.filters[x] instanceof React.Component && !!this.filters[x].getData
              ? this.filters[x].getData()
              : this.filters[x].value,
        },
      })
    }

    if (this.props.onFiltersChange) {
      this.props.onFiltersChange(_filter)
    }
  }

  renderFilter = (filter, i) => {
    const filterWidthExpression = `calc(100% / ${this.props.columnConfig.length})`
    return (
      <span key={i} className="data-table__filter-wrap" style={{ width: filterWidthExpression * 3 }}>
        {filter.render()}
      </span>
    )
    // switch(filter.type) {
    //   // case 'select':
    //   //   return (
    //   //     <span key={i} className="data-table__filter-wrap" style={{ width: filterWidthExpression }}>
    //   //       <select defaultValue="" required ref={(c) => {this.filters[field.dataKey] = c}} placeholder={field.title} onChange={this.handleFilterChange}>
    //   //         <option value="" disabled>{field.title}</option>
    //   //         {
    //   //           filter.values.map((item, i) => {
    //   //             return <option key={i} value={(filter.immutable)?item.get(filter.dataKey) : item[filter.dataKey]}
    //   //             >{(filter.immutable)?item.get(filter.dataValue) : item[filter.dataValue]}</option>
    //   //           })
    //   //         }
    //   //       </select>
    //   //     </span>
    //   //   );

    //   case 'date':
    //     return (
    //       <span key={i} className="data-table__filter-wrap" style={{ width: filterWidthExpression * 3 }}>
    //         <DateRangePicker ref={(c) => {this.filters[filter.dataKey] = c}} onRangeSelect={this.handleFilterChange} placeholder={filter.title} />
    //       </span>
    //     );

    //   case 'autoComplete':
    //     return (
    //       <span key={i} className="data-table__filter-wrap" style={{ width: filterWidthExpression * 3 }}>
    //         {filter.render()}
    //       </span>
    //     );

    //   case 'text':
    //   default:
    //     return (
    //       <span key={i} className="data-table__filter-wrap" style={{ width: filterWidthExpression }}>
    //       </span>
    //     );
    // }
  }

  sortString = ''

  sort = dataKey => (e) => {
    let attr = 'asc'

    if (this.sortString.indexOf(`-${dataKey}`) != -1) {
      this.sortString = this.sortString.replace(new RegExp(`-${dataKey}(?=\\s|$)`), dataKey)
      attr = 'asc'
    } else if (this.sortString.indexOf(dataKey) != -1) {
      this.sortString = this.sortString.replace(new RegExp(`(^|\\b)${dataKey}(?=\\s|$)`), `-${dataKey}`)
      attr = 'desc'
    } else {
      // this.sortString += dataKey + " ";
      this.sortString = `${dataKey} `
    }

    e.target.setAttribute('data-sort', attr)

    if (this.props.onSort) this.props.onSort(this.sortString)
  }

  render() {
    const tableClassList = classNames('data-table', {
      'data-table--striped': this.props.striped,
      'data-table--bordered': this.props.bordered,
      'data-table--selectable': this.props.selectable,
    })

    return (
      <div>
        <div className={`table-wrap${this.props.busy ? ' table-wrap--loading' : ''}`}>
          <table className={tableClassList}>
            <thead>
              <tr onClick={this.props.onRowClick}>
                {this.props.columnConfig.map((col, index) => (
                  <th
                    key={index}
                    className={col.sortable && this.props.data.size > 0 ? 'column-sortable' : ''}
                    onClick={this.props.data.size > 0 && col.sortable && this.sort(col.dataKey)}
                  >
                    {col.hasCheckAll ? (
                      <Checkbox checked={this.props.isAllChecked} onChange={() => this.props.onCheckAll()} />
                    ) : (
                      col.title
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            {this.props.filterable &&
              this.props.filtersVisible && (
                <tbody className="data-table__filters">
                  <tr>
                    <td colSpan={this.props.columnConfig.length}>
                      {this.props.filterConfig.map((filter, i) => this.renderFilter(filter, i))}
                    </td>
                  </tr>
                </tbody>
              )}
            <tbody>
              {this.props.data.valueSeq().map((item, index) => (
                <tr key={index}>{this.renderRow(item, index)}</tr>
              ))}
            </tbody>
            {this.props.data.size === 0 && (
              <tbody>
                <tr>
                  <td className="data-table__empty-row" colSpan={this.props.columnConfig.length}>
                    <div className="data-table__no-records">{this.props.emptyText}</div>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
          {this.props.paging &&
            this.props.data.size > 0 && (
              <Paging
                pageSize={this.props.pageSize}
                totalCount={this.props.totalCount}
                setPage={this._setPage}
                currentPage={this.state.currentPage}
              />
            )}
        </div>
      </div>
    )
  }
}

Grid.propTypes = {
  data: React.PropTypes.object,
  emptyText: React.PropTypes.string,
  columnConfig: React.PropTypes.array,
  filterConfig: React.PropTypes.array,
  paging: React.PropTypes.bool,
  selectable: React.PropTypes.bool,
  sortable: React.PropTypes.bool,
  onRowClick: React.PropTypes.func,
  onPageSwitch: React.PropTypes.func,
  pageSize: React.PropTypes.number,
  busy: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
}

Grid.defaultProps = {
  data: [],
  filterConfig: [],
  striped: true,
  bordered: true,
  paging: true,
  pageSize: 10,
  busy: false,
  emptyText: 'No records found',
}
