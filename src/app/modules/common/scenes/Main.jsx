/* eslint jsx-a11y/href-no-hash: 0 */

import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { NotificationStack } from 'react-notification'
import { withTranslate } from 'react-redux-multilingual'
import { OrderedSet } from 'immutable'
import io from 'socket.io-client'
import * as commonActions from '../../common/actions/commonActions'
import * as currentUserActions from '../../currentUser/actions/currentUserActions'
import { removeArgsFromPath } from '../../../utils/helper'

import MessageBox from '../../../components/MessageBox/MessageBox'
import auth from '../../../services/authentication'
import { roles } from '../../../utils/permission'
import MainLayout from '../../../components/Layout/MainLayout/MainLayout'
import FourOFour from '../../errors/scenes/404Page/404Page'
import AuthLayout from '../../../components/Layout/AuthLayout/AuthLayout'
import DashboardLayout from '../../../components/Layout/DashboardLayout/DashboardLayout'
import '../../../resources/assets/scss/main.scss'

class Main extends Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)
    this.state = {
      notifications: OrderedSet(),
      count: 0,
      socketConnected: false,
      isLoading: true,
    }
    this.socket = null
  }

  componentDidMount() {
    console.log('componentDidMount MAIN')
    // this.props.countryLookupListRequest() // temp remove after signup done
    if (auth.getToken()) {
      this.props.fetchUserRequest()
    }
    setTimeout(() => this.setState({ isLoading: false }), 1000)
    document.documentElement.setAttribute('data-browser', navigator.userAgent)

    // WHEN we are getting from Meail confirm
    if (this.props.location.query.confirm && !this.props.isLoggedIn) {
      browserHistory.push('/login')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.isLoggedIn &&
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      this.props.location.pathname === '/login'
    ) {
      browserHistory.push('/')
    }

    if (nextProps.isLoggedIn && !this.props.isLoggedIn) {
      this.props.stateLookupListRequest()
      this.props.housingTypesListRequest()
      this.props.locationListRequest()
      this.props.roomTypesRequest()
    }

    if (!nextProps.isLoggedIn && this.props.isLoggedIn) {
      browserHistory.push('/login')
    }

    if (nextProps.snackbar && this.props.snackbar.get('id') !== nextProps.snackbar.get('id')) {
      this.addNotification(nextProps.snackbar)
    }

    if (nextProps.isLoggedIn && !this.props.isLoggedIn && !this.props.currentUser.get('socketConnected')) {
      const user = {
        id: nextProps.currentUser.getIn(['data', 'id']),
        // company: nextProps.currentUser.getIn(['data', 'company']),
        email: nextProps.currentUser.getIn(['data', 'email']),
        // team: nextProps.currentUser.getIn(['data', 'team']),
      }
    }

    // this.getData(nextProps)
  }

  socketConnect(user, nextProps) {
    const socket = io.connect(process.env.apiSocketUrl)
    socket.on('connect', () => {
      this.props.updateNotificationFieldValue('socketConnected', true)
      // this.setState({ socketConnected: true })
      // console.log('socket connect')
      socket.emit('login', user)
    })

    socket.on('disconnect', () => {
      console.log('socket disconnect')
    })

    socket.on('notification', (data) => {
      this.props.updateNotificationFieldValue('lookeup.reload', true)
      // console.log('notification', data)
    })

    socket.on('mail', (data) => {
      this.props.updateInboxFieldValue('lookup.reload', true)
      this.props.updateInboxFieldValue('reloadData', true)
      // if (this.props.settings.get('playSound')) {
      //   const audio = new Audio(`${process.env.apiUrl}/sounds/notification.mp3`)
      //   audio.play()
      // }
      console.log('new mail::', data)
    })

    socket.on('onlineUserIds', (userIds) => {
      // const currentUserRole = nextProps.currentUser.getIn(['data', 'role'])
      // const currentUserTeam = nextProps.currentUser.getIn(['data', 'team'])
      // if (
      //   currentUserRole === roles.TeamLeader || currentUserRole === roles.User
      // ) {
      //   const total = userIds.reduce(
      //     (count, id) =>
      //       (nextProps.userList.getIn([id, 'team']) === currentUserTeam
      //         ? count + 1
      //         : count),
      //     0
      //   )
      //   this.props.updateUserFieldValue('numberOfOnlineUsers', total)
      // } else {
      //   this.props.updateUserFieldValue('numberOfOnlineUsers', userIds.length)
      // }
      this.props.updateUserFieldValue('listOfOnlineUsers', userIds)
      // this.props.updateNotificationFieldValue('lookup.reload', true)
      // console.log('notification', data)
    })
    this.socket = socket
  }

  // getData(nextProps) {
  //   // if (
  //   //   nextProps.notificationLookupReload && !this.props.notificationLookupReload
  //   // ) {
  //   //   const query = this.props.notificationLookupQuery.toJS()
  //   //   this.props.notificationLookupListRequest(query)
  //   // }
  //   // if (
  //   //   nextProps.inboxLookupReload && !this.props.inboxLookupReload
  //   // ) {
  //   //   const query = this.props.inboxLookupQuery.toJS()
  //   //   this.props.inboxLookupListRequest(query)
  //   // }
  // }

  logOut() {
    this.props.userLogoutRequest()
    localStorage.clear()
    // this.props.setWizardDefaultData()
    // this.props.set
    if (this.socket) {
      this.socket.disconnect()
    }
  }

  addNotification(snackbar) {
    console.log('snackbar : ', snackbar.get('type'))
    const { notifications, count } = this.state
    const newCount = count + 1
    return this.setState({
      count: newCount,
      notifications: notifications.add({
        message: snackbar.get('message'),
        title: this.props.snackbar.get('title'),
        key: newCount,
        // action: 'Dismiss',
        dismissAfter: 3000,
        onClick: () => this.removeNotification(newCount),
        barStyle: {
          background: snackbar.get('type') === 'success' ? '#7bc245' : '#f07600',
          // color: 'red',
          zIndex: 9999,
        },
      }),
    })
  }

  removeNotification(count) {
    const { notifications } = this.state
    this.setState({
      notifications: notifications.filter(n => n.key !== count),
    })
  }

  render() {
    const notFound = this.props.routes.filter(route => route.path === '*')
    const pathname = this.props.location.pathname

    if (notFound.length) {
      return <FourOFour />
    }

    const layout = () => {
      if (
        pathname === '/' &&
        (this.props.currentUserRole === roles.admin || this.props.currentUserRole === roles.superAdmin)
      ) {
        return (
          <DashboardLayout
            content={this.props.children}
            handlerLogOut={this.logOut}
            profileData={this.props.currentUserData}
            route={this.props.routes.filter(item => removeArgsFromPath(item.path) === removeArgsFromPath(pathname))[0]}
            isLoggedIn={this.props.isLoggedIn}
          />
        )
      }
      if (pathname === '/admin/login') {
        return <AuthLayout content={this.props.children} />
      }
      if (
        pathname === '/' ||
        pathname === '/faq' ||
        pathname === '/forgot-password' ||
        pathname === '/login' // ||
      ) {
        return (
          <MainLayout
            content={this.props.children}
            handlerLogOut={this.logOut}
            profileData={this.props.currentUserData}
            isLoggedIn={this.props.isLoggedIn}
            route={this.props.routes.filter(item => removeArgsFromPath(item.path) === removeArgsFromPath(pathname))[0]}
          />
        )
      }

      if (this.props.currentUserRole === roles.admin || this.props.currentUserRole === roles.superAdmin) {
        return (
          <DashboardLayout
            content={this.props.children}
            handlerLogOut={this.logOut}
            profileData={this.props.currentUserData}
            route={this.props.routes.filter(item => removeArgsFromPath(item.path) === removeArgsFromPath(pathname))[0]}
            isLoggedIn={this.props.isLoggedIn}
          />
        )
      }

      // debugger
      if (pathname === '/' || pathname === '/faq' || pathname === '/forgot-password' || pathname === '/login') {
        return (
          <MainLayout
            content={this.props.children}
            handlerLogOut={this.logOut}
            profileData={this.props.currentUserData}
            isLoggedIn={this.props.isLoggedIn}
            route={this.props.routes.filter(item => removeArgsFromPath(item.path) === removeArgsFromPath(pathname))[0]}
          />
        )
      }

      return (
        <MainLayout
          content={this.props.children}
          handlerLogOut={this.logOut}
          profileData={this.props.currentUserData}
          isLoggedIn={this.props.isLoggedIn}
          route={this.props.routes.filter(item => removeArgsFromPath(item.path) === removeArgsFromPath(pathname))[0]}
        />
      )
    }

    return (
      <div className="app-layout">
        {this.state.isLoading ? <div className={'global-loading global-loading--visible'} /> : layout()}

        <MessageBox translate={this.props.translate} />
        <NotificationStack
          notifications={this.state.notifications.toArray()}
          onDismiss={notification =>
            this.setState({
              notifications: this.state.notifications.delete(notification),
            })
          }
        />
      </div>
    )
  }
}

Main.propTypes = {
  currentUserData: PropTypes.object,
  location: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  children: PropTypes.any,
  updateUserFieldValue: PropTypes.func,
  snackbar: PropTypes.object,
  currentUser: PropTypes.object,
  userLogoutRequest: PropTypes.func,
  fetchUserRequest: PropTypes.func,
  currentUserRole: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.currentUser.get('isLoggedIn'),
    currentUserData: state.currentUser.get('data'),
    snackbar: state.common.get('notification'),
    currentUser: state.currentUser,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUserRequest: () => dispatch(currentUserActions.fetchUserRequest()),
  userLogoutRequest: () => dispatch(currentUserActions.userLogoutRequest()),
  showSnackbar: (title, message) => dispatch(commonActions.showSnackbar(title, message)),
  updateCurrentUserFieldValue: (field, value, parent) =>
    dispatch(currentUserActions.updateFieldValue(field, value, parent)),
  stateLookupListRequest: () => dispatch(commonActions.stateLookupListRequest()),
  housingTypesListRequest: () => dispatch(commonActions.housingTypesListRequest()),
  locationListRequest: () => dispatch(commonActions.locationListRequest()),
  roomTypesRequest: () => dispatch(commonActions.roomTypesRequest()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(Main))
