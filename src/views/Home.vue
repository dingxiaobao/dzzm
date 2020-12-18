<template>
  <el-container>
    <el-header>
      <h3>UNI-ADMIN</h3>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="Logout"
      >
        <el-menu-item :index="index" v-for="(item,index) in menus" :key="index">{{item.name}}</el-menu-item>

        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">修改</el-menu-item>
          <el-menu-item index="logout">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside :width="flag?'64px':'200px'">
        <div id="left_top" @click="flag=!flag">|||</div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :collapse="flag"
          :collapse-transition="!flag"
          unique-opened
          router
        >
          <el-menu-item :index="item.url" v-for="(item,index) in submenu" :key="index">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main v-loading="this.$store.state.isLoading">
        <!-- 面包屑 -->
        <BreadMenu />
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import BreadMenu from "../views/BreadMenu";
import nav from "../utils/navMenu"; //导入菜单栏
export default {
  components: { BreadMenu },
  data() {
    return {
      flag: false,
      menus: [], //一级菜单
      submenu: [] //二级菜单
    };
  },
  created() {
    console.log(nav);
    this.menus = nav;
    this.submenu = this.menus[0].children;
  },
  mounted() {
    this.Logout();
  },
  methods: {
    Logout(index) {
      // console.log(index)
      //执行退出
      if (index == "logout")
        this.$axios
          .post("/admin/logout")
          .then(dzz => {
            this.$store.commit("logout");
            this.$router.push("/login");
            this.$message.success("退出成功");
          })
          .catch(error => {
            this.$message.error(error.response.data.msg);
            return false;
          });
      this.submenu = this.menus[index].children;
      console.log(this.submenu);
    }
  }
};
</script>
<style lang="scss" >
.el-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .el-header {
    display: flex;
    font-size: 18px;
    justify-content: space-between;
    width: 100%;
    background: #545c64;
    color: white;
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
    background: #ffffff;
  }
}
</style>