<template>
  <div>
    <el-card>
      <el-row :span="18">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
            <!-- <el-button type="info">高级搜索</el-button> -->
            <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
        userlist:[],
        userLevel:[],
        keyword:'',
        Id:0,
        page:1,
        limit:33
    };
  },
  mounted() {
    this.getUserlist();
  },
  methods: {
    getUserlist() {
      this.$axios
        .get("/admin/user/1")
        .then(dzz => {
          // console.log(dzz)
          this.userlist=dzz.data.list
          this.userLevel=dzz.data.user_level
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
</style>