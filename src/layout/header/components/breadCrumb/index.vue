<template>
  <el-breadcrumb separator-class="el-icon-arrow-right"
                 class="breadCrumb">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'breadCrumb-component',
}
</script>

<style lang="scss" scoped>
.breadCrumb {
  display: inline-block;
  margin-left: 20px;
  font-size: 15px;
}
::v-deep {
  .is-link:hover {
    color: #e6a23c;
  }
}
</style>