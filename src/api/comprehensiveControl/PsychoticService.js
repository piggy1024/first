import request from '@/utils/request'

function listPsychotic(entity) {
  return request({
    url: '/saas-smart-village/psychotic/listPsychotic',
    method: 'post',
    data: entity
  })
}

function updatePsychotic(entity) {
  return request({
    url: '/saas-smart-village/psychotic/updatePsychotic',
    method: 'post',
    data: entity
  })
}

export default {
  listPsychotic,
  updatePsychotic
}
