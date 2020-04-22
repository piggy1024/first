import request from '@/utils/request'

function innerLogin(entity) {
  return request({
    url: '/paas-iam/innerLogin',
    method: 'post',
    data: entity
  })
}

function getUserSession(entity) {
  return request({
    url: '/paas-iam/getUserSession',
    method: 'post',
    data: entity
  })
}

export default {
  innerLogin,
  getUserSession
}
