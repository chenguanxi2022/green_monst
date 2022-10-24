import Vue from 'vue'
import router from '@/router'
Vue.directive('has', {
  inserted(el, bindings) {
    // console.log(el)  DOM元素
    // console.log(bindings)  .value 可以获取到定义的值
    let value = bindings.value
    if (router.currentRoute.meta.indexOf(value) === -1) {
      el.parentNode.removeChild(el)
    }
  }
})
