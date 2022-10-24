<template>
  <svg class="icon"
       aria-hidden="true"
       @click="handleFullScreen">
    <use :xlink:href=" icon ? '#icon-fullscreen-exit' : '#icon-fullscreen'"></use>
  </svg>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'screen-full',
  data() {
    return {
      icon: screenfull.isFullscreen
    }
  },
  methods: {
    handleFullScreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      } else {
        this.$message({
          type: 'error',
          center: true,
          message: '您的浏览器不支持全屏'
        })
      }
    },
    changeIcon() {
      this.icon = screenfull.isFullscreen
    }
  },
  mounted() {
    screenfull.on('change', this.changeIcon)
  },
  beforeDestroy() {
    screenfull.off('change')
  }
}
</script>

<style lang="scss" scoped>
.icon {
  width: 32px;
  height: 32px;
  margin-right: 20px;
}
</style>