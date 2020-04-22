<template>
<!-- 值班日志 -->
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl cus-jc-end">
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="advanceQueryParams.onDutyPersonName" placeholder="普通模糊搜索：值班人姓名" suffix-icon="el-icon-search"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn-box">
          <el-button type="primary" @click="fetchTableDataList('submit')">搜索</el-button>
          <el-button
            type="text"
            :icon="isHeightLevel? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            @click="isHeightLevel = !isHeightLevel"
          >高级搜索</el-button>
        </div>
      </div>
      <el-collapse-transition>
        <div class="height-level-box cus-pa-tb-10" v-show="isHeightLevel">
          <el-form label-width="80px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="值班人">
                  <el-input v-model="advanceQueryParams.onDutyPersonName" placeholder="支持模糊搜索"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="值班时间">
                  <el-date-picker
                    v-model="advanceQueryParams.queryDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="cus-text-right cus-pr-15">
            <el-button type="primary" @click="fetchTableDataList('submit')">搜索</el-button>
            <el-button @click="resetQueryParams">清空</el-button>
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <div class="result-box">
      <div class="btn-box cus-mb-10">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="$router.push('/villageAffairsOpen/onDutyLogAdd')">新增</el-button>
        <el-popconfirm
          title="是否确认删除？"
        >
          <el-button slot="reference" type="danger" icon="el-icon-delete" @click="batchDelete('dataListTable', 'onDutyLogId')">删除</el-button>
        </el-popconfirm>
        <el-button type="primary" icon="el-icon-printer">打印</el-button>
      </div>
      <el-table v-loading="dataListLoading" :data="dataList" ref="dataListTable" border class="cus-mb-20" @selection-change="onSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="villageCadre.villager.person.name" label="值班人" width="120"></el-table-column>
        <el-table-column prop="onDutyDate" label="值班日期" width="150">
          <template slot-scope="scope">
            {{scope.row.onDutyDate | parseTime('{y}-{m}-{d} 星期{a}')}}
          </template>
        </el-table-column>
        <el-table-column prop="villageCadre.villager.village.name" label="村组" width="120"></el-table-column>
        <el-table-column label="值班日志图" width="120">
          <template slot-scope="scope">
            <sv-image :sources="[scope.row.onDutyPicture]"></sv-image>
            <!-- <img :src="$global.generateImgPath(scope.row.onDutyPicture)" class="table-column--img" /> -->
          </template>
        </el-table-column>
        <el-table-column prop="onDutySituation" label="值班情况" min-width="120"></el-table-column>
        <el-table-column prop="enableStatus" label="启用状态" :formatter="formatColumn('enableStatus', 'enableStatus1')" width="120"></el-table-column>
        <!-- fixed="right" -->
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="$router.push('/villageAffairsOpen/onDutyLogUpdate?onDutyLogId='+scope.row.onDutyLogId)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChangeHandler"
        @current-change="currentChangeHandler"
        class="cus-text-right"
        :current-page="otherQueryParams.page"
        :page-sizes="$global.configs.pagination.pageSizes"
        :page-size="otherQueryParams.pageSize"
        :layout="$global.configs.pagination.layout"
        :total="totalRecord"
        background
      ></el-pagination>
    </div>
    <pwd-dialog :pwd-dialog="pwdDialog" @success="validPwdSuc"></pwd-dialog>
  </div>
</template>

<style scoped lang="scss">
.height-level-box /deep/ {
  .el-form-item .el-input,
  .el-form-item .el-date-editor.el-input,
  .el-form-item .el-button {
    width: 200px;
  }
}
</style>

<script>
import onDutyLogService from '@/api/villageAffairsOpen/OnDutyLogService'
import tableDataQueryMixin from '../_mixins/mixins'
import pwdDialog from '@/components/pwdDialog'
import svImage from '@/components/svImage/index'

