import * as storeEndpoint from '../store-endpoints'

export const setToken = ({ commit }, value) => {
  commit(storeEndpoint.SETTOKEN, value)
}
export const setVenteJour = ({ commit }, value) => {
  commit(storeEndpoint.SET_VENTE_JOUR, value)
}
