import { put, call } from 'redux-saga/effects'
import * as actions from './actions/propertyActions'
// import * as tenantApi from '../../services/tenantService'
import * as propertyApi from '../../services/propertyService'
// import * as unitService from '../../services/unitService'
// import * as helper from '../../services/helperService'
import { showSnackbar } from '../common/actions/commonActions'

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

export function* transferPropertySaga(action) {
  try {
    const { error, message, data } = yield call(propertyApi.transferProperty, action.payload)

    if (error) {
      yield put(actions.transferPropertyFailure(message))
    } else {
      yield put(actions.transferPropertySuccess(data))
      yield put(showSnackbar('Offer successfully sent!'))
    }
  } catch (error) {
    console.log(error, 'tenantSagas.tenantListSaga')
  }
}

export function* offerListSaga(action) {
  try {
    const { error, message, data } = yield call(propertyApi.getOfferList, action.payload)

    if (error) {
      yield put(actions.offerListFailure(message))
    } else {
      yield put(actions.offerListSuccess(data))
    }
  } catch (error) {
    console.log(error, 'tenantSagas.tenantListSaga')
  }
}

export function* confirmOfferSaga(action) {
  try {
    const { error, message, data } = yield call(propertyApi.confirmOffer, action.payload)

    if (error) {
      yield put(actions.confirmOfferFailure(message))
    } else {
      yield put(actions.confirmOfferSuccess(data))
      yield put(showSnackbar('Offer successfully confirmed!'))
    }
  } catch (error) {
    console.log(error, 'tenantSagas.tenantListSaga')
  }
}
