import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'admin_login',
    component: ()=>import('@/views/Login')
  }, 
  {
    path: '/home',
    name: 'Home',
    component: ()=>import('@/views/Home.vue'),
    redirect:"/index",
    children:[
      {
        path: '/index',
        name: 'admin_index',
        component: ()=>import('@/views/home/index')
      }, 
      {
        path: '/picture',
        name: 'admin_picture',
        component: ()=>import('@/views/home/picture'),
        meta:{
          bread:['相册管理']
        }
      }, 
      {
        path: '/list',
        name: 'admin_list',
        component: ()=>import('@/views/home/list'),
        meta:{
          bread:['用户管理','用户列表']
        }
      }, 
      {
        path: '/setting',
        name: 'admin_setting',
        component: ()=>import('@/views/home/setting'),
        meta:{
          bread:['设置','基本设置']
        }
      }, 
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
