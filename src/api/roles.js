import request from '@/utils/request'

// 获取角色
export const getRoles = (params) => {
  return request({
    url: '/roles',
    method: 'GET',
    params
  })
}

// 添加角色
export const addRole = (data) => {
  return request({
    url: '/roles',
    method: 'POST',
    data
  })
}

// 查询角色
// export const searchRoles = (name) => {
//   return request({
//     url: `/roles/${name}`,
//     method: 'GET'
//   })
// }

// 编辑角色
export const editRole = (data) => {
  return request({
    url: '/roles',
    method: 'PUT',
    data
  })
}

// 删除用户
export const deleteRole = (id) => {
  return request({
    url: `/roles/${id}`,
    method: 'DELETE'
  })
}
