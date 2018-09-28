/* eslint import/prefer-default-export: 0 */

import { fromJS } from 'immutable'
import { mapListFromJS } from '../../utils/helper'
import * as actionTypes from './actions/userTypes'

const initialState = fromJS({
  isLoading: false,
  reloadData: false,
  items: [],
  originalItems: [], // TODO: this is for search
  totalCount: 0,
  searchText: '',
  settings: {
    data: {
      chatMode: '',
      pushNotification: 'on',
      playSound: '',
      language: '',
    },
  },
  query: {
    where: {},
    pageSize: 10,
    page: 1,
    sort: '',
    populate: [''],
    count: true,
  },
  currentItem: {
    data: {
      email: '',
      role: '',
      firstName: '',
      lastName: '',
      avatar: '',
      hasAvatar: false,
    },
    message: {
      type: 'success',
      text: '',
    },
    showErrors: false,
    validationErrors: {},
    editMode: false,
    query: {
      populate: ['', ''],
    },
    permission: {
      canEdit: false,
      canDelete: false,
      canShare: false,
    },
  },
  lookup: {
    list: [],
    reload: false,
    query: {
      where: {},
      select: '_id role firstName lastName fullName email',
      sort: '',
      pageSize: 10000,
      page: 1,
    },
  },
  error: null,
})

