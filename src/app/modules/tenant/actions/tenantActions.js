import * as actionTypes from './tenantTypes'

export function tentantListRequest(payload) {
  return {
    type: actionTypes.TENANT_LIST_REQUEST,
    payload,
  }
}

export function tentantListSuccess(payload) {
  return {
    type: actionTypes.TENANT_LIST_SUCCESS,
    payload,
  }
}

export function tentantListFailure(error) {
  return {
    type: actionTypes.TENANT_LIST_FAILURE,
    error,
  }
}

export function tentantAllListRequest(payload) {
  return {
    type: actionTypes.TENANT_ALL_LIST_REQUEST,
    payload,
  }
}

export function tentantAllListSuccess(payload) {
  return {
    type: actionTypes.TENANT_ALL_LIST_SUCCESS,
    payload,
  }
}

export function tentantAllListFailure(error) {
  return {
    type: actionTypes.TENANT_ALL_LIST_FAILURE,
    error,
  }
}

export function leaseListRequest(payload) {
  return {
    type: actionTypes.LEASE_LIST_REQUEST,
    payload,
  }
}

export function leaseListSuccess(payload) {
  return {
    type: actionTypes.LEASE_LIST_SUCCESS,
    payload,
  }
}

export function leaseListFailure(error) {
  return {
    type: actionTypes.LEASE_LIST_FAILURE,
    error,
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

export function goToTab(payload) {
  return {
    type: actionTypes.GO_TO_TAB,
    payload,
  }
}

export function addTenantRequest(payload) {
  return {
    type: actionTypes.ADD_TENANT_REQUEST,
    payload,
  }
}

export function addTenantSuccess(payload) {
  return {
    type: actionTypes.ADD_TENANT_SUCCESS,
    payload,
  }
}

export function addTenantFailure(error) {
  return {
    type: actionTypes.ADD_TENANT_FAILURE,
    error,
  }
}

export function viewTenantRequest(id, query = {}) {
  return {
    type: actionTypes.VIEW_TENANT_REQUEST,
    id,
    query,
  }
}

export function viewTenantSuccess(payload) {
  return {
    type: actionTypes.VIEW_TENANT_SUCCESS,
    payload,
  }
}

export function viewTenantFailure(error) {
  return {
    type: actionTypes.VIEW_TENANT_FAILURE,
    error,
  }
}

export function deleteTenantRequest(id, lease) {
  return {
    type: actionTypes.DELETE_TENANT_REQUEST,
    id,
    lease,
  }
}

export function deleteTenantSuccess(payload) {
  return {
    type: actionTypes.DELETE_TENANT_SUCCESS,
    payload,
  }
}

export function deleteTenantFailure(error) {
  return {
    type: actionTypes.DELETE_TENANT_FAILURE,
    error,
  }
}

export function updateTenantRequest(id, lease, body) {
  return {
    type: actionTypes.UPDATE_TENANT_REQUEST,
    id,
    lease,
    body,
  }
}

export function updateTenantSuccess(payload) {
  return {
    type: actionTypes.UPDATE_TENANT_SUCCESS,
    payload,
  }
}

export function updateTenantFailure(error) {
  return {
    type: actionTypes.UPDATE_TENANT_FAILURE,
    error,
  }
}

export function propertyListRequest(payload) {
  return {
    type: actionTypes.PROPERTY_LIST_REQUEST,
    payload,
  }
}

export function propertyListSuccess(payload) {
  return {
    type: actionTypes.PROPERTY_LIST_SUCCESS,
    payload,
  }
}

export function propertyListFailure(error) {
  return {
    type: actionTypes.PROPERTY_LIST_FAILURE,
    error,
  }
}

export function addPropertyRequest(payload) {
  return {
    type: actionTypes.ADD_PROPERTY_REQUEST,
    payload,
  }
}

export function addPropertySuccess(payload) {
  return {
    type: actionTypes.ADD_PROPERTY_SUCCESS,
    payload,
  }
}

export function addPropertyFailure(error) {
  return {
    type: actionTypes.ADD_PROPERTY_FAILURE,
    error,
  }
}

export function unitListRequest(payload) {
  return {
    type: actionTypes.UNIT_LIST_REQUEST,
    payload,
  }
}

export function unitListSuccess(payload) {
  return {
    type: actionTypes.UNIT_LIST_SUCCESS,
    payload,
  }
}

export function unitListFailure(error) {
  return {
    type: actionTypes.UNIT_LIST_FAILURE,
    error,
  }
}

export function getPropertyUnitRequest(payload) {
  return {
    type: actionTypes.PROPERTY_UNIT_REQUEST,
    payload,
  }
}

export function getPropertyUnitSuccess(payload) {
  return {
    type: actionTypes.PROPERTY_UNIT_SUCCESS,
    payload,
  }
}

export function getPropertyUnitFailure(error) {
  return {
    type: actionTypes.PROPERTY_UNIT_FAILURE,
    error,
  }
}

export function addUnitRequest(payload) {
  return {
    type: actionTypes.ADD_UNIT_REQUEST,
    payload,
  }
}

export function addUnitSuccess(payload) {
  return {
    type: actionTypes.ADD_UNIT_SUCCESS,
    payload,
  }
}

export function addUnitFailure(error) {
  return {
    type: actionTypes.ADD_UNIT_FAILURE,
    error,
  }
}

export function updateUnitRequest(id, body) {
  return {
    type: actionTypes.UPDATE_UNIT_REQUEST,
    id,
    body,
  }
}

export function updateUnitSuccess(payload) {
  return {
    type: actionTypes.UPDATE_UNIT_SUCCESS,
    payload,
  }
}

export function updateUnitFailure(error) {
  return {
    type: actionTypes.UPDATE_UNIT_FAILURE,
    error,
  }
}

export function inviteTenantRequest(id, body) {
  return {
    type: actionTypes.INVITE_TENANT_REQUEST,
    id,
    body,
  }
}

export function inviteTenantSuccess(payload) {
  return {
    type: actionTypes.INVITE_TENANT_SUCCESS,
    payload,
  }
}

export function inviteTenantFailure(error) {
  return {
    type: actionTypes.INVITE_TENANT_FAILURE,
    error,
  }
}

export function updateRoomsRequest(id, body) {
  return {
    type: actionTypes.UPDATE_ROOMS_REQUEST,
    id,
    body,
  }
}

export function updateRoomsSuccess(payload) {
  return {
    type: actionTypes.UPDATE_ROOMS_SUCCESS,
    payload,
  }
}

export function updateRoomsFailure(error) {
  return {
    type: actionTypes.UPDATE_ROOMS_FAILURE,
    error,
  }
}

export function resetTenantRequest(payload) {
  return {
    type: actionTypes.RESET_TENANT_REQUEST,
    payload,
  }
}

export function resetTenantSuccess(payload) {
  return {
    type: actionTypes.RESET_TENANT_SUCCESS,
    payload,
  }
}

export function resetTenantFailure(error) {
  return {
    type: actionTypes.RESET_TENANT_FAILURE,
    error,
  }
}

export function inProgressTenantRequest(id, lease) {
  return {
    type: actionTypes.INPROGRESS_TENANT_REQUEST,
    id,
    lease,
  }
}

export function inProgressTenantSuccess(payload) {
  return {
    type: actionTypes.INPROGRESS_TENANT_SUCCESS,
    payload,
  }
}

export function inProgressTenantFailure(error) {
  return {
    type: actionTypes.INPROGRESS_TENANT_FAILURE,
    error,
  }
}

export function tenantSearchSuccess(text) {
  return {
    type: actionTypes.TENANT_SEARCH_SUCCESS,
    text,
  }
}

export function tenantSearchFailure(error) {
  return {
    type: actionTypes.TENANT_SEARCH_FAILURE,
    error,
  }
}

export function getTenantByInviteCodeRequest(inviteCode) {
  return {
    type: actionTypes.GET_TENANT_BY_INVITE_CODE_REQUEST,
    inviteCode,
  }
}

export function getTenantByInviteCodeSuccess(payload) {
  return {
    type: actionTypes.GET_TENANT_BY_INVITE_CODE_SUCCESS,
    payload,
  }
}

export function getTenantByInviteCodeFailure(error) {
  return {
    type: actionTypes.GET_TENANT_BY_INVITE_CODE_FAILURE,
    error,
  }
}
