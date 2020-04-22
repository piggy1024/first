import request from '@/utils/request'

// 根据户ID和年份筛选经济产物信息
function listEconomicProductById(entity) {
  return request({
    url: '/saas-smart-village/economicProduct/listEconomicProductById',
    method: 'post',
    params: entity
  })
}

// 经济产物
export default {
  listEconomicProductById
}
