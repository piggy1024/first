import request from '@/utils/request'

// /templateDocument/getTemplateDocumentById  获取模板文档信息
function getTemplateDocumentById(templateDocumentId) {
  return request({
    url: '/saas-smart-village/templateDocument/getTemplateDocumentById',
    method: 'post',
    params: { templateDocumentId }
  })
}

// /templateDocument/listTemplateDocument  列表分页查询模板文档信息
function listTemplateDocument(entity) {
  return request({
    url: '/saas-smart-village/templateDocument/listTemplateDocument',
    method: 'post',
    data: entity
  })
}

// /templateDocument/logicRemoveTemplateDocument  主键逻辑删除模板文档
function logicRemoveTemplateDocument(entity) {
  return request({
    url: '/saas-smart-village/templateDocument/logicRemoveTemplateDocument',
    method: 'post',
    data: entity
  })
}

// /templateDocument/removeBatchTemplateDocument  批量删除模板文档
function removeBatchTemplateDocument(entity) {
  return request({
    url: '/saas-smart-village/templateDocument/removeBatchTemplateDocument',
    method: 'post',
    data: entity
  })
}

// /templateDocument/saveTemplateDocument  新增模板文档
function saveTemplateDocument(entity) {
  return request({
    url: '/saas-smart-village/templateDocument/saveTemplateDocument',
    method: 'post',
    data: entity
  })
}

// /templateDocument/updateTemplateDocument  更新模板文档数据
function updateTemplateDocument(entity) {
  return request({
    url: '/saas-smart-village/templateDocument/updateTemplateDocument',
    method: 'post',
    data: entity
  })
}

export default {
  getTemplateDocumentById,
  listTemplateDocument,
  logicRemoveTemplateDocument,
  removeBatchTemplateDocument,
  saveTemplateDocument,
  updateTemplateDocument
}
