// 村民留言
import request from '@/utils/request'

// 列表
function listLeaveMsg(entity) {
  return request({
    url: '/saas-smart-village/leaveMsg/listLeaveMsg',
    method: 'post',
    data: entity
  })
}

// 根据id获取留言信息
function getLeaveMsgById(leaveMsgId) {
  return request({
    url: '/saas-smart-village/leaveMsg/getLeaveMsgById',
    method: 'post',
    params: {
      leaveMsgId
    }
  })
}

// 新增回复
function replyLeaveMsg(entity) {
  return request({
    url: '/saas-smart-village/leaveMsg/replyLeaveMsg',
    method: 'post',
    data: entity
  })
}

// 修改回复内容
function updateLeaveMsg(entity) {
  return request({
    url: '/saas-smart-village/leaveMsg/updateLeaveMsg',
    method: 'post',
    data: entity
  })
}

// /leaveMsg/removeBatchLeaveMsg 批量删除留言
function removeBatchLeaveMsg(entity) {
  return request({
    url: '/saas-smart-village/leaveMsg/removeBatchLeaveMsg',
    method: 'post',
    data: entity
  })
}

export default {
  listLeaveMsg,
  getLeaveMsgById,
  replyLeaveMsg,
  updateLeaveMsg,
  removeBatchLeaveMsg
}
