<template>
  <div class="recnav">
    <div class="item" v-for="item in goodslist" :key="item.id" @click="$router.push('/m_detail?id='+item.id)">
      <img :src="item.pic" />
      <p class="desc">{{item.name}}</p>
      <p>{{item.recommendStatusStr}}</p>
      <p>￥{{item.originalPrice}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["goodslist"],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {}
};
</script>

<style lang="scss">
//商品列表
.recnav {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 48%;
    margin: 2% 1%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    .desc {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    img {
      width: 100%;
      height: 150px;
    }
    p:nth-of-type(2) {
      color: #808080;
      font-size: 13px;
    }
    p:nth-of-type(3) {
      color: red;
      font-size: 14px;
    }
  }
}
</style>
