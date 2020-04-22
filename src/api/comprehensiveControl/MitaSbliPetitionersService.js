import request from '@/utils/request'

function listMitaSbliPetitioners(entity) {
  return request({
    url: '/saas-smart-village/mitaSbliPetitioners/listMitaSbliPetitioners',
    method: 'post',
    data: entity
  })
}

function updateMitaSbliPetitioners(entity) {
  return request({
    url: '/saas-smart-village/mitaSbliPetitioners/updateMitaSbliPetitioners',
    method: 'post',
    data: entity
  })
}

// 涉维稳上访
export default {
  listMitaSbliPetitioners,
  updateMitaSbliPetitioners
}
