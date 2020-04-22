import request from '@/utils/request'

// /villageCadre/getVillageCadreById  获取村干部信息
function getVillageCadreById(entity) {
  return request({
    url: '/saas-smart-village/villageCadre/getVillageCadreById',
    method: 'post',
    data: entity
  })
}

// /villageCadre/listVillageCadre  列表分页查询村干部信息
function listVillageCadre(entity) {
  return request({
    url: '/saas-smart-village/villageCadre/listVillageCadre',
    method: 'post',
    data: entity
  })
}

// /villageCadre/logicRemoveVillageCadre  主键逻辑删除村干部
function logicRemoveVillageCadre(entity) {
  return request({
    url: '/saas-smart-village/villageCadre/logicRemoveVillageCadre',
    method: 'post',
    data: entity
  })
}

// /villageCadre/removeBatchVillageCadre  批量删除村干部
function removeBatchVillageCadre(entity) {
  return request({
    url: '/saas-smart-village/villageCadre/removeBatchVillageCadre',
    method: 'post',
    data: entity
  })
}

// /villageCadre/saveVillageCadre  新增村干部
function saveVillageCadre(entity) {
  return request({
    url: '/saas-smart-village/villageCadre/saveVillageCadre',
    method: 'post',
    data: entity
  })
}

// /villageCadre/updateVillageCadre  更新村干部数据
function updateVillageCadre(entity) {
  return request({
    url: '/saas-smart-village/villageCadre/updateVillageCadre',
    method: 'post',
    data: entity
  })
}

export default {
  getVillageCadreById,
  listVillageCadre,
  logicRemoveVillageCadre,
  removeBatchVillageCadre,
  saveVillageCadre,
  updateVillageCadre
}
