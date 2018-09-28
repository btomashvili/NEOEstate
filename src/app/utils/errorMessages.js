export const isRequired = () => 'You must enter a value'

export const isNumber = () => 'Must be a number'

export const invalidEmail = () => 'Invalid email address'

export const invalidPhone = () => 'Invalid phone number'

export const mustMatch = otherFieldName => fieldName => `${fieldName} must match ${otherFieldName}`

export const minLength = length => fieldName => `${fieldName} must be at least ${length} characters`
