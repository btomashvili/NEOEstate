/* eslint no-undef:0 */
import loggerService from './activityLoggerApi'

const api = loggerService('/api/v1/activity-log')

export const ping = () => api.get('/ping')

export const create = body => api.post('/create', body)

export const getByKey = key => api.get(`/get-by-key/${key}`)

export const deleteByKey = key => api.get(`/delete-by-key/${key}`)
