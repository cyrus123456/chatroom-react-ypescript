import axios from "axios";

const instanceAxiosApi = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000
})

//请求拦截
instanceAxiosApi.interceptors.request.use(config => {
  return config
}, error => {
  return new Promise.reject(error);
})

//响应拦截
instanceAxiosApi.interceptors.response.use(response => {
  return new Promise.resolve(response)
}, error => {
  return new Promise.reject(error);
})

export default instanceAxiosApi;