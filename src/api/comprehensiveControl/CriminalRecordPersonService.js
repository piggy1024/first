import request from '@/utils/request'

function listCriminalRecordPerson(entity) {
  return request({
    url: '/saas-smart-village/criminalRecordPerson/listCriminalRecordPerson',
    method: 'post',
    data: entity
  })
}

function updateCriminalRecordPerson(entity) {
  return request({
    url: '/saas-smart-village/criminalRecordPerson/updateCriminalRecordPerson',
    method: 'post',
    data: entity
  })
}

export default {
  listCriminalRecordPerson,
  updateCriminalRecordPerson
}
