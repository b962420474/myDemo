// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import i18n from './util/i18n'
import Vue from 'vue'
import App from './App'
import router from './router'
import "./assets/checkboxes.min.css"
import {fns} from '@/util/plugin'
Vue.config.productionTip = false
Vue.prototype.fns= fns
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})

// setInterval(function(){
//   console.log(vue);
// },10000)
