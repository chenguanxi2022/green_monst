import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: '登陆',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    name: '首页',
    component: () => import('@/layout'),
    redirect: '/users',
    children: [
      // {
      //   path: 'welcome',
      //   name: '欢迎光临',
      //   component: () => import('@/views/welcome')
      // }
      {
        path: 'users',
        name: '用户列表',
        component: () => import('@/views/users')
      },
      {
        path: 'books',
        name: '图书列表',
        component: () => import('@/views/books')
      },
      {
        path: 'rights',
        name: '权限列表',
        component: () => import('@/views/rights')
      }
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/404/index')
  },
  // 错误页 404 必须放置在最后
  {
    path: '*',
    redirect: '/404'
  }
]

// 重复点击 router 报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
