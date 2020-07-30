// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  VueQuillEditor from 'vue-quill-editor'
import store from './store'
import './permission'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
Vue.use(VueQuillEditor)
Vue.config.productionTip = false
/* eslint-disable no-new */
if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('../mock')
 mockXHR()
}
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
