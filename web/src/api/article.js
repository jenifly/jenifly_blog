import request from '@/utils/request'
import commons from '@/utils/commons'

export function list(parms) {
  return request({
    url: commons.urlencode('/api/article/list', parms),
    method: 'get',
  })
}

export function get(parms) {
  return request({
    url: commons.urlencode('/api/article', parms),
    method: 'get',
  })
}

export function getinfo(id) {
  return request({
    url: commons.urlencode(`/api/article/${id}`),
    method: 'get',
  })
}