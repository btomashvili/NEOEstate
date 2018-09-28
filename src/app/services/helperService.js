/* eslint no-undef:0 */
import apiService from './service'

const api = apiService('/api/v1/helpers')

export const getCountryList = () => api.get('/country-list')

export const getPermissions = () => api.get('/permissions')
export const getRoles = () => api.get('/roles')
export const getStates = () => api.get('/states')
export const getHousingTypes = () => api.get('/house-types')
export const getLocations = () => api.get('/room-locations')
export const getRoomTypes = () => api.get('/room-types')

export const uploadLogo = data => api.postBase64('/upload-logo', data)

export const logger = (err, functionName) => console.warn(err, functionName)

// export const getLanguageList = () => api.get('/language-list')
