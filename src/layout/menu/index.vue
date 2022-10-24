<template>
  <!-- 侧边菜单 menu -->
  <el-menu
    :default-active="$route.path"
    background-color="#f0f9eb"
    text-color="#909399"
    active-text-color="#000000"
    unique-opened
    router
    :collapse="isCollapse"
    :collapse-transition="false"
  >
    <!-- logo -->
    <logo v-if="logoShow" />
    <!-- 一级路由 -->
    <el-submenu :index="item.id" v-for="item in menuList" :key="item.id">
      <template slot="title">
        <!-- 阿里 icon -->
        <svg class="icon prefix" aria-hidden="true">
          <use :xlink:href="`#icon-${item.icon}`"></use>
        </svg>
        <span>{{ item.authName }}</span>
      </template>
      <!-- 二级路由 -->
      <el-menu-item-group>
        <el-menu-item
          :index="it.path"
          v-for="it in item.children"
          :key="it.path"
          class="strong"
        >
          <!-- 阿里 icon -->
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="`#icon-${it.icon}`"></use>
          </svg>
          {{ it.authName }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import logo from '@/components/logo/index.vue'
export default {
  name: 'menu-view',
  components: {
    logo
  },
  data() {
    return {
      // 左侧菜单权限
      menuList: []
    }
  },
  computed: {
    isCollapse() {
      return this.$store.getters.collapse
    },
    logoShow() {
      return this.$store.state.settings.logoShow
    }
  },
  methods: {
    initMenuList() {
      this.menuList = this.$store.getters.menuList
    }
  },
  // 生命周期钩子 created() 未挂载哦，要记得
  created() {
    this.initMenuList()
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: 0;
  height: 100%;
  .prefix {
    margin-right: 5px;
    vertical-align: middle;
  }
  .icon {
    width: 16px;
    height: 16px;
  }
  .strong {
    font-weight: 600;
  }
}
</style>
