import React from 'react'
import classNames from 'classnames'
import './Paging.scss'
// import prevPage from "../../../assets/images/previous-page.svg";
// import nextPage from "../../../assets/images/next-page.svg";

export default class Paging extends React.Component {
  state = {
    visibleSpan: 3,
    currentPage: this.props.currentPage || 1,
    items: [],
  }

  calculateTotalPageCount = props => Math.ceil(props.totalCount / props.pageSize)

  loadPages = (props) => {
    const newArr = []

    for (let i = 0; i < this.calculateTotalPageCount(props); i++) {
      newArr.push(i + 1)
    }

    this.setState({
      items: newArr,
    })
  }
  // Transform to an array
  componentDidMount() {
    this.loadPages(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.totalCount !== this.props.totalCount) {
      this.loadPages(nextProps)
    }
  }

  // whether user can navigate back on pager
  canGoBack = () => this.props.currentPage > 1

  // wheterh user can navigate forward on pager
  canGoForward = () => this.props.currentPage < this.calculateTotalPageCount(this.props)

  // goback
  _goBack = () => {
    if (this.canGoBack()) {
      this._switchPage(this.props.currentPage - 1)()
    }
  }

  // goforward
  _goForward = () => {
    if (this.canGoForward()) {
      this._switchPage(this.props.currentPage + 1)()
    }
  }

  // Go to lats page
  _goLast = () => {
    const lastPage = parseInt(Math.ceil(this.props.totalCount / this.props.pageSize))
    this.props.setPage(lastPage)()
  }

  // Go to first page

  _goFirst = () => {
    this.props.setPage(1)()
  }

  _switchPage = nextPage => () => {
    this.setState({
      currentPage: nextPage,
    })

    this.props.setPage(nextPage)()
  }

  // render paging component
  generatePaging = () => {
    const { currentPage, visibleSpan, items } = this.state

    let elements = []
    const n = currentPage - 1

    if (n > items.length - (visibleSpan - 1)) {
      elements = JSON.parse(JSON.stringify(items)).splice(-1 * visibleSpan)
    } else if (n < visibleSpan - 1) {
      elements = JSON.parse(JSON.stringify(items)).splice(0, visibleSpan)
    } else {
      elements = JSON.parse(JSON.stringify(items)).splice(n - 1, visibleSpan)
    }

    return elements.map((item, i) => (
      <li
        key={i}
        className={classNames({
          paging__item: true,
          'paging__item--active': this.props.currentPage == item,
        })}
        onClick={this._switchPage(item)}
      >
        {item}
      </li>
    ))
  }

  render() {
    const modifier = this.props.modifier ? `paging--${this.props.modifier}` : ''

    const pagingClassLits = classNames('paging', 'paging--right', modifier)

    return this.generatePaging().length > 1 ? (
      <div className={pagingClassLits}>
        <ul className="paging__list">
          <li
            className={classNames('paging__item paging__item--dir', {
              'paging__item paging__item--disabled': !this.canGoBack(),
            })}
            onClick={this._goFirst}
          >
            First
          </li>
          <li
            className={classNames('paging__item paging__item--dir', {
              'paging__item paging__item--disabled': !this.canGoBack(),
            })}
            onClick={this._goBack}
          >
            Prev
          </li>
          {this.generatePaging().map(item => item)}
          <li
            className={classNames('paging__item paging__item--dir', {
              'paging__item paging__item--disabled': !this.canGoForward(),
            })}
            onClick={this._goForward}
          >
            Next
          </li>
          <li
            className={classNames('paging__item paging__item--dir', {
              'paging__item paging__item--disabled': !this.canGoForward(),
            })}
            onClick={this._goLast}
          >
            Last
          </li>
        </ul>
      </div>
    ) : null
  }
}

Paging.defaultProps = {
  modifier: false,
}
