<template>
<!-- 危险品 -->
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
        <!-- <el-button type="primary" icon="el-icon-edit">修改</el-button> -->
        <el-button type="primary" icon="el-icon-printer">打印</el-button>
      </div>
      <!-- 从事行业,工作地点 -->
      <el-table :data="dataList" border class="cus-mb-20">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="55"></el-table-column>
        <el-table-column prop="person.name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="person.sex" label="性别" width="50"></el-table-column>
        <el-table-column prop="person.idCardNumber" label="身份证号" width="160"></el-table-column>
        <el-table-column prop="villager.educationLevel" label="文化程度" width="100"></el-table-column>
        <el-table-column prop="age" label="年龄" width="50"></el-table-column>
        <el-table-column prop="person.phoneNumber" label="电话号码" width="110"></el-table-column>
        <el-table-column prop="villager.hshdRgstAddress" label="户籍地址" min-width="120"></el-table-column>
        <el-table-column prop="engageInIndustry" label="从事行业" min-width="120"></el-table-column>
        <el-table-column prop="workLocation" label="工作地点" min-width="120"></el-table-column>
        <el-table-column prop="focusCrowdDetail.remark" label="备注" min-width="100"></el-table-column>
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
      <el-form label-width="90px" :model="modifyForm">
        <el-form-item label="从事行业" prop="">
          <el-input type="textarea" v-model="modifyForm.engageInIndustry" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="">
          <el-input type="number" v-model="modifyForm.person.phoneNumber" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="工作地点" prop="">
          <el-input type="textarea" v-model="modifyForm.workLocation" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="">
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
import darsGoodsPractitionersService from '@/api/comprehensiveControl/DarsGoodsPractitionersService'

// mixin
import tableDataQueryMixin from '../_mixins/index'
export default {
  mixins: [tableDataQueryMixin],
  data() {
    return {
      modifyForm: {
        engageInIndustry: '',
        workLocation: '',
        person: {
          phoneNumber: ''
        },
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
      return darsGoodsPractitionersService.listDarsGoodsPractitioners(entity)
    },
    HandleModify(row) {
      // console.log(row);
      this.modifyForm = {
        engageInIndustry: row.engageInIndustry,
        workLocation: row.workLocation,
        deleteFlag: row.deleteFlag,
        person: {
          phoneNumber: row.person.phoneNumber,
          personId: row.person.personId,
          deleteFlag: row.person.deleteFlag
        },
        focusCrowdDetail: {
          remark: row.focusCrowdDetail.remark,
          villagerId: row.villagerId,
          focusCrowd: row.focusCrowd,
          deleteFlag: row.focusCrowdDetail.deleteFlag
        },
        villagerId: row.villagerId,
        focusCrowd: row.focusCrowd
      }
      this.dialogModifyIsShow = true
    },
    modifyDialogPromise(entity) {
      return darsGoodsPractitionersService.updateDarsGoodsPractitioners(entity)
    }
  }
}
</script>
