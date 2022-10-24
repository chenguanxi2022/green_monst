<template>
  <div class="logo">
    <span>
      <el-avatar :size="50" :src="circleUrl"></el-avatar>
    </span>
    <div class="title">
      <h3>Green Monst</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'logon-component',
  data() {
    return {
      circleUrl: 'https://iconfont.alicdn.com/p/avatar/1LbdTt8cxPmI.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  width: 200px;
  height: 56px;
  background-color: #ffffff;
  cursor: pointer;
  span {
    padding: 3px 0px 0px 8px;
  }
  .title {
    padding-left: 8px;
    color: #67c23a;
    font-size: 17px;
    font-weight: 700;
    white-space: nowrap;
  }
}
</style>
