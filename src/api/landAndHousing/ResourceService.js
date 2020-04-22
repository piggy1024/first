import request from '@/utils/request'

// 土地资源列表
function listResource(entity) {
  return request({
    url: '/saas-smart-village/resource/listResource',
    method: 'post',
    data: entity
  })
}

// 获取土地资源详情
function getResourceById(resourceId) {
  return request({
    url: '/saas-smart-village/resource/getResourceById',
    method: 'post',
    params: {
      resourceId
    }
  })
}

// 新增
function saveResource(entity) {
  return request({
    url: '/saas-smart-village/resource/saveResource',
    method: 'post',
    data: entity
  })
}

// 修改
function updateResource(entity) {
  return request({
    url: '/saas-smart-village/resource/updateResource',
    method: 'post',
    data: entity
  })
}

// 批量删除
function removeBatchResource(list) {
  return request({
    url: '/saas-smart-village/resource/removeBatchResource',
    method: 'post',
    data: list
  })
}

export default {
  listResource,
  getResourceById,
  saveResource,
  updateResource,
  removeBatchResource
}
