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

export function transferPropertyRequest(payload) {
  return {
    type: actionTypes.TRANSFER_PROPERTY_REQUEST,
    payload,
  }
}

export function transferPropertySuccess(payload) {
  return {
    type: actionTypes.TRANSFER_PROPERTY_SUCCESS,
    payload,
  }
}

export function transferPropertyFailure(error) {
  return {
    type: actionTypes.TRANSFER_PROPERTY_FAILURE,
    error,
  }
}

export function offerListRequest(payload) {
  return {
    type: actionTypes.OFFER_LIST_REQUEST,
    payload,
  }
}

export function offerListSuccess(payload) {
  return {
    type: actionTypes.OFFER_LIST_SUCCESS,
    payload,
  }
}

export function offerListFailure(error) {
  return {
    type: actionTypes.OFFER_LIST_FAILURE,
    error,
  }
}

export function confirmOfferRequest(payload) {
  return {
    type: actionTypes.CONFIRM_OFFER_REQUEST,
    payload,
  }
}

export function confirmOfferSuccess(payload) {
  return {
    type: actionTypes.CONFIRM_OFFER_SUCCESS,
    payload,
  }
}

export function confirmOfferFailure(error) {
  return {
    type: actionTypes.CONFIRM_OFFER_FAILURE,
    error,
  }
}
