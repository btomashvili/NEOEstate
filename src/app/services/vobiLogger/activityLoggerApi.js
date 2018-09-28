/* eslint no-param-reassign:0 */
import apisauce from 'apisauce'
import { checkStatus, urlWithParams } from './../utils'

const ACCESS_KEY = 'artqvaradzmurad'
const APP_NAME = 'WalkthruWeb'

const getHeaders = () => ({
  'Content-type': 'application/json',
  // authorization: auth.getToken(),
  authorization: ACCESS_KEY,
})

export default (parentUrl = '') => {
  const api = apisauce.create({
    baseURL: `${process.env.apiUrl}${parentUrl}`,
    headers: {
      'Content-type': 'application/json',
    },
  })

  const get = (url, params = {}) => {
    api.setHeaders(getHeaders())
    return api.get(urlWithParams(url, params)).then(checkStatus)
  }

  const post = (url, data = {}) => {
    api.setHeaders(getHeaders())
    // TODO: this shuould be cnfigurable
    data.appName = APP_NAME
    data.NODE_ENV = process.env.NODE_ENV
    data.createdClientDate = new Date()
    // /////////////////////////
    return api.post(url, data).then(checkStatus)
  }

  const deleteRequest = (url, params = {}) => {
    api.setHeaders(getHeaders())
    return api.delete(url, params).then(checkStatus)
  }

  const put = (url, data = {}) => {
    api.setHeaders(getHeaders())
    return api.put(url, data).then(checkStatus)
  }

  return {
    get,
    post,
    delete: deleteRequest,
    put,
  }
}
