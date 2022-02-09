import request from './index';

export function loginRequest(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function tokenVerifyRequest(data) {
  return request({
    url: '/tokenVerify', 
    method: 'post',
    data
  })
}

export function tokenRefreshRequest(data) {
  return request({
    url: '/refresh', 
    method: 'post',
    data
  })
}
