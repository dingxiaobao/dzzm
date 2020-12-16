import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//1.导入插件
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage, //配置存储介质，默认持久化到本地存储中
  keep: "03B_token"
})
export default new Vuex.Store({
  state: {
    token: '',
    loginmsg: {}
  },
  mutations: {
    dologin(state, obj) {
      state.token = obj.token
      state.loginmsg = obj
    },
    logout(state){
      state.token=""
      state.loginmsg=""
    }
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin], //引入插件
})