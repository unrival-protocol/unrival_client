import axios from 'axios'

const host = `${process.env.VUE_APP_SERVER_PROTOCOL}://${process.env.VUE_APP_SERVER_ADDRESS}`
const universeAddress = process.env.VUE_APP_UNIVERSE

export function loadObject ({ context, commit }, data) {
  const endpoint = `${host}/object/${data.namespace}/${data.address}`
  console.log(endpoint)
  return axios.get(endpoint)
    .then((response) => {
      // console.log(response.data)
      commit('updateBaseObject', response.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export function proveObject ({ commit }, data) {
  const endpoint = `${host}/object/${data.namespace}/${data.address}/prove`
  return axios.get(endpoint)
    .then((response) => {
      // console.log(response.data)
      commit('setObjectProved', response.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export function createObject ({ context, commit }, data) {
  console.log(data)
  const endpoint = `${host}/object/${data.namespace}/create`
  console.log(endpoint)
  return axios.put(endpoint, data.payload)
    .then((response) => {
      console.log(response)
      console.log('successfully created object')
      commit('updateUniverse', response.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export function loadUniverse ({ context, commit }) {
  return new Promise(function (resolve, reject) {
    axios.get(`${host}/object/universe/${universeAddress}`)
      .then((response) => {
        commit('updateUniverse', JSON.parse(response.data))
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function isUnrivalObject ({ context, commit }, address) {
  return new Promise(function (resolve, reject) {
    axios.get(`${host}/utility/read_object/${address}`)
      .then((response) => {
        console.log(response)
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}
