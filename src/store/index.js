import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navIsActive:false
  },
  mutations: {
    updateNavIsActive(state,blooen){
      state.navIsActive = blooen
    }
  },
  actions: {
  },
  modules: {
  }
})
