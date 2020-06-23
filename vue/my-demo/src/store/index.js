import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
Vue.use(Vuex)
const store=new Vuex.Store({
    modules:{
        user,
        tagsView,
        permission
    }
})
export default store