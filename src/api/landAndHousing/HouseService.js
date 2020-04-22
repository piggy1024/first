import request from '@/utils/request'

// 房屋信息列表查询
function listHouse(entity) {
  return request({
    url: '/saas-smart-village/house/listHouse',
    method: 'post',
    data: entity
  })
}

// 新增房屋信息
function saveHouse(entity) {
  return request({
    url: '/saas-smart-village/house/saveHouse',
    method: 'post',
    data: entity
  })
}

// 更新房屋信息
function updateHouse(entity) {
  return request({
    url: '/saas-smart-village/house/updateHouse',
    method: 'post',
    data: entity
  })
}

// 获取房屋信息
function getHouseById(param) {
  return request({
    url: '/saas-smart-village/house/getHouseById',
    method: 'post',
    params: {
      'houseId': param
    }
  })
}

// 批量删除房屋信息
function removeBatchHouse(ids) {
  return request({
    url: '/saas-smart-village/house/removeBatchHouse',
    method: 'post',
    data: ids
  })
}

export default {
  listHouse,
  saveHouse,
  updateHouse,
  getHouseById,
  removeBatchHouse
}
