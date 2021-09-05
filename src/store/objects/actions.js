import axios from 'axios'
// import { Notify } from 'quasar'

const host = `${process.env.VUE_APP_SERVER_PROTOCOL}://${process.env.VUE_APP_SERVER_ADDRESS}`
const contextAddress = process.env.VUE_APP_CONTEXT
console.log('the app context:')
console.log(contextAddress)

export function loadObject ({ context, commit }, data) {
  const endpoint = `${host}/object/${data.value}`
  console.log(data)
  return new Promise(function (resolve, reject) {
    return axios.get(endpoint)
      .then((response) => {
        // console.log(response.data)
        commit('update_base' + data.interpretation.replace('/', '_'), response.data)
        console.log('updated the base')
        console.log(response.data)
        resolve(response.data)
      })
      .catch((err) => {
        console.log(err)
        reject()
      })
  })
}

export function proveObject ({ commit }, data) {
  const endpoint = `${host}/prove/${data}`
  return axios.get(endpoint)
    .then((response) => {
      console.log(response.data)
      commit('setObjectProved', response.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export function createObject ({ context, commit }, data) {
  console.log(data)
  const endpoint = `${host}/object/${data.interpretation}/create`
  console.log(endpoint)
  return axios.put(endpoint, data.payload)
    .then((response) => {
      console.log(response)
      console.log('successfully created object')
      commit('updateContext', response.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export function loadContext ({ context, commit }) {
  return new Promise(function (resolve, reject) {
    axios.get(`${host}/context/${contextAddress}`)
      .then((response) => {
        console.log(response.data)
        commit('updateContext', response.data)
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function isUnrivalObject ({ context, commit }, address) {
  return new Promise(function (resolve, reject) {
    axios.get(`${host}/${address.join('/')}`)
      .then((response) => {
        console.log(response)
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}
