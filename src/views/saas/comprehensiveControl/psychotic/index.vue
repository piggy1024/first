<template>
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl">
        <el-form :inline="true" class="cus-fl-1 cus-text-right">
          <el-form-item>
            <el-input
              v-model="queryParams.name"
              placeholder="普通模糊搜索:村民姓名"
              suffix-icon="el-icon-search"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="btn-box">
          <el-button type="primary" @click="fetchTableDataList()">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="result-box">
      <div class="btn-box cus-mb-10">
        <el-button type="primary" icon="el-icon-printer">打印</el-button>
      </div>
      <el-table :data="dataList" border class="cus-mb-20">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="55"></el-table-column>
        <el-table-column prop="person.idCardNumber" label="身份证号" width="150"></el-table-column>
        <el-table-column prop="person.name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="person.sex" label="性别" width="50"></el-table-column>
        <el-table-column prop="age" label="年龄" width="50"></el-table-column>
        <el-table-column prop="guardianName" label="监护人姓名" width="150"></el-table-column>
        <el-table-column prop="guardianPhone" label="监护人电话" width="150"></el-table-column>
        <el-table-column prop="villager.hshdRgstAddress" label="户籍地址" width="250"></el-table-column>
        <el-table-column prop="focusCrowdDetail.remark" label="备注"></el-table-column>
        <el-table-column label="操作" fixed="right" width="90">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="HandleModify(scope.row)"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="cus-text-right"
        :current-page="otherQueryParams.page"
        :page-sizes="$global.configs.pagination.pageSizes"
        :page-size="otherQueryParams.pageSize"
        :layout="$global.configs.pagination.layout"
        :total="totalRecord"
        background
        @size-change="sizeChangeHandler"
        @current-change="currentChangeHandler"
      ></el-pagination>
    </div>
    <el-dialog
      title="修改"
      :visible.sync="dialogModifyIsShow"
      width="550px"
      :append-to-body="true"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <el-form label-width="110px" :model="modifyForm">
        <el-form-item label="监护人姓名" prop="guardianName">
          <el-input type="textarea" v-model="modifyForm.guardianName" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="监护人联系电话" prop="phoneNumber">
          <el-input type="number" v-model="modifyForm.guardianPhone" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            v-model="modifyForm.focusCrowdDetail.remark"
            style="width:400px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-center">
        <el-button type="success" @click="modifyDialogFormConfirm">保存</el-button>
        <el-button type="primary" @click="dialogModifyIsShow = false">取消</el-button>
      </div>
    </el-dialog>
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
import psychoticService from '@/api/comprehensiveControl/PsychoticService'

import tableDataQueryMixin from '../_mixins/index'
export default {
  mixins: [tableDataQueryMixin],
  components: {

  },
  data() {
    return {
      modifyForm: {
        guardianName: '',
        guardianPhone: '',
        focusCrowdDetail: {
          remark: ''
        }
      },
      queryParams: {
        name: ''
      }
    }
  },
  created() {

  },
  methods: {
    fetchTableDataListPromise(entity) {
      return psychoticService.listPsychotic(entity)
    },
    HandleModify(row) {
      // this.modifyForm = {...row};
      this.modifyForm = {
        guardianName: row.guardianName,
        guardianPhone: row.guardianPhone,
        deleteFlag: row.deleteFlag,
        focusCrowdDetail: {
          remark: row.focusCrowdDetail.remark,
          villagerId: row.villagerId,
          focusCrowd: row.focusCrowd,
          deleteFlag: row.focusCrowdDetail.deleteFlag
        },
        villagerId: row.villagerId,
        focusCrowd: row.focusCrowd
      }
      console.log(this.modifyForm)
      debugger
      this.dialogModifyIsShow = true
    },
    modifyDialogPromise(entity) {
      return psychoticService.updatePsychotic(entity)
    }
  }
}
</script>
