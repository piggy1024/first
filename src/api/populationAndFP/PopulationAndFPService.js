import request from '@/utils/request'

// /populationAndFp/getPopulationAndFpById  获取人口计生信息
function getPopulationAndFpById(villagerId) {
  return request({
    url: '/saas-smart-village/populationAndFp/getPopulationAndFpById',
    method: 'post',
    params: { villagerId }
  })
}

// /populationAndFp/listPopulationAndFp  列表分页查询人口计生信息
function listPopulationAndFp(entity) {
  return request({
    url: '/saas-smart-village/populationAndFp/listPopulationAndFp',
    method: 'post',
    data: entity
  })
}

// /populationAndFp/logicRemovePopulationAndFp  主键逻辑删除人口计生
function logicRemovePopulationAndFp(entity) {
  return request({
    url: '/saas-smart-village/populationAndFp/logicRemovePopulationAndFp',
    method: 'post',
    data: entity
  })
}

// /populationAndFp/savePopulationAndFp  新增人口计生
function savePopulationAndFp(entity) {
  return request({
    url: '/saas-smart-village/populationAndFp/savePopulationAndFp',
    method: 'post',
    data: entity
  })
}

// /populationAndFp/updatePopulationAndFp  更新人口计生数据
function updatePopulationAndFp(entity) {
  return request({
    url: '/saas-smart-village/populationAndFp/updatePopulationAndFp',
    method: 'post',
    data: entity
  })
}

export default {
  getPopulationAndFpById,
  listPopulationAndFp,
  logicRemovePopulationAndFp,
  savePopulationAndFp,
  updatePopulationAndFp
}
