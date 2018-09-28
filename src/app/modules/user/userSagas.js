import { put, call } from 'redux-saga/effects'
import * as actions from './actions/userActions'
import * as userApi from '../../services/userService'
import * as helper from '../../services/helperService'
import { showSnackbar, openForm } from '../common/actions/commonActions'

export function* addUserSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.createUser, action.payload)
    if (error) {
      yield put(actions.addUserFailure(message))
    } else {
      yield put(actions.addUserSuccess(data))
      yield put(openForm('addUserModalVisible', false))
      yield put(showSnackbar('User succesfully added'))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.addUserSaga')
  }
}

export function* editUserSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.editUser, action.id, action.body)
    if (error) {
      yield put(actions.editUserFailure(message))
    } else {
      yield put(actions.editUserSuccess(data))
      yield put(showSnackbar('Remaining walkthrus succesfully updated'))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.editUserSaga')
  }
}

export function* deleteUserSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.deleteUser, action.payload)
    if (error) {
      yield put(actions.deleteUserFailure(message))
    } else {
      yield put(actions.deleteUserSuccess(data))
      yield put(showSnackbar(`User${action.payload.length > 1 ? 's' : ''} succesfully deleted`))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.deleteUserSaga')
  }
}

export function* userListSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.getUserList, action.payload)
    if (error) {
      yield put(actions.userListFailure(message))
    } else {
      yield put(actions.userListSuccess(data))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.userListSaga')
  }
}

export function* viewUserSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.getUserById, action.id, action.query)
    if (error) {
      yield put(actions.viewUserFailure(message))
    } else {
      yield put(actions.viewUserSuccess(data))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.viewUserSaga')
  }
}

export function* inviteUserSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.inviteUser, action.payload)
    if (error) {
      yield put(actions.inviteUserFailure(message))
    } else {
      yield put(actions.inviteUserSuccess(data))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.inviteUserSaga')
  }
}

export function* userLookupListSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.getUserList, action.payload)
    if (error) {
      yield put(actions.userLookupListFailure(message))
    } else {
      yield put(actions.userLookupListSuccess(data))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.userLookupListSaga')
  }
}

// UPLOAD COMPANY LOGO
export function* uploadUserAvatarSaga(action) {
  try {
    const { error, message, data } = yield call(
      helper.uploadLogo,
      action.file
      // action.userID,
      // action.data
    )
    console.log('uploadAvatarSagas =>>', { error, message, data })
    if (error) {
      yield put(actions.uploadUserAvatarFailure(message))
    } else {
      yield put(actions.uploadUserAvatarSuccess(action.userID, data))
      yield put(showSnackbar('Avatar succesfully updated'))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.uploadUserAvatarSaga')
  }
}

export function* uploadUserPassportSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.uploadPassportById, action.userID, action.data)
    if (error) {
      yield put(actions.uploadUserPassportFailure(message))
    } else {
      yield put(actions.uploadUserPassportSuccess(action.userID, data))
      yield put(showSnackbar('Passport succesfully updated'))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.uploadUserPassportSaga')
  }
}

export function* fieldDistinctListSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.getUserList, action.payload)
    if (error) {
      yield put(actions.fieldDistinctListFailure(message))
    } else {
      yield put(actions.fieldDistinctListSuccess(action.payload.distinct, data))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.fieldDistinctListSaga')
  }
}

export function* getAdminListSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.getAdminList, action.payload)
    if (error) {
      yield put(actions.getAdminListFailure(message))
    } else {
      yield put(actions.getAdminListSuccess(data))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.getAdminListSaga')
  }
}

export function* addAdminSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.addAdmin, action.payload)
    if (error) {
      yield put(actions.addAdminFailure(message))
    } else {
      yield put(actions.addAdminSuccess(data))
      yield put(showSnackbar('User succesfully added'))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.addAdminSaga')
  }
}

export function* getParticipantListSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.getParticipantList, action.payload)
    if (error) {
      yield put(actions.getParticipantListFailure(message))
    } else {
      yield put(actions.getParticipantListSuccess(data))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.getParticipantListSaga')
  }
}

export function* viewParticipantSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.getParticipantById, action.id, action.query)
    if (error) {
      yield put(actions.viewParticipantFailure(message))
    } else {
      yield put(actions.viewParticipantSuccess(data))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.viewParticipantSaga')
  }
}

