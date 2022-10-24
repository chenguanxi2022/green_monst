<template>
  <div class="navBar">
    <!-- 左侧 -->
    <div class="navBar-left">
      <!-- 汉堡包 -->
      <hamburger />
      <!-- 面包屑 -->
      <bread-crumb />
    </div>
    <!-- 右侧 -->
    <div class="navBar-right">
      <!-- screenFull -->
      <screen-full />
      <!-- 头像 -->
      <avatar />
    </div>
  </div>
</template>

<script>
import hamburger from './components/hamburger/index.vue'
import breadCrumb from './components/breadCrumb/index.vue'
import avatar from './components/avatar/index.vue'
import screenFull from './components/screenFull/index.vue'
export default {
  name: 'header-view',
  components: {
    hamburger, breadCrumb, avatar, screenFull
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  display: flex;
  justify-content: space-between;
  height: 56px;
  line-height: 56px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  padding: 0 16px;
  &-right {
    display: flex;
    align-items: center;
  }
}
</style>