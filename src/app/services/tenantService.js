/* eslint no-undef:0 */
import apiService from './service'

const api = apiService('/api/v1/tenant')

export const getTenantList = query => api.get('', query)

export const getTenantAllList = query => api.get('/all', query)

export const getLeasesList = query => api.get('/leases', query)

export const createTenant = body => api.post('/', body)

export const getTenantById = (id, query) => api.get(`/${id}`, query)

export const deleteTenant = (id, lease) => api.delete(`/${id}?lease=${lease}`)

export const updateTenant = (id, lease, body) => api.put(`/${id}?lease=${lease}`, body)

export const inviteTenant = (id, body) => api.put(`/${id}/invite`, body)

export const getTenantByInviteCode = inviteCode => api.get(`/code/${inviteCode}`)

export const inProgress = (id, lease) => api.put(`/${id}/inprogress?lease=${lease}`, {})

// export const updateRooms = (id, body) => api.put(`/${id}/updateRooms`, body)
