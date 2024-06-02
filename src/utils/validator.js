export default {
  required (value) {
    return !!value
  },
  minLength (value, par) {
    return value.length >= par
  },
  maxLength (value, par) {
    return value.length <= par
  },
  greaterThen (value, par) {
    return !isNaN(value) && (+ value > par)
  },
  lessThen (value, par) {
    return !isNaN(value) && (+ value < par)
  },
  isPast (value, par) {
    const dt = new Date(value)
    const today = new Date()
    return today.getTime() > dt.getTime()
  }
}

// validator.required(value)
// const value = 'ahoj'

// const criterions = ['required', 'minLength', 'maxLength']

// criterions.forEach(criterion => {
//   validator[criterion](value)
// })

