// 本mixin主要处理提交文章是一些需要反显或者必须的参数
import dataCodeService from '@/api/DataCodeService'
export default {
  created() {
    // mixin内方法限执行
    // this.formDataInit()
  },
  methods: {
    formDataInit() {},
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
    }
  }
}
