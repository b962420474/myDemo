import axios from 'axios'
const service = {
  apiurl: process.serverUrl
}
service.ajax = axios.create({
  baseURL: service.apiurl
})

// 添加响应拦截器
service.ajax.interceptors.response.use(res => {
  return res.data
})
export default service
