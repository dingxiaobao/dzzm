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
    component: ()=>import('@/views/Home.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
