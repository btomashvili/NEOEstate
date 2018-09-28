/* eslint no-undef:0 */
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Home from './modules/home/scenes/Home'
import Register from './modules/currentUser/scenes/register/Register'
import Login from './modules/currentUser/scenes/login/Login'
import RequestResetPassword from './modules/currentUser/scenes/requestResetPassword/RequestResetPassword'
import ResetPassword from './modules/currentUser/scenes/resetPassword/ResetPassword'
import translations from './translations'
import Main from './modules/common/scenes/Main'
import UserProfile from './modules/user/scenes/UserProfile/UserProfile'
import UserSettings from './modules/user/scenes/UserProfile/UserSettings'
import SettingsScreen from './modules/user/scenes/Settings/Settings'
import AdminLogin from './modules/currentUser/scenes/AdminLogin/AdminLogin'
import TenantManagment from './modules/tenant/scenes/TenantManagment/TenantManagment'
import Activities from './modules/activity/scenes/Activities'
import AddTenant from './modules/tenant/scenes/AddTenant/AddTenant'
import Managers from './modules/managers/scenes/Managers'
import EditTenant from './modules/tenant/scenes/EditTenant/EditTenant'
import WalkthruInfoScreen from './modules/tenant/scenes/Walkthru/WalkthruInfo'
import Billing from './modules/billing/scenes/Billing'
import { requireAuth } from './utils/authenticated'

export default (lang = 'en') => {
  const trans = translations[lang].messages
  return (
    <Route path="/" onChange={() => window.scrollTo(0, 0)} component={Main}>
      <IndexRoute component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={RequestResetPassword} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/tenants" onEnter={requireAuth} component={TenantManagment} />
      <Route onEnter={requireAuth} path="/tenants/new" component={AddTenant} />
      <Route onEnter={requireAuth} path="/tenants/edit/:id/:lease" component={EditTenant} />

      <Route path="/profile" onEnter={requireAuth} title={trans.myProfile} component={UserProfile} />
      <Route path="/change-password" onEnter={requireAuth} title={trans.myProfile} component={UserSettings} />

      <Route path="/settings" onEnter={requireAuth} title="SettingsScreen" component={SettingsScreen} />

      <Route onEnter={requireAuth} path="/billing" component={Billing} />

      <Route onEnter={requireAuth} path="/managers" component={Managers} />

      <Route path="/:inviteCode" component={WalkthruInfoScreen} />

      <Route onEnter={requireAuth} path="/activities/:id/:lease" component={Activities} />

      <Route title="404 Page Not Found" path="*" component={() => null} />
    </Route>
  )
}
