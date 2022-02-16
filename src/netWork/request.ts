import request from './index';

export function loginRequest (data?: object) {
  return request({
    url: '/login',
    method: 'post',
    data
  });
}

export function tokenVerifyRequest (data?: object) {
  return request({
    url: '/tokenVerify',
    method: 'post',
    data
  });
}

export function tokenRefreshRequest (data?: object) {
  return request({
    url: '/refresh',
    method: 'post',
    data
  });
}
