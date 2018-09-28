import { put, call } from 'redux-saga/effects'
import * as actions from './actions/billingActions'
import * as billingApi from '../../services/billingService'
import { showSnackbar } from '../common/actions/commonActions'
import * as helper from '../../services/helperService'

export function* paySaga(action) {
  try {
    const { error, message, data } = yield call(billingApi.pay, action.payload)
    if (error) {
      yield put(actions.payFailure(message))
    } else {
      yield put(actions.paySuccess(data))
      yield put(showSnackbar("You've been successfully charged!"))
    }
  } catch (error) {
    helper.logger(error, 'billingSagas.paySaga')
  }
}
