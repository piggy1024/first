// 通知公告 NoticeService
import request from '@/utils/request'

// 列表
function listNotice(entity) {
  return request({
    url: '/saas-smart-village/notice/listNotice',
    method: 'post',
    data: entity
  })
}

// /notice/getNoticeById  获取通知信息
function getNoticeById(articleId) {
  return request({
    url: '/saas-smart-village/notice/getNoticeById',
    method: 'post',
    params: { articleId }
  })
}

// /notice/logicRemoveNotice  主键逻辑删除通知
function logicRemoveNotice(entity) {
  return request({
    url: '/saas-smart-village/notice/logicRemoveNotice',
    method: 'post',
    data: entity
  })
}

// /notice/removeBatchNotice  批量删除通知
function removeBatchNotice(entity) {
  return request({
    url: '/saas-smart-village/notice/removeBatchNotice',
    method: 'post',
    data: entity
  })
}

// /notice/saveNotice  新增通知
function saveNotice(entity) {
  return request({
    url: '/saas-smart-village/notice/saveNotice',
    method: 'post',
    data: entity
  })
}

// /notice/updateNotice  更新通知数据
function updateNotice(entity) {
  return request({
    url: '/saas-smart-village/notice/updateNotice',
    method: 'post',
    data: entity
  })
}

export default {
  listNotice,
  getNoticeById,
  logicRemoveNotice,
  removeBatchNotice,
  saveNotice,
  updateNotice
}
