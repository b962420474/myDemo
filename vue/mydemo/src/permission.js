import router from './router'
import { getToken } from '@/libs/auth'
router.beforeEach((to, from, next)=>{
    const hastoken=getToken();
    if(hastoken){
        next();
    }
    else{
        if('/login'==to.path){
            next();
        }
        else{
            next(`/login?redirect=${to.path}`)
        }
    }
})