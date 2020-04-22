import request from '@/utils/request'

// /tempResidePerson/getTempResidePersonById  获取暂住人员信息
function getTempResidePersonById(entity) {
  return request({
    url: '/saas-smart-village/tempResidePerson/getTempResidePersonById',
    method: 'post',
    params: entity
  })
}

// /tempResidePerson/listTempResidePerson  列表分页查询暂住人员信息
function listTempResidePerson(entity) {
  return request({
    url: '/saas-smart-village/tempResidePerson/listTempResidePerson',
    method: 'post',
    data: entity
  })
}

// /tempResidePerson/removeBatchTempResidePerson  批量删除暂住人员
function removeBatchTempResidePerson(entity) {
  return request({
    url: '/saas-smart-village/tempResidePerson/removeBatchTempResidePerson',
    method: 'post',
    data: entity
  })
}

// /tempResidePerson/removeTempResidePerson  主键逻辑删除暂住人员
function removeTempResidePerson(entity) {
  return request({
    url: '/saas-smart-village/tempResidePerson/removeTempResidePerson',
    method: 'post',
    data: entity
  })
}

// /tempResidePerson/saveTempResidePerson  新增暂住人员
function saveTempResidePerson(entity) {
  return request({
    url: '/saas-smart-village/tempResidePerson/saveTempResidePerson',
    method: 'post',
    data: entity
  })
}

// /tempResidePerson/updateTempResidePerson  更新暂住人员数据
function updateTempResidePerson(entity) {
  return request({
    url: '/saas-smart-village/tempResidePerson/updateTempResidePerson',
    method: 'post',
    data: entity
  })
}

export default {
  getTempResidePersonById,
  listTempResidePerson,
  removeBatchTempResidePerson,
  removeTempResidePerson,
  saveTempResidePerson,
  updateTempResidePerson
}
