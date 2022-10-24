<template>
  <div class="backTop">
    <el-backtop target=".backTop"
                :bottom="20"
                :right="20"></el-backtop>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'backTop'
}
</script>

<style lang="scss" scoped>
// backTop 直达父系，必须要有高度且 overflow-x:hidden;
.backTop {
  overflow-x: hidden;
  height: 100%;
}
</style>