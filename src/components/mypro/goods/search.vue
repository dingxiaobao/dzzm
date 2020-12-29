<template>
  <div>
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />
    <van-search
      v-model="value"
      shape="round"
      show-action
      placeholder="请输入搜索关键词"
      @blur="addhistory"
    />
    <div class="history" v-show="value==''">
      <div class="history-head">
        <p>历史搜索</p>
        <van-icon name="delete" @click="remove"/>
      </div>
      <div class="history-list">
        <div class="history-list-item" v-for="(item,index) in $store.state.historyList" :key="index">{{item}}</div>
      </div>
    </div>
    <!-- 商品列表 -->
    <recommand :goodslist="searchList" v-show="value.length>0" />
  </div>
</template>

<script>
import recommand from "../common/recommandlist";
export default {
  components: { recommand },
  data() {
    return {
      value: "",
      goodslist: []
    };
  },
  created() {},
  mounted() {
    this.$axios.get("https://api.it120.cc/small4/shop/goods/list").then(dzz => {
      console.log(dzz);
      this.goodslist = dzz.data;
    });
  },
  methods: {
      addhistory(){
          if(this.value==""){
              return false
          }
          this.$store.commit("addHistory",this.value)
          this.value=''
      },
      remove(){
          this.$store.commit("remove")
      }
  },
  computed: {
    searchList() {
      let list = this.goodslist;
      return list.filter(item => {
        return item.name.indexOf(this.value) > -1;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.history {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  .history-head {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .history-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .history-list-item {
      width: 23%;
      background: #f0f0f0;
      margin: 2% 1%;
      padding: 10px 5px;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
