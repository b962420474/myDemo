// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import plugin from './util/plugin'
// import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import { Slider, Switch } from 'view-design';
Vue.component('Slider', Slider);
Vue.component('i-switch',Switch);
import promise from 'es6-promise';
 
 // 兼容 Promise
promise.polyfill();
// Vue.use(ViewUI);
Vue.config.productionTip = false
Vue.prototype.plugin=plugin;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
