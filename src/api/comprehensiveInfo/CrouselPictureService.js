import request from '@/utils/request'

// /carouselPicture/getCarouselPictureById  获取轮播图信息
function getCarouselPictureById(entity) {
  return request({
    url: '/saas-smart-village/carouselPicture/getCarouselPictureById',
    method: 'post',
    data: entity
  })
}

// /carouselPicture/listCarouselPicture  列表分页查询轮播图信息
function listCarouselPicture(entity) {
  return request({
    url: '/saas-smart-village/carouselPicture/listCarouselPicture',
    method: 'post',
    data: entity
  })
}

// /carouselPicture/logicRemoveCarouselPicture  主键逻辑删除轮播图
function logicRemoveCarouselPicture(entity) {
  return request({
    url: '/saas-smart-village/carouselPicture/logicRemoveCarouselPicture',
    method: 'post',
    data: entity
  })
}

// /carouselPicture/removeBatchCarouselPicture  批量删除轮播图
function removeBatchCarouselPicture(entity) {
  return request({
    url: '/saas-smart-village/carouselPicture/removeBatchCarouselPicture',
    method: 'post',
    data: entity
  })
}

// /carouselPicture/saveCarouselPicture  新增轮播图
function saveCarouselPicture(entity) {
  return request({
    url: '/saas-smart-village/carouselPicture/saveCarouselPicture',
    method: 'post',
    data: entity
  })
}

// /carouselPicture/updateCarouselPicture  更新轮播图数据
function updateCarouselPicture(entity) {
  return request({
    url: '/saas-smart-village/carouselPicture/updateCarouselPicture',
    method: 'post',
    data: entity
  })
}

export default {
  getCarouselPictureById,
  listCarouselPicture,
  logicRemoveCarouselPicture,
  removeBatchCarouselPicture,
  saveCarouselPicture,
  updateCarouselPicture
}
