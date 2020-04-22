import dataCodeService from '@/api/DataCodeService'

export default {
  data() {
    return {
      otherQueryParams: {
        page: 1,
        pageSize: 10
      },
      dataListLoading: true,
      selection: [],
      pwdDialog: {
        isShow: false,
        loading: false
      }
    }
  },
  created() {
    console.log('mixin created!')
    this.fetchTableDataList()
  },
  methods: {
    // reset高级搜索
    resetQueryParams() {
      console.log(this.advanceQueryParams)
      if (this.advanceQueryParams) {
        Object.keys(this.advanceQueryParams).forEach(key => {
          console.log('key: ', key)
          this.$set(this.advanceQueryParams, key, null)
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
    },
    getEntity(flag) {
      let entity = {}
      if (this.isHeightLevel) {
        entity = this.getAdvanceEntity()
      } else {
        entity = this.getFastEntity()
      }
      return {
        ...entity,
        page: flag === 'submit' ? 1 : this.otherQueryParams.page,
        pageSize: this.otherQueryParams.pageSize
      }
    },
    // flag === 'submit' 是代表时重新搜索，需要将page置为1
    fetchTableDataList(flag) {
      this.dataListLoading = true
      const Entity = this.getEntity(flag)
      // 清空table的selection
      if (this.$refs.dataListTable) {
        this.$refs.dataListTable.clearSelection()
        this.selection = []
      }
      this.fetchTableDataListPromise(Entity).then((res) => {
        this.dataList = res.dataList
        this.totalRecord = res.totalRecord
      }).finally(() => {
        this.dataListLoading = false
      })
    },
    sizeChangeHandler(pageSize) {
      this.otherQueryParams.pageSize = pageSize
      this.fetchTableDataList()
    },
    currentChangeHandler(currentPage) {
      this.otherQueryParams.page = currentPage
      this.fetchTableDataList()
    },
    // 根据dataCode从后台拿字典
    getSelectOptions(dataCodeArr) {
      // 从接口获取select中的options选项， 传入一个数组
      if (dataCodeArr) {
        dataCodeArr.forEach(type => {
          dataCodeService.getDataCodeByCodeCategory(type).then(ret => {
            this.$set(this.selectOptionsMap, type, ret)
          })
        })
      }
    },
    // 批量删除
    // tableRefName: 要删除数据表格的ref；
    batchDelete(tableRefName, prop) {
      if (!this.$refs[tableRefName]) return
      const willDeleteIdsArr = this.$refs[tableRefName].selection.map(s => s[prop])
      if (willDeleteIdsArr.length === 0) {
        this.$message({
          message: '您尚未选择需要删除的数据',
          type: 'warning'
        })
      } else {
        this.pwdDialog.isShow = true // 显示密码输入框
        this.selection = willDeleteIdsArr
      }
    },
    validPwdSuc(closeDialogHandler) {
      this.pwdDialog.loading = true
      if (typeof this.confirmBatchDelete === 'function') {
        // 删除真正执行删除操作
        this.confirmBatchDelete(this.selection).then(_ => {
          // 关闭弹窗
          closeDialogHandler()
          // 更新列表
          this.fetchTableDataList()
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
        }).finally(_ => {
          this.pwdDialog.loading = false
        })
      }
    }
  }
}
