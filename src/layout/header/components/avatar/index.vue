<template>
  <el-dropdown>
    <el-avatar :size="40"
               :src="circleUrl"
               shape="square">
    </el-avatar>
    <el-dropdown-menu>
      <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'avatar-component',
  data() {
    return {
      circleUrl: 'https://iconfont.alicdn.com/p/avatar/8N7pZVovdwFv.png'
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dropdown {
  height: 40px;
}
</style>