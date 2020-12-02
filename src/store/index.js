import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navIsActive: false,
    token: ""
  },
  mutations: {
    updateNavIsActive(state, blooen) {
      state.navIsActive = blooen
    }
  },
  actions: {
  },
  modules: {
  }
})
