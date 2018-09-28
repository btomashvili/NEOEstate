/* eslint react/prop-types:0 */
import React, { PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import ScrollArea from 'react-scrollbar'
import './InboxDropdown.scss'
import { generateUserAvatarUrl } from '../../utils/helper'

const lastMessage = (item) => {
  const conversation = item.get('conversation').toJS()
  return conversation[conversation.length - 1].message
}

const isOnline = (item, listOfOnlineUsers) => {
  const userId = item.getIn(['fromUser', 'id'])
  const result = listOfOnlineUsers.find(id => id === userId)
  return result ? 'inbox-dropdown__user-status--online' : 'inbox-inbox-dropdown__user-status--offline'
}

const InboxDropdown = props => (
  <div className={`inbox-dropdown ${props.showDropdown ? 'inbox-dropdown--visible' : ''}`}>
    <div className="inbox-dropdown__heading">{props.translate('inbox')}</div>
    <ScrollArea speed={0.8} className="inbox-dropdown__scroll" horizontal={false}>
      <ul className="inbox-list">
        {props.data.map((item, key) => (
          <li
            key={key}
            className="inbox-dropdown__list-item"
            onClick={() => browserHistory.push(`/inbox/details/${item.get('id')}`)}
          >
            <div className="inbox-dropdown__avatar">
              {item.getIn(['fromUser', 'avatar']) ? (
                <img
                  src={generateUserAvatarUrl(item.getIn(['fromUser', 'id']), item.getIn(['fromUser', 'avatar']))}
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
              <span className={`inbox-dropdown__user-status ${isOnline(item, props.listOfOnlineUsers)}`} />
            </div>
            <div className="inbox-dropdown__content">
              <h5 className="inbox-dropdown__content-user">
                {item.getIn(['fromUser', 'firstName'])} {item.getIn(['fromUser', 'lastName'])}
              </h5>
              <p className="inbox-dropdown__content-msg">{lastMessage(item)}</p>
            </div>
          </li>
        ))}
      </ul>
    </ScrollArea>
    <Link to="/inbox" className="inbox-dropdown__see-all">
      {props.translate('see_all_inbox')}
    </Link>
  </div>
)

export default InboxDropdown
