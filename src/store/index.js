/**
 * Created by sjsd012 on 2017/5/22.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import commonFooter from './modules/commonFooter'
// import * as state from './state'
// import * as getters from './getters'
// import * as mutations from './mutations'
// import * as actions from './actions'

Vue.use(Vuex);

export default new Vuex.Store({
  // state,
  // getters,
  // actions,
  // mutations,
  modules: {
    commonFooter
  }
})
