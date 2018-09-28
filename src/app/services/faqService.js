/* eslint no-undef:0 */
import apiService from './service'

const api = apiService('/api/v1/faq')

export const uploadFaq = file =>
  // console.log(' 3 =>', file)
  api.postFile('/upload', file)

export const logger = (err, functionName) => console.warn(err, functionName)

// export const getLanguageList = () => api.get('/language-list')
