import { login } from '@/api/login'
import router from '@/router'
// import { getToken, setToken, removeToken } from '@/utils/localStorage'
import { getToken, setToken, removeToken } from '@/utils/sessionStorage'
import store from '@/store'

const state = {
  token: getToken()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then((res) => {
          // const { data } = res
          // 响应拦截器已经对数据进行处理
          // 先使用 vuex 的token
          commit('SET_TOKEN', res.token)
          // vuex 的 token 失效后再用 localstorage 保存的 token
          // 因为 localStorage 的调用非常麻烦，所以尽可能多的使用 vuex
          setToken(res.token)
          store.dispatch('menu/getMenuList')
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  // user logout
  logout({ commit }) {
    commit('SET_TOKEN', '')
    removeToken()
    router.replace('/login')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
