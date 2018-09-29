/* eslint no-undef:0 */
import apiService from './service'

const api = apiService('/api/v1/property')
const orderApi = apiService('/api/v1/order')

export const getPropertyList = query => api.get('', query)

export const createProperty = body => api.post('/', body)

export const transferProperty = body => orderApi.post('', body)

export const getOfferList = query => orderApi.get('/offers', query)

export const confirmOffer = body => orderApi.post('/confirm', body)
