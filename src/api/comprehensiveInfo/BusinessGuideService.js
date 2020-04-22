import request from '@/utils/request'

// /businessGuide/getBusinessGuideById  获取办事指南信息
function getBusinessGuideById(articleId) {
  return request({
    url: '/saas-smart-village/businessGuide/getBusinessGuideById',
    method: 'post',
    params: { articleId }
  })
}

// /businessGuide/listBusinessGuide  列表分页查询办事指南信息
function listBusinessGuide(entity) {
  return request({
    url: '/saas-smart-village/businessGuide/listBusinessGuide',
    method: 'post',
    data: entity
  })
}

// /businessGuide/logicRemoveBusinessGuide  主键逻辑删除办事指南
function logicRemoveBusinessGuide(entity) {
  return request({
    url: '/saas-smart-village/businessGuide/logicRemoveBusinessGuide',
    method: 'post',
    data: entity
  })
}

// /businessGuide/removeBatchBusinessGuide  批量删除办事指南
function removeBatchBusinessGuide(entity) {
  return request({
    url: '/saas-smart-village/businessGuide/removeBatchBusinessGuide',
    method: 'post',
    data: entity
  })
}

// /businessGuide/saveBusinessGuide  新增办事指南
function saveBusinessGuide(entity) {
  return request({
    url: '/saas-smart-village/businessGuide/saveBusinessGuide',
    method: 'post',
    data: entity
  })
}

// /businessGuide/updateBusinessGuide  更新办事指南数据
function updateBusinessGuide(entity) {
  return request({
    url: '/saas-smart-village/businessGuide/updateBusinessGuide',
    method: 'post',
    data: entity
  })
}

export default {
  getBusinessGuideById,
  listBusinessGuide,
  logicRemoveBusinessGuide,
  removeBatchBusinessGuide,
  saveBusinessGuide,
  updateBusinessGuide
}
