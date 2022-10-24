<template>
  <div class="tag">
    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      :type="tag.type"
      @click="toHome"
    >
      {{ tag.name }}
    </el-tag>
  </div>
</template>

<script>
export default {
  name: 'tag-component',
  data() {
    return {
      tags: [
        { name: '首页', type: 'warning' },
        { name: '', type: 'success' }
      ]
    }
  },
  watch: {
    $route: {
      handler: function () {
        this.tags[1].name = this.$route.name
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    toHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  padding-top: 10px;
  padding-left: 20px;
  .el-tag:first-child {
    cursor: pointer;
    margin-right: 5px;
  }
}
</style>
