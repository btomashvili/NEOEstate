/* eslint react/prop-types:0 */
import React, { PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import ScrollArea from 'react-scrollbar'
import moment from 'moment'
import './NotificationsDropdown.scss'
import notif from '../../resources/assets/images/icons/notif-sm.svg'

const NotificationsDropdown = props => (
  <div className={`notifications-dropdown ${props.showDropdown ? 'notifications-dropdown--visible' : ''}`}>
    <div className="notifications-dropdown__header">
      <div className="notifications-dropdown__heading">
        <img src={notif} alt="" /> {props.translate('notifications')}
      </div>
      <button onClick={props.handleMarkAllRead} className="notifications-dropdown__mark-all">
        {props.translate('mark_all_as_read')}
      </button>
    </div>

    {props.data.size ? (
      <ScrollArea speed={0.8} className="notifications-dropdown__scroll" horizontal={false}>
        <ul className="notifications-dropdown__list">
          {props.data.map((item, key) => (
            <li
              onClick={() => browserHistory.push(`/admin/participant/${item.get('participant')}`)}
              key={key}
              className="notifications-dropdown__list-item"
            >
              <div className="notifications-dropdown__content">
                <strong>
                  {item.getIn(['actionUser', 'firstName'])} {item.getIn(['actionUser', 'lastName'])}
                </strong>{' '}
                {item.get('message')}
              </div>
              <div className="notifications-dropdown__footer">
                {moment(item.get('created')).fromNow({
                  withSuffix: false,
                  forcePast: true,
                })}
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    ) : (
      <div className="notifications-dropdown__no-content">You have no notifications</div>
    )}
    <Link to="/all-notifications" className="notifications-dropdown__see-all">
      {props.translate('see_all_notifications')}
    </Link>
  </div>
)

NotificationsDropdown.propTypes = {
  handleMarkAllRead: PropTypes.func,
}

export default NotificationsDropdown
