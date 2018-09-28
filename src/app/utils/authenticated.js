// import { roles } from './permission.js'
import auth from '../services/authentication'
// Confirms user is authenticated

export const requireAuth = (nextState, replace) => {
  const key = Object.keys(localStorage).find(e => e.match(/token/))
  // const data = JSON.parse(localStorage.getItem(key))
  const data = localStorage.getItem(key)
  if (data === null) {
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname,
      },
    })
  }
}

// Confirms user has a specific role
export const requireRole = (allowedRoles, redirectUrl = '/') => (nextState, replace) => {
  const user = auth.getCurrentUser()
  if (user === null) {
    return replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname,
      },
    })
  }

  if (!allowedRoles.includes(user.role)) {
    replace({
      pathname: redirectUrl,
      state: {
        nextPathname: nextState.location.pathname,
      },
    })
  }
}
