import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import '@/utils/nprogress' // nprogress
import '@/plugins/element.js' // element
import './utils/permission' // permission
import '@/utils/globalComponent' // global component

import '@/styles/index.scss' // global scss

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
