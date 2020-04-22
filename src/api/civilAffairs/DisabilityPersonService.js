import request from '@/utils/request'

function listDisabilityPerson(entity) {
  return request({
    url: '/saas-smart-village/disabilityPerson/listDisabilityPerson',
    method: 'post',
    data: entity
  })
}

function updateDisabilityPerson(entity) {
  return request({
    url: '/saas-smart-village/disabilityPerson/updateDisabilityPerson',
    method: 'post',
    data: entity
  })
}

// 残疾人员
export default {
  listDisabilityPerson,
  updateDisabilityPerson
}
