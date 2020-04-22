import request from '@/utils/request'

// 临时保存文件
function tempSaveFile(entity) {
  return request({
    url: '/paas-file/file/tempSaveFile',
    method: 'post',
    data: entity
  })
}

// 提交文件
function commitSaveFile(fileId) {
  return request({
    url: '/paas-file/file/commitSaveFile',
    method: 'post',
    params: { fileId }
  })
}

// 批量提交
// /file/commitSaveFileList
function commitSaveFileList(fileIdList) {
  return request({
    url: '/paas-file/file/commitSaveFileList',
    method: 'post',
    data: fileIdList
  })
}

// 获取文件
function getFile(fileId) {
  return request({
    url: '/paas-file/file/getFile',
    method: 'get',
    params: { fileId }
  })
}

export default {
  tempSaveFile,
  commitSaveFile,
  getFile,
  commitSaveFileList
}
