<template>
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl">
        <el-form :inline="true" class="cus-fl-1 cus-text-right">
          <el-form-item>
            <el-input v-model="advanceQueryParams.contactPerson" placeholder="普通姓名模糊搜索" suffix-icon="el-icon-search"></el-input>
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
          <el-form :inline="true" label-width="90px" class="demo-form-inline clearfix">
            <el-form-item label="联 系 人:">
              <el-input v-model="advanceQueryParams.contactPerson" placeholder="支持模糊搜索" style="width:205px"></el-input>
            </el-form-item>
            <el-form-item label="服务事项:">
              <el-select v-model="advanceQueryParams.serviceThing" placeholder="请选择">
                <el-option
                  v-for="item in selectOptionsMap.serviceThing"
                  :key="item.dataCode"
                  :label="item.meaning"
                  :value="item.dataCode"
                />
              </el-select>
            </el-form-item>
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
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addIntermediaService"
        >新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="batchDelete('dataListTable', 'intermediaryServiceId')">删除</el-button>
      </div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" width="550px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px">
          <el-row type="flex" justify="space-between" class="cus-mb-10">
            <el-col :span="12">
              <el-form-item label="服务事项:" style="width:230px" prop="serviceThing">
                <el-select v-model="ruleForm.serviceThing" placeholder="请选择">
                  <el-option
                    v-for="item in selectOptionsMap.serviceThing"
                    :key="item.dataCode"
                    :label="item.meaning"
                    :value="item.dataCode"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="服务点:" style="width:230px" prop="servicePoint">
                <el-input v-model="ruleForm.servicePoint"></el-input>
              </el-form-item>
              <el-form-item label="村组:" style="width:230px" prop="village.title">
                <el-input disabled v-model="ruleForm.village.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人:" style="width:230px" prop="contactPerson">
                <el-input v-model="ruleForm.contactPerson"></el-input>
              </el-form-item>
              <el-form-item label="联系电话:" style="width:230px" prop="contactPhone">
                <el-input v-model="ruleForm.contactPhone"></el-input>
              </el-form-item>
              <el-form-item label="启用状态:" prop="startstatus" style="width:230px">
                <el-select v-model="ruleForm.enableStatus" placeholder="请选择">
                  <el-option
                    v-for="item in selectOptionsMap.enableStatus1"
                    :key="item.dataCode"
                    :label="item.meaning"
                    :value="item.dataCode">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注:" prop="remark">
            <el-input
              type="textarea"
              v-model="ruleForm.remark"
              style="width:400px"
              placeholder="限制200字"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer text-center">
          <el-button type="success" @click="submit">保存</el-button>
          <el-button type="primary" @click="dialogTableVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <el-table v-loading="dataListLoading" ref="dataListTable" :data="dataList" border class="cus-mb-20">
        <el-table-column type="selection" width="55px"></el-table-column>
        <el-table-column type="index" label="序号" width="55px"></el-table-column>
        <el-table-column prop="serviceThing" :formatter="formatColumn('serviceThing')" label="服务事项" width="150px"></el-table-column>
        <el-table-column prop="contactPerson" label="联系人" width="100px"></el-table-column>
        <el-table-column prop="servicePoint" label="服务点"></el-table-column>
        <el-table-column prop="contactPhone" label="联系电话"></el-table-column>
        <el-table-column prop="remark" label="备注" width="150px"></el-table-column>
        <el-table-column prop="village.title" label="村组"></el-table-column>
        <el-table-column prop="enableStatus" label="启用状态" :formatter="formatColumn('enableStatus', 'enableStatus1')" width="100px"></el-table-column>
        <el-table-column fixed="right" label="操作" width="85">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="editIntermediaService(scope)"
              icon="el-icon-edit"
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
.filter-container {
  border-radius: 3px;
  padding: 0px 15px 10px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .filter-title {
    text-align: left;
    line-height: 40px;
    margin: 0;
    color: #666;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
    font-size: 14px;
  }

  .height-level-box {
    /deep/ .el-form-item {
      width: calc(100% / 3);
      box-sizing: border-box;
      margin-right: 0;
      padding-right: 15px;
      float: left;
      display: flex;

      .el-form-item__label {
        text-align: left;
      }

      .el-form-item__content {
        flex: 1;
      }
    }
  }
}

