import { getMenuList } from '@/api/menuList'
import { getMenuList as getMenu, setMenuList } from '@/utils/sessionStorage'
import router from '@/router'
// import { initDynamicRoutes } from '@/utils/dynamicRoutes'

const state = {
  // 默认展开
  isCollapse: false,
  // menuList
  menuList: getMenu()
}

const mutations = {
  changeCollapse() {
    state.isCollapse = !state.isCollapse
  },
  setMenuList(state, menuList) {
    state.menuList = menuList
  }
}

const actions = {
  getMenuList({ commit }) {
    return new Promise((resolve, reject) => {
      getMenuList()
        .then((res) => {
          // 动态添加路由
          commit('setMenuList', res)
          // 用 sessionStorage 保存起来，防止刷新丢失
          // 切记 webStorage 只能保存字符串 JSON.stringify()
          setMenuList(JSON.stringify(res))
          // initDynamicRoutes()
          router.push('/')
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
