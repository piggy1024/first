<template>
  <!-- 村级财务 -->
  <div class="app-container">
    <div :class="{'left-container':true,'show-width': isShowTree}">
      <h4 class="text-center tree-title">
        行政区域树
        <i class="el-icon-d-arrow-left" @click="isShowTree = true"></i>
      </h4>
      <div style="padding:0 10px 10px">
        <el-input placeholder="输入关键字进行过滤"></el-input>
        <el-tree
          class="filter-tree"
          :data="data"
          node-key="id"
          :props="defaultProps"
          @node-click="getCurrentKey()"
          default-expand-all
          ref="tree"
        ></el-tree>
      </div>
    </div>
    <i class="el-icon-d-arrow-right tree-collapse" v-show="isShowTree" @click="isShowTree = false"></i>
    <div class="right-container" :class="{'is-add-margin': !isShowTree}">
      <div class="filter-container cus-bg-fa">
        <p class="filter-title">查询条件</p>
        <div class="filter-box cus-d-fl">
          <el-form :inline="true" class="cus-fl-1 cus-text-right">
            <!-- <el-form-item>
              <el-input
                v-model="tableData.name"
                placeholder="普通模糊搜索：标题"
                suffix-icon="el-icon-search"
              ></el-input>
            </el-form-item>-->
          </el-form>
          <div class="btn-box">
            <!-- <el-button type="primary">搜索</el-button> -->
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
                <el-col :span="7">
                  <el-form-item label="按月统计">
                    <div class="cus-d-fl">
                      <el-date-picker
                        v-model="advanceQueryParams.yearAndMonth"
                        type="month"
                        placeholder="选择月">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="收支方向">
                    <el-select v-model="advanceQueryParams.revenueDirection" placeholder="请选择">
                      <el-option
                        v-for="item in selectOptionsMap.revenueDirection"
                        :key="item.dataCode"
                        :label="item.meaning"
                        :value="item.dataCode"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="cus-text-right cus-pr-15">
              <el-button type="primary" @click="fetchTableDataList()">搜索</el-button>
              <el-button @click="resetQueryParams()">清空</el-button>
            </div>
          </div>
        </el-collapse-transition>
      </div>
      <div class="result-box">
        <div class="btn-box cus-mb-10">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="showDialog(actionTypeMap.ADD)"
          >新增</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="batchDelete('dataListTable', 'financialId')">删除</el-button>
        </div>
        <el-table v-loading="dataListLoading"  :data="dataList" ref="dataListTable" border class="cus-mb-20">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号" width="55"></el-table-column>
          <el-table-column prop="financialDate" label="日期" width="100">
            <template slot-scope="scope">
              {{scope.row.financialDate | parseTime('{y}-{m}-{d}')}}
            </template>
          </el-table-column>
          <el-table-column prop="receiptNo" label="凭证号" min-width="120"></el-table-column>
          <el-table-column prop="descr" label="摘要" min-width="120"></el-table-column>
          <el-table-column prop="amount" label="金额(元)" width="100"></el-table-column>
          <el-table-column prop="revenueDirection" label="收支方向" :formatter="formatColumn('revenueDirection')" min-width="100"></el-table-column>
          <el-table-column prop="villageCadre.villager.village.name" label="村组" min-width="150"></el-table-column>
          <el-table-column prop="enableStatus" label="启动状态" :formatter="formatColumn('enableStatus', 'enableStatus1')" width="100"></el-table-column>
          <!-- fixed="right" -->
          <el-table-column label="操作" fixed="right" width="80">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="showDialog(actionTypeMap.EDIT, scope.row)">编辑</el-button>
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
    </div>
    <el-dialog :title="financeDialogTitle" :visible.sync="addFinanceDialog" :show-close="false" width="400px">
      <el-form ref="financeDialogForm" :model="financeDialogForm" label-width="90px" class="cus-pr-15" :rules="dialogRules">
        <el-form-item label="日期" prop="financialDate">
          <el-date-picker v-model="financeDialogForm.financialDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="凭证号" prop="receiptNo">
          <el-input autocomplete="off" v-model="financeDialogForm.receiptNo"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="amount">
          <el-input autocomplete="off" v-model="financeDialogForm.amount"></el-input>
        </el-form-item>
        <el-form-item label="收支方向" prop="revenueDirection">
          <el-select v-model="financeDialogForm.revenueDirection" placeholder="请选择">
            <el-option
              v-for="item in selectOptionsMap.revenueDirection"
              :key="item.dataCode"
              :label="item.meaning"
              :value="item.dataCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="村组" prop="villageCadre.villager.village.name">
          <el-input v-model="financeDialogForm.villageCadre.villager.village.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="descr">
          <el-input placeholder="限20字" v-model="financeDialogForm.descr"></el-input>
        </el-form-item>
        <el-form-item label="启用状态" prop="enableStatus">
          <el-select v-model="financeDialogForm.enableStatus" placeholder="请选择">
            <el-option
              v-for="item in selectOptionsMap.enableStatus1"
              :key="item.dataCode"
              :label="item.meaning"
              :value="item.dataCode"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-center">
        <el-button type="primary" @click="confirmActionHandler">确 定</el-button>
        <el-button @click="addFinanceDialog = false">取 消</el-button>
      </div>
    </el-dialog>
    <pwd-dialog :pwd-dialog="pwdDialog" @success="validPwdSuc"></pwd-dialog>
  </div>
</template>

<style scoped lang="scss">
.app-container /deep/ {
  .el-form-item .el-input,
  .el-form-item .el-date-editor,
  .el-form-item .el-select,
  .el-form-item .el-button {
    width: 100%;
  }
}
</style>

<script>
import VillageFinanceService from '@/api/villageAffairsOpen/VillageFinanceService'
import tableDataQueryMixin from '../_mixins/mixins'
import pwdDialog from '@/components/pwdDialog'

