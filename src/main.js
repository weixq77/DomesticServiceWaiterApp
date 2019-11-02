import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import cardOrderAccept from './components/cardOrderAccept.vue'
import cardOrderComfirm from './components/cardOrderComfirm.vue'
import cardOrder from './components/cardOrder.vue'

Vue.config.productionTip = false

Vue.component("vicki-cardOrderAccept",cardOrderAccept)
Vue.component("vicki-cardOrderComfirm",cardOrderComfirm)
Vue.component("vicki-cardOrder",cardOrder)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