export const userReducer = (state = initialState, action) => {
  let message
  switch (action.type) {
  case actionTypes.SET_REPORTING_INIT_DATA:
    return state.setIn(['reporting', 'data'], initialState.getIn(['reporting', 'data']))
  case actionTypes.GET_REPORTING_DATA_REQUEST:
    return state
  case actionTypes.GET_REPORTING_DATA_SUCCESS:
    return state.setIn(['reporting', 'data', action.actionType], fromJS(action.payload))
  case actionTypes.GET_REPORTING_DATA_FAILURE:
    return state
  case actionTypes.USER_LIST_REQUEST:
    return state.set('isLoading', true)
  case actionTypes.USER_LIST_SUCCESS: {
    return state
        .set('reloadData', false)
        .set('items', mapListFromJS(action.payload.items))
        .set('originalItems', action.payload.items)
        .set('isLoading', false)
  }
  case actionTypes.USER_LIST_FAILURE:
    return state
  case actionTypes.GET_ADMIN_LIST_REQUEST:
    return state.set('isLoading', true)

  case actionTypes.GET_ADMIN_LIST_SUCCESS:
    {
      const onlineUsers = state.get('listOfOnlineUsers')
      const virtuals = [
        {
          fieldName: 'isOnline',
          func: item => onlineUsers.filter(i => i.toString() === item.get('id')).size > 0,
        },
      ]
    }
    const totalCount = action.payload.totalCount || state.get('totalCount')
    return state
        .set('isLoading', false)
        .set('reloadData', false)
        .set('items', mapListFromJS(action.payload.items, 'id', virtuals))
        .set('totalCount', totalCount)
  case actionTypes.DELETE_USER_REQUEST:
    return state
        .set('isLoading', true)
        .set('reloadData', true)
        .setIn(['lookup', 'reload'], true)
  case actionTypes.DELETE_USER_SUCCESS:
    return state
        .set('isLoading', false)
        .set('reloadData', true)
        .setIn(['lookup', 'reload'], true)

  case actionTypes.EDIT_USER_SUCCESS:
    return state
        .setIn(
          ['currentItem', 'message'],
          fromJS({
            type: 'success',
            text: 'user succesfully updated',
          })
        )
        .setIn(['lookup', 'reload'], true)
        .set('reloadData', true)

  case actionTypes.VIEW_USER_SUCCESS: {
    const data = fromJS(action.payload)
    return state.setIn(['currentItem', 'data'], data).setIn(['currentItem', 'permission'])
  }
    // case actionTypes.INVITE_USER_SUCCESS:
  case actionTypes.ADD_ADMIN_SUCCESS:
    return state
        .set('addAdmin', initialState.get('currentItem'))
        .set('reloadData', true)
        .set('isLoading', false)
        .setIn(
          ['addAdmin', 'message'],
          fromJS({
            type: 'success',
            text: 'admin succesfully added',
          })
        )
        .setIn(['lookup', 'reload'], true)
  case actionTypes.INVITE_USER_SUCCESS:
    return state
        .set('currentItem', initialState.get('currentItem'))
        .set('reloadData', true)
        .setIn(
          ['currentItem', 'message'],
          fromJS({
            type: 'success',
            text: 'user succesfully added',
          })
        )
        .setIn(['lookup', 'reload'], true)

  case actionTypes.SET_DEFAULT_USER_DATA:
    return state.set('currentItem', initialState.get('currentItem'))

  case actionTypes.ADD_ADMIN_REQUEST:
    return state.setIn(['addAdmin', 'isLoading'], true).set('isLoading', true)
  case actionTypes.EDIT_USER_REQUEST:
  case actionTypes.ADD_ADMIN_FAILURE: {
    message = 'Your admin was not add successfly, please try again'
    if (action.error && action.error.indexOf('User already joined!') >= 0) {
      return state.setIn(['addAdmin', 'validationErrors', 'email'], 'User already joined!')
    }
    if (action.error && action.error.indexOf('User already joined!') >= 0) {
      return state.setIn(['addAdmin', 'validationErrors', 'email'], 'User already joined!')
    }

    return state.setIn(
        ['addAdmin', 'message'],
        fromJS({
          type: 'error',
          text: message,
        })
      )
  }
  case actionTypes.EDIT_USER_FAILURE:
  case actionTypes.INVITE_USER_FAILURE:
    message = 'Your user was not add successfly, please try again'
    if (action.error && action.error.indexOf('User already joined!') >= 0) {
      return state.setIn(['currentItem', 'validationErrors', 'email'], 'User already joined!')
    }
    if (action.error && action.error.indexOf('User already joined!') >= 0) {
      return state.setIn(['currentItem', 'validationErrors', 'email'], 'User already joined!')
    }

    return state.setIn(
        ['currentItem', 'message'],
        fromJS({
          type: 'error',
          text: message,
        })
      )

  case actionTypes.USER_UPDATE_FIELD_VALUE: {
    const { fields, value, isDeleted } = action
    if (fields.length === 1) {
      return !isDeleted ? state.set(fields[0], fromJS(value)) : state.delete(fields[0], fromJS(value))
    }
    return !isDeleted ? state.setIn(fields, fromJS(value)) : state.deleteIn(fields, fromJS(value))
  }
  case actionTypes.USER_LOOKUP_LIST_SUCCESS:
    return state.setIn(['lookup', 'list'], mapListFromJS(action.payload.items)).setIn(['lookup', 'reload'], false)

  case actionTypes.DELETE_USER_FAILURE:
  case actionTypes.GET_ADMIN_LIST_FAILURE:
    return state.set('error', action.error)

  case actionTypes.UPLOAD_CURRENT_USER_AVATAR_SUCCESS:
    return state.setIn(['currentItem', 'data', 'avatar'], action.payload)

  case actionTypes.USER_SEARCH_SUCCESS: {
    if (action.text.trim().length === 0) {
      return state.set('searchText', '').set('items', mapListFromJS(state.get('originalItems')))
    }
    const data = state.get('originalItems')
    const result = data.filter(
        item =>
          // item.address.toLowerCase().includes(action.text.toLowerCase()) ||
          item.fullName.toLowerCase().includes(action.text.toLowerCase()) ||
          item.email.toLowerCase().includes(action.text.toLowerCase())
        // item.phone.includes(action.text)
      )
    return state.set('searchText', action.text).set('items', mapListFromJS(result))
  }

  default:
    return state
  }
}
