import React, { PropTypes } from 'react'
import './Notification.scss'
import moment from 'moment'
import successNotification from '../../resources/assets/images/icons/claping-hands.svg'
import NotificationDelete from '../../resources/assets/images/trashBin.svg'
import { Link, browserHistory } from 'react-router'

export const Notification = props => (
  <div
    className={`notification
        ${props.visible ? '' : 'notification--hidden'}
        ${props.type === 'success' ? 'notification--success' : 'notification--failed'}
        `}
  >
    <img src={successNotification} />
    <p>{props.message}</p>
  </div>
)

export const AllNotificationItem = props => (
  <div>
    {props.items.size ? (
      props.items.map((item, key) => (
        <div key={key} className="all-notification">
          <div className="all-notification__item">
            <div
              onClick={() => browserHistory.push(`/admin/participant/${item.get('participant')}`)}
              className="all-notification__text"
            >
              <p className="all-notification__message">
                <span className="all-notification__text--bold">
                  {item.getIn(['actionUser', 'firstName'])} {item.getIn(['actionUser', 'lastName'])}
                </span>
                &nbsp;
                {item.get('message')}
              </p>
              <p className="all-notification__text--flex-column">
                <span className="align--right all-notification__time">
                  {moment(item.get('createdAt')).format('h:MM A')}
                </span>
                <span className="all-notification__text--prusian-blue align--right">
                  {moment(item.get('createdAt')).format('YYYY-MM-DD')}
                </span>
              </p>
            </div>
            <button onClick={() => props.handleDelete(item)} className="all-notification__delete">
              <img src={NotificationDelete} />
            </button>
          </div>
        </div>
      ))
    ) : (
      <div className="all-notification__no-content">You have no notifications</div>
    )}
  </div>
)

Notification.propTypes = {
  message: PropTypes.string,
  visible: PropTypes.bool,
  type: PropTypes.string,
}
AllNotificationItem.propTypes = {
  items: PropTypes.object,
  onDelete: PropTypes.func,
}