export function* addParticipantSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.addParticipant, action.payload)

    let upload = false

    if (action.actionType !== null) {
      if (action.actionType.type !== 'undefined') {
        if (action.actionType.type === 'UPLOAD') {
          upload = yield call(userApi.uploadPassportById, data.id, action.actionType.passport)

          if (upload.error) {
            yield put(actions.uploadUserPassportFailure(upload.message))
            yield put(showSnackbar(upload.message, 'error'))
          } else {
            yield put(actions.uploadUserPassportSuccess(upload.data))
          }
        }
      }
    }

    if (error || upload.error) {
      yield put(actions.addParticipantFailure(message))
    } else {
      yield put(actions.addParticipantSuccess(data))
      yield put(showSnackbar('User succesfully added'))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.addParticipantSaga')
  }
}

export function* editParticipantSaga(action) {
  try {
    let upload = false
    // if action types is not null
    if (action.actionType !== null) {
      if (action.actionType === 'SUBMIT') {
        yield call(userApi.submitParticipant, action.id, action.body)
        //  console.log('SUBMIT :', submit, action.id)
        // TODO catch if submitparticipant has error
        yield put(actions.submitParticipantSuccess())
        yield put(showSnackbar('Participant submit send'))
      }
      if (action.actionType === 'APPROVED') {
        yield call(userApi.approveParticipant, action.id)
        // TODO catch error
        // yield put(actions.approveParticipantSuccess())
        yield put(showSnackbar('Participant approved'))
      }
      if (action.actionType === 'REJECTED') {
        yield call(userApi.rejectParticipant, action.id)
        // TODO catch error
        // yield put(actions.approveParticipantSuccess(approved))
        yield put(showSnackbar('Participant rejected'))
      }

      if (typeof action.actionType.type !== 'undefined') {
        if (action.actionType.type === 'UPLOAD') {
          upload = yield call(userApi.uploadPassportById, action.id, action.actionType.passport)

          if (upload.error) {
            yield put(actions.uploadUserPassportFailure(upload.message))
            return yield put(showSnackbar(upload.message, 'error'))
          }
          // TODO catch if submitparticipant has error
          yield put(actions.uploadUserPassportSuccess(upload.data))
          // yield put(showSnackbar('Participant submit send'))
        } else if (action.actionType.type === 'UPLOAD_TRAVEL') {
          upload = yield call(userApi.uploadTravelDocById, action.id, action.actionType.travelDocument)

          if (upload.error) {
            yield put(actions.uploadTravelDocFailure(upload.message))
            yield put(showSnackbar(upload.message, 'error'))
          } else {
            yield put(actions.confirmParticipationRequest(action.id))
            yield put(actions.uploadTravelDocSuccess(upload.data))
          }
        }

        if (action.actionType.type === 'UPLOAD' || action.actionType.type === 'UPLOAD_TRAVEL') {
          if (upload.error) {
            yield put(actions.editParticipantFailure(upload.message))
          } else {
            if (action.actionType.type === 'UPLOAD') {
              action.body.personalData.copyOfPassport = upload.data.filename
            } else if (action.actionType.type === 'UPLOAD_TRAVEL') {
              action.body.travelDetails.travelDocumentUpload = upload.data.filename
            }
            const { error, message, data } = yield call(userApi.editParticipant, action.id, action.body)
            if (error) {
              yield put(actions.editParticipantFailure(message))
            } else {
              yield put(actions.editParticipantSuccess(data, action.isAdminRequest))
              yield put(showSnackbar('Participant succesfully updated'))
            }
          }
        }
      } else {
        const { error, message, data } = yield call(userApi.editParticipant, action.id, action.body)
        if (error) {
          yield put(actions.editParticipantFailure(message))
        } else {
          yield put(actions.editParticipantSuccess(data, action.isAdminRequest))
          yield put(showSnackbar('Participant succesfully updated'))
        }
      }
    } else {
      const { error, message, data } = yield call(userApi.editParticipant, action.id, action.body)
      if (error) {
        yield put(actions.editParticipantFailure(message))
      } else {
        yield put(actions.editParticipantSuccess(data, action.isAdminRequest))
        yield put(showSnackbar('Participant succesfully updated'))
      }
    }
  } catch (error) {
    yield put(actions.editParticipantFailure(error))
    helper.logger(error, 'userSagas.editParticipantSaga')
  }
}

export function* submitParticipantSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.submitParticipant, action.id, action.body)
    if (error) {
      yield put(actions.submitParticipantFailure(message))
    } else {
      yield put(actions.submitParticipantSuccess(data))
      yield put(showSnackbar('Participant succesfully submitted'))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.submitParticipantSaga')
  }
}

