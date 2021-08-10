
export function updateBaseObject (state, val) {
  state.baseObject = val
}

export function updateUniverse (state, val) {
  state.namespaces = val
}

export function setNamespace (state, val) {
  state.baseNamespace = val
}

export function setAddress (state, val) {
  state.baseAddress = val
}

export function setObjectProved (state, val) {
  state.baseProofSucceeded = val
}
