// 对 sessionstorage 进行封装，保存 token 到本地存储 sessionstorage
// 消除魔法字符串（抽出所有相同名字，放在变量里，改的时候只需修改一个地方即可）
const TOKEN = 'token'

// 设置 token 并保存到本地 localstorage
export const setToken = (token) => {
  sessionStorage.setItem(TOKEN, token)
}

// 获取 token
export const getToken = () => {
  return sessionStorage.getItem(TOKEN)
}

// 移除 token
export const removeToken = () => {
  sessionStorage.removeItem(TOKEN)
}

const MENULIST = 'menuList'
// 保存 menuList
export const setMenuList = (menuList) => {
  sessionStorage.setItem(MENULIST, menuList)
}

// 获取 menuList
export const getMenuList = () => {
  // menuList 是一个对象，所有需要转换
  return JSON.parse(sessionStorage.getItem(MENULIST) || '[]')
}
