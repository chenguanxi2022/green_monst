<template>
  <el-container class="app-wrapper">
    <!-- 侧边 menu 菜单 -->
    <el-aside :width="collapse ? '64px' : '200px'" class="aside-container">
      <menu-view />
    </el-aside>
    <el-container class="container">
      <!-- 头部 -->
      <el-header>
        <header-view />
      </el-header>
      <!-- main -->
      <el-main>
        <back-top>
          <!-- tag 页 -->
          <tag v-if="tagShow" />
          <router-view></router-view>
        </back-top>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import menuView from './menu/index.vue'
import headerView from './header/index.vue'
import tag from '@/components/tag/index.vue'
export default {
  name: 'layout-view',
  components: {
    menuView,
    headerView,
    tag
  },
  computed: {
    collapse() {
      return this.$store.getters.collapse
    },
    tagShow() {
      return this.$store.state.settings.tagShow
    }
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
}
</style>
