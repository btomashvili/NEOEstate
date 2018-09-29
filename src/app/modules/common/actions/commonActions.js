import uuid from 'uuid'
import * as actionTypes from './commonTypes'

export function updateFieldValue(field, value, parent = '', isDeleted = false) {
  let fields = []
  if (parent === '') {
    fields = field.split('.')
  } else {
    fields = parent.split('.').concat(field.split('.'))
  }
  return {
    type: actionTypes.COMMON_UPDATE_FIELD_VALUE,
    fields,
    value,
    isDeleted,
  }
}

export function setDefaultData() {
  return {
    type: actionTypes.SET_DEFAULT_COMMON_DATA,
  }
}

export function countryLookupListRequest(payload) {
  return {
    type: actionTypes.COUNTRY_LOOKUP_LIST_REQUEST,
    payload,
  }
}

export function countryLookupListSuccess(payload) {
  return {
    type: actionTypes.COUNTRY_LOOKUP_LIST_SUCCESS,
    payload,
  }
}

export function stateLookupListRequest(payload) {
  return {
    type: actionTypes.STATE_LOOKUP_LIST_REQUEST,
    payload,
  }
}

export function stateLookupListSuccess(payload) {
  return {
    type: actionTypes.STATE_LOOKUP_LIST_SUCCESS,
    payload,
  }
}

export function stateLookupListFailure(payload) {
  return {
    type: actionTypes.STATE_LOOKUP_LIST_FAILURE,
    payload,
  }
}

export function housingTypesListRequest(payload) {
  return {
    type: actionTypes.HOUSING_TYPES_LOOKUP_LIST_REQUEST,
    payload,
  }
}

export function housingTypesListSuccess(payload) {
  return {
    type: actionTypes.HOUSING_TYPES_LOOKUP_LIST_SUCCESS,
    payload,
  }
}

export function housingTypesListFailure(payload) {
  return {
    type: actionTypes.HOUSING_TYPES_LOOKUP_LIST_FAILURE,
    payload,
  }
}

export function locationListRequest(payload) {
  return {
    type: actionTypes.LOCATION_LOOKUP_LIST_REQUEST,
    payload,
  }
}

export function locationListSuccess(payload) {
  return {
    type: actionTypes.LOCATION_LOOKUP_LIST_SUCCESS,
    payload,
  }
}

export function locationListFailure(payload) {
  return {
    type: actionTypes.LOCATION_LOOKUP_LIST_FAILURE,
    payload,
  }
}

export function roomTypesRequest(payload) {
  return {
    type: actionTypes.ROOM_TYPES_LOOKUP_LIST_REQUEST,
    payload,
  }
}

export function roomTypesSuccess(payload) {
  return {
    type: actionTypes.ROOM_TYPES_LOOKUP_LIST_SUCCESS,
    payload,
  }
}

export function roomTypesFailure(payload) {
  return {
    type: actionTypes.ROOM_TYPES_LOOKUP_LIST_FAILURE,
    payload,
  }
}

export function showSnackbar(message = '', messageType = 'success', title = '') {
  // const background = messageType === 'success' ? '#3F99EA' : '#CB1663'
  return {
    type: actionTypes.SHOW_SNACKBAR_NOTIFICATION,
    messageType,
    id: uuid.v1(),
    title,
    message,
  }
}

export function getMetricsRequest(payload) {
  return {
    type: actionTypes.GET_METRICS_REQUEST,
    status: payload.status,
    payload,
  }
}

export function getMetricsSuccess(payload, status) {
  return {
    type: actionTypes.GET_METRICS_SUCCESS,
    status,
    payload,
  }
}

export function getMetricsFailure(payload) {
  return {
    type: actionTypes.GET_METRICS_FAILURE,
    payload,
  }
}

export function getAllMetricsRequest() {
  return [
    getMetricsRequest({ status: 'approved' }),
    getMetricsRequest({ status: 'rejected' }),
    getMetricsRequest({ status: 'pending' }),
    getMetricsRequest({ status: 'request' }),
    getMetricsRequest({}),
  ]
}


export function permissionLookupListRequest(payload) {
  return {
    type: actionTypes.PERMISSION_LOOKUP_LIST_REQUEST,
    payload,
  }
}

export function permissionLookupListSuccess(payload) {
  return {
    type: actionTypes.PERMISSION_LOOKUP_LIST_SUCCESS,
    payload,
  }
}

export function permissionLookupListFailure(payload) {
  return {
    type: actionTypes.PERMISSION_LOOKUP_LIST_FAILURE,
    payload,
  }
}

export function roleLookupListRequest(payload) {
  return {
    type: actionTypes.ROLE_LOOKUP_LIST_REQUEST,
    payload,
  }
}

export function roleLookupListSuccess(payload) {
  return {
    type: actionTypes.ROLE_LOOKUP_LIST_SUCCESS,
    payload,
  }
}

export function roleLookupListFailure(payload) {
  return {
    type: actionTypes.ROLE_LOOKUP_LIST_FAILURE,
    payload,
  }
}
