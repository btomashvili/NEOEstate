import * as actionTypes from './activityTypes'

export function activityGetByKeyRequest(key) {
  return {
    type: actionTypes.ACTIVITY_BY_KEY_REQUEST,
    payload: key,
  }
}

export function activityGetByKeySuccess(data) {
  return {
    type: actionTypes.ACTIVITY_BY_KEY_SUCCESS,
    payload: data,
  }
}

export function activityGetByKeyFailure(error) {
  return {
    type: actionTypes.ACTIVITY_BY_KEY_FAILURE,
    error,
  }
}

export function activityDeleteByKeyRequest(key) {
  return {
    type: actionTypes.ACTIVITY_DELETE_BY_KEY_REQUEST,
    payload: key,
  }
}

export function activityDeleteByKeySuccess(data) {
  return {
    type: actionTypes.ACTIVITY_DELETE_BY_KEY_SUCCESS,
    payload: data,
  }
}

export function activityDeleteByKeyFailure(error) {
  return {
    type: actionTypes.ACTIVITY_DELETE_BY_KEY_FAILURE,
    error,
  }
}
