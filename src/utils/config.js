const configs = {
  pagination: {
    pageSizes: [10, 15, 20, 25],
    layout: 'total, sizes, prev, pager, next, jumper'
  }
}
configs.pagination.pageSize = configs.pagination.pageSizes[0]

export default {
  ...configs
}
