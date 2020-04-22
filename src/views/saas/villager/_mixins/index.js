import dataCodeService from '@/api/DataCodeService'

export default {
  data() {
    return {
      // otherQueryParams: {
      //   page: 1,
      //   pageSize: 10
      // },
      // totalRecord: 0,
      // dataList: [],
      // multipleSelection: []
    }
  },
  created() {
    // this.fetchTableDataList()
  },
  methods: {
    // 获取列表数据
    // fetchTableDataList() {
    //   const HEIGHT_LEVEL_PARAMS = this.isHeightLevel ? this.heightLevelParams : {}
    //   this.fetchTableDataListPromise({
    //     ...this.queryParams,
    //     ...this.otherQueryParams,
    //     ...HEIGHT_LEVEL_PARAMS
    //   }).then((res) => {
    //     this.dataList = res.dataList
    //     this.totalRecord = res.totalRecord
    //   })
    // },
    // 重置查询参数
    // resetQueryParams() {
    //   // console.log(this.advanceQueryParams)
    //   if (this.heightLevelParams) {
    //     Object.keys(this.heightLevelParams).forEach(key => {
    //       console.log('key: ', key)
    //       this.$set(this.heightLevelParams, key, null)
    //     })
    //   }
    // },
    // 页数大小设置
    // sizeChangeHandler(pageSize) {
    //   this.otherQueryParams.pageSize = pageSize
    //   this.fetchTableDataList()
    // },
    // 分页跳转
    // currentChangeHandler(page) {
    //   this.otherQueryParams.page = page
    //   this.fetchTableDataList()
    // },
    // 从接口获取select中的options选项， 传入一个数组
    getSelectOptions(dataCodeArr) {
      if (dataCodeArr) {
        dataCodeArr.forEach(type => {
          dataCodeService.getDataCodeByCodeCategory(type).then(ret => {
            this.$set(this.selectOptionsMap, type, ret)
          })
        })
      }
    },
    // 格式化表格中的dataCode，将dataCode转换为对应的中文描述
    formatColumn(type, type2) {
      return (row) => {
        const args = type.split('.')
        const v = args.reduce((t, c) => t[c], row) // row[type]
        const v2 = this.selectOptionsMap[type2 || type].filter(op => op.dataCode === v)
        const ret = v2.length > 0 ? v2[0]['meaning'] : ''
        return ret
      }
    }
  }
}
