<template>
  <div>
    <el-container>
      <el-header>
        <el-form :inline="true">
          <el-form-item>
            <el-select size="small" v-model="order">
              <el-option value="asc">升序</el-option>
              <el-option value="desc">降序</el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input size="small" placeholder="请输入图片名字" v-model="keyword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="small" @click="ss()">搜索</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="success" size="small" @click="addclass = true">创建相册</el-button>
          <el-button type="warning" size="small" @click="scimg=true">上传图片</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <ul>
            <li
              v-for="(item,key) in list"
              :key="key"
              :class="{act:item.id==cid}"
              @click.self="hh(item.id)"
            >
              <span>{{item.name}}</span>
              <el-dropdown @command="bj">
                <span class="el-dropdown-link">
                  {{item.images_count}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{type:'update',item:item}">修改</el-dropdown-item>
                  <el-dropdown-item :command="{type:'del',id:item.id}">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </el-aside>
        <el-main>
          <el-row :gutter="20">
            <el-col :span="6" v-for="(item, key) in imglist" :key="key">
              <el-card :body-style="{ padding: '0px' }">
                <el-image
                  :src="item.url"
                  style="width:100%;height:150px"
                  :preview-src-list="[item.url]"
                />
                <div style="padding: 14px;">
                  <span>{{item.name}}</span>
                  <div class="bottom clearfix">
                    <el-button type="text" icon="el-icon-edit" @click="imgbj(item)"></el-button>
                    <el-button type="text" icon="el-icon-delete" @click="imgdel(item.id)"></el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      <el-footer>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[2, 4, 5, 7]"
          :page-size="4"
          layout="total, sizes, prev, pager, next, jumper"
          :total="zsj"
        ></el-pagination>
      </el-footer>
    </el-container>

    <!-- 添加相册 -->
    <el-dialog title="创建相册" :visible.sync="addclass">
      <el-form label-width="80px">
        <el-form-item label="相册名称">
          <el-input v-model="classname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="相册排序">
          <el-input-number v-model="num" @change="handleChange"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addclass = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 图片修改 -->
    <el-dialog title="图片修改" :visible.sync="dialogFormVisible">
      <el-form label-width="80px">
        <el-form-item label="相册名称">
          <el-input v-model="imgname" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="bjj">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 相册修改 -->
    <el-dialog title="相册修改" :visible.sync="classimg">
      <el-form label-width="80px">
        <el-form-item label="相册名称">
          <el-input v-model="obj.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="相册排序">
          <el-input-number v-model="obj.order" @change="handleChange"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="classimg = false">取 消</el-button>
        <el-button type="primary" @click="classimgupd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 上传相册 -->
    <el-dialog title="上传相册" :visible.sync="scimg">
      <el-upload
        class="upload-demo"
        drag
        action="/admin/image/upload"
        multiple
        :headers="{token: this.$store.state.token}"
        :on-success="uploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      list: [],
      order: "",
      keyword: "",
      cid: "",
      page: 1,
      limit: 4,
      imglist: [],
      zsj: 0,
      dialogFormVisible: false,
      classname: "",
      num: 0,
      id: 0,
      imgname: "",
      imgid: 0,
      addclass: false,
      classimg: false,
      scimg: false,
      obj: {}
    };
  },
  methods: {
    getlist() {
      this.$axios.get("admin/imageclass/1").then(dzz => {
        console.log(dzz);
        this.list = dzz.data.list;
        this.cid = dzz.data.list[0].id;
        this.getimage();
      });
    },
    getimage() {
      this.$axios
        .get(
          `/admin/imageclass/${this.cid}/image/${this.page}?limit=${this.limit}&order=${this.order}&keyword=${this.keyword}`
        )
        .then(dzz => {
          console.log(dzz);
          this.imglist = dzz.data.list;
          this.zsj = dzz.data.totalCount;
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
    handleSizeChange(limit) {
      this.limit = limit;
      this.getimage();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getimage();
    },
    //添加
    add() {
      if (this.classname == "" || this.num == "") {
        this.$message.error("名字或排序不能为空");
        return false;
      } else {
        this.$axios
          .post("/admin/imageclass", { name: this.classname, order: this.num })
          .then(dzz => {
            console.log(dzz);
            this.$message.success("相册添加成功");
            this.getlist();
          })
          .catch(error => {
            console.log(error.response.data);
          });
      }
      this.addclass = false;
    },
    //排序
    handleChange() {},
    //删除
    bj(command) {
      if (command.type == "del") {
        this.$axios
          .delete(`/admin/imageclass/${command.id}`)
          .then(dzz => {
            console.log(dzz);
            this.$message.success("相册删除成功");
            this.getlist();
          })
          .catch(error => {
            console.log(error.response.data);
          });
      }
      if (command.type == "update") {
        this.classimg = true;
        this.obj = command.item;
      }
    },
    //上传
    uploadSuccess(dzz) {
      console.log(dzz);
    },
    //修改
    classimgupd() {
      this.$axios
        .post(`/admin/imageclass/${this.obj.id}`, {
          order: this.obj.order,
          name: this.obj.name
        })
        .then(dzz => {
          console.log(dzz);
          this.$message.success("相册修改成功");
          this.getlist();
          this.classimg = false;
        })
        .catch(error => {
          console.log(error.response.data);
        });
    },
    //删除单张图片
    imgdel(id) {
      console.log(id);
      this.$axios.delete(`/admin/image/${id}`).then(dzz => {
        this.getimage();
        this.$message.success("单张图片删除成功");
      });
    },
    imgbj(item) {
      console.log(item);
      this.dialogFormVisible = true;
      this.imgname = item.name;
      this.imgid = item.id;
    },
    bjj() {
      this.$axios
        .post(`/admin/image/${this.imgid}`, { name: this.imgname })
        .then(dzz => {
          console.log(dzz);
          this.dialogFormVisible = false;
          this.getimage();
        });
    },

    ss() {
      this.getimage();
    }
  },
  mounted() {
    this.getlist();
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
  .el-header {
    background: #dddddd;
    margin-top: 10px;
  }
  .el-form {
    display: flex;
    .el-form-item{
      margin-top: 18px;
    }
  }
  .el-aside {
    min-height: 400px;
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
  .el-col {
    height: 300px;
    .el-card {
      margin-top: 20px;
      img {
        width: 100%;
      }
    }
  }
}
</style>