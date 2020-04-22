import request from '@/utils/request'

function listLeftBehindChildren(entity) {
  return request({
    url: '/saas-smart-village/leftBehindChildren/listLeftBehindChildren',
    method: 'post',
    data: entity
  })
}

// 留守儿童
export default {
  listLeftBehindChildren
}
