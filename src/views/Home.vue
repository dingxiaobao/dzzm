<template>
  <el-container>
    <el-header>
      <h3>UNI-ADMIN</h3>
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1" @click="Logout">退出</el-menu-item>
          <el-menu-item index="2-2">修改</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">消息中心</el-menu-item>
        <el-menu-item index="4">订单管理</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside :width="flag?'64px':'200px'">
        <div id="left_top" @click="flag=!flag">|||</div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :collapse="flag"
          unique-opened
          :collapse-transition="!flag"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="/index">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      flag: false
    };
  },
  methods: {
    Logout() {
      this.$axios.post("/admin/logout").then(dzz => {
        // console.log(dzz.data);
        this.$store.commit("logout");
        this.$router.push("/login");
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .el-header {
    display: flex;
    font-size: 18px;
    justify-content: space-between;
    width: 100%;
    background: #dddddd;
    align-items: center;
  }
  .el-aside {
    width: 200px;
    #left_top {
      text-align: center;
      font-size: 18px;
      margin: 2px;
      border-bottom: #ddd 1px solid;
    }
  }
  .el-main {
    width: 100%;
    background: #ccc;
  }
}
</style>