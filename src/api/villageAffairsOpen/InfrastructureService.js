// 基础设施服务
import request from '@/utils/request'

// 列表
function listInfrastructure(entity) {
  return request({
    url: '/saas-smart-village/infrastructure/listInfrastructure',
    method: 'post',
    data: entity
  })
}

// /infrastructure/saveInfrastructure 新增基础设施
function saveInfrastructure(entity) {
  return request({
    url: '/saas-smart-village/infrastructure/saveInfrastructure',
    method: 'post',
    data: entity
  })
}

// /infrastructure/updateInfrastructure 更新基础设施数据
function updateInfrastructure(entity) {
  return request({
    url: '/saas-smart-village/infrastructure/updateInfrastructure',
    method: 'post',
    data: entity
  })
}

// /infrastructure/getInfrastructureById 获取基础设施信息
function getInfrastructureById(articleId) {
  return request({
    url: '/saas-smart-village/infrastructure/getInfrastructureById',
    method: 'post',
    params: {
      articleId
    }
  })
}

// /infrastructure/logicRemoveInfrastructure 主键逻辑删除基础设施
function logicRemoveInfrastructure(entity) {
  return request({
    url: '/saas-smart-village/infrastructure/logicRemoveInfrastructure',
    method: 'post',
    data: entity
  })
}

// /infrastructure/removeBatchInfrastructure  批量删除基础设施
function removeBatchInfrastructure(entity) {
  return request({
    url: '/saas-smart-village/infrastructure/removeBatchInfrastructure',
    method: 'post',
    data: entity
  })
}

export default {
  listInfrastructure,
  saveInfrastructure,
  updateInfrastructure,
  getInfrastructureById,
  logicRemoveInfrastructure,
  removeBatchInfrastructure
}
