/* eslint import/prefer-default-export: 0 */

import { fromJS } from 'immutable'
import { mapListFromJS } from '../../utils/helper'
import * as commonTypes from './actions/commonTypes'

const initialState = fromJS({
  notification: {
    type: 'success',
    title: '',
    message: '',
    id: '',
  },
  connexionStatusList: [{ id: 'Online', name: 'Online' }, { id: 'Offline', name: 'Offline' }],
  genderList: [{ id: 'Male', name: 'Male' }, { id: 'Female', name: 'Female' }],
  prefixList: [{ id: 'Mr.', name: 'Mr.' }, { id: 'Mrs.', name: 'Mrs.' }],
  roomItems: [
    { title: 'Ceiling and Walls', code: '1' },
    { title: 'Paint and Wallpaper', code: '2' },
    { title: 'Doors and Door Stops', code: '3' },
    { title: 'Flooring', code: '4' },
    { title: 'Lights and Ceiling Fans', code: '5' },
    { title: 'Windows and Screens', code: '6' },
    { title: 'Window Latches', code: '7' },
    { title: 'Drapes/Blinds/Shutters', code: '8' },
    { title: 'Plugs and Switches', code: '9' },
    { title: 'Closet Shelves and Rods', code: '10' },
    { title: 'Cabinets', code: '11' },
    { title: 'Other', code: '12' },
  ],
  countryList: [],
  permissions: {},
  states: [],
  housingTypes: [],
  locations: [],
  roomTypes: [],
  roleList: [],
  metrics: {
    approved: 0,
    request: 0,
    pending: 0,
    total: 0,
    rejected: 0,
  },
})

export const commonReducer = (state = initialState, action) => {
  switch (action.type) {
  case commonTypes.COUNTRY_LOOKUP_LIST_SUCCESS:
    const countryList = mapListFromJS(action.payload, 'name')
    const sortedList = countryList.sort((a, b) => a.get('name').localeCompare(b.get('name')))
    return state.set('countryList', sortedList)
  case commonTypes.STATE_LOOKUP_LIST_SUCCESS:
    const states = fromJS(action.payload)
    return state.set('states', states)
  case commonTypes.HOUSING_TYPES_LOOKUP_LIST_SUCCESS:
    const housingTypes = fromJS(action.payload)
    return state.set('housingTypes', housingTypes)
  case commonTypes.LOCATION_LOOKUP_LIST_SUCCESS:
    return state.set('locations', fromJS(action.payload))
  case commonTypes.ROOM_TYPES_LOOKUP_LIST_SUCCESS:
    return state.set('roomTypes', fromJS(action.payload))
  case commonTypes.PERMISSION_LOOKUP_LIST_SUCCESS:
    return state.set('permissions', fromJS(action.payload))
  case commonTypes.ROLE_LOOKUP_LIST_SUCCESS:
    return state.set('roleList', fromJS(action.payload))
  case commonTypes.COMMON_UPDATE_FIELD_VALUE:
    const { fields, value, isDeleted } = action
    if (fields.length === 1) {
      return !isDeleted ? state.set(fields[0], fromJS(value)) : state.delete(fields[0], fromJS(value))
    }
    return !isDeleted ? state.setIn(fields, fromJS(value)) : state.deleteIn(fields, fromJS(value))
  case commonTypes.SHOW_SNACKBAR_NOTIFICATION:
    return state.set(
        'notification',
        fromJS({
          title: action.title,
          message: action.message,
          id: action.id,
          type: action.messageType,
          activeClassName: action.activeClassName,
        })
      )
  case commonTypes.GET_METRICS_REQUEST:
    return state
  case commonTypes.GET_METRICS_SUCCESS:
    const metrics = state.get('metrics')
    return state.set('metrics', metrics.set(action.status, action.payload.count))
  case commonTypes.GET_METRICS_FAILURE:
    return state
  default:
    return state
  }
}
