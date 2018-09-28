/* eslint react/prop-types:0 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import DashboardSidebar from '../../DashboardSidebar/DashboardSidebar'
import {
  DashboardNavBar,
  DashboardNavLogo,
  DashboardNavList,
  DashboardNavListItem,
  DashboardNavUserpanel,
} from '../../../components/DashboardNav/DashboardNav'
import { HomeNavHamburger } from '../../../components/HomeNav/HomeNav'
import InboxDropdown from '../../../components/InboxDropdown/InboxDropdown'
import { roles } from '../../../utils/permission'
import { generateUserAvatarUrl } from '../../../utils/helper'
import NotificationsDropdown from '../../../components/NotificationsDropdown/NotificationsDropdown'
import faq from '../../../resources/assets/images/icons/faq.svg'
import myProfile from '../../../resources/assets/images/icons/my-profile.svg'
import logout from '../../../resources/assets/images/icons/logout.svg'
import inbox from '../../../resources/assets/images/icons/inbox.svg'
import notif from '../../../resources/assets/images/icons/notif.svg'
import './DashboardLayout.scss'

// import {
//   setReadStatusToNotificationRequest,
// } from '../../../modules/notification/actions/notificationActions'

class DashboardLayout extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.setDropdownRef = this.setDropdownRef.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.state = {
      isLoggedIn: true,
      dropdown: {
        userpanel: false,
        inbox: false,
        notifications: false,
      },
      dropdownRef: [],
      showNav: false,
    }
  }
  componentWillMount() {
    document.addEventListener('click', this.handleClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false)
  }

  setDropdownRef(ref) {
    const newState = this.state.dropdownRef
    newState.push(ref)
    this.setState({ dropdownRef: newState })
  }
  toggleDropdown(name) {
    this.setState({
      dropdown: {
        ...this.state.dropdown,
        [name]: !this.state.dropdown[name],
      },
    })
  }

  handleClick(event) {}

  render() {
    const userDropdown =
      roles.admin === this.props.currentUserRole || roles.superAdmin === this.props.currentUserRole
        ? [
          {
            text: this.props.translate('my_profile'),
            to: '/profile',
            icon: myProfile,
          },
          {
            text: this.props.translate('settings'),
            to: '/settings',
            icon: myProfile,
          },
            { text: this.props.translate('log_out'), icon: logout },
        ]
        : [{ text: this.props.translate('log_out'), icon: logout }]
    return (
      <div className="dashboard-layout">
        <DashboardNavBar>
          <DashboardNavLogo />
          <HomeNavHamburger
            onClick={e => this.setState({ showNav: !this.state.showNav })}
            showNav={this.state.showNav}
          />
          <DashboardNavList showNav={this.state.showNav}>
            <DashboardNavListItem to="/dashboard/faq">
              <img src={faq} alt="" />
              <span className="dashboard-nav__list-item-link-text">{this.props.translate('faq')}</span>
            </DashboardNavListItem>
            <DashboardNavListItem
              dataName="notifications"
              onClick={() => this.toggleDropdown('notifications')}
              bindRef={ref => this.setDropdownRef(ref)}
              dropdown={
                <NotificationsDropdown
                  showDropdown={this.state.dropdown.notifications}
                  onClick={() => alert(4415)}
                  handleMarkAllRead={() => {
                    const ids = []
                    this.props.notifications.filter(i => i.get('state') === 'unread').map(i => ids.push(i.get('id')))
                    if (ids.length > 0) {
                      this.props.setReadStatusToNotificationRequest({ ids })
                    }
                  }}
                  translate={this.props.translate}
                  data={this.props.notifications}
                />
              }
            >
              <span className="dashboard-nav__list-item-link-counter">
                <small>{this.props.notifications.filter(item => item.get('state') === 'unread').size}</small>
                <img src={notif} alt="" />
              </span>
              <span className="dashboard-nav__list-item-link-text">{this.props.translate('notifications')}</span>
            </DashboardNavListItem>
            <DashboardNavListItem
              dataName="inbox"
              bindRef={ref => this.setDropdownRef(ref)}
              onClick={() => this.toggleDropdown('inbox')}
              dropdown={
                <InboxDropdown
                  showDropdown={this.state.dropdown.inbox}
                  translate={this.props.translate}
                  data={this.props.inbox}
                  listOfOnlineUsers={this.props.listOfOnlineUsers}
                />
              }
            >
              <span className="dashboard-nav__list-item-link-counter">
                <small>
                  {this.props.inbox.filter(item => item.get('unread').indexOf(this.props.currentUserId) > -1).size}
                </small>
                <img src={inbox} alt="" />
              </span>
              <span className="dashboard-nav__list-item-link-text">{this.props.translate('inbox')}</span>
            </DashboardNavListItem>
          </DashboardNavList>

          {this.props.isLoggedIn && (
            <DashboardNavUserpanel
              dataName="userpanel"
              bindRef={ref => this.setDropdownRef(ref)}
              onPanelClick={() => this.toggleDropdown('userpanel')}
              showDropdown={this.state.dropdown.userpanel}
              avatar={generateUserAvatarUrl(this.props.currentUserId, this.props.currentUserAvatar)}
              username={this.props.profileData.get('fullName') || this.props.profileData.get('email')}
              userRole={this.props.profileData.get('role')}
              onClick={this.props.handlerLogOut}
              dropdown={userDropdown}
            />
          )}
        </DashboardNavBar>
        <div className="dashboard-layout__container">
          <div className="dashboard-layout__sidebar">
            <DashboardSidebar
              route={this.props.route}
              onLogOut={this.props.handlerLogOut}
              translate={this.props.translate}
              currentUserRole={this.props.currentUserRole}
            />
          </div>
          <div className="dashboard-layout__content">
            {React.cloneElement(this.props.content, { handlerLogOut: this.props.handlerLogOut })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUserRole: state.currentUser.getIn(['data', 'role']),
  notifications: state.notification.getIn(['lookup', 'list']),
  inbox: state.inbox.getIn(['lookup', 'list']),
  currentUserAvatar: state.currentUser.getIn(['data', 'avatar']),
  currentUserId: state.currentUser.getIn(['data', 'id']),
  listOfOnlineUsers: state.user.get('listOfOnlineUsers'),
})

const mapDispatchToProps = dispatch => ({
  // setReadStatusToNotificationRequest: payload =>
  //   dispatch(setReadStatusToNotificationRequest(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(DashboardLayout))
