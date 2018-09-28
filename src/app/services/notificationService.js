/* eslint no-undef:0 */
import apiService from './service'

const api = apiService('/api/v1/notifications')

export const setReadStatusNotification = body => api.post('/status', body)

export const deleteNotification = id => api.delete(`/${id}`)

export const getNotificationList = query => api.get('', query)

export const getNotificationById = (id, query) => api.get(`/${id}`, query)
