import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
 //1.导入插件
 import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,//配置存储介质，默认持久化到本地存储中
  // keep:""
})
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin],//引入插件
})
