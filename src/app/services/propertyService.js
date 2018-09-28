/* eslint no-undef:0 */
import apiService from './service'

const api = apiService('/api/v1/property')

export const getPropertyList = query => api.get('', query)

export const createProperty = body => api.post('/', body)

// export const getTenantById = (id, query) => api.get(`/${id}`, query)

// export const deleteTenant = id => api.delete(`/${id}`)

// export const updateTenant = (id, body) => api.put(`/${id}`, body)
