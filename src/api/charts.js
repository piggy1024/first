import request from '@/utils/request'

export function getChartData() {
  return request({
    // 用这种方式直接走的是
    url: '/charts/one',
    method: 'get'

  })
}
