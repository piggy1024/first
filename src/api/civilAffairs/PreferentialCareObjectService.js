import request from '@/utils/request'

function listPreferentialCareObject(entity) {
  return request({
    url: '/saas-smart-village/preferentialCareObject/listPreferentialCareObject',
    method: 'post',
    data: entity
  })
}

// 优抚对象
export default {
  listPreferentialCareObject
}
