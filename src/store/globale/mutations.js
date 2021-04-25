import * as api from '../store-endpoints'
const mutations = {
  [api.SETTOKEN] (state, value) {
    state.token = value
  },
  [api.SET_VENTE_JOUR] (state, value) {
    state.venteJour = value
  }
}

export default mutations
