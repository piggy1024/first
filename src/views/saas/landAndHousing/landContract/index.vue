<template>
  <div class="app-container">
    <administrative-tree :is-show-tree="isShowTree" v-on:is-show-change="isShowTree = $event"></administrative-tree>
    <i class="el-icon-d-arrow-right tree-collapse" v-show="isShowTree" @click="isShowTree = false"></i>
    <div class="right-container" :class="{'is-add-margin': !isShowTree}">
      <div class="filter-container cus-bg-fa">
        <p class="filter-title">查询条件</p>
        <div class="filter-box cus-d-fl">
          <el-form :inline="true" class="cus-fl-1 cus-text-right">
            <el-form-item>
              <el-input
                v-model="queryParam.contractorRepresentName"
                placeholder="普通姓名模糊搜索"
                suffix-icon="el-icon-search"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="btn-box">
            <el-button type="primary" @click="queryData()">搜索</el-button>
          </div>
        </div>
      </div>
      <div class="result-box">
        <div class="btn-box cus-mb-10">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="$router.push('/landAndHousing/landContractAdd')"
          >新增</el-button>
          <el-button type="primary" icon="el-icon-upload2">导出</el-button>
          <el-button type="primary" icon="el-icon-printer">打印</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="removeBatch">删除</el-button>
        </div>
        <el-table :data="dataList" ref="ids" border class="cus-mb-20">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号" width="55"></el-table-column>
          <el-table-column prop="villager.person.name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="villager.person.idCardNumber" label="身份证号" width="170"></el-table-column>
          <el-table-column prop="villager.huoseholdMain" label="所在户" min-width="120"></el-table-column>
          <el-table-column prop="textContractType" label="承包类型" width="100"></el-table-column>
          <el-table-column prop="contractCode" label="合同代码" width="120"></el-table-column>
          <el-table-column prop="contractTotalPieceNumber" label="承包总块数" width="120"></el-table-column>
          <el-table-column prop="contractTotalArea" label="承包总面积" width="120"></el-table-column>
          <el-table-column prop="employerFullName" label="发包方全称" min-width="150"></el-table-column>
          <el-table-column prop="contractStartTime" label="承包开始时间" width="120"></el-table-column>
          <el-table-column prop="contractEndTime" label="承包结束时间" width="120"></el-table-column>
          <!-- fixed="right" -->
          <el-table-column label="操作" fixed="right" width="150">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="$router.push('/landAndHousing/landContractModify/'+scope.row.landContractId)"
              >修改</el-button>
              <el-button size="mini" @click="$router.push('/landAndHousing/landContractDetail/'+scope.row.landContractId)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="cus-text-right"
          :current-page="queryParam.page"
          :page-sizes="[5, 10, 15, 20, 25]"
          :page-size="queryParam.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRecord"
          background
        ></el-pagination>
      </div>
    </div>
    <pwd-dialog :pwd-dialog="pwdDialog" @success="validPwdSuc"></pwd-dialog>
  </div>
</template>

<style scoped lang="scss">
</style>

<script>
import administrativeTree from '@/components/administrativeTree'

import landContractService from '@/api/landAndHousing/LandContractService'

import { parseTime } from '@/filters'
import dataCodeService from '@/api/DataCodeService'
import pwdDialog from '@/components/pwdDialog'

export default {
  components: {
    administrativeTree,
    pwdDialog
  },
  name: 'LandContract',
  data() {
    return {
      selection: [],
      pwdDialog: {
        isShow: false,
        loading: false
      },
      isShowTree: false,
      totalRecord: 0,
      multipleSelection: [],
      queryParam: {
        pageSize: 5,
        page: 1,
        contractorRepresentName: ''
      },
      dataList: [],
      contractTypeOption: []
    }
  },
  created() {
    this.getSelectOption()
  },
  methods: {
    validPwdSuc(closeDialog) {
      landContractService.removeBatchLandContract(this.selection).then(res => {
        this.$message({
          message: `删除成功！`,
          type: 'success'
        })
        this.clearQueryParam()
        closeDialog()
      })
    },
    removeBatch() {
      this.pwdDialog.isShow = true
      const ids = this.$refs.ids.selection.map(s => s['landContractId'])
      if (ids.length === 0) {
        this.$message({
          title: '您尚未选择数据!',
          type: 'warning'
        })
        return
      }
      this.selection = ids
    },
    queryData(param) {
      landContractService.listLandContract(param || this.queryParam).then(res => {
        console.log(res)
        const newData = []
        res.dataList.forEach((item, index) => {
          for (let a = 0; a < this.contractTypeOption.length; a++) {
            if (this.contractTypeOption[a].dataCode === item.contractType) {
              item.textContractType = this.contractTypeOption[a].meaning
              break
            }
          }
          item.contractStartTime = parseTime(item.contractStartTime, '{y}-{m}-{d}')
          item.contractEndTime = parseTime(item.contractEndTime, '{y}-{m}-{d}')
          newData.push(item)
        })
        this.dataList = newData
      })
    },
    getSelectOption() {
      const contractType = dataCodeService.getDataCodeByCodeCategory('contractType').then((res) => {
        this.contractTypeOption = res
      })
      Promise.all([contractType]).then(() => {
        this.queryData()
      })
    },
    clearQueryParam() {
      this.queryParam = {
        pageSize: 5,
        page: 1,
        contractorRepresentName: ''
      }
      this.queryData(this.queryParam)
    }

  }
}
</script>
