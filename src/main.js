import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import cardOrderAccept from './components/cardOrderAccept.vue'
import cardOrderComfirm from './components/cardOrderComfirm.vue'
import cardOrder from './components/cardOrder.vue'
import moment from 'moment'

Vue.config.productionTip = false

// 注册全局组件
Vue.component("vicki-cardOrderAccept",cardOrderAccept)
Vue.component("vicki-cardOrderComfirm",cardOrderComfirm)
Vue.component("vicki-cardOrder",cardOrder)

// 全局注册过滤器(将时间戳转换为指定格式的时间)
Vue.filter('datefmt', function (value) {
  if (value){
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
  } 
  return value;
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

