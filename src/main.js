// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import './assets/css/weui.css'
import './assets/css/iconfont.css'
import './assets/css/iconfont2.css'
import './assets/css/common.css'
import './assets/js/weui.min.js'
import $ from 'n-zepto'
import './assets/js/zepto.cookie.min'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
