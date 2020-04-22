import request from '@/utils/request'

function listRetrenchObject(entity) {
  return request({
    url: '/saas-smart-village/retrenchObject/listRetrenchObject',
    method: 'post',
    data: entity
  })
}

// 精简对象
export default {
  listRetrenchObject
}
