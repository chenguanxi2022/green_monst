import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import menu from './modules/menu'
import settings from './modules/settings'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    menu,
    settings
  },
  getters
})

export default store
