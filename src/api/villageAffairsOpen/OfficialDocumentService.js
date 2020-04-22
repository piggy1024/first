// 基础设施服务
import request from '@/utils/request'

// 列表
function listOfficialDocument(entity) {
  return request({
    url: '/saas-smart-village/officialDocument/listOfficialDocument',
    method: 'post',
    data: entity
  })
}

// /officialDocument/confirmSignature  确认签收
function confirmSignature(entity) {
  return request({
    url: '/saas-smart-village/officialDocument/confirmSignature',
    method: 'post',
    data: entity
  })
}

// /officialDocument/getOfficialDocumentById  获取政府文件信息
function getOfficialDocumentById(articleId) {
  return request({
    url: '/saas-smart-village/officialDocument/getOfficialDocumentById',
    method: 'post',
    params: { articleId }
  })
}

// /officialDocument/logicRemoveOfficialDocument  主键逻辑删除政府文件
function logicRemoveOfficialDocument(entity) {
  return request({
    url: '/saas-smart-village/officialDocument/logicRemoveOfficialDocument',
    method: 'post',
    data: entity
  })
}

// /officialDocument/removeBatchOfficialDocument  批量删除政府文件
function removeBatchOfficialDocument(entity) {
  return request({
    url: '/saas-smart-village/officialDocument/removeBatchOfficialDocument',
    method: 'post',
    data: entity
  })
}

// /officialDocument/replyOfficialDocument  回复
function replyOfficialDocument(entity) {
  return request({
    url: '/saas-smart-village/officialDocument/replyOfficialDocument',
    method: 'post',
    data: entity
  })
}

// /officialDocument/saveDraftOfficialDocument  保存草稿
function saveDraftOfficialDocument(entity) {
  return request({
    url: '/saas-smart-village/officialDocument/saveDraftOfficialDocument',
    method: 'post',
    data: entity
  })
}

// /officialDocument/saveOfficialDocument  收文登记
function saveOfficialDocument(entity) {
  return request({
    url: '/saas-smart-village/officialDocument/saveOfficialDocument',
    method: 'post',
    data: entity
  })
}

export default {
  listOfficialDocument,
  confirmSignature,
  getOfficialDocumentById,
  logicRemoveOfficialDocument,
  removeBatchOfficialDocument,
  replyOfficialDocument,
  saveDraftOfficialDocument,
  saveOfficialDocument
}
