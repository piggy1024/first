import request from '@/utils/request'

// /village/getVillageById  获取村级信息
function getVillageById(villageId) {
  return request({
    url: '/saas-smart-village/village/getVillageById',
    method: 'post',
    params: { villageId }
  })
}

// /village/listVillage  列表分页查询村级信息
function listVillage(entity) {
  return request({
    url: '/saas-smart-village/village/listVillage',
    method: 'post',
    data: entity
  })
}

// /village/logicRemoveVillage  主键逻辑删除村级
function logicRemoveVillage(entity) {
  return request({
    url: '/saas-smart-village/village/logicRemoveVillage',
    method: 'post',
    data: entity
  })
}

// /village/removeBatchVillage  批量删除村级
function removeBatchVillage(entity) {
  return request({
    url: '/saas-smart-village/village/removeBatchVillage',
    method: 'post',
    data: entity
  })
}

// /village/saveVillage  新增村级
function saveVillage(entity) {
  return request({
    url: '/saas-smart-village/village/saveVillage',
    method: 'post',
    data: entity
  })
}

// /village/updateVillage  更新村级数据
function updateVillage(entity) {
  return request({
    url: '/saas-smart-village/village/updateVillage',
    method: 'post',
    data: entity
  })
}

export default {
  getVillageById,
  listVillage,
  logicRemoveVillage,
  removeBatchVillage,
  saveVillage,
  updateVillage
}
