<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="6">
          <el-input v-model="keyword" placeholder="请输入内容"></el-input>
        </el-col>
        <el-select v-model="user_level_id" placeholder="请选择">
          <el-option v-for="(item,key) in dengji" :key="key" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button type="primary" class="ss" @click="getdata">搜索</el-button>

        <el-button type="success" @click="dialogFormVisible = true">添加用户</el-button>
      </el-row>
      <!-- //表格 -->
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="username" label="会员" width="180">
          <template v-slot="scope">
            <div>
              <el-image :src="scope.row.avatar" style="width:40px"></el-image>
              {{scope.row.username}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="user_level" label="会员等级" width="180"></el-table-column>
        <el-table-column prop="update_time" label="登录注册" width="180"></el-table-column>
        <el-table-column label="状态" width="180">
          <template v-slot="scope">
            <div>
              <el-button type="danger" size="mini" v-if="scope.row.status==0">禁用</el-button>
              <el-button type="success" size="mini" v-else>启用</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template v-slot="scope">
            <div>
              <el-button type="text" @click="update(scope.row)">编辑</el-button>
              <el-button type="text" @click="del(scope.row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.page"
        :page-sizes="[2, 3, 5, 7]"
        :page-size="this.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="len"
      ></el-pagination>
    </el-card>

    <!-- 添加 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-button icon="el-icon-plus" size="small" v-if="form.avatar==''" @click="sel_img=true"></el-button>
          <el-image :src="form.avatar" v-else style="width:80px;border-radius:5px" />
        </el-form-item>
        <el-form-item label="会员等级ID">
          <el-select v-model="user_level_id" placeholder="请选择">
            <el-option v-for="(item,key) in dengji" :key="key" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="upd.status" label="1" border size="small">启用</el-radio>
          <el-radio v-model="upd.status" label="0" border size="small">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 选择头像信息 -->
    <el-dialog title="图片管理" :visible.sync="sel_img" width="80%">
      <div class="imglist">
        <el-container>
          <el-aside width="150px">
            <ul>
              <li v-for="(item,key) in list" :key="key" @click.self="hh(item.id)">
                <span>{{item.name}}</span>
                <span>{{item.images_count}}</span>
              </li>
            </ul>
          </el-aside>
          <el-main>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-card :body-style="{ padding: '0px' }" v-for="item in imglist" :key="item.id">
                  <el-image :src="item.url" style="width:150px;height:150px" />
                  <div style="padding: 14px;">
                    <span>{{item.name}}</span>
                    <div class="bottom clearfix">
                      <el-button type="text" icon="el-icon-edit"></el-button>
                      <el-button type="text" icon="el-icon-delete"></el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改用户" :visible.sync="editFlag">
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
          <el-button icon="el-icon-plus" size="small" v-if="upd.avatar==''"></el-button>
          <el-image :src="upd.avatar" v-else style="width:80px;border-radius:5px" />
        </el-form-item>
        <el-form-item label="会员等级ID">
          <el-select v-model="user_level_id" placeholder="请选择">
            <el-option v-for="(item,key) in dengji" :key="key" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="upd.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="upd.email"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="upd.status" label="1" size="small" border>启用</el-radio>
          <el-radio v-model="upd.status" label="0" size="small" border>禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFlag = false">取 消</el-button>
        <el-button type="primary" @click="xg">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      keyword: "",
      list: [],
      order: "",
      len: 0,
      dengji: [],
      page: 1,
      limit: 2,
      user_level_id: "",
      //添加
      dialogFormVisible: false,
      form: {
        username: "",
        password: "",
        nickname: "",
        avatar: "",
        user_level_id: "",
        phone: "",
        email: "",
        status: "1"
      },
      //图片
      sel_img: false,
      cid: "",
      imglist: [],
      //修改
      editFlag: false,
      upd: {
        username: "",
        password: "",
        nickname: "",
        avatar: "",
        user_level_id: "",
        phone: "",
        email: "",
        status: "1"
      }
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    //渲染列表
    getdata() {
      this.$axios
        .get(
          `/admin/user/${this.page}?limit=${this.limit}&keyword=${this.keyword}&user_level_id=${this.user_level_id}`
        )
        .then(dzz => {
          console.log(dzz);
          this.list = dzz.data.list;
          this.len = dzz.data.totalCount;
          this.dengji = dzz.data.user_level;
        })
        .catch(error => {
          this.$message.success(error.response.data);
        });
    },

    //分页
    handleSizeChange(limit) {
      this.limit = limit;
      this.getdata();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getdata();
    },
    //删除
    del(id) {
      console.log(id);
      this.$axios
        .post(`/admin/user/${id}/delete`)
        .then(dzz => {
          console.log(dzz);
          this.getdata();
        })
        .catch(error => {
          this.$message.error(error.response.data.msg);
          return false;
        });
    },
    //添加
    add() {
      if (this.form.username == "" || this.form.password == "") {
        this.$message.error("信息不能为空");
        return false;
      }
      this.$axios
        .post("admin/user", this.form)
        .then(dzz => {
          this.$message.success("添加会员成功");
          this.getdata();
          this.dialogFormVisible = false;
        })
        .catch(error => {
          this.$message.error(error.response.data.msg);
          return false;
        });
    },
    //获取图片列表
    getlist(flag = false) {
      this.$axios.get("admin/imageclass/1").then(dzz => {
        console.log(dzz);
        this.list = dzz.data.list;
        this.cid = dzz.data.list[0].id;
        this.getimage();
      });
    },
    //右侧的图片列表
    getimage() {
      this.$axios
        .get(`/admin/imageclass/${this.cid}/image/1`)
        .then(dzz => {
          console.log(dzz);
          this.imglist = dzz.data.list;
        })
        .catch(error => {
          console.log(error.response.data);
        });
    },
    hh(id) {
      this.cid = id;
      this.page = 1;
      this.getimage();
    },
    //修改
    update(id) {
      console.log(id);
      this.upd = id;
      this.editFlag = true;
    },
    xg() {
      this.editFlag = false;
      this.$axios
        .post(`/admin/user/${this.upd.id}`, this.upd)
        .then(dzz => {
          console.log(dzz);
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
};
</script>


<style lang="scss" scoped>
.el-card {
  margin-top: 20px;
}
.ss {
  margin-left: 10px;
}
.el-table {
  margin-top: 20px;
}
.imglist {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  .el-aside {
    min-height: 400px;
    overflow: auto;
    ul {
      width: 100%;
      list-style: none;
      padding: 0;
      li {
        padding: 20px;
        border-bottom: 1px #dddddd solid;
        display: flex;
        justify-content: space-between;
      }
      li.act {
        background: #f0f9eb;
        color: #67c23a;
      }
    }
  }
}
</style>