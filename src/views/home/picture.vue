<template>
  <div>
    <el-container>
      <el-header>
        <el-form :inline="true">
          <el-form-item>
            <el-select size="small">
              <el-option value="asc">升序</el-option>
              <el-option value="desc">降序</el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input size="small" placeholder="输入图片名字" />
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="success">搜索</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button size="small" type="success">创建相册</el-button>
          <el-button size="small" type="warning">上传图片</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <ul>                                                                                                                                                                                                                                             
            <li v-for="(item,index) in Imglist" in :key="index" :class="{act:item.id}">
              <span>{{item.name}}</span>
              <el-dropdown>
                <span class="el-dropdown-link">
                  {{item.images_count}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>修改</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </el-aside>
        <el-main>图片列表</el-main>
      </el-container>
      <el-footer>底部</el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sort: "",
      keyword: "",
      Imglist: [],
      cid:''
    };
  },
  mounted() {
    this.getImg();
  },
  methods: {
    //获取图片相册列表
    getImg() {
      this.$axios
        .get("/admin/imageclass/1")
        .then(dzz => {
          console.log(dzz);
          this.Imglist = dzz.data.list;
          this.cid=dzz.data.list[0].id
        })
        .catch(error => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.el-container {
  width: 100%;
  .el-header {
    width: 100%;
    background: #f0f0f0;
    border-bottom: 1px solid #dddddd;
    .el-form {
      margin-top: 18px;
    }
  }
  .el-aside {
    width: 80px;
    min-height: 400px;
    overflow: auto;
    ul {
      width: 100%;
      padding: 0px;
      list-style: none;
    }
    li {
      padding: 10px 5px;
      border-bottom: #dddddd 1px solid;
      display: flex;
      justify-content: space-between;
    }
    li.act{       
        background: #f0f9eb; 
        color: #67C23A;
    }
  }
  .el-footer {
    width: 100%;
    background: #f8f8f8;
  }
}
</style>