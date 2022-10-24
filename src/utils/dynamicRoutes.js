import store from '@/store'
import router from '@/router'

// 动态添加路由
// 预备的路由
const dynamicRoutes = [
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

// 动态添加路由
export const initDynamicRoutes = () => {
  const currentRoutes = router.options.routes
  const menuList = store.getters.menuList
  menuList.forEach((item) => {
    // 一级路由
    // console.log(item)
    item.children.forEach((it) => {
      // 二级路由
      // console.log(it)
      // 过滤 dynamicRoutes
      const temp = dynamicRoutes.filter((item) => item.name === it.authName)[0]
      // console.log(router)
      // console.log(temp)
      // console.log(currentRoutes[1].children)
      temp.menu = it.rights
      currentRoutes[1].children.push(temp)
    })
  })
  // addRoutes 被删，只能 addRoute 一条一条的写入
  router.addRoute(currentRoutes[1])
}
