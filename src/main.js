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
//   //创建一个token与home中token相比较
//   let token = sessionStorage.getItem('03B_token');
//   //判断
//   if (to.path == '/login') {

//   } else {
//     if (token == null) {
//       alert('请登录')
//       next('/login')
//     }
//   }
//   next()
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')