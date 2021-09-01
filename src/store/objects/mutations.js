/* eslint-disable camelcase */

export function update_base_object (state, val) {
  state.baseObject = val
}

export function update_base_action (state, val) {
  state.baseAction = val
}

export function update_base_interface (state, val) {
  state.baseInterface = val
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
