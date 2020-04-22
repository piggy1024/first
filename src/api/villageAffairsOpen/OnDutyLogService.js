import request from '@/utils/request'

function saveOnDutyLog(entity) {
  return request({
    url: '/saas-smart-village/onDutyLog/saveOnDutyLog',
    method: 'post',
    data: entity
  })
}

function removeOnDutyLog(entity) {
  return request({
    url: '/saas-smart-village/onDutyLog/removeOnDutyLog',
    method: 'post',
    data: entity
  })
}

function updateOnDutyLog(entity) {
  return request({
    url: '/saas-smart-village/onDutyLog/updateOnDutyLog',
    method: 'post',
    data: entity
  })
}

// /onDutyLog/removeBatchOnDutyLog  批量删除值班日志
function removeBatchOnDutyLog(entity) {
  return request({
    url: '/saas-smart-village/onDutyLog/removeBatchOnDutyLog',
    method: 'post',
    data: entity
  })
}

function getOnDutyLogById(onDutyLogId) {
  return request({
    url: '/saas-smart-village/onDutyLog/getOnDutyLogById',
    method: 'post',
    params: { onDutyLogId }
  })
}

function listOnDutyLog(queryParam) {
  return request({
    url: '/saas-smart-village/onDutyLog/listOnDutyLog',
    method: 'post',
    data: queryParam
  })
}

export default {
  saveOnDutyLog,
  removeOnDutyLog,
  updateOnDutyLog,
  getOnDutyLogById,
  listOnDutyLog,
  removeBatchOnDutyLog
}
