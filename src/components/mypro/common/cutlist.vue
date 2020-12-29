<template>
  <div>
    <van-nav-bar title="砍价列表" left-arrow @click-left="$router.go(-1)" fixed />
    <div style="padding-top:50px;">
      <cut :cutlist="cutlist" />
    </div>
  </div>
</template>

<script>
import cut from "../common/cut";
export default {
  components: { cut },
  data() {
    return {
        cutlist:[]
    };
  },
  mounted() {
    this.$axios
      .get("https://api.it120.cc/small4/shop/goods/kanjia/list")
      .then(dzz => {
        // console.log(dzz);
        for (let key in dzz.data.goodsMap) {
          this.cutlist.push(dzz.data.goodsMap[key]);
          console.log(this.cutlist);
        }
      });
  },
  computed: {}
};
</script>

<style>
</style>
