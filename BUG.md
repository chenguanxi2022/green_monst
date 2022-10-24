## Green-Monst-Vue2

### 一、所用技术栈

#### 1、前端

1. `vue2`、`vuex`、`vue-router`
2. `axios`
3. `elementUI`组件库
4. `sass`预编译
5. `webStorage`存储

#### 2、后端

1. `express`框架
2. `cors`跨域中间件
3. `JWt`鉴权中间件
4. `body-parse`解析中间件
5. `mysql`连接数据库中间件
6. 关系型数据库`MySQL`8

### 二、实现功能

1. 登陆认证及持久化登陆
2. 路由权限、按钮权限
3. 面包屑、汉堡包、tag页
4. 表单信息的增删查改
5. 全局`backtop`组件封装

### 三、所遇 BUG

##### 1、ElementUI 组件库（版本：2.15.9）

1. 按需引入，报错没有 module `babel-preset-es2015`

  - 原因：旧版本的脚手架用的是 es2015，新版本不再适用，而官网没有及时更新
  - 解决：打开 babel.config.js，将 `es2015` 改成`@babel/preset-env`

2. 日期选择器，报错 placement

  - 原因：源码中将placement添加到了props，但后面又将placement进行了修改
  - 解决：将elementUI降级为2.15.6

3. input 绑定键盘事件无效

  - 原因：封装的 input 并没有监听 keyup 事件的方法
  - 解决办法：@keyup.native

4. 修改样式，::v-deep 深度选择

  - 原因：想修改封装好的颜色和样式，配合Chrome和深度选择器修改
  - 解决：::v-deep

5. button 有封装的防抖，loading 加载

  - this.loading = false / true 

##### 2、登陆页

1. el-input 绑定键盘事件 @keyup 无效
   
  - 解决方法与原因如上

2. password 显示隐藏，input 框失去焦点

  - 原因：svgIcon 点击事件使 input 框失去焦点
  - 解决：ref（实现响应式数据的方法，底层reactive）后，在 $nextTick 中，调用 focus（）
```js
this.$nextTick(() => {
        this.$refs.password.focus()
      })
```
3. axios 请求返回结果，打印输出为 promise
   -原因：axios 是一个基于 promise 的 http 库
   -解决：`async/await`优化，直接 .then()/.catch()

4. display: none 不占位置，只是不显示; visibility: hidden 占位置且不可见

##### 3、layout 页

1. el-menu 默认高亮，浏览器后退、前进都失效（点击menu后将path保存到sessionStorage，再从里面取出来赋值给default-active）

  - 原因：只考虑了点击menu后的path，应该监控 url 的变化
  - 解决：直接 `$route.path` 监控 url 的变化

2. 获取 menuList 应该在 created（）生命周期函数中，此时数据未挂载
  - 先定义一个方法调用 axios 请求，再在其中调用这个方法

##### 4、users 页

1. 使用插槽`slot-scoped="scoped"`提示已经被弃掉，使用`v-slot = "scoped"`

2. 父组件给子组件传参：props、ref
   
   - ref：dialog 组件的 bug

3. 子组件给父组件传参：$emit

##### 5、axios 

  - baseURL、timeout

  - 请求拦截器：请求头加token

  - 响应拦截器：判断token是否过期，对响应数据进行处理

```js
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

```

##### 6、vuex

  - action：可以处理异步、commit
  - mutation：不可以、修改 state 状态
  - state：状态

##### 7、vue-router

  - 声明式路由（router-link）
  - 编程式路由（push、replace）

##### 8、跨域

  - 后端：开启 cors（跨域资源共享）
  - 前端：vue 配置 proxy

```js
devServer: {
    // https: false, // https
    // hotOnly: false, // 热更新
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // changeOrigin: true, // 代理服务器此时会根据请求的 target 地址修改 Host
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
```

##### 9、npm

  - npm：下载慢

1. npm 配置淘宝镜像后，npm i 有时候还是巨慢，特别是拉新的项目，还得删了 node_modules，重新 npm i
2. 同一个项目，安装的时候版本无法保持一致

  - yarn：速度快

1. yarn 是由 Facebook、Google、Exponent 和 Tilde 联合推出的一个 JS 包管理工具，yarn 弥补 npm 的一些缺陷
2. 速度快：并行安装（同步执行所有任务）、离线模式（之前安装过，直接缓存中获取）
3. 安装版本统一
4. 更简洁的输出
5. 多注册来源处理
6. 更好的语义化
   
