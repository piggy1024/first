<template>
  <!-- 死亡人员 -->
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl cus-jc-end">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input
              v-model="fastQueryParams.name"
              placeholder="普通模糊搜索：村民姓名"
              suffix-icon="el-icon-search"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="btn-box">
          <el-button type="primary" @click="fetchTableDataList('submit')">搜索</el-button>
          <el-button
            type="text"
            :icon="isHeightLevel ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            @click="isHeightLevel = !isHeightLevel"
          >高级搜索</el-button>
        </div>
      </div>
      <el-collapse-transition>
        <div class="height-level-box cus-pa-tb-10" v-show="isHeightLevel">
          <el-form label-width="70px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="注销年度">
                  <el-date-picker v-model="advanceQueryParams.year" type="year" placeholder="选择年" value-format="yyyy"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注销月份">
                  <el-date-picker v-model="advanceQueryParams.month" type="month" placeholder="选择月" value-format="MM"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别">
                  <el-select v-model="advanceQueryParams.sex" placeholder="请选择">
                    <el-option
                      v-for="item in selectOptionsMap.sex"
                      :label="item.meaning"
                      :value="item.dataCode"
                      :key="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="cus-text-right cus-pr-15">
            <el-button type="primary" @click="fetchTableDataList('submit')">搜索</el-button>
            <el-button type @click="resetQueryParams()">清空</el-button>
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <div class="result-box">
      <div class="btn-box cus-mb-10">
        <el-button type="primary" icon="el-icon-printer">打印</el-button>
        <el-button type="primary" icon="el-icon-upload2">导出</el-button>
        <!-- <el-button type="danger" icon="el-icon-delete">删除</el-button> -->
      </div>
      <el-table
        v-loading="dataListLoading"
        :data="dataList"
        ref="dataListTable"
        border
        class="cus-mb-20"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="person.name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="villager.age" label="年龄" width="100"></el-table-column>
        <el-table-column prop="person.sex" :formatter="formatColumn('person.sex', 'sex')" label="性别" width="100"></el-table-column>
        <el-table-column prop="person.ethnic" label="民族" width="100"></el-table-column>
        <el-table-column prop="person.idCardNumber" label="身份证号" width="170"></el-table-column>
        <el-table-column prop="villager.hshdRgstAddress" label="户籍地址" min-width="120"></el-table-column>
        <el-table-column prop="villager.leavingHouseholdDate" label="户籍注销日期" width="110">
          <template
            slot-scope="scope"
          >{{scope.row.villager.leavingHouseholdDate | parseTime('{y}-{m}-{d}')}}</template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="120"></el-table-column>
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
</template>

<style scoped lang="scss">
.height-level-box /deep/ {
  .el-form-item .el-select,
  .el-form-item .el-date-editor {
    width: 100%;
    max-width: 200px;
  }
}
</style>

<script>
import PopulationAndFPService from '@/api/populationAndFP/PopulationAndFPService'
import tableDataQueryMixin from '../_mixins/index'
export default {
  mixins: [tableDataQueryMixin],
  data() {
    return {
      isHeightLevel: false,
      dataList: [],
      fastQueryParams: {
        name: ''
      },
      advanceQueryParams: {
        year: '',
        month: '',
        sex: ''
      },
      selectOptionsMap: {
        sex: []
      },
      totalRecord: 0
    }
  },
  created() {
    this.getSelectOptions(['sex'])
  },
  methods: {
    fetchTableDataListPromise(entity) {
      return PopulationAndFPService.listPopulationAndFp(entity)
    },
    getFastEntity() {
      return {
        name: this.fastQueryParams.name,
        populationAndFpType: '02'
      }
    },
    getAdvanceEntity() {
      return {
        year: this.advanceQueryParams.year,
        month: this.advanceQueryParams.month,
        sex: this.advanceQueryParams.sex,
        populationAndFpType: '02' // 死亡人员类型：02
      }
    }
  }
}
</script>
