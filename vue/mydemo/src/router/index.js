import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '../components/Login'
import MainPage from '../components/MainPage'
import PersonPage from '../components/PersonPage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes:[
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[
        {
          path:"/",
          component:MainPage,
          props: (route) => ({ id: route.query.id })
        },
        {
          path:"person/:userid",
          component:PersonPage,
          props:true
        }
      ]
    }
  ]
})
