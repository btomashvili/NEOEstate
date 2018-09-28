/* eslint no-undef:0 */

const authentication = (token, user) => {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

const logout = () => {
  localStorage.clear()
}

const getToken = () => localStorage.token

const getCurrentUser = () => (localStorage.user ? JSON.parse(localStorage.user) : null)

const clear = () => localStorage.clear()

export default {
  authentication,
  setUser,
  logout,
  getToken,
  getCurrentUser,
  clear,
}
