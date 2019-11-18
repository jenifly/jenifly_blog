import request from '@/utils/request'

export function get() {
  return request({
    url: '/api/index',
    method: 'get',
  })
}