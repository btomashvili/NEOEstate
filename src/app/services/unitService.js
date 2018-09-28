/* eslint no-undef:0 */
import apiService from './service'

const api = apiService('/api/v1/unit')

export const getUnitList = query => api.get('', query)

export const getPropertyUnit = id => api.get(`/property/${id}`)

export const createUnit = body => api.post('/', body)

export const updateUnit = (id, body) => api.put(`/${id}`, body)

export const updateRooms = (id, body) => api.put(`/${id}/updateRooms`, body)
