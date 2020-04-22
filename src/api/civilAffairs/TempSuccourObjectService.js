import request from '@/utils/request'

function listTempSuccourObject(entity) {
  return request({
    url: '/saas-smart-village/tempSuccourObject/listTempSuccourObject',
    method: 'post',
    data: entity
  })
}

// 临时救助
export default {
  listTempSuccourObject
}
