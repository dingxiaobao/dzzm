<template>
  <div>
    <div class="tc">
      <van-image round width="50px" height="50px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      <span>{{list.mobile}}</span>
      <van-button type="success" hairline @click="lagout">退出</van-button>
    </div>
    <transition>
      <van-notice-bar
        left-icon="volume-o"
        text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
        background="#f0f0f0"
        color="#bd2323"
        v-show="show"
      />
    </transition>
    <van-button @click="show=!show">Toggle</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {},
      show: true
    };
  },
  created() {},
  mounted() {
    let token = this.$store.state.token;
    let formdata = new FormData();
    formdata.append("token", token);
    this.$axios
      .post("https://api.it120.cc/small4/user/detail", formdata)
      .then(dzz => {
        // console.log(dzz);
        this.list = dzz.data.base;
      });
  },
  //路由守卫
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$store.state.token == "") {
        vm.$toast.fail("请先登录");
        vm.$router.push("/m_login");
      }
    });
  },
  methods: {
    lagout() {
      this.$store.commit("lagout");
      //跳转
      this.$router.push("/m_login");
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.tc {
  width: 100%;
  height: 60px;
  background: burlywood;
  flex-wrap: wrap;
  box-sizing: border-box;
  .van-image {
    margin-top: 4px;
  }
  span {
    margin: 5px;
  }
  .van-button {
    margin-top: 15px;
    height: 30px;
    float: right;
  }
}
.v-enter,
.v-leave-to {
  transform: translate(-100%,-40%);
}
// .v-enter-to {
//   transform: translateX();
// }
.v-enter-active,
.v-leave-active {
  transition: all 3s ease;
}
</style>
