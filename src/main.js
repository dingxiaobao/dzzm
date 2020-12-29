import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import axios from "./utils/request"
Vue.prototype.$axios = axios

import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI)

import Vant from "vant"
import "vant/lib/index.css"
Vue.use(Vant)
//配置echarts
import echarts from "echarts"
Vue.prototype.$echarts = echarts

//全局路由守卫
// router.beforeEach((to, form, next) => {
//   //判断
//   if (to.path == '/login') {
//   } else {
//     if (store.state.token == "") {
//       alert('请登录')
//       next('/login')
//     }
//     //路由守卫添加面包屑
//     if (to.meta.hasOwnProperty('bread')) {
//       //添加面包屑，vuex方法
//       store.commit("setBread", to.meta.bread)
//     } else {
//       store.commit("setBread", [])
//     }
//   }
//   next()
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')