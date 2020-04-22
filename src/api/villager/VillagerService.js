import request from '@/utils/request'

// 村民列表高级查询
function listVillagerByAdvanced(entity) {
  return request({
    url: '/saas-smart-village/villager/listVillagerByAdvanced',
    method: 'post',
    data: entity
  })
}

// 新增村民
function saveVillager(entity) {
  return request({
    url: '/saas-smart-village/villager/saveVillager',
    method: 'post',
    data: entity
  })
}

// 获取村民信息详情
function getVillagerById(villagerId) {
  return request({
    url: '/saas-smart-village/villager/getVillagerById',
    method: 'post',
    params: { villagerId }
  })
}

// 获取村民信息详情2
function acquireVillagerById(villagerId) {
  return request({
    url: '/saas-smart-village/villager/acquireVillagerById',
    method: 'post',
    params: { villagerId }
  })
}

// 编辑/更新村民
function updateVillager(entity) {
  return request({
    url: '/saas-smart-village/villager/updateVillager',
    method: 'post',
    data: entity
  })
}

// 获取行政区域信息以及子节点信息
function admstrAreaById(admstrAreaId) {
  return request({
    url: '/saas-smart-village/villager/admstrAreaById',
    method: 'post',
    params: { admstrAreaId }
  })
}

// 村民相关
export default {
  listVillagerByAdvanced,
  saveVillager,
  getVillagerById,
  acquireVillagerById,
  updateVillager,
  admstrAreaById
}
