import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import apps from '@/components/app'
import history from '@/components/history'
import search from '@/components/search'
import setting from '@/components/setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/app',
      name: 'apps',
      component: apps
    },
    {
      path: '/history',
      name: 'history',
      component: history
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },
  ]
})
