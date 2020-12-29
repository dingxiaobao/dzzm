import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//1.导入插件
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage, //配置存储介质，默认持久化到本地存储中
  key: "03B_token"
})
export default new Vuex.Store({
  state: {
    token: '',
    loginmsg: {},
    isLoading:false,
    //面包屑
    bread:[],
    //模糊搜索记录
    historyList:[],
  },
  mutations: {
    dologin(state, obj) {
      state.token = obj.token
      state.loginmsg = obj
    },
    logout(state){
      state.token=""
      state.loginmsg=""
    },
    //loading效果
    setLoading(state,status){
      state.isLoading=status
    },
    //设置面包屑
    setBread(state,bread){
     console.log(bread);
      state.bread=bread
    },
    //添加到历史记录
    addHistory(state,name){
      if(state.historyList.length>=8){
        state.historyList.pop()
      }
      state.historyList.unshift(name)
    },
    //删除全部
    remove(state,index=0){
      state.historyList=[];
    }
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin], //引入插件
})