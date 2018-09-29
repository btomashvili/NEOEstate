/* eslint import/prefer-default-export: 0 */

import { fromJS } from 'immutable'
import * as actionTypes from './actions/propertyTypes'

const initialState = fromJS({
  isLoading: false,
  reloadData: false,
  items: [],
  query: {
    where: {},
    pageSize: 10000,
    page: 1,
    sort: '-createdAt',
    populate: [],
    count: true,
  },
  currentItem: {
    data: {
      information: {
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        lease: {
          leaseBegins: null,
          leaseExpires: null,
          daysToComplete: null,
        },
      },
      property: {
        street: '',
        city: '',
        state: '',
        housingType: '',
        zip: '',
        lease: '',
      },
      rooms: [],
      invite: {
        status: '',
        message: '',
      },
    },
    message: {
      type: 'success',
      text: '',
    },
    editUnit: false,
    showErrors: false,
    validationErrors: {},
    editMode: false,
    query: {},
    permission: {
      canEdit: false,
      canDelete: false,
      canShare: false,
    },
  },
  lookup: {
    list: [],
    reload: false,
    query: {
      where: {},
      sort: '',
      pageSize: 10000,
      page: 1,
    },
  },
  selectedTabIndex: 0,
  error: null,
  importUsers: {
    isLoading: false,
  },
})

export const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.PROPERTY_LIST_REQUEST:
    return state.set('isLoading', true)

  case actionTypes.PROPERTY_LIST_SUCCESS: {
    const totalCount = action.payload.totalCount || state.get('totalCount')
    return state
        .set('isLoading', false)
        .set('reloadData', false)
        .set('items', fromJS(action.payload.items))
        .set('totalCount', totalCount)
  }

  case actionTypes.PROPERTY_LIST_FAILURE:
    return state.set('isLoading', false).set('error', action.error)

  default:
    return state
  }
}
