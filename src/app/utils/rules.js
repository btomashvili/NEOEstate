import * as ErrorMessages from './errorMessages'

export const required = (text) => {
  if (text) {
    return null
  }
  return ErrorMessages.isRequired
}

export const mustMatch = (field, fieldName) => (text, state) =>
  state.get(field) === text ? null : ErrorMessages.mustMatch(fieldName)

export const minLength = length => text => (text.length >= length ? null : ErrorMessages.minLength(length))

export const invalidEmail = (email) => {
  if (!email) {
    return ErrorMessages.isRequired
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return ErrorMessages.invalidEmail
  }
}

export const isNumber = (value) => {
  if (!value) {
    return ErrorMessages.isRequired
  } else if (isNaN(Number(value))) {
    return ErrorMessages.isNumber
  }
}

export const invalidPhone = (phone) => {
  if (phone === '') {
    return null
  }
  const phoneno = /^\+([0-9]{5,20})$/

  if (!phone.match(parseInt(phone))) {
    return ErrorMessages.invalidPhone
  }
}
