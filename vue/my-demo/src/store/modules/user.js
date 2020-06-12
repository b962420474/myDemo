import { login } from "@/api/user"
import { setToken, getToken, removeToken } from "@/util/auth"
const user = {
    state: {
        token: '',
        name: '',
        roles: []
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
    },
    actions: {
        Login({ commit }, userInfo) {
            const userName = userInfo.userName.trim();
            return new Promise((resolve, reject) => {
                login(userName, userInfo.password).then(response => {
                    const data = response.data;
                    const tonkenStr = data.tokenHead + data.token;
                    setToken(tonkenStr);
                    commit('SET_TOKEN', tonkenStr)
                    resolve();
                }).catch(error => {
                    reject(error);
                })
            });
        },
    }
}
export default user