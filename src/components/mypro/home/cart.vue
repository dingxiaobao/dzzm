<template>
  <div>
    <!-- 购物车 -->
    <van-nav-bar title="购物车" left-arrow @click-left="$router.go(-1)" />
    <div class="box">
      <van-card
        v-for="item in $store.state.cartList"
        :key="item.id"
        :num="item.num"
        :price="item.price"
        :title="item.name"
      >
        <template #thumb>
          <div class="thumb">
            <van-checkbox v-model="checked" shape="square" />
            <img :src="item.img" style="width:60px;height:80px" />
          </div>
        </template>
        <template #num>
          <van-stepper v-model="item.num" />
        </template>
      </van-card>
    </div>

    <van-submit-bar style="bottom:50px" :price="$store.getters.totals*100" button-text="提交订单">
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true
    };
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
.box {
  padding-bottom: 100px;
}
.thumb {
  display: flex;
  margin-right: 4px;
  align-items: center;
  justify-content: space-between;
}
</style>
