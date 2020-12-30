import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//因为在实例中还没有生成 手动引入
import Store from "../store"
import {Toast} from 'vant';
const routes = [
  //后台管理
  // {
  //     path:'/',
  //     redirect:"/index",                                                
  // },
  {
    path: '/login',
    name: 'admin_login',
    component: () => import('@/views/Login')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    children: [{
        path: '/index',
        name: 'admin_index',
        component: () => import('@/views/home/index'),
        meta: {
          bread: ['后台管理']
        }
      },
      {
        path: '/picture',
        name: 'admin_picture',
        component: () => import('@/views/home/picture'),
        meta: {
          bread: ['相册管理']
        }
      },
      {
        path: '/list',
        name: 'admin_list',
        component: () => import('@/views/home/list'),
        meta: {
          bread: ['会员管理', '会员列表']
        }
      },
      {
        path: '/goodlist',
        name: 'admin_goodlist',
        component: () => import('@/views/home/goodlist'),
        meta: {
          bread: ['管理', '图书列表']
        }
      },
      {
        path: '/setting',
        name: 'admin_setting',
        component: () => import('@/views/home/setting'),
        meta: {
          bread: ['设置', '基本设置']
        }
      },
    ]
  },
  //购物车
  {
    path: '/',
    redirect: "/m_home",
  },
  {
    path: '/m_home',
    name: 'm_home',
    component: () => import('@/components/mypro/Home'),
    redirect: "/m_index",
    children: [{
        path: '/m_index',
        name: 'm_index',
        component: () => import('@/components/mypro/home/index'),
      },
      {
        path: '/m_cate',
        name: 'm_cate',
        component: () => import('@/components/mypro/home/cate'),
      },
      {
        path: '/m_cart',
        name: 'm_cart',
        component: () => import('@/components/mypro/home/cart'),
      },
      {
        path: '/m_my',
        name: 'm_my',
        component: () => import('@/components/mypro/home/my'),
      }
    ]
  },
  {
    path: '/m_cut',
    name: 'm_cut',
    component: () => import('@/components/mypro/common/cutlist'),
  },
  {
    path: '/m_recommand',
    name: 'm_recommand',
    component: () => import('@/components/mypro/common/recommand'),
  },
  {
    path: '/m_search',
    name: 'm_rsearch',
    component: () => import('@/components/mypro/goods/search'),
  },
  {
    path: '/m_login',
    name: 'm_login',
    component: () => import('@/components/mypro/Login'),
  },
]

const router = new VueRouter({
  routes
})

export default router