import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import order from './order'
import user from './user'

export default new Vuex.Store({
  // 合并所有的store
  modules:{
    user,
    order
  }
})
