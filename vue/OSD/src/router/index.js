import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mani',
      component: ()=>import('@/view/main')
    },
    {
      path: '/wifi',
      name: 'wifi',
      component: ()=>import('@/view/network/wifi')
    },
    {
      path: '/brightness',
      name: 'brightness',
      component: ()=>import('@/view/moreSet/brightness')
    }
  ]
})
