// 村务台账
import request from '@/utils/request'

// 列表
function listVillageAffairs(entity) {
  return request({
    url: '/saas-smart-village/villageAffairs/listVillageAffairs',
    method: 'post',
    data: entity
  })
}

// 新增 /villageAffairs/saveVillageAffairs
function saveVillageAffairs(entity) {
  return request({
    url: '/saas-smart-village/villageAffairs/saveVillageAffairs',
    method: 'post',
    data: entity
  })
}

// 更新村务数据 /villageAffairs/updateVillageAffairs
function updateVillageAffairs(entity) {
  return request({
    url: '/saas-smart-village/villageAffairs/updateVillageAffairs',
    method: 'post',
    data: entity
  })
}

// 获取村务信息 /villageAffairs/getVillageAffairsById
function getVillageAffairsById(villageAffairsId) {
  return request({
    url: '/saas-smart-village/villageAffairs/getVillageAffairsById',
    method: 'post',
    params: {
      villageAffairsId
    }
  })
}
// /villageAffairs/deleteAcceptThingPicture 删除村务受理事项图
function deleteAcceptThingPicture(villageAffairsId) {
  return request({
    url: '/saas-smart-village/villageAffairs/deleteAcceptThingPicture',
    method: 'post',
    params: {
      villageAffairsId
    }
  })
}

// /villageAffairs/removeBatchVillageAffairs  批量删除村务
function removeBatchVillageAffairs(entity) {
  return request({
    url: '/saas-smart-village/villageAffairs/removeBatchVillageAffairs ',
    method: 'post',
    data: entity
  })
}

export default {
  listVillageAffairs,
  saveVillageAffairs,
  updateVillageAffairs,
  getVillageAffairsById,
  deleteAcceptThingPicture,
  removeBatchVillageAffairs
}
