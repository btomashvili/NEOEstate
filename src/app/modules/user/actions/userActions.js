import * as actionTypes from './userTypes'

export function addUserRequest(payload) {
  return {
    type: actionTypes.ADD_USER_REQUEST,
    payload,
  }
}

export function addUserSuccess(payload) {
  return {
    type: actionTypes.ADD_USER_SUCCESS,
    payload,
  }
}

export function addUserFailure(error) {
  return {
    type: actionTypes.ADD_USER_FAILURE,
    error,
  }
}

export function editUserRequest(id, body) {
  return {
    type: actionTypes.EDIT_USER_REQUEST,
    id,
    body,
  }
}

export function editUserSuccess(payload) {
  return {
    type: actionTypes.EDIT_USER_SUCCESS,
    payload,
  }
}

export function editUserFailure(error) {
  return {
    type: actionTypes.EDIT_USER_FAILURE,
    error,
  }
}

export function deleteUserRequest(payload) {
  return {
    type: actionTypes.DELETE_USER_REQUEST,
    payload,
  }
}

export function deleteUserSuccess(payload) {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    payload,
  }
}

export function deleteUserFailure(error) {
  return {
    type: actionTypes.DELETE_USER_FAILURE,
    error,
  }
}

export function viewUserRequest(id, query = {}) {
  return {
    type: actionTypes.VIEW_USER_REQUEST,
    id,
    query,
  }
}

export function viewUserSuccess(payload) {
  return {
    type: actionTypes.VIEW_USER_SUCCESS,
    payload,
  }
}

export function viewUserFailure(error) {
  return {
    type: actionTypes.VIEW_USER_FAILURE,
    error,
  }
}

export function userListRequest(payload) {
  return {
    type: actionTypes.USER_LIST_REQUEST,
    payload,
  }
}

export function userListSuccess(payload) {
  return {
    type: actionTypes.USER_LIST_SUCCESS,
    payload,
  }
}

export function userListFailure(error) {
  return {
    type: actionTypes.USER_LIST_FAILURE,
    error,
  }
}

export function setDefaultData() {
  return {
    type: actionTypes.SET_DEFAULT_USER_DATA,
  }
}

export function invitationSignupRequest(payload) {
  return {
    type: actionTypes.INVITATION_SIGNUP_REQUEST,
    payload,
  }
}
export function invitationSignupSuccess(payload) {
  return {
    type: actionTypes.INVITATION_SIGNUP_SUCCESS,
    payload,
  }
}
export function invitationSignupFailure(error) {
  return {
    type: actionTypes.INVITATION_SIGNUP_FAILURE,
    payload: error,
  }
}

export function activeUserRequest(payload) {
  return {
    type: actionTypes.ACTIVE_USER_REQUEST,
    payload,
  }
}
export function activeUserSuccess(payload) {
  return {
    type: actionTypes.ACTIVE_USER_SUCCESS,
    payload,
  }
}
export function activeUserFailure(error) {
  return {
    type: actionTypes.ACTIVE_USER_FAILURE,
    payload: error,
  }
}

export function requestDeactivateUserRequest(payload) {
  return {
    type: actionTypes.REQUEST_DEACTIVE_USER__REQUEST,
    payload,
  }
}
export function requestDeactivateUserSuccess(payload) {
  return {
    type: actionTypes.REQUEST_DEACTIVE_USER__SUCCESS,
    payload,
  }
}
export function requestDeactivateUserFailure(error) {
  return {
    type: actionTypes.REQUEST_DEACTIVE_USER__FAILURE,
    payload: error,
  }
}

export function importUsersRequest(payload) {
  return {
    type: actionTypes.IMPORT_USERS_REQUEST,
    payload,
  }
}

export function importUsersSuccess(payload) {
  return {
    type: actionTypes.IMPORT_USERS_SUCCESS,
    payload,
  }
}

export function importUsersFailure(error) {
  return {
    type: actionTypes.IMPORT_USERS_FAILURE,
    payload: error,
  }
}

export function updateFieldValue(field, value, parent = '', isDeleted = false) {
  let fields = []
  if (parent === '') {
    fields = field.split('.')
  } else {
    fields = parent.split('.').concat(field.split('.'))
  }
  return {
    type: actionTypes.USER_UPDATE_FIELD_VALUE,
    fields,
    value,
    isDeleted,
  }
}

export function inviteUserRequest(payload) {
  return {
    type: actionTypes.INVITE_USER_REQUEST,
    payload,
  }
}

export function inviteUserSuccess(payload) {
  return {
    type: actionTypes.INVITE_USER_SUCCESS,
    payload,
  }
}

export function inviteUserFailure(error) {
  return {
    type: actionTypes.INVITE_USER_FAILURE,
    error,
  }
}

export function userLookupListRequest(payload) {
  return {
    type: actionTypes.USER_LOOKUP_LIST_REQUEST,
    payload,
  }
}

export function userLookupListSuccess(payload) {
  return {
    type: actionTypes.USER_LOOKUP_LIST_SUCCESS,
    payload,
  }
}

export function userLookupListFailure(error) {
  return {
    type: actionTypes.USER_LOOKUP_LIST_FAILURE,
    error,
  }
}

export function uploadUserAvatarRequest(file, userID) {
  // const data = new FormData()
  // data.append('file', file)
  return {
    type: actionTypes.UPLOAD_USER_AVATAR_REQUEST,
    file,
    userID,
    // data,
  }
}

export function uploadUserAvatarSuccess(userID, payload) {
  return {
    type: actionTypes.UPLOAD_USER_AVATAR_SUCCESS,
    userID,
    payload,
  }
}

export function uploadUserAvatarFailure(error) {
  return {
    type: actionTypes.UPLOAD_USER_AVATAR_FAILURE,
    error,
  }
}

export function getAdminListRequest(payload) {
  return {
    type: actionTypes.GET_ADMIN_LIST_REQUEST,
    payload,
  }
}

export function getAdminListSuccess(payload) {
  return {
    type: actionTypes.GET_ADMIN_LIST_SUCCESS,
    payload,
  }
}

export function getAdminListFailure(error) {
  return {
    type: actionTypes.GET_ADMIN_LIST_FAILURE,
    error,
  }
}

export function addAdminRequest(payload) {
  return {
    type: actionTypes.ADD_ADMIN_REQUEST,
    payload,
  }
}

export function addAdminSuccess(payload) {
  return {
    type: actionTypes.ADD_ADMIN_SUCCESS,
    payload,
  }
}

export function addAdminFailure(error) {
  return {
    type: actionTypes.ADD_ADMIN_FAILURE,
    error,
  }
}

export function getReportingDataRequest(payload) {
  return {
    type: actionTypes.GET_REPORTING_DATA_REQUEST,
    payload,
  }
}
export function getReportingDataSuccess(payload, actionType) {
  return {
    type: actionTypes.GET_REPORTING_DATA_SUCCESS,
    payload,
    actionType,
  }
}
export function getReportingDataFailure(error) {
  return {
    type: actionTypes.GET_REPORTING_DATA_FAILURE,
    payload: error,
  }
}

export function setReportingInitData() {
  return {
    type: actionTypes.SET_REPORTING_INIT_DATA,
  }
}

export function userSearchSuccess(text) {
  return {
    type: actionTypes.USER_SEARCH_SUCCESS,
    text,
  }
}