.result-box {
  /* background-color: #f5f7f9; */
  /* border-radius: 3px; */
  /* padding: 10px 15px; */
  /* box-shadow: 0 1px 3px 0 rgba(0,0,0,0.12), 0 0 3px 0 rgba(0,0,0,0.04); */
  /deep/ .btn-box {
    margin-bottom: 10px;
  }
}
</style>

<script>
import pwdDialog from '@/components/pwdDialog'
import tableDataQueryMixin from '../_mixins/mixins'
import IntermediaryService from '@/api/comprehensiveInfo/IntermediaryService'

export default {
  mixins: [tableDataQueryMixin],
  components: {
    pwdDialog
  },
  name: 'Service',
  data() {
    return {
      dataList: [],
      dialogTitle: '',
      actionType: '', // 新增ADD 或者 编辑EDIT操作
      ruleForm: {
        villageId: '',
        serviceThing: '', // 服务事项
        contactPerson: '', // 联系人
        servicePoint: '', // 服务点
        contactPhone: '', // 联系电话
        remark: '', // 备注
        enableStatus: '', // 启用状态
        village: {
          title: ''
        }
      },
      immutableRuleForm: {},
      rules: {
        serviceThing: [{ required: true, message: '请选择服务事项', trigger: 'change' }]
      },
      dialogTableVisible: false,
      isHeightLevel: false,
      queryParam: {
        pageSize: 5,
        page: 1,
        contactPerson: '', // 联系人名称
        serviceThing: '' // 服务事项
      },
      // *****
      advanceQueryParams: {},
      totalRecord: 0,
      selectOptionsMap: {
        enableStatus1: [],
        serviceThing: []
      }
    }
  },
  created() {
    this.getSelectOptions(['enableStatus1', 'serviceThing'])
    this.immutableRuleForm = JSON.parse(JSON.stringify(this.ruleForm))
  },
  methods: {
    confirmBatchDelete(idArrs) {
      return IntermediaryService.removeBatchIntermediaryService(idArrs)
    },
    fetchTableDataListPromise(entity) {
      return IntermediaryService.listIntermediaryService(entity)
    },
    getFastEntity() {
      return {
        contactPerson: this.advanceQueryParams.contactPerson
      }
    },
    getAdvanceEntity() {
      return {
        contactPerson: this.advanceQueryParams.contactPerson,
        serviceThing: this.advanceQueryParams.serviceThing
      }
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.actionType === 'ADD') {
            // 增加
            IntermediaryService.saveIntermediaryService(this.ruleForm).then(() => {
              this.$message({
                message: '新增成功！',
                type: 'success'
              })
              // 刷新数据
              this.fetchTableDataList()
            })
          }
          if (this.actionType === 'EDIT') {
            // 编辑
            IntermediaryService.updateIntermediaryService(this.ruleForm).then(() => {
              this.$message({
                message: '编辑成功！',
                type: 'success'
              })
              // 刷新数据
              this.fetchTableDataList()
            })
          }
        }
      })
    },
    addIntermediaService() {
      this.actionType = 'ADD'
      this.dialogTitle = '新增中介服务'
      this.dialogTableVisible = true
      this.$nextTick(() => {
        this.$refs.ruleForm.resetFields()
        this.ruleForm = this.immutableRuleForm
        // 村组
        this.ruleForm.villageId = this.$global.userInfo.companyId
        this.ruleForm.village.title = this.$global.userInfo.companyName
      })
    },
    editIntermediaService(scope) {
      const clonedRow = JSON.parse(JSON.stringify(scope.row))
      this.actionType = 'EDIT'
      this.dialogTitle = '编辑中介服务'
      this.dialogTableVisible = true
      this.$nextTick(() => {
        this.$refs.ruleForm.resetFields()
        this.ruleForm = this.immutableRuleForm
        this.ruleForm = clonedRow
      })
    }
  }
}
</script>
