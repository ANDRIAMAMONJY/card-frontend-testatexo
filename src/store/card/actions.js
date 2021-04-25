import { axiosWrapper } from 'src/boot/axios'
import * as api from '../endpoints'

export const allCard = ({ commit }) => {
  return axiosWrapper.get(`${api.GAME}/cards`)
    .then(res => {
      return res
    })
}
export const handCard = ({ commit }, number = 10) => {
  return axiosWrapper.get(`${api.GAME}/hand/${number}`)
    .then(res => {
      return res
    })
}
export const solve = ({ commit }, payload) => {
  return axiosWrapper.post(`${api.GAME}/solve`, payload)
    .then(res => {
      return res
    })
}
export const orderColor = ({ commit }) => {
  return axiosWrapper.get(`${api.ORDER}/colors`)
    .then(res => {
      return res
    })
}
export const orderValue = ({ commit }) => {
  return axiosWrapper.get(`${api.ORDER}/values`)
    .then(res => {
      return res
    })
}
