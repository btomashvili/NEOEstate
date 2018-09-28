import { put, call } from 'redux-saga/effects'
import * as actions from './actions/activityActions'
import * as activityApi from '../../services/vobiLogger'
import * as helper from '../../services/helperService'

export function* getActivityByKey(action) {
  try {
    const { error, message, data } = yield call(activityApi.getByKey, action.payload)
    if (error) {
      yield put(actions.activityGetByKeyFailure(message))
    } else {
      yield put(actions.activityGetByKeySuccess(data))
    }
  } catch (error) {
    helper.logger(error, 'activitySagas.getActivityKey')
  }
}

export function* deleteActivityByKey(action) {
  try {
    const { error, message, data } = yield call(activityApi.deleteByKey, action.payload)
    console.log('deleteActivityByKey =>> ', error, message, data)
    if (error) {
      yield put(actions.activityDeleteByKeyFailure(message))
    } else {
      yield put(actions.activityDeleteByKeySuccess(data))
    }
  } catch (error) {
    helper.logger(error, 'activitySagas.deleteActivityByKey')
  }
}
