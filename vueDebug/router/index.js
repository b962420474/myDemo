
import auth from '../auth.js'
function requireAuth(to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}
const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/about', component: () => import('../view/about.js'),
      beforeEnter: (to, from, next) => {
        // ...
        console.log("beforeEnter")
        next();
      }
    },
    {
      path: '/dashboard', component: () => import('../view/dashboard.js'),
      beforeEnter: (to, from, next) => {
        // ...
        console.log("beforeEnter")
        next();
      }
    },
    {
      path: '/login', component: () => import('../view/login.js'),
      beforeEnter: (to, from, next) => {
        // ...
        console.log("beforeEnter")
        next();
      }
    },
    {
      path: '/logout',
      beforeEnter(to, from, next) {
        auth.logout()
        next('/')
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log("beforeEach")
  next();
})
router.beforeResolve((to, from, next) => {
  console.log("beforeResolve ")
  next();
})
router.afterEach((to, from) => {
  console.log("afterEach")
})
export default router