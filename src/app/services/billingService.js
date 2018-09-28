/* eslint no-undef:0 */
import apiService from './service'

const api = apiService('/api/v1/billing')

export const pay = body => api.post('/charge', body)
