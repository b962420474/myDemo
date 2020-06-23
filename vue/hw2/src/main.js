// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import i18n from './util/i18n'
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import Router from 'vue-router'; //如果已引用，不需要重复引用
import {fns} from '@/util/plugin'
Vue.use(Router) //如果已引用，不需要重复引用
Vue.prototype.fns= fns
const VueRouterPush = Router.prototype.push 
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  i18n,
  template: '<App/>'
})
