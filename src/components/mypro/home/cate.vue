<template>
  <div>
    <van-search placeholder="请输入要搜索的商品" shape="round" @click="$router.push('/m_search')"/>
    <div class="cate">
      <van-sidebar v-model="activekey" @change="changeBar">
        <van-sidebar-item :title="item.name" v-for="item in catelist" :key="item.id" />
      </van-sidebar>
      <div class="right-cate">
        <div class="right-item" v-for="(item,index) in subcategory" :key="index">
          <van-image :src="item.icon">
            <template v-slot:error>加载失败</template>
          </van-image>
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activekey: 0,
      catelist: [{ name: "所有分类", id: 0 }],
      subcatelist: [] //二级分类
    };
  },
  mounted() {
    this.getCate();
  },
  methods: {
    getCate() {
      this.$axios
        .post("https://api.it120.cc/small4/shop/goods/category/all")
        .then(dzz => {
          console.log(dzz);
          let arr = dzz.data.filter(item => {
            return item.pid == 0;
          });
          this.catelist.push(...arr);
          this.subcatelist = dzz.data;
        });
    },
    //点击左侧切换
    changeBar(index) {}
  },
  computed: {
    //获取右侧的内容
    subcategory() {
      let arr = this.subcatelist;
      if (this.activekey == 0) {
        return arr;
      } else {
        let pid = this.catelist[this.activekey].id;
        return arr.filter(item => {
          return item.pid == pid;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.cate {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .van-sidebar {
    width: 25%;
  }
  .right-cate {
    width: 73%;
    display: flex;
    flex-wrap: wrap;
    .right-item {
      width: 31%;
      margin: 1%;
      box-sizing: border-box;
      border: 1px solid #ddd;
      .van-image {
        width: 100%;
        height: 100px;
      }
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
