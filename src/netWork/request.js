import request from './index';

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
