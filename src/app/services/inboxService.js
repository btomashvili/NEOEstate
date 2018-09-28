/* eslint no-undef:0 */
import apiService from './service'

const api = apiService('/api/v1/chat')
const userApi = apiService('/api/v1/users')

export const sendMail = body => api.post('/', body)

export const getMailList = query => api.get('', query)

export const deleteMail = id => api.delete(`/${id}`)

export const deleteMessage = ({ id, message }) => api.post(`/${id}/deleteMessage`, { message })

export const getMail = ({ id, query }) => api.get(`/${id}`, query)

export const reply = ({ id, message }) => api.post(`/${id}/reply`, message)

export const uploadAttachment = (userID, body) => userApi.postFile(`/${userID}/upload?type=attachment`, body)

export const logger = (err, functionName) => console.warn(err, functionName)

// export const getLanguageList = () => api.get('/language-list')
