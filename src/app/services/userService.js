/* eslint no-undef:0 */
import apiService from './service'

const api = apiService('/api/v1/users')
const apiRoot = apiService('/api/v1')

export const signIn = ({ data, password }) => api.post('/sign-in', { data, password })

export const signUp = body => api.post('/sign-up', body)

export const fetchUser = () => api.get('/info', {})

export const inviteUser = ({ email, role, team }) => api.post('/invite-user', { email, role, team })

export const deleteUser = userId => api.delete(`/${userId}`)

export const editUser = (userId, body) => api.put(`/${userId}`, body)

export const updateUserProfile = body => api.put('/update-profile', body)

export const getUserById = (userId, query) => api.get(`/${userId}`, query)

export const uploadAvatarById = (userID, body) => api.post(`/${userID}/upload?type=avatar`, body)

export const uploadPassportById = (userID, body) => api.postFile(`/${userID}/upload?type=passport`, body)

export const uploadTravelDocById = (userID, body) => api.postFile(`/${userID}/upload?type=travel`, body)

export const uploadAvatar = file => api.postBase64('/upload-avatar', file)

export const getUserList = query => api.get('', query)

export const getUserQrCodeImage = contactId => api.get(`/${contactId}/qrcode`)

export const changePassword = ({ oldPassword, password }) => api.post('/change-password', { oldPassword, password })

export const activeUser = body => api.post('/activate', body)

export const resetPassword = ({ email }) => api.post('/request-reset-password', { email })

export const resetPasswordToken = ({ token, password }) => api.post('/reset-password', { token, password })

// todo upload file
// export const importUsers = file => api.postFile('/import-users', file)

export const getAdminList = query => api.get('/admins', query)
export const addAdmin = body => api.post('/admins', body)

export const getParticipantList = query => api.get('/participants', query)
export const addParticipant = body => api.post('/participants', body)
export const getParticipantById = (id, body) => api.get(`/participants/${id}`, body)
export const editParticipant = (id, body) => api.put(`/participants/${id}`, body)
export const submitParticipant = (id, body) => api.put(`/participants/${id}/submit`, body)
export const approveParticipant = (id, body) => api.put(`/participants/${id}/approve`, body)
export const rejectParticipant = (id, body) => api.put(`/participants/${id}/reject`, body)

export const getMetrics = query => api.get('/totals', query)

export const confirmParticipation = userId => api.get(`/participants/${userId}/confirm`, {})

export const getReportingData = key => apiRoot.get(`/reporting/${key}`, {})

export const editPrePrintedBadge = (id, body) => api.put(`/participants/${id}/badge/pre-printed`, body)
export const editActiveBlockBadge = (id, body) => api.put(`/participants/${id}/badge/active-block`, body)
export const editTagBadge = (id, body) => api.put(`/participants/${id}/badge/tag`, body)

export const getEntranceReport = query => api.get('/participants/badge/entrance-report', query)
export const getBadgeReport = query => api.get('/participants/badge/tags-report', query)
export const getExtractPrePrinted = query => api.get('/participants/badge/extract-pre-printed', query)
export const badgeGenerate = query => api.get('/participants/badge/generate', query)
