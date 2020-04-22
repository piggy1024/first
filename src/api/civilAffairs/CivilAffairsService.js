import request from '@/utils/request'

// 新增
function saveCivilAffairs(entity) {
  return request({
    url: '/saas-smart-village/civilAffairs/saveCivilAffairs',
    method: 'post',
    data: entity
  })
}

// 更新
function updateCivilAffairs(entity) {
  return request({
    url: '/saas-smart-village/civilAffairs/updateCivilAffairs',
    method: 'post',
    data: entity
  })
}

// 民政信息
export default {
  saveCivilAffairs,
  updateCivilAffairs
}
