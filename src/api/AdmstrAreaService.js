import request from '@/utils/request'

// /admstrArea/treeChildAdmstrAreaList  获取行政区域所有子节点
function treeChildAdmstrAreaList(admstrAreaId) {
  return request({
    url: '/saas-smart-village/admstrArea/treeChildAdmstrAreaList',
    method: 'post',
    params: {
      admstrAreaId
    }
  })
}

export default {
  treeChildAdmstrAreaList
}
