import app from './app.js'
import router from './router/index.js'
Vue.use(VueRouter)
new Vue({
    el:"#app",
    router,
    render:h=>h(app)
})