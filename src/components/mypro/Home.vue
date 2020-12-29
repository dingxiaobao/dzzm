<template>
  <div class="main">
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000" route>
      <van-tabbar-item icon="home-o" to="/m_index">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/m_cart">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/m_cate">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/m_my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
.main{
  width: 100%;
  padding-bottom: 50px;
}
</style>
