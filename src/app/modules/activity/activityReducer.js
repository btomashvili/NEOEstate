/* eslint import/prefer-default-export:0 */

import { fromJS } from 'immutable'
// import { mapListFromJS } from '../../utils/helper'
import * as actionTypes from './actions/activityTypes'

const initialState = fromJS({
  isLoading: false,
  reloadData: false,
  items: [],
  error: null,
  message: null,
})

export const activityReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.ACTIVITY_BY_KEY_REQUEST: {
    return state
        .set('isLoading', false)
        .set('error', null)
        .set('message', null)
  }
  case actionTypes.ACTIVITY_BY_KEY_SUCCESS: {
    return state
        .set('isLoading', false)
        .set('reloadData', false)
        .set('items', fromJS(action.payload))
  }

  case actionTypes.ACTIVITY_BY_KEY_FAILURE: {
    return state
        .set('isLoading', false)
        .set('error', action.error)
        .set('message', action.message)
  }

  case actionTypes.ACTIVITY_DELETE_BY_KEY_REQUEST: {
    return state
  }
  case actionTypes.ACTIVITY_DELETE_BY_KEY_SUCCESS: {
    console.log('ACTIVITY_DELETE_BY_KEY_SUCCESS =>> ', action)
    return state
  }
  case actionTypes.ACTIVITY_DELETE_BY_KEY_FAILURE: {
    console.log('ACTIVITY_DELETE_BY_KEY_FAILURE =>> ', action)
    return state
  }

  default:
    return state
  }
}
