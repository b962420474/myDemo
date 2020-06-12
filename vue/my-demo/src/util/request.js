import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
const service=axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000 // 请求超时时间
})
service.interceptors.request.use(config=>{
    return config
},error=>{
   console.log(error);
   Promise.reject(error);
})
service.interceptors.response.use(response=>{
    const res=response.data;
    if(res.code!=200){

    }
    else{
        return res;
    }
},error=>{
    console.log(error)
    Message({
        message:error.message,
        type:'error',
        duration:3000
    })
    Promise.reject(error);
})
export default service