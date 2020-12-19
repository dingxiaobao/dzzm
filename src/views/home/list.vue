<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="14">
          <el-button type="success" @click="addFlag=true">添加用户</el-button>
        </el-col>
        <el-col :span="5">
          <el-input placeholder="请输入内容" v-model="keyword"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="info" @click="getUserlist">搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary">高级搜索</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="userlist" border style="width: 100%">
        <el-table-column label="会员">
          <template v-slot="scope">
            <el-image
              :src="scope.row.avatar"
              style="width:50px; height: 50px; border-radius: 50%;"
              :preview-src-list="[scope.row.avatar]"
            ></el-image>
            <p>{{scope.row.username}}</p>
            <p>用户Id:{{scope.row.id}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="user_level.name" label="会员等级"></el-table-column>
        <el-table-column prop="email" label="登录注册"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
          <el-button type="danger" plain v-if="scope.row.status==0">禁用</el-button>
          <el-button type="sueecss" v-else>启用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="text" @click="update(scope.row)">修改</el-button>
            <el-button type="text" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="SizeChange"
        @current-change="PageChange"
        :current-page="this.page"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="this.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加 -->
    <el-dialog title="添加用户" :visible.sync="addFlag">
      <el-form :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <!-- <el-input v-model="form.avatar"></el-input> -->
        </el-form-item>
        <el-form-item label="会员等级ID">
          <el-input v-model="form.user_level_id"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-input v-model="form.status"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFlag = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
     <!-- 修改 -->
    <!-- <el-dialog title="修改用户" :visible.sync="addFlag">
      <el-form :model="upd">
        <el-form-item label="用户名">
          <el-input v-model="upd.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="upd.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="upd.nickname"></el-input>
        </el-form-item>
        <el-form-item label="头像">
        </el-form-item>
        <el-form-item label="会员等级ID">
          <el-input v-model="upd.user_level_id"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="upd.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="upd.email"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-input v-model="upd.status"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFlag = false">取 消</el-button>
        <el-button type="primary" @click="xg">确 定</el-button>
      </div>
    </el-dialog> -->
    <el-dialog :visible.sync="addFlag">

    </el-dialog> 
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
      total: 0,
      user_level_id: "",
      addFlag: false,
      form: {
        username: "",
        password: "",
        nickname: "",
        avatar: "",
        user_level_id: "",
        phone: "",
        email: "",
        status: ""
      }
    };
  },
  mounted() {
    this.getUserlist();
  },
  methods: {
    //渲染列表
    getUserlist() {
      this.$axios
        .get(
          `/admin/user/${this.page}?limit=${this.limit}&keyword=${this.keyword}&user_level_id=${this.user_level_id}`
        )
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
    },
    SizeChange(size) {
      this.limit = size;
      this.getUserlist();
    },
    PageChange(page) {
      this.page = page;
      this.getUserlist();
    },
    //删除
    del(id) {
      this.$axios
        .post(`/admin/user/${id}/delete`)
        .then(dzz => {
          console.log(dzz);
          this.getUserlist();
        })
        .catch(error => {
          console.log(error.response.data);
          return false;
        });
    },
    //添加
    add() {
      this.addFlag = false;
      this.$axios
        .post("/admin/user", this.form)
        .then(dzz => {
          this.getUserlist();
        })
        .catch(error => {
          console.log(error.response.data);
          return false;
        });
    },
    //修改
    // update(id) {
    //   this.upd = id;
    //   this.addFlag = true;
    // },
    // xg() {
    //   this.addFlag = false;
    //   this.$axios
    //     .post(`/admin/user/${this.upd.id}`, this.upd)
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(error => {
    //       console.log(error.response);
    //     });
    // }
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
p {
  box-sizing: border-box;
  display: flex;
}
</style>