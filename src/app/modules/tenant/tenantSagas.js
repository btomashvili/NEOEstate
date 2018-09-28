import { put, call } from 'redux-saga/effects'
import * as actions from './actions/tenantActions'
import * as tenantApi from '../../services/tenantService'
import * as propertyApi from '../../services/propertyService'
import * as unitService from '../../services/unitService'
import * as helper from '../../services/helperService'
import { showSnackbar } from '../common/actions/commonActions'

export function* tenantListSaga(action) {
  try {
    const { error, message, data } = yield call(tenantApi.getTenantList, action.payload)

    if (error) {
      yield put(actions.tentantListFailure(message))
    } else {
      yield put(actions.tentantListSuccess(data))
    }
  } catch (error) {
    helper.logger(error, 'tenantSagas.tenantListSaga')
  }
}

export function* getTenantByInviteCodeSaga(action) {
  // console.log('getTenantByInviteCodeSaga =>>', action)
  try {
    const { error, message, data } = yield call(tenantApi.getTenantByInviteCode, action.inviteCode)
    if (error) {
      yield put(actions.getTenantByInviteCodeFailure(message))
    } else {
      // console.log('getTenantByInviteCodeSaga :>> ', error, message, data)
      yield put(actions.getTenantByInviteCodeSuccess(data))
    }
  } catch (error) {
    yield put(actions.getTenantByInviteCodeFailure(error))
    helper.logger(error, 'tenantSagas.getTenantByInviteCodeSaga')
  }
}

export function* tenantAllListSaga(action) {
  try {
    const { error, message, data } = yield call(tenantApi.getTenantAllList, action.payload)
    console.log('tenantAllListSaga :', error, message, data)
    if (error) {
      yield put(actions.tentantListFailure(message))
    } else {
      yield put(actions.tentantListSuccess(data))
    }
  } catch (error) {
    helper.logger(error, 'tenantSagas.tenantListSaga')
  }
}

export function* leaseListSaga(action) {
  try {
    const { error, message, data } = yield call(tenantApi.getLeasesList, action.payload)

    if (error) {
      yield put(actions.leaseListFailure(message))
    } else {
      yield put(actions.leaseListSuccess(data))
    }
  } catch (error) {
    helper.logger(error, 'tenantSagas.leaseListSaga')
  }
}

export function* addTenantSaga(action) {
  try {
    const { error, message, data } = yield call(tenantApi.createTenant, action.payload)
    if (error) {
      yield put(actions.addTenantFailure(message))
    } else {
      yield put(actions.addTenantSuccess(data))
      yield put(showSnackbar('Tenant succesfully added'))
    }
  } catch (error) {
    helper.logger(error, 'tenantSagas.addTenantSaga')
  }
}

export function* viewTenantSaga(action) {
  try {
    const { error, message, data } = yield call(tenantApi.getTenantById, action.id, action.query)
    if (error) {
      yield put(actions.viewTenantFailure(message))
    } else {
      yield put(actions.viewTenantSuccess(data))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.viewUserSaga')
  }
}

export function* deleteTenantSaga(action) {
  try {
    // console.log(action)
    const { error, message, data } = yield call(tenantApi.deleteTenant, action.id, action.lease)
    if (error) {
      yield put(actions.deleteTenantFailure(message))
    } else {
      yield put(actions.deleteTenantSuccess(data))
    }
  } catch (error) {
    yield put(actions.deleteTenantFailure(error))
  }
}

export function* updateTenantSaga(action) {
  try {
    const { error, message, data } = yield call(tenantApi.updateTenant, action.id, action.lease, action.body)
    if (error) {
      yield put(actions.updateTenantFailure(message))
    } else {
      yield put(actions.updateTenantSuccess(data))
      yield put(showSnackbar('Tenant succesfully updated'))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.updateTenantSaga')
  }
}

export function* propertyListSaga(action) {
  try {
    const { error, message, data } = yield call(propertyApi.getPropertyList, action.payload)
    if (error) {
      yield put(actions.propertyListFailure(message))
    } else {
      yield put(actions.propertyListSuccess(data))
    }
  } catch (error) {
    helper.logger(error, 'tenantSagas.propertyListSaga')
  }
}

export function* addPropertySaga(action) {
  try {
    const { error, message, data } = yield call(propertyApi.createProperty, action.payload)
    if (error) {
      yield put(actions.addPropertyFailure(message))
    } else {
      yield put(actions.addPropertySuccess(data))
      yield put(showSnackbar('Property succesfully added'))
    }
  } catch (error) {
    helper.logger(error, 'tenantSagas.addPropertySaga')
  }
}

export function* unitListSaga(action) {
  try {
    const { error, message, data } = yield call(unitService.getUnitList, action.payload)
    if (error) {
      yield put(actions.unitListFailure(message))
    } else {
      yield put(actions.unitListSuccess(data))
    }
  } catch (error) {
    helper.logger(error, 'tenantSagas.unitListSaga')
  }
}

export function* getPropertyUnitSaga(action) {
  try {
    const { error, message, data } = yield call(unitService.getPropertyUnit, action.payload)
    if (error) {
      yield put(actions.getPropertyUnitFailure(message))
    } else {
      yield put(actions.getPropertyUnitSuccess(data))
    }
  } catch (error) {
    helper.logger(error, 'tenantSagas.getPropertyUnitSaga')
  }
}

export function* addUnitSaga(action) {
  try {
    const { error, message, data } = yield call(unitService.createUnit, action.payload)
    if (error) {
      yield put(actions.addUnitFailure(message))
    } else {
      yield put(actions.addUnitSuccess(data))
      yield put(showSnackbar('Unit succesfully added'))
    }
  } catch (error) {
    helper.logger(error, 'tenantSagas.addUnitSaga')
  }
}

export function* updateUnitSaga(action) {
  try {
    const { error, message, data } = yield call(unitService.updateUnit, action.id, action.body)
    if (error) {
      yield put(actions.updateUnitFailure(message))
    } else {
      yield put(actions.updateUnitSuccess(data))
      yield put(showSnackbar('Unit succesfully updated'))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.updateUnitSaga')
  }
}

export function* inviteTenantSaga(action) {
  try {
    const { error, message, data } = yield call(tenantApi.inviteTenant, action.id, action.body)
    if (error) {
      yield put(actions.inviteTenantFailure(message))
    } else {
      yield put(actions.inviteTenantSuccess(data))
      // yield put(showSnackbar('Unit invited.'))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.inviteTenantSaga')
  }
}

export function* updateRoomsSaga(action) {
  try {
    const { error, message, data } = yield call(unitService.updateRooms, action.id, action.body)
    if (error) {
      yield put(actions.updateRoomsFailure(message))
    } else {
      yield put(actions.updateRoomsSuccess(data))
      yield put(showSnackbar('Unit successfully updated.'))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.updateRoomsSaga')
  }
}

export function* InProgressSaga(action) {
  try {
    console.log('InProgress :', action.id, action.lease)
    const { error, message, data } = yield call(tenantApi.inProgress, action.id, action.lease)
    if (error) {
      yield put(actions.inProgressTenantFailure(message))
    } else {
      yield put(actions.inProgressTenantSuccess(data))
    }
  } catch (error) {
    yield put(actions.inProgressTenantFailure(error))
  }
}
