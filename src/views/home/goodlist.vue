<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="item.lable" :name="item.type" v-for="(item,key) in tabs" :key="key"></el-tab-pane>
    </el-tabs>
    <el-form :inline="true">
      <el-form-item size="small" class="so">
        <el-input placeholder="请输入图片名字" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="info" size="small">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small">发布商品</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" size="small">批量删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="sxj(0)">下架</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="sxj(1)">上架</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="商品" width="260">
        <template v-slot="scope">
          <div>
            <dl>
              <dt>
                <img :src="scope.row.cover" alt />
              </dt>
              <dd>
                <p>{{scope.row.title}}</p>
                <p>分类:{{scope.row.category.name}}</p>
                <p>时间:{{scope.row.update_time}}</p>
              </dd>
            </dl>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="sale_count" label="实际销量"></el-table-column>
      <el-table-column label="状态">
        <template v-slot="scope">
          <div>
            <el-button type="danger" size="mini" v-show="scope.row.status==0">仓库</el-button>
            <el-button type="success" size="mini" v-show="scope.row.status==1">上架</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="审核状态">
        <template v-slot="scope">
          <div>
            <span v-show="scope.row.ischeck==1">通过</span>
            <span v-show="scope.row.ischeck==2">拒绝</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="stock" label="库存"></el-table-column>
      <el-table-column label="价格">
        <template v-slot="scope">
          <div>
            <span>原价￥{{scope.row.min_price}}/现价￥{{scope.row.min_oprice}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template>
            <el-button type="success" size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "all",
      page: 1,
      limit: 10,
      keyword: "",
      tabs: [
        { lable: "全部", type: "all" },
        { lable: "审核中", type: "checking" },
        { lable: "出售中", type: "saling" },
        { lable: "已下架", type: "off" },
        { lable: "库存预警", type: "min_stock" },
        { lable: "回收站", type: "delete" }
      ],
      category_id: "",
      list: [],
      total: 0,
      ids: []
    };
  },
  methods: {
    handleSelectionChange(ad) {
      console.log(ad);
      var gouzhong = [];
      ad.forEach((item, key) => {
        gouzhong.push(item.id);
      });
      this.ids = gouzhong;
    },
    //改变上下架状态
    sxj(status) {
      if (this.ids.length == 0) {
        this.$message.error("还没选中商品");
        return false;
      }
      this.$axios
        .post("/admin/goods/changestatus", { ids: this.ids, status: status })
        .then(res => {
          console.log(res);
          this.getdata();
        })
        .catch(error => {
          console.log(error.response.data);
        });
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getdata();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getdata();
    },
    handleClick(add) {
      console.log(add.name);
      // this.activeName=add.name
      console.log(this.activeName);
      this.getdata();
    },
    getdata() {
      this.$axios
        .get(
          `/admin/goods/${this.page}?limit=${this.limit}&tab=${this.activeName}&title=${this.keyword}`
        )
        .then(res => {
          console.log(res);
          this.list = res.data.list;
          this.total = res.data.totalCount;
        })
        .catch(error => {
          console.log(error.response.data);
        });
    }
  },
  mounted() {
    this.getdata();
  }
};
</script>

<style lang="scss" scope>
.so {
  margin-top: 5px;
}
dl {
  display: flex;

  img {
    width: 60px;
  }
  dd {
    margin: 0;
  }
}
</style>