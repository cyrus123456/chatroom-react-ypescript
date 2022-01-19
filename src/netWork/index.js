import axios from "axios";

const instanceAxiosApi = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000
})

//请求拦截
instanceAxiosApi.interceptors.request.use(config => {
  return config
})

//响应拦截
instanceAxiosApi.interceptors.response.use(response => {
  return response
})

export default instanceAxiosApi;