// import { delay } from 'redux-saga'
import { takeEvery, takeLatest } from 'redux-saga/effects'

import * as currentUserSagas from './modules/currentUser/currentUserSagas'
import * as userSagas from './modules/user/userSagas'
import * as tenantSagas from './modules/tenant/tenantSagas'
import * as billingSagas from './modules/billing/billingSagas'
import * as activitySagas from './modules/activity/activitySagas'
import * as currentUserTypes from '../app/modules/currentUser/actions/currentUserTypes'
import * as userTypes from '../app/modules/user/actions/userTypes'
import * as tenantTypes from '../app/modules/tenant/actions/tenantTypes'
import * as billingTypes from '../app/modules/billing/actions/billingTypes'
import * as activityTypes from '../app/modules/activity/actions/activityTypes'

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
    takeLatest(tenantTypes.TENANT_LIST_REQUEST, tenantSagas.tenantListSaga),
    takeLatest(tenantTypes.TENANT_ALL_LIST_REQUEST, tenantSagas.tenantAllListSaga),
    takeLatest(tenantTypes.LEASE_LIST_REQUEST, tenantSagas.leaseListSaga),
    takeLatest(tenantTypes.ADD_TENANT_REQUEST, tenantSagas.addTenantSaga),
    takeLatest(tenantTypes.VIEW_TENANT_REQUEST, tenantSagas.viewTenantSaga),
    takeLatest(tenantTypes.UPDATE_TENANT_REQUEST, tenantSagas.updateTenantSaga),
    takeLatest(tenantTypes.DELETE_TENANT_REQUEST, tenantSagas.deleteTenantSaga),
    takeLatest(tenantTypes.INVITE_TENANT_REQUEST, tenantSagas.inviteTenantSaga),
    takeLatest(tenantTypes.UPDATE_ROOMS_REQUEST, tenantSagas.updateRoomsSaga),
    takeLatest(tenantTypes.PROPERTY_LIST_REQUEST, tenantSagas.propertyListSaga),
    takeLatest(tenantTypes.ADD_PROPERTY_REQUEST, tenantSagas.addPropertySaga),
    takeLatest(tenantTypes.UNIT_LIST_REQUEST, tenantSagas.unitListSaga),
    takeLatest(tenantTypes.PROPERTY_UNIT_REQUEST, tenantSagas.getPropertyUnitSaga),
    takeLatest(tenantTypes.ADD_UNIT_REQUEST, tenantSagas.addUnitSaga),
    takeLatest(tenantTypes.UPDATE_UNIT_REQUEST, tenantSagas.updateUnitSaga),
    takeLatest(tenantTypes.INPROGRESS_TENANT_REQUEST, tenantSagas.InProgressSaga),
    takeLatest(tenantTypes.GET_TENANT_BY_INVITE_CODE_REQUEST, tenantSagas.getTenantByInviteCodeSaga),
    takeLatest(billingTypes.PAY_REQUEST, billingSagas.paySaga),
    takeLatest(activityTypes.ACTIVITY_BY_KEY_REQUEST, activitySagas.getActivityByKey),
    takeLatest(activityTypes.ACTIVITY_DELETE_BY_KEY_REQUEST, activitySagas.deleteActivityByKey),
  ]
}
