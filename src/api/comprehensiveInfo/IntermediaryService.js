import request from '@/utils/request'

// /intermediaryService/getIntermediaryServiceById  获取中介服务信息
function getIntermediaryServiceById(entity) {
  return request({
    url: '/saas-smart-village/intermediaryService/getIntermediaryServiceById',
    method: 'post',
    data: entity
  })
}

// /intermediaryService/listIntermediaryService  列表分页查询中介服务信息
function listIntermediaryService(entity) {
  return request({
    url: '/saas-smart-village/intermediaryService/listIntermediaryService',
    method: 'post',
    data: entity
  })
}

// /intermediaryService/logicRemoveIntermediaryService  主键逻辑删除中介服务
function logicRemoveIntermediaryService(entity) {
  return request({
    url: '/saas-smart-village/intermediaryService/logicRemoveIntermediaryService',
    method: 'post',
    data: entity
  })
}

// /intermediaryService/removeBatchIntermediaryService  批量删除中介服务
function removeBatchIntermediaryService(entity) {
  return request({
    url: '/saas-smart-village/intermediaryService/removeBatchIntermediaryService',
    method: 'post',
    data: entity
  })
}

// /intermediaryService/saveIntermediaryService  新增中介服务
function saveIntermediaryService(entity) {
  return request({
    url: '/saas-smart-village/intermediaryService/saveIntermediaryService',
    method: 'post',
    data: entity
  })
}

// /intermediaryService/updateIntermediaryService  更新中介服务数据
function updateIntermediaryService(entity) {
  return request({
    url: '/saas-smart-village/intermediaryService/updateIntermediaryService',
    method: 'post',
    data: entity
  })
}

export default {
  getIntermediaryServiceById,
  listIntermediaryService,
  logicRemoveIntermediaryService,
  removeBatchIntermediaryService,
  saveIntermediaryService,
  updateIntermediaryService
}
