import request from '@/utils/request'

function listElderly(entity) {
  return request({
    url: '/saas-smart-village/elderly/listElderly',
    method: 'post',
    data: entity
  })
}

// 优抚对象
export default {
  listElderly
}
