<template>
  <div class="login">
    <header>UI-ADMIN</header>
    <el-form :model="user" ref="loginForm" :rules="rules">
      <el-form-item prop="username">
        <el-input placeholder="请输入用户名" v-model="user.username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="请输入密码" v-model="user.password" type="password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="success" style="width:100%" @click="doLogin">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    doLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
            //登录成功后的操作
            this.$axios.post("/admin/login",this.user).then(dzz=>{
                console.log(dzz.data);
                var obj={
                    token:dzz.data.token,
                    username:dzz.data.username
                }
                //存储token值
                this.$store.commit("dologin",obj)
                //跳转
                this.$router.push("/home")
                this.$message.success("登录成功")
            }).catch(error=>{
                console.log(error.response.data)
                this.$message.error(error.response.data.msg)
                return false
            })
        } else {
          return false;
        }
      });
    }
  },
};
</script>
<style lang="scss">
.login {
  width: 40%;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #dddddd;
  header {
    width: 100%;
    border-bottom: 1px solid #dddddd;
    text-align: center;
    line-height: 30px;
    font-size: 20px;
  }
  .el-form {
    padding: 20px;
  }
}
</style>