export function* approveParticipantSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.approveParticipant, action.id, action.body)
    if (error) {
      yield put(actions.approveParticipantFailure(message))
    } else {
      // yield put(actions.confirmParticipationRequest(action.id))
      yield put(actions.approveParticipantSuccess(data))
      yield put(showSnackbar('Participant succesfully approved'))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.approveParticipantSaga')
  }
}

export function* rejectParticipantSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.rejectParticipant, action.id, action.body)
    if (error) {
      yield put(actions.rejectParticipantFailure(message))
    } else {
      yield put(actions.rejectParticipantSuccess(data))
      yield put(showSnackbar('Participant succesfully rejected'))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.rejectParticipantSaga')
  }
}

export function* confirmParticipationSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.confirmParticipation, action.userId)
    if (error) {
      yield put(actions.confirmParticipationFailure(message))
      yield put(showSnackbar('Sorry. Something went wrong.'))
    } else {
      yield put(actions.confirmParticipationSuccess(data))
      yield put(showSnackbar('Your participation successfuly confirmed'))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.uploadUserAvatarSaga')
  }
}

export function* getReportingDataSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.getReportingData, action.payload)
    if (error) {
      yield put(actions.getReportingDataFailure(message))
    } else {
      yield put(actions.getReportingDataSuccess(data, action.payload))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.getAdminListSaga')
  }
}

export function* editPrePrintedBadgeSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.editPrePrintedBadge, action.id, action.body)
    if (error) {
      yield put(actions.editPrePrintedBadgeFailure(message))
    } else {
      yield put(actions.editPrePrintedBadgeSuccess(data))
      yield put(showSnackbar('Participant succesfully submitted'))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.editPrePrintedBadgeSaga')
  }
}
export function* editActiveBlockBadgeSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.editActiveBlockBadge, action.id, action.body)
    if (error) {
      yield put(actions.editActiveBlockBadgeFailure(message))
    } else {
      yield put(actions.editActiveBlockBadgeSuccess(data))
      yield put(showSnackbar('Participant badge succesfully active'))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.editActiveBlockBadgeSaga')
  }
}

export function* editTagBadgeSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.editTagBadge, action.id, action.body)
    if (error) {
      yield put(actions.editTagBadgeFailure(message))
    } else {
      yield put(actions.editTagBadgeSuccess(data))
      yield put(showSnackbar("Participant's tag succesfully updated"))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.editTagBadgeSaga')
  }
}

export function* getEntranceReportSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.getEntranceReport, action.payload)
    if (error) {
      yield put(actions.getEntranceReportFailure(message))
    } else {
      yield put(actions.getEntranceReportSuccess(data, action.payload))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.getEntranceReportSaga')
  }
}

export function* getBadgeReportSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.getBadgeReport, action.payload)
    if (error) {
      yield put(actions.getBadgeReportFailure(message))
    } else {
      yield put(actions.getBadgeReportSuccess(data, action.payload))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.getBadgeReportSaga')
  }
}

export function* getExtractPrePrintedSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.getExtractPrePrinted, action.payload)
    if (error) {
      yield put(actions.getExtractPrePrintedFailure(message))
    } else {
      yield put(actions.getExtractPrePrintedSuccess(data, action.payload))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.getExtractPrePrintedSaga')
  }
}

export function* badgeGenerateSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.badgeGenerate, action.payload)
    if (error) {
      yield put(actions.badgeGenerateFailure(message))
    } else {
      yield put(actions.badgeGenerateSuccess(data, action.payload))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.badgeGenerateSaga')
  }
}

export function* getEntrancesSaga(action) {
  try {
    const { error, message, data } = yield call(userApi.getParticipantList, action.payload)
    if (error) {
      yield put(actions.getEntrancesFailure(message))
    } else {
      yield put(actions.getEntrancesSuccess(data))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.getEntrancesListSaga')
  }
}

export function* bulkActiveBlockBadgeSaga(action) {
  try {
    console.log(action.payload)
    // const { error, message, data } = yield call(userApi.editActiveBlockBadge, action.id, action.body)
    const result = yield call(() =>
      Promise.all(action.payload.ids.map(id => userApi.editActiveBlockBadge(id, action.payload.body)))
    )
    const { error, message, data } = result[0]

    if (error) {
      yield put(actions.editActiveBlockBadgeFailure(message))
    } else {
      yield put(actions.editActiveBlockBadgeSuccess(data))
      yield put(showSnackbar('Participant badge succesfully active'))
    }
  } catch (error) {
    helper.logger(error, 'userSagas.bulkActiveBlockBadgeSaga')
  }
}
