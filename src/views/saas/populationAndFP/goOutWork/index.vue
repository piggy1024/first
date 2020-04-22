<template>
  <!-- 外出务工 -->
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl cus-jc-end">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input
              v-model="advanceQueryParams.name"
              placeholder="普通模糊搜索：村民姓名"
              suffix-icon="el-icon-search"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <!-- style="width:80px" -->
            <el-select v-model="advanceQueryParams.sex" placeholder="请选择">
              <el-option
                v-for="item in selectOptionsMap.sex"
                :label="item.meaning"
                :value="item.dataCode"
                :key="item.dataCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="btn-box">
          <el-button type="primary" @click="fetchTableDataList('submit')">搜索</el-button>
          <el-button type @click="resetQueryParams()">清空</el-button>
          <!-- <el-button
            type="text"
            :icon="isHeightLevel? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            @click="isHeightLevel = !isHeightLevel"
          >高级搜索</el-button>-->
        </div>
      </div>
    </div>
    <div class="result-box">
      <div class="btn-box cus-mb-10">
        <el-button type="primary" icon="el-icon-printer">打印</el-button>
        <el-button type="primary" icon="el-icon-upload2">导出</el-button>
        <!-- <el-button type="danger" icon="el-icon-delete">删除</el-button> -->
      </div>
      <el-table v-loading="dataListLoading" :data="dataList" ref="dataListTable"  border class="cus-mb-20">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="person.name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="person.sex" :formatter="formatColumn('person.sex', 'sex')" label="性别" width="100"></el-table-column>
        <el-table-column prop="person.ethnic" :formatter="formatColumn('person.ethnic', 'ethnic')" label="民族" width="100"></el-table-column>
        <el-table-column prop="person.idCardNumber" label="身份证号" width="170"></el-table-column>
        <el-table-column prop="villager.hshdRgstAddress" label="户籍地址" min-width="180"></el-table-column>
        <el-table-column prop="villager.goOutWorkLocation" label="工作地点" min-width="200"></el-table-column>
        <el-table-column prop="person.phoneNumber" label="联系电话" width="120"></el-table-column>
        <el-table-column prop="remark" label="备注" width="120"></el-table-column>
        <el-table-column label="操作" fixed="right" width="80">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="$router.push('/populationAndFP/modifyGoOutWork/' + scope.row.villagerId)"
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
import PopulationAndFPService from '@/api/populationAndFP/PopulationAndFPService'
import tableDataQueryMixin from '../_mixins/index'
export default {
  mixins: [tableDataQueryMixin],
  data() {
    return {
      isHeightLevel: true,
      dataList: [],
      totalRecord: 0,
      advanceQueryParams: {
        name: '',
        sex: ''
      },
      selectOptionsMap: {
        sex: [],
        populationAndFpType: [],
        ethnic: []
      }
    }
  },
  created() {
    this.getSelectOptions(['sex', 'populationAndFpType', 'ethnic'])
  },
  methods: {
    fetchTableDataListPromise(entity) {
      return PopulationAndFPService.listPopulationAndFp(entity)
    },
    getFastEntity() {
      return {}
    },
    getAdvanceEntity() {
      return {
        name: this.advanceQueryParams.name,
        sex: this.advanceQueryParams.sex,
        populationAndFpType: '04' // 外出务工人类型：04
      }
    }
  }
}
</script>
