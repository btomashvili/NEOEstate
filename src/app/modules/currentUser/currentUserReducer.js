/* eslint import/prefer-default-export: 0 */

import * as actionTypes from './actions/currentUserTypes'
import * as userTypes from '../user/actions/userTypes'
import { fromJS } from 'immutable'
import { setUserPermission } from '../../utils/permission'

const initialState = fromJS({
  profile: {
    showErrors: false,
    message: null,
    validationErrors: {},
    editMode: false,
    editModeEmail: false,
    completeProfile: false,
  },
  login: {
    data: {
      email: '',
      password: '',
    },
    showErrors: false,
    validationErrors: {},
    message: {
      type: 'success',
      text: '',
    },
  },
  register: {
    data: {
      fullName: '',
      email: '',
      password: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      confirmPassword: '',
      useCompanyDetailsInReport: false,
    },
    showErrors: false,
    validationErrors: {},
    message: {
      type: 'success',
      text: '',
    },
    confirmEmailShow: false,
  },
  changePassword: {
    data: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    showErrors: false,
    validationErrors: {},
    message: {
      type: 'success',
      text: '',
    },
  },
  requestChangePassword: {
    data: {
      email: '',
    },
    showErrors: false,
    validationErrors: {},
    message: {
      type: 'success',
      text: '',
    },
    done: false,
  },
  resetPassword: {
    data: {
      password: '',
    },
    showErrors: false,
    validationErrors: {},
    message: {
      type: 'success',
      text: '',
    },
    done: false,
  },
  data: {},
  showErrors: false,
  validationErrors: {},
  message: {
    type: 'success',
    text: '',
  },
  isLoggedIn: false,
  walletAddress : '',
  error: null,
  permissions: {},
  socketConnected: false,
  avatarIsLoading: false,
  isLoading: false,
})

export const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.USER_LOGIN_SUCCESS:
  case actionTypes.USER_FETCH_SUCCESS:
    const user = action.payload
    return state.set('data', fromJS(user)).set('isLoggedIn', true)
    // .set('permissions', fromJS(setUserPermission()))
  case userTypes.UPLOAD_USER_AVATAR_REQUEST:
    return state.set('avatarIsLoading', true)

  case userTypes.UPLOAD_USER_AVATAR_SUCCESS:
    return state
        .setIn(['data', 'avatar'], `${action.payload.filename}?${new Date().getTime()}`)
        .set('avatarIsLoading', false)
  case actionTypes.USER_UPDATE_REQUEST:
    return state.set('isLoading', true)
  case actionTypes.USER_UPDATE_SUCCESS:
    const userData = action.payload
    return state
        .set('data', fromJS(userData))
        .set('isLoggedIn', true)
        .set('isLoading', false)

  case actionTypes.USER_COMPLETE_PROFILE_SUCCESS:
    return state.setIn(['data', 'firstLogin'], false).setIn(['profile', 'completeProfile'], true)

  case actionTypes.USER_CHANGE_PASWORD_SUCCESS:
    return state.set('changePassword', initialState.get('changePassword'))

  case actionTypes.USER_CHANGE_PASWORD_FAILURE:
    if (action.payload.indexOf('old password is incorrect') >= 0) {
      return state.setIn(['changePassword', 'validationErrors', 'oldPassword'], 'Current Password is incorrect!')
    }
    return state.setIn(
        ['changePassword', 'message'],
        fromJS({
          type: 'error',
          text: 'Change password error, try again',
        })
      )

  case actionTypes.USER_FETCH_FAILURE:
    return state.set('error', 'not authenticated')

  case actionTypes.USER_SIGNUP_SUCCESS:
    const loginData = state.getIn(['register', 'data'])
    return state
        .setIn(['login', 'data'], loginData)
        .set('register', initialState.get('register'))
        .setIn(['register', 'confirmEmailShow'], true)

  case actionTypes.RESET_PASSWORD_SUCCESS:
    return state.setIn(['requestChangePassword', 'done'], true)

  case actionTypes.RESET_PASSWORD_TOKEN_SUCCESS:
    return state.setIn(['resetPassword', 'done'], true)

  case actionTypes.USER_LOGOUT_SUCCESS:
    return initialState

  case actionTypes.USER_UPDATE_FIELD_VALUE:
    const { fields, value, isDeleted } = action
    if (fields.length === 1) {
      return !isDeleted ? state.setIn(fields, fromJS(value)) : state.delete(fields[0], fromJS(value))
    }
    return !isDeleted ? state.setIn(fields, fromJS(value)) : state.deleteIn(fields, fromJS(value))

  case actionTypes.USER_SIGNUP_FAILURE:
    const message = 'Something went wrong, please try again'
    if (action.error && action.error.indexOf('User already joined!') >= 0) {
      return state.setIn(['register', 'validationErrors', 'email'], 'Email or Company name already exist!')
    }
    if (action.error && action.error.indexOf('This company name already exists') >= 0) {
      return state.setIn(['register', 'validationErrors', 'company'], 'Company already exist!')
    }
    return state.setIn(
        ['register', 'message'],
        fromJS({
          type: 'error',
          text: message,
        })
      )

  case actionTypes.USER_LOGIN_FAILURE:
    if (action.error && action.error.indexOf('The password you’ve entered is incorrect.') >= 0) {
      return state.setIn(['login', 'validationErrors', 'password'], 'Password is incorrect!')
    }
    if (action.error && action.error.indexOf('The email doesn’t match any account or not active.') >= 0) {
      return state.setIn(['login', 'validationErrors', 'email'], 'User not found!')
    }
    return state.setIn(
        ['login', 'message'],
        fromJS({
          type: 'error',
          text: 'Something went wrong, please try again',
        })
      )

  case actionTypes.USER_LOGOUT_FAILURE:
    return state.set('error', action.error)
    // case actionTypes.USER_LOGOUT_SUCCESS:
    //   return { ...initialState }
    // case actionTypes.USER_LOGOUT_REQUEST:
    //   return { ...state }

    //   // user login
    // case actionTypes.USER_LOGIN_REQUEST:
    //   return action.payload
    //   // user fetch
    // case actionTypes.USER_FETCH_REQUEST:
    //   return { ...state }

  default:
    return state
  }
}
