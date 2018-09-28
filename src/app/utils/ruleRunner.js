export const ruleRunner = (field, name, ...validations) => (state) => {
  for (const v of validations) {
    const errorMessageFunc = v(state[field], state)
    if (errorMessageFunc) {
      return { [field]: errorMessageFunc(name) }
    }
  }
  return null
}

export const ruleRunnerImmutable = (field, name, ...validations) => (state) => {
  for (const v of validations) {
    const fields = field.split('.')
    const errorMessageFunc = fields.length > 1 ? v(state.getIn(fields), state) : v(state.get(field), state)
    if (errorMessageFunc) {
      return { [field]: errorMessageFunc(name) }
    }
  }
  return null
}

export const run = (state, runners) => runners.reduce((memo, runner) => Object.assign(memo, runner(state)), {})