##### 10、开发环境与生产环境

```js
ENV = 'development'

VUE_APP_BASE_API = '/api'

ENV = 'production'

VUE_APP_BASE_API = '/prod-api'
```

# 1、登陆认证及持久化登陆：

1. 点击 button，diapatch（actions），actions 中通过 promise 调用接口得到 token
2. 将 token 保存在 webStorage 中，然后 commit（mutations）修改 state ，保存在 vuex
3. vuex 存储在内存，读取速度快；storage存储在磁盘，读取慢。两者结合，便于维护和使用。（vuex刷新页面就丢失，所以本地也要存一份实现可持续登陆）
4. 设置路由守卫（首先设置白名单）：有 token，如果去 login 页，直接跳转首页；其他直接 next()。没 token，除了白名单 next()，其他一律 login 页。

# 2、路由权限：

1. 为了防止通过 url 直接非法访问权限页，所以路由应该动态添加。
2. 点击登陆 button 后，调用接口获取的 menuList 保存在 vuex 和 sessionStorage
3. 设置要动态添加的路由，对其进行遍历，再对其遍历后的 children 再次遍历，然后在块级作用域中，对要动态添加的路由进行过滤（name相同），并用一个变量接收。
4. 将接收到的 temp，push 到 currentRoutes[1].children 中
5. 最后，调用 router.addRoute()方法把 currentRoutes[1] 重新覆盖掉（有相同名字直接覆盖）
6. 接下来，你登陆后会发现出现了 bug，直接进入了 404页（因为这个时候没有这个 /users页，无法重定向到这里，直接跳转到 404页）
7. 先添加一个 /welcome 页，先重定向到这个页面，再重定向到 /users页
8. 不过，这个方法还是有小 bug（刷新时候重定向到 /users页）

# 3、按钮权限：

1. 自定义指令，has 加到按钮上，v-has = " 'add' "
2. 通过 bindings.value 获取到所添加的值
3. 添加路由权限时候，通过接口返回的 rights 赋值给 temp 添加原数据 meta
4. 判断 router.currentRoute.meta 中有没有 value，返回 -1，直接 el.parentNode.removeChild(el)
5. el 的父亲删除了 el

# 4、面包屑、汉堡包、tag页

1. 面包屑（默认有首页，可跳转）与 menu 高亮一样，使用 $route 的属性（name 和 path）
2. 将 menu 的 Collapse 放置在 vuex 中，点击汉堡包，对 state 中的状态取反
3. 使用计算属性，return state 中的状态值，动态改变 svgIcon
4. tag页，state 中弄一个数组（默认有首页），menu 点击一次判断数组有没有，没有就添加
5. tag 页遍历这个数组，得到标签，点击标签（传参点击的 path），直接 push（path）
6. 关闭，点击标签 x，直接删除数组中这个 menu

# 5、表单信息的增删改查

1. table 页、分页器，调用接口，获取数据，后端写得好，前端没烦恼
2. dialog 页分成一个子组件，通过 props 父传子，控制其显示隐藏属性
3. 点击新增，数据还是上次的，v-if 这个显示隐藏属性，因为 flase，dom 没有被渲染，不会存在上次数据
4. 点击编辑，父给子通过 refs 调用子组件方法传参 row 的数据，但一直报错，找不到这个方法，因为设置了 v-if，子组件没有被渲染，没有这个方法。
```js
this.$nextTick(() => {
        this.$refs.password.focus()
      })
```
5. 获取当前行的数据，用插槽`v-slot="scoped"` 方法(scoped.row)

# 6、全局 backTop 组件封装

```js
// backTop 直达父系，必须要有高度且 overflow-x:hidden;
.backTop {
  overflow-x: hidden;
  height: 100%;
}
```
- `height` 必须为 100% 或 100vh
- `overflow-x: hidden;`必须有

```html
<div class="backTop">
    <el-backtop target=".backTop"
                :bottom="20"
                :right="20"></el-backtop>
    <slot></slot>
  </div> 
```
- `slot`放置`router-view`
- 注意，要放置的位置

- `Vue.component('backTop',backTop)`全局注册

