import request from '@/utils/request'

// /lawPopularization/getLawPopularizationById  获取普法宣传信息
function getLawPopularizationById(articleId) {
  return request({
    url: '/saas-smart-village/lawPopularization/getLawPopularizationById',
    method: 'post',
    params: { articleId }
  })
}

// /lawPopularization/listLawPopularization  列表分页查询普法宣传信息
function listLawPopularization(entity) {
  return request({
    url: '/saas-smart-village/lawPopularization/listLawPopularization',
    method: 'post',
    data: entity
  })
}

// /lawPopularization/logicRemoveLawPopularization  主键逻辑删除普法宣传
function logicRemoveLawPopularization(entity) {
  return request({
    url: '/saas-smart-village/lawPopularization/logicRemoveLawPopularization',
    method: 'post',
    data: entity
  })
}

// /lawPopularization/removeBatchLawPopularization  批量删除普法宣传
function removeBatchLawPopularization(entity) {
  return request({
    url: '/saas-smart-village/lawPopularization/removeBatchLawPopularization',
    method: 'post',
    data: entity
  })
}

// /lawPopularization/saveLawPopularization  新增普法宣传
function saveLawPopularization(entity) {
  return request({
    url: '/saas-smart-village/lawPopularization/saveLawPopularization',
    method: 'post',
    data: entity
  })
}

// /lawPopularization/updateLawPopularization  更新普法宣传数据
function updateLawPopularization(entity) {
  return request({
    url: '/saas-smart-village/lawPopularization/updateLawPopularization',
    method: 'post',
    data: entity
  })
}

export default {
  getLawPopularizationById,
  listLawPopularization,
  logicRemoveLawPopularization,
  removeBatchLawPopularization,
  saveLawPopularization,
  updateLawPopularization
}
