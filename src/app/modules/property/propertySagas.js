import { put, call } from 'redux-saga/effects'
import * as actions from './actions/propertyActions'
// import * as tenantApi from '../../services/tenantService'
import * as propertyApi from '../../services/propertyService'
// import * as unitService from '../../services/unitService'
// import * as helper from '../../services/helperService'
// import { showSnackbar } from '../common/actions/commonActions'

export function* propertyListSaga(action) {
  try {
    const { error, message, data } = yield call(propertyApi.getPropertyList, action.payload)

    if (error) {
      yield put(actions.propertyListFailure(message))
    } else {
      yield put(actions.propertyListSuccess(data))
    }
  } catch (error) {
    console.log(error, 'tenantSagas.tenantListSaga')
  }
}
