import request from '@/utils/request'

function listFocusCrowdDetail(entity) {
  return request({
    url: '/saas-smart-village/focusCrowdDetail/listFocusCrowdDetail',
    method: 'post',
    data: entity
  })
}

// 重点人群
export default {
  listFocusCrowdDetail
}
