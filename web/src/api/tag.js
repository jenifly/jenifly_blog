import request from '@/utils/request'

export function get() {
  return request({
    url: '/api/tag/get',
    method: 'get',
  })
}