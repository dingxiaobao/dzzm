import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import axios from "./utils/request"
Vue.prototype.$axios=axios

import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI)
//
import Vant from "vant"
import "vant/lib/index.css"
Vue.use(Vant)

import echarts from "echarts"
Vue.prototype.$echarts=echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
