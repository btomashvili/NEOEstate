import React, { PropTypes } from 'react'
import './ActionGroup.scss'

const ActionGroup = props => (
  <div className="table-toolbar__action-group">
    {props.delete && (
      <button
        className="table-toolbar__action-group-item table-toolbar__action-group-item--delete"
        onClick={e => props.onDelete(e)}
      />
    )}
    {props.edit && (
      <button
        className="table-toolbar__action-group-item table-toolbar__action-group-item--edit"
        onClick={e => props.onEdit(e)}
      />
    )}
    {props.add && (
      <button
        className="table-toolbar__action-group-item table-toolbar__action-group-item--add"
        onClick={e => props.onAdd(e)}
      />
    )}
  </div>
)

ActionGroup.PropTypes = {
  add: PropTypes.bool,
  edit: PropTypes.bool,
  delete: PropTypes.bool,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
}

ActionGroup.defaultProps = {
  add: false,
  edit: false,
  delete: false,
  onAdd: () => false,
  onDelete: () => false,
  onEdit: () => false,
}

export default ActionGroup
