// 对 localstorage 进行封装，保存 token 到本地存储 localstorage

// 消除魔法字符串（抽出所有相同名字，放在变量里，改的时候只需修改一个地方即可）
const TOKEN = 'token'

// 设置 token 并保存到本地 localstorage
export const setToken = (token) => {
  localStorage.setItem(TOKEN, token)
}

// 获取 token
export const getToken = () => {
  return localStorage.getItem(TOKEN)
}

// 移除 token
export const removeToken = () => {
  localStorage.removeItem(TOKEN)
}
