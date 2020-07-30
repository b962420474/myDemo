import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes:[
    {
      path: '/login',
      name: 'Login',
      component: ()=> import('@/views/Login')
    },
    {
      path:'/edit',
      component:()=> import('@/views/edit')
    },
    {
      path: '/',
      name: 'Home',
      component: ()=> import('@/views/Home'),
      children:[
        {
          path:"/",
          component:()=> import('@/views/MainPage'),
          props: (route) => ({ id: route.query.id })
        },
        {
          path:":userid",
          component:()=> import('@/views/PersonPage'),
          props:true,
          children:[
            {
              path:"/",
              component:()=> import('@/views/personHome'),
              props:true
            },
            {
              path:"article/:articleId",
              component:()=> import('@/views/article'),
              props:true
            }
          ]
        }
      ]
    }
  ]
})
