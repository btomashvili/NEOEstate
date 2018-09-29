import * as actionTypes from './propertyTypes'


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
