<template>
  <div class="home">
    <el-button @click="Logout">退出</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    Logout() {
      // this.$axios.post("/admin/logout").then(dzz => {
        // console.log(dzz.data);
        this.$store.commit("logout");
        this.$router.push("/login");
      // });
    }
  }
};
</script>