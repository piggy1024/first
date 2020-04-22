import md5 from 'js-md5'
import configs from './config'

const SALT_VALUE = '6d23bdf8778059eb08982f04bdbf502e'

function md5Pwd(param) {
  return md5(md5(param) + SALT_VALUE)
}

function generateImgPath(imgId) {
  return `/paas-file/file/getFile?fileId=${imgId}`
}

const userInfo = {}

export default {
  userInfo,
  md5Pwd,
  configs,
  generateImgPath
}
