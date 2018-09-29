import { put, call } from 'redux-saga/effects'
import * as actions from './actions/commonActions'
import * as helperApi from '../../services/helperService'
import * as userApi from '../../services/userService'

export function* permissionLookupListSaga(action) {
  try {
    const { error, message, data } = yield call(
      helperApi.getPermissions,
      action.payload
    )
    if (error) {
      yield put(actions.permissionLookupListFailure(message))
    } else {
      yield put(actions.permissionLookupListSuccess(data))
    }
  } catch (error) {
    yield put(actions.permissionLookupListFailure(error))
  }
}

export function* roleLookupListSaga(action) {
  try {
    const { error, message, data } = yield call(helperApi.getRoles, action.payload)
    if (error) {
      yield put(actions.roleLookupListFailure(message))
    } else {
      yield put(actions.roleLookupListSuccess(data))
    }
  } catch (error) {
    yield put(actions.roleLookupListFailure(error))
  }
}

export function* stateLookupListSaga(action) {
  try {
    const { error, message, data } = yield call(helperApi.getStates, action.payload)
    if (error) {
      yield put(actions.stateLookupListFailure(message))
    } else {
      yield put(actions.stateLookupListSuccess(data))
    }
  } catch (error) {
    yield put(actions.stateLookupListFailure(error))
  }
}

export function* getMetricsSaga(action) {
  try {
    const { error, message, data } = yield call(
      userApi.getMetrics,
      action.payload
    )
    if (error) {
      yield put(actions.getMetricsFailure(message))
    } else {
      const status = action.status !== undefined ? action.status : 'total'
      yield put(actions.getMetricsSuccess(data, status))
    }
  } catch (error) {
    yield put(actions.getMetricsFailure(error))
  }
}

export function* housingTypesListSaga(action) {
  try {
    const { error, message, data } = yield call(helperApi.getHousingTypes, action.payload)
    if (error) {
      yield put(actions.housingTypesListFailure(message))
    } else {
      yield put(actions.housingTypesListSuccess(data))
    }
  } catch (error) {
    yield put(actions.housingTypesListFailure(error))
  }
}

export function* locationListSaga(action) {
  try {
    const { error, message, data } = yield call(helperApi.getLocations, action.payload)
    if (error) {
      yield put(actions.locationListFailure(message))
    } else {
      yield put(actions.locationListSuccess(data))
    }
  } catch (error) {
    yield put(actions.locationListFailure(error))
  }
}

export function* roomTypesSaga(action) {
  try {
    const { error, message, data } = yield call(helperApi.getRoomTypes, action.payload)
    if (error) {
      yield put(actions.roomTypesFailure(message))
    } else {
      yield put(actions.roomTypesSuccess(data))
    }
  } catch (error) {
    yield put(actions.roomTypesFailure(error))
  }
}