export default {
  name: '',
  mixins: [tableDataQueryMixin],
  components: {
    pwdDialog
  },
  data() {
    return {
      isHeightLevel: false,
      isShowTree: false,
      defaultProps: null,
      actionTypeMap: {
        ADD: '11', // 标志新增操作
        EDIT: '12' // 标志编辑操作
      },
      dataList: [],
      data: [
        {
          id: 1,
          label: '河北省',
          children: [
            {
              id: 4,
              label: '刑台市',
              children: [
                {
                  id: 9,
                  label: '演示县',
                  children: [
                    {
                      id: 10,
                      label: '演示村',
                      children: [
                        {
                          id: 11,
                          label: '1队'
                        },
                        {
                          id: 12,
                          label: '2队'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      filterData: {
        time: '',
        year: '',
        month: '',
        shouzhi: ''
      },
      financeDialogForm: {
        financialDate: '',
        receiptNo: '',
        amount: '',
        revenueDirection: '',
        villageCadre: {
          villager: {
            village: {
              name: ''
            }
          }
        },
        descr: '',
        enableStatus: '',
        submitPerson: '',
        village: ''
      },
      financeDialogTitle: '',
      yearOption: [
        {
          label: '2015',
          value: '2015'
        },
        {
          label: '2016',
          value: '2016'
        },
        {
          label: '2017',
          value: '2017'
        },
        {
          label: '2018',
          value: '2018'
        },
        {
          label: '2019',
          value: '2019'
        },
        {
          label: '2020',
          value: '2020'
        },
        {
          label: '2021',
          value: '2021'
        }
      ],
      addFinanceDialog: false,
      shouzhiOption: [
        {
          label: '收入',
          value: '1'
        },
        {
          label: '支出',
          value: '2'
        }
      ],
      startStatusOption: [
        {
          label: '前后台启用',
          value: '1'
        },
        {
          label: '后台启用',
          value: '2'
        },
        {
          label: '禁用',
          value: '3'
        }
      ],
      dialogRules: {
        financialDate: [{ required: true, message: '请选择日期', trigger: 'blur' }],
        receiptNo: [{ required: true, message: '请输入凭证号', trigger: 'blur' }],
        amount: [{ required: true, message: '请选择金额', trigger: 'blur' }],
        revenueDirection: [{ required: true, message: '请选择收支方向', trigger: 'blur' }]
      },
      // 以下四个参数是使用tableDataQueryMixin必须的参数
      fastQueryParams: { // 快速搜索参数
        title: ''
      },
      advanceQueryParams: { // 高级搜索
        title: '',
        yearAndMonth: '',
        revenueDirection: '',
        startDate: '',
        endDate: ''
      },
      totalRecord: 0,
      selectOptionsMap: {
        revenueDirection: [],
        enableStatus1: []
      },
      request: null
    }
  },
  created() {
    this.getSelectOptions(['revenueDirection', 'enableStatus1'])
  },
  methods: {
    confirmBatchDelete(idArrs) {
      return VillageFinanceService.removeBatchVillageFinance(idArrs)
    },
    fetchTableDataListPromise(entity) {
      return VillageFinanceService.listVillageFinance(entity)
    },
    getFastEntity() {
      return {
        page: this.otherQueryParams.page,
        pageSize: this.otherQueryParams.pageSize
      }
    },
    getAdvanceEntity() {
      const YearAndMonth = this.advanceQueryParams.yearAndMonth ? [
        new Date(this.advanceQueryParams.yearAndMonth).getFullYear().toString(),
        (new Date(this.advanceQueryParams.yearAndMonth).getMonth() + 1).toString()
      ] : [null, null]

      return {
        page: this.otherQueryParams.page,
        pageSize: this.otherQueryParams.pageSize,
        noticeType: this.advanceQueryParams.noticeType,
        startDate: this.advanceQueryParams.queryDate && this.advanceQueryParams.queryDate[0],
        endDate: this.advanceQueryParams.queryDate && this.advanceQueryParams.queryDate[1],
        year: YearAndMonth[0],
        month: YearAndMonth[1]
      }
    },
    // 新增操作初始化数据
    beforeAddDialogShow() {
      this.financeDialogTitle = '新增村级财务信息'
      this.request = VillageFinanceService.saveVillageFinance
      // 重置表单
      this.$refs.financeDialogForm.resetFields()
      // 设置需要反显的字段和隐藏字段
      // 村组
      this.financeDialogForm.villageCadre.villager.village.name = this.$global.userInfo.companyName
      this.financeDialogForm.village = this.$global.userInfo.companyId
      this.financeDialogForm.submitPerson = this.$global.userInfo.userId
    },
    // 编辑操作初始化数据
    beforeEditDialogShow(row) {
      this.financeDialogTitle = '编辑村级财务信息'
      this.request = VillageFinanceService.updateVillageFinance
      // 重置表单
      this.$refs.financeDialogForm.resetFields()
      // 填充form
      this.financeDialogForm = JSON.parse(JSON.stringify(row))
    },
    confirmActionHandler() {
      this.$refs['financeDialogForm'].validate((valid) => {
        this.request(this.financeDialogForm).then(() => {
          this.$message({
            message: '保存成功！',
            type: 'success'
          })
          this.fetchTableDataList()
          this.addFinanceDialog = false
        })
      })
    },
    showDialog(type, initData) {
      this.addFinanceDialog = true
      this.$nextTick(() => {
        switch (type) {
          case this.actionTypeMap.ADD:
            this.beforeAddDialogShow()
            break
          case this.actionTypeMap.EDIT:
            this.beforeEditDialogShow(initData)
            break
        }
      })
    }
  }
}
</script>
