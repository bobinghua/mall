import axios from 'axios'

export function request(config) {
  const ins = axios.create({
    //baseURL: 'http://106.54.54.237:8000/api/v1',
    baseURL: 'http://123.207.32.32:8000/api/v2',
    timeout: 5000
  })

  ins.interceptors.request.use(config => {

    return config;
  }, err => {
    console.log('request err!')
    console.log(err)
  })

  ins.interceptors.response.use(res => {
    return res;
  }, err => {
    console.log('response err!')
    console.log(err)
  })

  return ins(config)
}