// import { delay } from 'redux-saga'
import { takeEvery, takeLatest } from 'redux-saga/effects'

import * as currentUserSagas from './modules/currentUser/currentUserSagas'
import * as userSagas from './modules/user/userSagas'
import * as propertySagas from './modules/property/propertySagas'
import * as currentUserTypes from '../app/modules/currentUser/actions/currentUserTypes'
import * as userTypes from '../app/modules/user/actions/userTypes'
import * as propertyTypes from '../app/modules/property/actions/propertyTypes'


export default function* root() {
  yield [

    takeLatest(currentUserTypes.USER_LOGIN_REQUEST, currentUserSagas.authSagas),
    takeLatest(currentUserTypes.USER_SIGNUP_REQUEST, currentUserSagas.signUpSaga),
    takeLatest(currentUserTypes.USER_FETCH_REQUEST, currentUserSagas.userFetchSagas),
    takeLatest(currentUserTypes.USER_LOGOUT_REQUEST, currentUserSagas.userLogout),
    takeLatest(currentUserTypes.USER_UPDATE_REQUEST, currentUserSagas.updateUserProfile),
    takeLatest(currentUserTypes.UPLOAD_CURRENT_USER_AVATAR_REQUEST, currentUserSagas.uploadUserAvatarSaga),
    takeLatest(currentUserTypes.USER_COMPLETE_PROFILE_REQUEST, currentUserSagas.userCompleteProfileSaga),
    takeLatest(currentUserTypes.USER_CHANGE_PASWORD_REQUEST, currentUserSagas.changePasswordSaga),
    takeLatest(currentUserTypes.ACTIVE_USER_REQUEST, currentUserSagas.activeUserSaga),
    takeLatest(currentUserTypes.RESET_PASSWORD_REQUEST, currentUserSagas.resetPasswordSaga),
    takeLatest(currentUserTypes.RESET_PASSWORD_TOKEN_REQUEST, currentUserSagas.resetPasswordTokenSaga),
    takeEvery(userTypes.GET_REPORTING_DATA_REQUEST, userSagas.getReportingDataSaga),
    takeLatest(userTypes.GET_ADMIN_LIST_REQUEST, userSagas.getAdminListSaga),
    takeLatest(userTypes.ADD_ADMIN_REQUEST, userSagas.addAdminSaga),
    takeLatest(userTypes.EDIT_USER_REQUEST, userSagas.editUserSaga),
    takeLatest(userTypes.DELETE_USER_REQUEST, userSagas.deleteUserSaga),
    takeLatest(userTypes.VIEW_USER_REQUEST, userSagas.viewUserSaga),
    takeLatest(userTypes.USER_LIST_REQUEST, userSagas.userListSaga),
    takeLatest(userTypes.UPLOAD_USER_AVATAR_REQUEST, userSagas.uploadUserAvatarSaga),

    takeLatest(propertyTypes.PROPERTY_LIST_REQUEST, propertySagas.propertyListSaga),
    takeLatest(propertyTypes.TRANSFER_PROPERTY_REQUEST, propertySagas.transferPropertySaga),
    takeLatest(propertyTypes.OFFER_LIST_REQUEST, propertySagas.offerListSaga),
    takeLatest(propertyTypes.CONFIRM_OFFER_REQUEST, propertySagas.confirmOfferSaga),
  ]
}
