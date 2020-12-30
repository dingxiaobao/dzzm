<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="mobile"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="pwd"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">立即登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: "",
      pwd: ""
    };
  },
  created() {},
  mounted() {},
  methods: {
    onSubmit() {
      if (this.mobile == "" || this.pwd == "") {
        return false;
      }
      let formdata = new FormData();
      formdata.append("mobile", this.mobile);
      formdata.append("pwd", this.pwd);
      this.$axios
        .post(
          "https://api.it120.cc/small4/user/m/login?deviceId=007&deviceName=monkey",
          formdata
        )
        .then(dzz => {
          if (dzz.code == 500) {
            this.$toast.fail(dzz.msg);
            return false;
          } else {
            let data = dzz.data;
            console.log(data);
            this.$store.commit("login", data);
            this.$message.success("登录成功");
            //跳转
            this.$router.push("/m_my");
          }
        });
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
</style>
