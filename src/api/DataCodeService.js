import request from '@/utils/request'

// 根据字段查询枚举数据代码
function getDataCodeByCodeCategory(param) {
  return request({
    url: '/saas-smart-village/dataCode/getDataCodeByCodeCategory',
    method: 'post',
    params: {
      'dataCodeCategory': param
    }
  })
}

export default {
  getDataCodeByCodeCategory
}
