import { put, call } from 'redux-saga/effects'
// import { IntlActions } from 'react-redux-multilingual'
import { browserHistory } from 'react-router'
import * as actions from './actions/currentUserActions'
import * as userApi from '../../services/userService'
import auth from '../../services/authentication'
import { showSnackbar } from '../common/actions/commonActions'
// import { putUserDataInWizard } from '../wizard/actions/wizardActions'
import * as helper from '../../services/helperService'
import { roles } from '../../utils/permission'

export function* signUpSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.signUp, action.payload)
    if (error) {
      yield put(actions.signUpFailure(message))
    } else {
      console.log('SignUp Success =>>>', data)
      yield put(actions.signUpSuccess(data))
    }
  } catch (error) {
    helper.logger(error, 'currentUserSagas.addUserSaga')
  }
}

export function* authSagas(action) {
  try {
    const { error, message, data } = yield call(userApi.signIn, action.payload)
    if (error) {
      yield put(actions.loginFailure(message))
    } else {
      const { user, access_token: token } = data
      const userData = {
        id: user.id,
        role: user.role,
      }
      auth.authentication(token, userData)
      yield put(actions.loginSuccess(user))
      if (user.role !== roles.admin && user.role !== roles.superAdmin) {
        // yield put(putUserDataInWizard(user))
      }
    }
  } catch (error) {
    helper.logger(error, 'currentUserSagas.authSagas')
  }
}

export function* userFetchSagas() {
  try {
    const { error, message, data } = yield call(userApi.fetchUser)
    if (error) {
      yield put(actions.fetchUserFailure(message))
      if (message === 'Missing or invalid authentication token') {
        auth.clear()
        browserHistory.push('/login')
      }
    } else {
      const userData = {
        id: data.id,
        role: data.role,
      }
      auth.setUser(userData)
      // yield put(IntlActions.setLocale(language))
      yield put(actions.fetchUserSuccess(data))
      if (data.role !== roles.admin && data.role !== roles.superAdmin) {
        // yield put(putUserDataInWizard(data))
      }
    }
  } catch (error) {
    helper.logger(error, 'currentUserSagas.userFetchSagas')
  }
}

export function* userLogout(user) {
  try {
    const data = yield call(auth.logout, user)
    yield put(actions.logoutSuccess(data))
  } catch (error) {
    yield put(actions.logoutFailure(error))
  }
}

export function* updateUserProfile(action) {
  try {
    const { error, message, data } = yield call(userApi.updateUserProfile, action.payload)
    if (error === null) {
      yield put(actions.userUpdateFailure(message))
    } else {
      yield put(actions.userUpdateSuccess(data))
      yield put(showSnackbar('Profile succesfully updated'))
    }
  } catch (error) {
    helper.logger(error, 'currentUserSagas.updateUserProfile')
  }
}

export function* userCompleteProfileSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.updateUserProfile, action.payload)
    if (error === null) {
      yield put(actions.userCompleteProfileFailure(message))
    } else {
      yield put(actions.userCompleteProfileSuccess(data))
      yield put(showSnackbar('Profile succesfully updated'))
    }
  } catch (error) {
    helper.logger(error, 'currentUserSagas.userCompleteProfileSaga')
  }
}

export function* uploadUserAvatarSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.uploadAvatar, action.payload)
    if (error) {
      yield put(actions.uploadUserAvatarFailure(message))
    } else {
      yield put(actions.uploadUserAvatarSuccess(data))
      yield put(actions.fetchUserRequest(data))
      yield put(showSnackbar('Avatar succesfully updated'))
    }
  } catch (error) {
    helper.logger(error, 'currentUserSagas.uploadUserAvatarSaga')
  }
}

export function* changePasswordSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.changePassword, action.payload)
    if (error) {
      yield put(actions.changePasswordFailure(message))
      yield put(showSnackbar(message, 'error'))
    } else {
      yield put(actions.changePasswordSuccess(data))
      yield put(showSnackbar('Password succesfully changed'))
    }
  } catch (error) {
    helper.logger(error, 'currentUserSagas.changePasswordSaga')
  }
}

export function* resetPasswordSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.resetPassword, action.payload)
    if (error) {
      yield put(actions.resetPasswordFailure(message))
      if (message === 'The email doesn’t match any account or not active.') {
        yield put(showSnackbar('The email doesn’t match any account or not active.', 'error'))
      }
    } else {
      yield put(actions.resetPasswordSuccess(data))
      yield put(showSnackbar('request reset password succesfully sent'))
    }
  } catch (error) {
    helper.logger(error, 'currentUserSagas.resetPasswordSaga')
  }
}

export function* resetPasswordTokenSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.resetPasswordToken, action.payload)
    if (error) {
      yield put(actions.resetPasswordTokenFailure(message))
      if (message === 'User not found or password reset token expired!') {
        yield put(showSnackbar('User not found or password reset token expired!', 'error'))
      } else if (message === 'token or password invalid!') {
        yield put(showSnackbar('token or password invalid!', 'error'))
      }
    } else {
      yield put(actions.resetPasswordTokenSuccess(data))
      yield put(showSnackbar('Password succesfully changed!'))
    }
  } catch (error) {
    helper.logger(error, 'currentUserSagas.resetPasswordTokenSaga')
  }
}

export function* activeUserSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.activeUser, action.payload)
    if (error) {
      yield put(actions.activeUserFailure(message))
      yield put(showSnackbar('Activation token is expired or invalid!', 'error'))
    } else {
      yield put(actions.activeUserSuccess(data))
      yield put(showSnackbar('Email succesfully cofirmed!'))
    }
  } catch (error) {
    helper.logger(error, 'currentUserSagas.activeUserSaga')
  }
}
