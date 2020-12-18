<template>
  <div class="bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">后台首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in this.$store.state.bread" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<style lang="scss">
.bread {
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>