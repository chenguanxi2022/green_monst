// 封装 axios ，基础 URL、timeout、请求拦截器、响应拦截器

import { Message } from 'element-ui'

import store from '@/store'

import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 3000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      // 设置请求头
      config.headers.Authorization = store.getters.token
    }
    return config
  },
  (err) => {
    return Promise.reject(new Error(err))
  }
)
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    const { data, menu } = res.data
    if (menu.status === 200) {
      Message({
        type: 'success',
        center: true,
        message: menu.message,
        duration: 500
      })
      return data
    } else {
      Message({
        type: 'error',
        center: true,
        message: menu.message,
        duration: 1000
      })
      return Promise.reject(new Error(menu.message))
    }
  },
  (err) => {
    Message({
      type: 'error',
      center: true,
      message: err.message,
      duration: 1000
    })
    return Promise.reject(new Error(err))
  }
)

export default service
