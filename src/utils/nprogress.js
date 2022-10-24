import Nprogress from 'nprogress'
import router from '@/router'
import 'nprogress/nprogress.css' // 引入样式

router.beforeEach((to, from, next) => {
  // 进度条开始
  Nprogress.start()
  next()
})

router.afterEach((to, from, next) => {
  // 进度条结束
  Nprogress.done()
})
