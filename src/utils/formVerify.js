
// 身份证号
function idCardNumber(rule, value, callback) {
  const ruleR = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  if (!value) {
    return callback(new Error('请输入身份证号'))
  }
  if (!ruleR.test(value)) {
    return callback(new Error('身份证号错误，请核对输入'))
  }
  callback()
}
export {
  idCardNumber
}
