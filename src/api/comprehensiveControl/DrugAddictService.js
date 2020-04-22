import request from '@/utils/request'

function listDrugAddict(entity) {
  return request({
    url: '/saas-smart-village/drugAddict/listDrugAddict',
    method: 'post',
    data: entity
  })
}

function updateDrugAddict(entity) {
  return request({
    url: '/saas-smart-village/drugAddict/updateDrugAddict',
    method: 'post',
    data: entity
  })
}

// 涉毒
export default {
  listDrugAddict,
  updateDrugAddict
}
