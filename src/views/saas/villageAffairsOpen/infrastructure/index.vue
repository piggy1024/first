<template>
  <!-- 基础设施 -->
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl cus-jc-end">
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="advanceQueryParams.title" placeholder="普通模糊搜索:标题" suffix-icon="el-icon-search"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn-box">
          <el-button type="primary"  @click="fetchTableDataList('submit')">搜索</el-button>
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
              <el-col :span="8">
                <el-form-item label="标题">
                  <el-input v-model="advanceQueryParams.title" placeholder="普通模糊搜索:标题"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="值班时间">
                  <el-date-picker
                    v-model="advanceQueryParams.queryDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="cus-text-right cus-pr-15">
            <el-button type="primary"  @click="fetchTableDataList('submit')">搜索</el-button>
            <el-button>清空</el-button>
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <div class="result-box">
      <div class="btn-box cus-mb-10">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="$router.push('/villageAffairsOpen/addInfrastructure')"
        >新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="batchDelete('dataListTable', 'articleId')">删除</el-button>
        <!-- <el-button type="primary" icon="el-icon-printer">打印</el-button> -->
      </div>
      <el-table v-loading="dataListLoading" :data="dataList" ref="dataListTable" border class="cus-mb-20">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column label="项目名称" min-width="160">
          <template slot-scope="scope">
            <router-link
              class="text-blue"
              to="/villageAffairsOpen/detailBaseInstallation"
            >{{scope.row.article.title}}</router-link>
          </template>
        </el-table-column>
        <el-table-column v-loading="dataListLoading" label="相关图片" width="120">
          <template slot-scope="scope">
            <sv-image :sources="[scope.row.article.coverPicture]"></sv-image>
            <!-- <img :src="$global.generateImgPath(scope.row.article.coverPicture)" class="table-column--img" /> -->
          </template>
        </el-table-column>
        <el-table-column prop="buildTime" label="建设时间" width="120">
          <template slot-scope="scope">
            {{scope.row.buildTime | parseTime('{y}-{m}-{d}')}}
          </template>
        </el-table-column>
        <el-table-column prop="projectImplementSite" label="项目实施地点" min-width="120"></el-table-column>
        <el-table-column prop="constructCompany" label="施工单位" min-width="120"></el-table-column>
        <el-table-column prop="expectInvest" label="拟投资（万元）" min-width="120"></el-table-column>
        <el-table-column prop="villager.person.name" label="负责人" width="120"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="155">
          <template slot-scope="scope">
            {{scope.row.createTime | parseTime('{y}-{m}-{d}')}}
          </template>
        </el-table-column>
        <el-table-column prop="villager.village.name" label="村组" width="120"></el-table-column>
        <el-table-column prop="article.enableStatus" :formatter="formatColumn('article.enableStatus', 'enableStatus1')" label="微信端显示" width="120"></el-table-column>
        <!-- fixed="right" -->
        <el-table-column label="操作" fixed="right" width="80">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="$router.push('/villageAffairsOpen/modifyInfrastructure/' + scope.row.articleId)"
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
import InfrastructureService from '@/api/villageAffairsOpen/InfrastructureService'
import tableDataQueryMixin from '../_mixins/mixins'
import pwdDialog from '@/components/pwdDialog'
import svImage from '@/components/svImage/index'

export default {
  mixins: [tableDataQueryMixin],
  components: { pwdDialog, svImage },
  data() {
    return {
      isHeightLevel: false,
      dataList: [],
      value2: '',
      // ****
      fastQueryParams: { // 快速搜索参数
        applyPerson: ''
      },
      advanceQueryParams: { // 高级搜索
        applyPerson: '',
        thingType: '',
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
    this.getSelectOptions(['enableStatus1'])
  },
  methods: {
    confirmBatchDelete(idArrs) {
      return InfrastructureService.removeBatchInfrastructure(idArrs)
    },
    fetchTableDataListPromise(entity) {
      return InfrastructureService.listInfrastructure(entity)
    },
    getFastEntity() {
      return {
        title: this.advanceQueryParams.title
      }
    },
    getAdvanceEntity() {
      return {
        title: this.advanceQueryParams.title,
        startDate: this.advanceQueryParams.queryDate && this.advanceQueryParams.queryDate[0],
        endDate: this.advanceQueryParams.queryDate && this.advanceQueryParams.queryDate[1]
      }
    }
  }
}
</script>
