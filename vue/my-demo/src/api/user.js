import request from '@/util/request'
export function login(username, password){
    return request({
        url:"/admin/login",
        method: 'post',
        data:{
            username,
            password
        }
    })
}