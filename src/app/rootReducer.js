import { combineReducers } from 'redux'
import { IntlReducer as Intl } from 'react-redux-multilingual'
import { commonReducer } from './modules/common/commonReducer'
import { currentUserReducer } from './modules/currentUser/currentUserReducer'
import { userReducer } from './modules/user/userReducer'
import { tenantReducer } from './modules/tenant/tenantReducer'
import { activityReducer } from './modules/activity/activityReducer'
import { propertyReducer } from './modules/property/propertyReducer'

const rootReducer = combineReducers({
  common: commonReducer,
  currentUser: currentUserReducer,
  user: userReducer,
  tenant: tenantReducer,
  activities: activityReducer,
  property: propertyReducer,
  Intl,
})

export default function root(state, action) {
  return rootReducer(state, action)
}
