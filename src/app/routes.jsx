/* eslint no-undef:0 */
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Home from './modules/home/scenes/Home'
import translations from './translations'
import Main from './modules/common/scenes/Main'
import UserProfile from './modules/user/scenes/UserProfile/UserProfile'
import UserSettings from './modules/user/scenes/UserProfile/UserSettings'
import SettingsScreen from './modules/user/scenes/Settings/Settings'
import TenantManagment from './modules/tenant/scenes/TenantManagment/TenantManagment'

// import Billing from './modules/billing/scenes/Billing'
import { requireAuth } from './utils/authenticated'

export default (lang = 'en') => {
  const trans = translations[lang].messages
  return (
    <Route path="/" onChange={() => window.scrollTo(0, 0)} component={Main}>
      <IndexRoute component={Home} />
      <Route path="/tenants" component={TenantManagment} />
      <Route path="/profile" onEnter={requireAuth} title={trans.myProfile} component={UserProfile} />
      <Route path="/change-password" onEnter={requireAuth} title={trans.myProfile} component={UserSettings} />
      <Route path="/settings" onEnter={requireAuth} title="SettingsScreen" component={SettingsScreen} />
      <Route path="/samples"title="SettingsScreen" component={SettingsScreen} />


      <Route title="404 Page Not Found" path="*" component={() => null} />
    </Route>
  )
}
