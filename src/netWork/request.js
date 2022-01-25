import request from './index';

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function tokenVerify(data) {
  return request({
    url: '/tokenVerify', 
    method: 'post',
    data
  })
}

export function tokenRefresh(data) {
  return request({
    url: '/refresh', 
    method: 'post',
    data
  })
}
