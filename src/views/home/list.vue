<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="14">
          <el-button type="success">添加用户</el-button>
        </el-col>
        <el-col :span="5">
          <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="info">搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary">高级搜索</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="userlist" border style="width: 100%">
        <el-table-column prop="username" label="会员"></el-table-column>
        <el-table-column prop="user_level.name" label="会员等级"></el-table-column>
        <el-table-column prop="email" label="登录注册"></el-table-column>
        <el-table-column label="状态">
          <el-button type="danger" plain>禁用</el-button>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="text">修改</el-button>
          <el-button type="text">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userlist: [],
      userLevel: [],
      keyword: "",
      Id: 0,
      page: 1,
      limit: 3,
      total: 0
    };
  },
  mounted() {
    this.getUserlist();
  },
  methods: {
    getUserlist() {
      this.$axios
        .get(`/admin/user/${this.page}?limit=${this.limit}&keyword=${this.keyword}&user_level_id=`)
        .then(dzz => {
          console.log(dzz);
          this.userlist = dzz.data.list;
          this.userLevel = dzz.data.user_level;
          this.total = dzz.data.totalCount;
        })
        .catch(error => {
          console.log(error.response.data);
          return false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-card {
  margin-top: 10px;
  .el-row {
    margin-bottom: 10px;
  }
}
</style>