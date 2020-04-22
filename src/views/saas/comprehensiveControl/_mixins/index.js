// import dataCodeService from '@/api/DataCodeService'

export default {
  data() {
    return {
      otherQueryParams: {
        page: 1,
        pageSize: 10
      },
      totalRecord: 0,
      dataList: [],
      multipleSelection: [],
      dialogModifyIsShow: false
    }
  },
  created() {
    // console.log('mixin created!')
    this.fetchTableDataList()
  },
  methods: {
    fetchTableDataList() {
      this.fetchTableDataListPromise({
        ...this.queryParams,
        ...this.otherQueryParams
      }).then((res) => {
        this.dataList = res.dataList
        this.totalRecord = res.totalRecord
      })
    },
    sizeChangeHandler(pageSize) {
      this.otherQueryParams.pageSize = pageSize
      this.fetchTableDataList()
    },
    currentChangeHandler(page) {
      this.otherQueryParams.page = page
      this.fetchTableDataList()
    },
    // getSelectOptions(dataCodeArr) {
    //   // 从接口获取select中的options选项， 传入一个数组
    //   if (dataCodeArr) {
    //     dataCodeArr.forEach(type => {
    //       dataCodeService.getDataCodeByCodeCategory(type).then(ret => {
    //         this.$set(this.selectOptionsMap, type, ret)
    //       })
    //     })
    //   }
    // },

    // 修改弹窗提交
    modifyDialogFormConfirm() {
      this.modifyDialogPromise(this.modifyForm).then(res => {
        this.dialogModifyIsShow = false
        this.fetchTableDataList()
      })
    }
  }
}
