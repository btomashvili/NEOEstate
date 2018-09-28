import apisauce from 'apisauce'
import { checkStatus, urlWithParams } from './utils'
import auth from './authentication'

const dataURItoBlob = (dataURI) => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString
  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURI.split(',')[1])
  } else {
    byteString = unescape(dataURI.split(',')[1])
  }

  // separate out the mime component
  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0]

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ia], { type: mimeString })
}

const getHeaders = () => ({
  'Content-type': 'application/json',
  authorization: auth.getToken(),
})

const getFileHeaders = () => ({
  'Content-type': 'multipart/form-data',
  authorization: auth.getToken(),
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

  const postFile = (url, file) => {
    api.setHeaders(getFileHeaders())
    const data = new FormData()
    data.append('file', file)
    return api.post(url, data).then(checkStatus)
  }

  const postBase64 = (url, base64) => {
    api.setHeaders(getFileHeaders())
    const blob = dataURItoBlob(base64)
    const data = new FormData()
    data.append('file', blob, 'logo.jpg')
    return api.post(url, data).then(checkStatus)
  }

  return {
    get,
    post,
    delete: deleteRequest,
    put,
    postFile,
    postBase64,
  }
}
