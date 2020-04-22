import request from '@/utils/request'

function listDarsGoodsPractitioners(entity) {
  return request({
    url: '/saas-smart-village/darsGoodsPractitioners/listDarsGoodsPractitioners',
    method: 'post',
    data: entity
  })
}

function updateDarsGoodsPractitioners(entity) {
  return request({
    url: '/saas-smart-village/darsGoodsPractitioners/updateDarsGoodsPractitioners',
    method: 'post',
    data: entity
  })
}

export default {
  listDarsGoodsPractitioners,
  updateDarsGoodsPractitioners
}
