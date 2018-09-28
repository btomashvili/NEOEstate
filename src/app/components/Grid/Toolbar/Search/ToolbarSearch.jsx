import React from 'react'
import './ToolbarSearch.scss'

export default class ToolbarSearch extends React.Component {
  render() {
    return (
      <div className="toolbar-filter">
        <input
          className="toolbar-filter__field"
          type="search"
          placeholder={this.props.placeholder || 'Type keyword …'}
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <button className="toolbar-filter__btn" />
      </div>
    )
  }
}
