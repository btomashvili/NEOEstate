/* eslint react/prop-types:0 */
import React, { PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import { generateUserAvatarUrl } from '../../utils/helper'
import './InboxBox.scss'
import moment from 'moment'

const lastMessage = (item) => {
  const conversation = item.get('conversation').toJS()
  return conversation[conversation.length - 1]
}

const isOnline = (props) => {
  const userId = props.data.getIn(['fromUser', 'id'])
  let result = false
  if (props.listOfOnlineUsers) {
    result = props.listOfOnlineUsers.find(id => id === userId)
  }
  return result ? 'inbox-box__item-avatar--online' : 'inbox-box__item-avatar--offline'
}

const InboxBoxItem = props => (
  <div
    className={`inbox-box__item ${
      props.data.get('unread').indexOf(props.currentUserId) > -1 ? '' : 'inbox-box__item--is-read'
    }`}
  >
    <div
      className={`inbox-box__item-avatar
              ${isOnline(props)}
              ${props.type === 'history' ? 'inbox-box__item-avatar--clear-status' : ''}
              `}
      onClick={() => browserHistory.push(`/inbox/details/${props.data.get('id')}`)}
    >
      {props.data.getIn(['fromUser', 'avatar']) ? (
        <img
          src={generateUserAvatarUrl(props.data.getIn(['fromUser', 'id']), props.data.getIn(['fromUser', 'avatar']))}
          width="36"
          height="36"
          alt=""
        />
      ) : (
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iOTciIGhlaWdodD0iOTciIHZpZXdCb3g9IjAgMCA5NyA5NyI+CiAgICA8ZGVmcz4KICAgICAgICA8Y2lyY2xlIGlkPSJhIiBjeD0iNDguNSIgY3k9IjQ4LjUiIHI9IjQ4LjUiLz4KICAgIDwvZGVmcz4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPG1hc2sgaWQ9ImIiIGZpbGw9IiNmZmYiPgogICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNhIi8+CiAgICAgICAgPC9tYXNrPgogICAgICAgIDx1c2UgZmlsbD0iI0Y0RjNGMyIgeGxpbms6aHJlZj0iI2EiLz4KICAgICAgICA8ZyBmaWxsPSIjQ0RDRENEIiBmaWxsLXJ1bGU9Im5vbnplcm8iIG1hc2s9InVybCgjYikiPgogICAgICAgICAgICA8cGF0aCBkPSJNNDguMjQ2IDYyLjIwMWMtMTEuNDQ1IDAtMjAuNzE4LTkuNDEtMjAuNzE4LTIxLjAwOEMyNy41MjggMjkuNTk2IDM2LjgwMSAyMSA0OC4yNDYgMjFjMTEuNDQ3IDAgMjAuNzI4IDguNTk2IDIwLjcyOCAyMC4xOTMgMCAxMS41OTktOS4yODEgMjEuMDA4LTIwLjcyOCAyMS4wMDh6TTE2LjAyIDEwMy45NzRzLTQuMzk1LjI0NS02LjMzLTIuMDEyYy0xLjA0Ni0xLjIyLS4zMTgtMTcuMDY1LjM5Ny0xOC40NDRsMS43NTItMy4zNzlzNC44NDQtOS4xNyAxMC4zNTktMTQuNDg0YzMuMzg3LTMuMjYgNy40MTYtMi41MTcgMTAuMDIyLTEuNDU3IDEuNjA1LjY1MiAzLjQyIDIuNTUyIDQuNzQ2IDMuNTU5IDEuODI4IDEuMzg3IDUuMDU0IDIuOTY0IDEwLjMyOCAzLjA1M2gzLjIzNmM1LjI3Mi0uMDkgOC40OTgtMS42NjYgMTAuMzI0LTMuMDUzIDEuMzI1LTEuMDA3IDMuMDktMi45NjYgNC42OC0zLjY0IDIuMzkxLTEuMDEzIDYuMDMyLTEuNjM2IDkuMzMgMS41MzggNS41MTcgNS4zMTQgOS44ODYgMTQuNjUxIDkuODg2IDE0LjY1MWwxLjc5NSAzLjMxM2MuNzQzIDEuMzcgMS41MDMgMTMuNTA3LjQ4NyAxNC43NDMtMS44MTUgMi4yMS01Ljg4OSAxLjkxNy01Ljg4OSAxLjkxN2wtNjUuMTIzIDMuNjk1eiIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg=="
          width="36"
          height="36"
          alt=""
        />
      )}
    </div>
    <div
      className="inbox-box__item-content"
      onClick={() => browserHistory.push(`/inbox/details/${props.data.get('id')}`)}
    >
      <h5 className="inbox-box__item-subject">
        <span>{props.translate('subject')}:</span> {props.data.get('subject')}
      </h5>
      <p className="inbox-box__item-text">
        <span>
          {props.data.getIn(['fromUser', 'firstName'])} {props.data.getIn(['fromUser', 'lastName'])}
        </span>
        :&nbsp;
        {lastMessage(props.data).message}
      </p>
      <div className="inbox-box__item-footer">
        <button className="inbox-box__item-reply" onClick={() => props.onReply()}>
          {props.translate('reply')}
        </button>
      </div>
    </div>
    <div className={`inbox-box__item-right ${props.type === 'history' ? 'inbox-box__item-right--center' : ''}`}>
      {props.type === 'history' && <span className="inbox-box__item-date">{props.data.get('date')}</span>}
      <span className="inbox-box__item-time">
        {moment(lastMessage(props.data).createdAt).format('MM/DD/YYYY HH:mm')}
      </span>
      {props.type === 'inbox' &&
        (!props.data.get('sentByAdmin') || props.currentUserRole.toLowerCase().indexOf('admin') > -1) && (
          <button className="inbox-box__item-delete" onClick={() => props.onDelete(props.data)} />
        )}
    </div>
  </div>
)
const InboxBox = props => (
  <div className="inbox-box">
    {props.items.map(item => (
      <InboxBoxItem
        onDelete={() => props.onDelete(item)}
        onReply={() => props.onReply(item)}
        data={item}
        translate={props.translate}
        type={props.type}
        listOfOnlineUsers={props.listOfOnlineUsers}
        currentUserId={props.currentUserId}
        currentUserRole={props.currentUserRole}
      />
    ))}
  </div>
)

InboxBox.PropTypes = {}

export default InboxBox
