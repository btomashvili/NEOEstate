import * as actionTypes from './currentUserTypes'

export function signUpRequest(user) {
  return {
    type: actionTypes.USER_SIGNUP_REQUEST,
    payload: user,
  }
}

export function signUpSuccess(user) {
  return {
    type: actionTypes.USER_SIGNUP_SUCCESS,
    payload: user,
  }
}

export function signUpFailure(error) {
  return {
    type: actionTypes.USER_SIGNUP_FAILURE,
    error,
  }
}

export function userLoginRequest(user) {
  return {
    type: actionTypes.USER_LOGIN_REQUEST,
    payload: user,
  }
}

export function loginSuccess(user) {
  return {
    type: actionTypes.USER_LOGIN_SUCCESS,
    payload: user,
  }
}

export function loginFailure(error) {
  return {
    type: actionTypes.USER_LOGIN_FAILURE,
    error,
  }
}
// // END OF AUTH WITH PROVIDER

// / FETCH USER
export function fetchUserRequest(payload) {
  return {
    type: actionTypes.USER_FETCH_REQUEST,
    payload,
  }
}
export function fetchUserSuccess(payload) {
  return {
    type: actionTypes.USER_FETCH_SUCCESS,
    payload,
  }
}
export function fetchUserFailure(error) {
  return {
    type: actionTypes.USER_FETCH_FAILURE,
    error,
  }
}

// LOGOUT user
export function userLogoutRequest(payload) {
  return {
    type: actionTypes.USER_LOGOUT_REQUEST,
    payload,
  }
}
export function logoutSuccess(payload) {
  return {
    type: actionTypes.USER_LOGOUT_SUCCESS,
    payload,
  }
}
export function logoutFailure(error) {
  return {
    type: actionTypes.USER_LOGIN_FAILURE,
    payload: error,
  }
}

// / UPDATE USER
export function userUpdateRequest(payload) {
  return {
    type: actionTypes.USER_UPDATE_REQUEST,
    payload,
  }
}

export function userUpdateSuccess(payload) {
  return {
    type: actionTypes.USER_UPDATE_SUCCESS,
    payload,
  }
}
export function userUpdateFailure(error) {
  return {
    type: actionTypes.USER_UPDATE_FAILURE,
    payload: error,
  }
}

export function userCompleteProfileRequest(payload) {
  return {
    type: actionTypes.USER_COMPLETE_PROFILE_REQUEST,
    payload,
  }
}

export function userCompleteProfileSuccess(payload) {
  return {
    type: actionTypes.USER_COMPLETE_PROFILE_SUCCESS,
    payload,
  }
}
export function userCompleteProfileFailure(error) {
  return {
    type: actionTypes.USER_COMPLETE_PROFILE_FAILURE,
    payload: error,
  }
}

export function changePasswordRequest(payload) {
  return {
    type: actionTypes.USER_CHANGE_PASWORD_REQUEST,
    payload,
  }
}
export function changePasswordSuccess(payload) {
  return {
    type: actionTypes.USER_CHANGE_PASWORD_SUCCESS,
    payload,
  }
}
export function changePasswordFailure(error) {
  return {
    type: actionTypes.USER_CHANGE_PASWORD_FAILURE,
    payload: error,
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
    payload: error,
  }
}

export function getUserQRCodeImageRequest(payload) {
  return {
    type: actionTypes.USER_QR_CODE_IMAGE_REQUEST,
    payload,
  }
}
export function getUserQRCodeImageSuccess(payload) {
  return {
    type: actionTypes.USER_QR_CODE_IMAGE_SUCCESS,
    payload,
  }
}
export function getUserQRCodeImageFailure(error) {
  return {
    type: actionTypes.USER_QR_CODE_IMAGE_FAILURE,
    payload: error,
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

export function resetPasswordRequest(payload) {
  return {
    type: actionTypes.RESET_PASSWORD_REQUEST,
    payload,
  }
}
export function resetPasswordSuccess(payload) {
  return {
    type: actionTypes.RESET_PASSWORD_SUCCESS,
    payload,
  }
}
export function resetPasswordFailure(error) {
  return {
    type: actionTypes.RESET_PASSWORD_FAILURE,
    payload: error,
  }
}

export function resetPasswordTokenRequest(payload) {
  return {
    type: actionTypes.RESET_PASSWORD_TOKEN_REQUEST,
    payload,
  }
}
export function resetPasswordTokenSuccess(payload) {
  return {
    type: actionTypes.RESET_PASSWORD_TOKEN_SUCCESS,
    payload,
  }
}

export function resetPasswordTokenFailure(error) {
  return {
    type: actionTypes.RESET_PASSWORD_TOKEN_FAILURE,
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

export function setDefaultData() {
  return {
    type: actionTypes.SET_DEFAULT_USER_DATA,
  }
}

export function companyUpadateInfoRequest(payload) {
  return {
    type: actionTypes.COPMANY_UPDATE_INFO_REQUEST,
    payload,
  }
}

export function companyUpadateInfoSuccess(payload) {
  return {
    type: actionTypes.COPMANY_UPDATE_INFO_SUCCESS,
    payload,
  }
}

export function companyUpadateInfoFailure(error) {
  return {
    type: actionTypes.COPMANY_UPDATE_INFO_FAILURE,
    error,
  }
}

export function companyUpadateSettingsRequest(payload) {
  return {
    type: actionTypes.COMPANY_UPDATE_SETTINGS_REQUEST,
    payload,
  }
}

export function companyUpadateSettingsSuccess(payload) {
  return {
    type: actionTypes.COMPANY_UPDATE_SETTINGS_SUCCESS,
    payload,
  }
}

export function companyUpadateSettingsFailure(error) {
  return {
    type: actionTypes.COMPANY_UPDATE_SETTINGS_FAILURE,
    error,
  }
}

export function uploadCompanyLogoRequest(payload) {
  return {
    type: actionTypes.UPLOAD_COMPANY_LOGO_REQUEST,
    payload,
  }
}

export function uploadCompanyLogoSuccess(payload) {
  return {
    type: actionTypes.UPLOAD_COMPANY_LOGO_SUCCESS,
    payload,
  }
}

export function uploadCompanyLogoFailure(error) {
  return {
    type: actionTypes.UPLOAD_COMPANY_LOGO_FAILURE,
    error,
  }
}

export function editTeamRequest(id, body) {
  return {
    type: actionTypes.EDIT_TEAM_REQUEST,
    id,
    body,
  }
}

export function editTeamSuccess(payload) {
  return {
    type: actionTypes.EDIT_TEAM_SUCCESS,
    payload,
  }
}

export function editTeamFailure(error) {
  return {
    type: actionTypes.EDIT_TEAM_FAILURE,
    error,
  }
}

export function uploadUserAvatarRequest(payload) {
  return {
    type: actionTypes.UPLOAD_CURRENT_USER_AVATAR_REQUEST,
    payload,
  }
}

export function uploadUserAvatarSuccess(payload) {
  return {
    type: actionTypes.UPLOAD_CURRENT_USER_AVATAR_SUCCESS,
    payload,
  }
}

export function uploadUserAvatarFailure(error) {
  return {
    type: actionTypes.UPLOAD_CURRENT_USER_AVATAR_FAILURE,
    error,
  }
}
