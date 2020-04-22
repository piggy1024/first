import request from '@/utils/request'

// 列表信息
function listLandContract(entity) {
  return request({
    url: '/saas-smart-village/landContract/listLandContract',
    method: 'post',
    data: entity
  })
}

// 获取承包详情
function getLandContractById(landContractId) {
  return request({
    url: '/saas-smart-village/landContract/getLandContractById',
    method: 'post',
    params: {
      landContractId
    }
  })
}

// 新增承包
function saveLandContract(entity) {
  return request({
    url: '/saas-smart-village/landContract/saveLandContract',
    method: 'post',
    data: entity
  })
}

// 更新承包
function updateLandContract(entity) {
  return request({
    url: '/saas-smart-village/landContract/updateLandContract',
    method: 'post',
    data: entity
  })
}

// 批量删除
function removeBatchLandContract(list) {
  return request({
    url: '/saas-smart-village/landContract/removeBatchLandContract',
    method: 'post',
    data: list
  })
}

export default {
  listLandContract,
  getLandContractById,
  saveLandContract,
  updateLandContract,
  removeBatchLandContract
}
