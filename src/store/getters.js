const getters = {
  token: (state) => state.user.token,
  collapse: (state) => state.menu.isCollapse,
  menuList: (state) => state.menu.menuList
}

export default getters
