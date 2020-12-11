
import auth from '../auth.js'
function requireAuth (to, from, next) {
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }
export default  new VueRouter({
    mode: 'hash',
    routes: [
      { path: '/about', component: ()=>import('../view/about.js') },
      { path: '/dashboard', component: ()=>import('../view/dashboard.js'), beforeEnter: requireAuth },
      { path: '/login', component: ()=>import('../view/login.js') },
      { path: '/logout',
        beforeEnter (to, from, next) {
          auth.logout()
          next('/')
        }
      }
    ]
  })