<template>
  <div id="app">
    <transition name="slide-right">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
}
</script>
<style lang="scss">
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
.slide-right-enter{
  transform: translateX(-100%);
}
.slide-right-leave-to{
  transform: translateX(100%);
}
.slide-right-leave-active{
  transition: all .8s ease;
  position: absolute;
  top: 0px;
}
.slide-right-enter-active{
  transition: all 1.5s ease;
  position: absolute;
  top: 0px;
}
</style>
