/* eslint import/prefer-default-export: 0 */

import { fromJS } from 'immutable'
import * as actionTypes from './actions/tenantTypes'

const initialState = fromJS({
  isLoading: false,
  reloadData: false,
  managers: [],
  walkthruInfo: null,
  leases: [],
  originalLeases: [], // before search //TODO: it's temp fix
  totalCount: 0,
  searchText: '',
  tenants: [],
  properties: [],
  units: [],
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
      unit: {
        unitNumber: '',
        details: {
          totalFloors: 0,
          basement: false,
          bedrooms: {
            total: 0,
            master: false,
          },
          fullBaths: {
            total: 0,
            master: false,
          },
          halfBaths: 0,
        },
        rooms: [],
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

export const tenantReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.TENANT_LIST_REQUEST:
  case actionTypes.GET_TENANT_BY_INVITE_CODE_REQUEST:
  case actionTypes.VIEW_TENANT_REQUEST:
  case actionTypes.ADD_TENANT_REQUEST:
  case actionTypes.DELETE_TENANT_REQUEST:
  case actionTypes.PROPERTY_LIST_REQUEST:
  case actionTypes.UNITY_LIST_REQUEST:
  case actionTypes.LEASE_LIST_REQUEST:
  case actionTypes.TENANT_ALL_LIST_REQUEST:
  case actionTypes.PROPERTY_UNIT_REQUEST:
    return state.set('isLoading', true)

  case actionTypes.TENANT_ALL_LIST_SUCCESS:
  case actionTypes.TENANT_LIST_SUCCESS: {
    const totalCount = action.payload.totalCount || state.get('totalCount')
    return state
        .set('isLoading', false)
        .set('reloadData', false)
        .set('tenants', action.payload.items)
        .set('managers', fromJS(action.payload.items))
        .set('totalCount', totalCount)
  }
  case actionTypes.LEASE_LIST_SUCCESS:
    return state
        .set('isLoading', false)
        .set('reloadData', false)
        .set('leases', fromJS(action.payload.items))
        .set('originalLeases', fromJS(action.payload.items))
        .set('totalCount', action.payload.totalCount || state.get('totalCount'))

  case actionTypes.PROPERTY_LIST_SUCCESS:
    return state
        .set('isLoading', false)
        .set('reloadData', false)
        .set('properties', action.payload.items)

  case actionTypes.UNIT_LIST_SUCCESS: {
    const units = action.payload.items.map((item) => {
      const unit = item
      unit.unitNumber = item.unitNumber.toString()
      return item
    })
    return state
        .set('isLoading', false)
        .set('reloadData', false)
        .set('units', units)
  }
  case actionTypes.ADD_TENANT_SUCCESS: {
    const tenantData = action.payload
    tenantData.lease = state.getIn(['currentItem', 'data', 'information', 'lease'])
    return state.setIn(['currentItem', 'data', 'information'], fromJS(tenantData))
  }
  case actionTypes.ADD_UNIT_SUCCESS:
    return state.setIn(['currentItem', 'data', 'unit', 'id'], action.payload.id)

  case actionTypes.ADD_PROPERTY_SUCCESS:
    return state.setIn(['currentItem', 'data', 'property'], fromJS(action.payload))

  case actionTypes.ADD_UNITY_FAILURE:
    return state.setIn(['currentItem', 'data', 'units'], fromJS(action.payload))

  case actionTypes.VIEW_TENANT_SUCCESS: {
    const leaseId = action.payload.lease && action.payload.lease._id ? action.payload.lease : null
    return state
        .set('currentItem', initialState.get('currentItem'))
        .setIn(['currentItem', 'data', 'lease'], leaseId)
        .setIn(['currentItem', 'data', 'information'], fromJS(action.payload))
        .setIn(['currentItem', 'data', 'property'], fromJS(action.payload.lease.property))
        .setIn(['currentItem', 'data', 'unit'], fromJS(action.payload.lease.unit))
        .setIn(['currentItem', 'data', 'rooms'], fromJS(action.payload.lease.rooms))
        .set('selectedTabIndex', 0)
        .set('reloadData', true)
  }
  case actionTypes.UPDATE_ROOMS_SUCCESS:
    return state.setIn(['currentItem', 'data', 'unit', 'details'], fromJS(action.payload.details))

  case actionTypes.DELETE_TENANT_SUCCESS:
    return state.set('reloadData', true)

  case actionTypes.GO_TO_TAB:
    return state.set('selectedTabIndex', action.payload)

  case actionTypes.TENANT_LIST_FAILURE:
  case actionTypes.TENANT_ALL_LIST_FAILURE:
  case actionTypes.VIEW_TENANT_FAILURE:
  case actionTypes.DELETE_TENANT_FAILURE:
  case actionTypes.PROPERTY_LIST_FAILURE:
  case actionTypes.PROPERTY_UNIT_FAILURE:
  case actionTypes.GET_TENANT_BY_INVITE_CODE_FAILURE:
    return state.set('isLoading', false).set('error', action.error)

  case actionTypes.INVITE_TENANT_SUCCESS:
    return state.setIn(['currentItem', 'data', 'invite'], fromJS({ message: action.payload, status: 'success' }))

  case actionTypes.INVITE_TENANT_FAILURE:
    return state.setIn(['currentItem', 'data', 'invite'], fromJS({ message: action.payload, status: 'error' }))

  case actionTypes.PROPERTY_UNIT_SUCCESS:
    return state.setIn(['currentItem', 'data', 'unit'], fromJS(action.payload))

  case actionTypes.GET_TENANT_BY_INVITE_CODE_SUCCESS: {
    return state.set('walkthruInfo', fromJS(action.payload)).set('isLoading', false)
  }

  case actionTypes.RESET_TENANT_REQUEST:
    return state.set('selectedTabIndex', 0).set('currentItem', initialState.get('currentItem'))
  case actionTypes.UPDATE_TENANT_SUCCESS:
    console.log('UPDATE TENANTS SUCCESS ')
    return state.set('reloadData', true)

  case actionTypes.USER_UPDATE_FIELD_VALUE: {
    const { fields, value, isDeleted } = action
    if (fields.length === 1) {
      return !isDeleted ? state.set(fields[0], fromJS(value)) : state.delete(fields[0], fromJS(value))
    }
    return !isDeleted ? state.setIn(fields, fromJS(value)) : state.deleteIn(fields, fromJS(value))
  }

  case actionTypes.TENANT_SEARCH_SUCCESS: {
    if (action.text.trim().length === 0) {
      return state.set('searchText', '').set('leases', state.get('originalLeases'))
    }
    const data = state.get('leases')
    const result = data
        .toJS()
        .filter(
          item =>
            item.firstName.toLowerCase().includes(action.text.toLowerCase()) ||
            item.lastName.toLowerCase().includes(action.text.toLowerCase()) ||
            item.email.toLowerCase().includes(action.text.toLowerCase()) ||
            item.inviteCode.toLowerCase().includes(action.text.toLowerCase()) ||
            item.property.street.toLowerCase().includes(action.text.toLowerCase()) ||
            item.property.city.toLowerCase().includes(action.text.toLowerCase())
        )
      // console.log('payload: ', action.text, data.toJS(), result)
    return state.set('searchText', action.text).set('leases', fromJS(result))
  }

  case actionTypes.INPROGRESS_TENANT_SUCCESS: {
    return state.set('reloadData', true)
  }

  default:
    return state
  }
}
