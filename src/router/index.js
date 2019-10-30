import Vue from 'vue'
import VueRouter from 'vue-router'
import Manager from '../pages/manager/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'manager',
    redirect: '/mine',//重定向
    component: Manager,
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
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 判断是否已经登录过了
router.beforeEach((to,from,next) => {
  // alert(1)
  // 判断当前本地是否有token，有的话为已经登录了
  if(localStorage.getItem('token')){
    // alert(2)
    // if(to.name == '')
    // 已经登录过了，直接往下走
    next();
  }else{
    // 没有登录
    if (to.name === 'login') { // 如果是登录页面的话，直接往下走
      next();
    } else { // 否则 跳转到登录页面
      next({
        path: '/login'
      });
    }
  }

})

export default router
