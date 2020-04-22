<template>
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl cus-jc-end">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="advanceQueryParams.leaveMsgContent" placeholder="普通标题模糊搜索" suffix-icon="el-icon-search"></el-input>
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
          <el-form label-width="70px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="7">
                <el-form-item label="标题">
                  <el-input v-model="advanceQueryParams.leaveMsgContent" placeholder="支持模糊搜索"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="互动类型">
                  <el-select v-model="advanceQueryParams.interactiveType" placeholder="请选择">
                    <el-option
                      v-for="item in selectOptionsMap.interactiveType"
                      :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="留言时间">
                  <el-date-picker
                    v-model="advanceQueryParams.queryDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                    @change="handleDateChange"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="cus-text-right cus-pr-15">
            <el-button type="primary" @click="fetchTableDataList('submit')">搜索</el-button>
            <el-button @click="resetQueryParams()">清空</el-button>
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <div class="result-box">
      <div class="btn-box cus-mb-10">
        <!-- <el-button icon="el-icon-printer">打印</el-button> -->
        <el-button type="danger" icon="el-icon-delete" @click="batchDelete('dataListTable', 'leaveMsgId')">删除</el-button>
      </div>
      <el-table v-loading="dataListLoading" ref="dataListTable" :data="dataList" border class="cus-mb-20">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="leaveMsgContent" label="留言" min-width="200"></el-table-column>
        <el-table-column prop="interactiveType" :formatter="formatColumn('interactiveType')" label="互动类型" min-width="150"></el-table-column>
        <el-table-column prop="replyContent" label="回复" min-width="150"></el-table-column>
        <el-table-column prop="leaveMsgTime" label="留言时间" width="130">
          <template slot-scope="scope">
            {{scope.row.leaveMsgTime | parseTime('{y}-{m}-{d}')}}
          </template>
        </el-table-column>
        <el-table-column prop="replyTime" label="回复时间" width="130">
          <template slot-scope="scope">
            {{scope.row.replyTime | parseTime('{y}-{m}-{d}')}}
          </template>
        </el-table-column>
        <el-table-column prop="villageCadre.villager.person.name" label="回复人" width="120"></el-table-column>
        <el-table-column prop="villager.person.name" label="留言人" width="120"></el-table-column>
        <el-table-column prop="villager.villageTeam.name" label="留言人所在村组" min-width="120"></el-table-column>
        <el-table-column prop="enableStatus" :formatter="formatColumn('enableStatus', 'enableStatus1')" label="启动状态" width="120"></el-table-column>
        <!-- fixed="right" -->
        <el-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="replyHandler(scope)"
            >回复</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="$router.push('/villageAffairsOpen/leaveMsgModify/'+scope.row.leaveMsgId)"
            >修改</el-button>
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
  .el-form-item .el-date-editor {
    width: 100%;
  }
  .el-form-item .el-input {
    max-width: 200px;
  }
  .el-form-item .el-date-editor {
    max-width: 400px;
  }
}
</style>

<script>
import LeaveMsgService from '@/api/villageAffairsOpen/LeaveMsgService'
import tableDataQueryMixin from '../_mixins/mixins'
import dataCodeService from '@/api/DataCodeService'
import pwdDialog from '@/components/pwdDialog'

export default {
  mixins: [tableDataQueryMixin],
  components: {
    pwdDialog
  },
  data() {
    return {
      isHeightLevel: false,
      dataList: [],
      tableData: [
        {
          leaveMessage: '建议村东的空地建个篮球场',
          reply: '已收到',
          leaveMessTime: '2020-03-12',
          replyTime: '2020-03-13',
          replyMan: '张三',
          leaveMessMan: '王小虎',
          village: '演示村',
          startStatus: '前后台启用'
        },
        {
          leaveMessage: '村口大婶的养鸡场占用道路',
          reply: '已收到',
          leaveMessTime: '2020-03-15',
          replyTime: '2020-03-15',
          replyMan: '张三',
          leaveMessMan: '李四',
          village: '演示村2',
          startStatus: '前后台启用'
        }
      ],
      options: [
        {
          value: '1',
          label: '村民留言'
        },
        {
          value: '2',
          label: '基础设施'
        },
        {
          value: '3',
          label: '值班日志'
        },
        {
          value: '5',
          label: '村务台账'
        },
        {
          value: '6',
          label: '村规民约'
        }
      ],
      // 以下四个参数是使用tableDataQueryMixin必须的参数
      fastQueryParams: { // 快速搜索参数
        leaveMsgContent: ''
      },
      advanceQueryParams: { // 高级搜索
        leaveMsgContent: '',
        interactiveType: '', // 缺失字段,假定
        queryDate: null,
        startDate: '',
        endDate: ''
      },
      totalRecord: 0,
      selectOptionsMap: { // 用于存储各个select下的options
        enableStatus1: [],
        interactiveType: []
      }
    }
  },
  created() {
    console.log('component created!')
    this.getSelectOptions(['enableStatus1', 'interactiveType'])
  },
  methods: {
    confirmBatchDelete(idArrs) {
      return LeaveMsgService.removeBatchLeaveMsg(idArrs)
    },
    replyHandler(scopeRow) {
      console.log(scopeRow)
      if (scopeRow.replyContent !== '' && scopeRow.replyTime !== '') {
        // 提示只能
        this.$message({
          message: '只能回复未回复的内容！',
          type: 'warning'
        })
        return
      }
      this.$router.push({ path: '/villageAffairsOpen/leaveMsgReply/' + scopeRow.leaveMsgId })
    },
    handleDateChange() {},
    fetchTableDataListPromise(entity) {
      return LeaveMsgService.listLeaveMsg(entity)
    },
    getFastEntity() {
      return {
        leaveMsgContent: this.advanceQueryParams.leaveMsgContent
      }
    },
    getAdvanceEntity() {
      return {
        leaveMsgContent: this.advanceQueryParams.leaveMsgContent,
        interactiveType: this.advanceQueryParams.interactiveType,
        startDate: this.advanceQueryParams.queryDate && this.advanceQueryParams.queryDate[0],
        endDate: this.advanceQueryParams.queryDate && this.advanceQueryParams.queryDate[1]
      }
    },
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
</script>
