<template>
  <div>
    <van-nav-bar title="人气推荐" left-arrow @click-left="$router.go(-1)" fixed />
    <div style=" margin-top: 50px;">
      <recommand :goodslist="goodslist" />
    </div>
  </div>
</template>

<script>
import recommand from "../common/recommandlist";
export default {
  components: { recommand },
  data() {
    return {
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
  methods: {},
  computed: {}
};
</script>


