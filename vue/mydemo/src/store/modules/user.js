import { getToken, setToken, removeToken } from '@/libs/auth'
import { login } from '@/api/user'
const state={
    token:getToken(),
    username:""
}
const mutations={
    setToken(state,token) {
        // 变更状态
        state.token=token;
    },
    setName(state,username){
        state.username=username;
    }
}
const actions={
    login({commit},userInfo){
        return new Promise((resolve,reject)=>{
            login(userInfo).then(res=>{
                if(res.code===200){
                    const { data } = res
                    commit('setToken',data.token);
                    commit('setName',data.username);
                    setToken(data.token);
                    resolve();
                  }
                  else{
                    reject(res);
                  }
            }).catch(err=>{
                reject(err);
            })
        })
    },
    logout({commit}){
        commit('setToken',null);
        removeToken();
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
  }