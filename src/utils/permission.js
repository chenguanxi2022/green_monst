import router from '@/router'

import store from '@/store'

// 白名单
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  // console.log(to.path)
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
