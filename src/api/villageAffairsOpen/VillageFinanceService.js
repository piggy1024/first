// VillageFinance
// 村及财务
import request from '@/utils/request'

// 列表
function listVillageFinance(entity) {
  return request({
    url: '/saas-smart-village/villageFinance/listVillageFinance',
    method: 'post',
    data: entity
  })
}

// /villageFinance/getVillageFinanceById  获取村级财务信息
function getVillageFinanceById(entity) {
  return request({
    url: '/saas-smart-village/villageFinance/getVillageFinanceById',
    method: 'post',
    data: entity
  })
}

// /villageFinance/logicRemoveVillageFinance  主键逻辑删除村级财务
function logicRemoveVillageFinance(entity) {
  return request({
    url: '/saas-smart-village/villageFinance/logicRemoveVillageFinance',
    method: 'post',
    data: entity
  })
}

// /villageFinance/removeBatchVillageFinance  批量删除村级财务
function removeBatchVillageFinance(entity) {
  return request({
    url: '/saas-smart-village/villageFinance/removeBatchVillageFinance',
    method: 'post',
    data: entity
  })
}

// /villageFinance/saveVillageFinance  新增村级财务
function saveVillageFinance(entity) {
  return request({
    url: '/saas-smart-village/villageFinance/saveVillageFinance',
    method: 'post',
    data: entity
  })
}

// /villageFinance/updateVillageFinance  更新村级财务数据
function updateVillageFinance(entity) {
  return request({
    url: '/saas-smart-village/villageFinance/updateVillageFinance',
    method: 'post',
    data: entity
  })
}

export default {
  listVillageFinance,
  getVillageFinanceById,
  logicRemoveVillageFinance,
  removeBatchVillageFinance,
  saveVillageFinance,
  updateVillageFinance
}
