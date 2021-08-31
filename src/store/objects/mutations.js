
export function updateBaseObject (state, val) {
  state.baseObject = val
}

export function updateContext (state, val) {
  state.interpretations = val
}

export function setInterpretation (state, val) {
  state.baseInterpretation = val
}

export function setAddress (state, val) {
  state.baseAddress = val
}

export function setObjectProved (state, val) {
  state.baseProofSucceeded = val
}
