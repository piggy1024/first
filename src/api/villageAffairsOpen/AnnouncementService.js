// 基础设施服务 AnnouncementService
import request from '@/utils/request'

// 列表
function listAnnouncement(entity) {
  return request({
    url: '/saas-smart-village/announcement/listAnnouncement',
    method: 'post',
    data: entity
  })
}

// /announcement/getAnnouncementById 获取公告信息
function getAnnouncementById(announcementId) {
  return request({
    url: '/saas-smart-village/announcement/getAnnouncementById',
    method: 'post',
    params: { announcementId }
  })
}

// /announcement/removeBatchAnnouncement 批量删除公告
function removeBatchAnnouncement(entity) {
  return request({
    url: '/saas-smart-village/announcement/removeBatchAnnouncement',
    method: 'post',
    data: entity
  })
}

// /announcement/saveAnnouncement 新增公告
function saveAnnouncement(entity) {
  return request({
    url: '/saas-smart-village/announcement/saveAnnouncement',
    method: 'post',
    data: entity
  })
}

// /announcement/updateAnnouncement 更新公告数据
function updateAnnouncement(entity) {
  return request({
    url: '/saas-smart-village/announcement/updateAnnouncement',
    method: 'post',
    data: entity
  })
}

export default {
  listAnnouncement,
  getAnnouncementById,
  removeBatchAnnouncement,
  saveAnnouncement,
  updateAnnouncement
}