export default {
  mixins: [tableDataQueryMixin],
  components: {
    pwdDialog,
    svImage
  },
  data() {
    return {
      isHeightLevel: false,
      multipleSelection: [],
      queryParam: {
        pageSize: 10,
        page: 1,
        onDutyPersonName: '',
        onDutyDateRange: []
      },
      dataList: [],
      // 以下四个参数是使用tableDataQueryMixin必须的参数
      fastQueryParams: { // 快速搜索参数
        title: ''
      },
      advanceQueryParams: { // 高级搜索
        title: '',
        yearAndMonth: '',
        revenueDirection: '',
        queryDate: null,
        startDate: '',
        endDate: ''
      },
      totalRecord: 0,
      selectOptionsMap: {
        enableStatus1: []
      }
    }
  },
  created() {
    this.queryData({
      pageSize: this.pageSize,
      page: this.page
    })
    this.getSelectOptions(['enableStatus1'])
  },
  methods: {
    confirmBatchDelete(idArrs) {
      return onDutyLogService.removeBatchOnDutyLog(idArrs)
    },
    clearQueryParam: function() {
      this.queryParam.onDutyPersonName = ''
      this.queryParam.onDutyDateRange = []
      this.queryData()
    },
    handleSizeChange(pageSize) {
      this.queryData({ pageSize })
    },
    handleCurrentChange(page) {
      this.queryData({ page })
    },
    queryData: function(aspectParam) {
      // 参数调整
      let { pageSize, page, onDutyDateRange } = this.queryParam
      const { onDutyPersonName } = this.queryParam
      if (!(onDutyDateRange instanceof Array))onDutyDateRange = []
      const [startDate, endDate] = onDutyDateRange
      if (!aspectParam)aspectParam = {}
      const { page: aPage, pageSize: aPagesize } = aspectParam
      page = aPage || page
      pageSize = aPagesize || pageSize

      // 查询后台
      onDutyLogService.listOnDutyLog({
        pageSize,
        page,
        onDutyPersonName,
        startDate,
        endDate
      }).then((res) => {
        this.dataList = res.dataList
        this.totalRecord = res.totalRecord
      })
    },
    onSelectionChange: function(val) {
      if (val) {
        const multipleSelection = []
        for (const item of val) {
          const { onDutyLogId } = item
          multipleSelection.push(onDutyLogId)
        }
        this.multipleSelection = multipleSelection
      }
    },
    removeData: function() {
      if (confirm('是否删除？')) {
        if (this.multipleSelection.length <= 0) {
          alert('没有选择要删除的数据')
          return
        }
        for (const index in this.multipleSelection) {
          if (index === this.multipleSelection.length - 1) {
            onDutyLogService.removeOnDutyLog({
              onDutyLogId: this.multipleSelection[index]
            }).then(() => {
              this.queryData({
                pageSize: this.pageSize,
                page: this.page
              })
            })
          } else {
            onDutyLogService.removeOnDutyLog({
              onDutyLogId: this.multipleSelection[index]
            })
          }
        }
      }
    },
    fetchTableDataListPromise(entity) {
      return onDutyLogService.listOnDutyLog(entity)
    },
    getFastEntity() {
      return {
        onDutyPersonName: this.advanceQueryParams.onDutyPersonName
      }
    },
    getAdvanceEntity() {
      // const YearAndMonth = this.advanceQueryParams.yearAndMonth ? [
      //   new Date(this.advanceQueryParams.yearAndMonth).getFullYear().toString(),
      //   (new Date(this.advanceQueryParams.yearAndMonth).getMonth() + 1).toString()
      // ] : [null, null]

      // return {
      //   page: this.otherQueryParams.page,
      //   pageSize: this.otherQueryParams.pageSize,
      //   noticeType: this.advanceQueryParams.noticeType,
      //   startDate: this.advanceQueryParams.queryDate && this.advanceQueryParams.queryDate[0],
      //   endDate: this.advanceQueryParams.queryDate && this.advanceQueryParams.queryDate[1],
      //   year: YearAndMonth[0],
      //   month: YearAndMonth[1]
      // }
      return {
        onDutyPersonName: this.advanceQueryParams.onDutyPersonName,
        startDate: this.advanceQueryParams.queryDate && this.advanceQueryParams.queryDate[0],
        endDate: this.advanceQueryParams.queryDate && this.advanceQueryParams.queryDate[1]
      }
    }
  }
}
</script>
