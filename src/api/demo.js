import request from '@/utils/request'

export function getDemoList(id) {
  return request({
    url: '/saas-app/demo/listDemo',
    method: 'post',
    data: {}
  })
}
