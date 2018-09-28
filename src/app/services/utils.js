/* eslint no-prototype-builtins:0 */
/* eslint no-restricted-syntax:0 */

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
export function checkStatus(response) {
  const { data, status } = response

  if (status >= 200 && status < 300) {
    return Promise.resolve({
      message: data.message,
      data: data.data,
    })
  }

  // console.error('Backend respnse', response)
  // if (status === 404 || status === 400 || status === 403) {

  // }

  // if (data.code !== undefined && data.code !== 'OK' && data.code !== 'CREATED') {
  //   // return { error: {result.data} }
  // }
  const result = {
    message: data.message,
    error: true,
    code: data.code,
  }
  if (data.data && data.data.message) {
    result.message = data.data.message
  }
  return Promise.resolve(result)
}

function serialize(obj, prefix) {
  const str = []
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? `${prefix}[${p}]` : p
      const v = obj[p]
      str.push(
        v !== null && typeof v === 'object' ? serialize(v, k) : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
      )
    }
  }
  return str.join('&')
}

export function urlWithParams(urlString, params = {}) {
  const url = urlString
  const query = serialize(params)
  return `${url}?${query}`
}

// export function* addParticipantSaga(action) {
//   try {
//     const { error, message, data } = yield call(
//       userApi.createUser,
//       action.payload
//     )
//     if (error) {
//       yield put(actions.addParticipantFailure(message))
//     } else {
//       yield put(actions.addParticipantSuccess(data))
//       yield put(openForm('addParticipantModalVisible', false))
//       yield put(showSnackbar('User succesfully added'))
//     }
//   } catch (error) {
//     helper.logger(error, 'userSagas.addParticipantSaga')
//   }
// }

// export function* editUserSaga(action) {
//   try {
//     const { error, message, data } = yield call(
//       userApi.editUser,
//       action.id,
//       action.body
//     )
//     if (error) {
//       yield put(actions.editUserFailure(message))
//     } else {
//       yield put(actions.editUserSuccess(data))
//       yield put(showSnackbar('User succesfully updated'))
//     }
//   } catch (error) {
//     helper.logger(error, 'userSagas.editUserSaga')
//   }
// }
