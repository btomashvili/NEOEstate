import * as actionTypes from './billingTypes'

export function payRequest(user) {
  return {
    type: actionTypes.PAY_REQUEST,
    payload: user,
  }
}

export function paySuccess(user) {
  return {
    type: actionTypes.PAY_SUCCESS,
    payload: user,
  }
}

export function payFailure(error) {
  return {
    type: actionTypes.PAY_FAILURE,
    error,
  }
}
