import Vue from 'vue'
import VueRouter from 'vue-router'
import Manager from '../pages/manager/Layout.vue'
import {getToken} from '../utils/localStorage.js'
import store from '../store'
import {Toast} from 'vant'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/manager/home',//重定向
  },
  {
    path: '/manager',
    name: 'manager',
    component: Manager,
    beforeEnter: (to,from,next) =>{
      // 获取本地token
      let token = getToken();
      if(token){
        // 查询info
        store.dispatch('user/loginInfo',token)
        .then(()=>{
          // 当获取用户信息的时候才允许跳转
          next();
        })
      }else{
        Toast("请先登录")
        // 跳转到登录
        next({path:"/login"})
      }
    },
    children:[
      {
        path: 'home',
        name:'home',
        component: () => import('../pages/manager/Home.vue')
      },
      {
        path: 'order',
        name:'order',
        component: () => import('../pages/manager/Order.vue')
      },
      {
        path: 'mine',
        name:'mine',
        component: () => import('../pages/manager/Mine.vue')
      },
      {
        path: 'income',
        name:'income',
        component: () => import('../pages/manager/Income.vue')
      },
      {
        path: 'orderList',
        name:'orderList',
        component: () => import('../pages/manager/OrderList.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
