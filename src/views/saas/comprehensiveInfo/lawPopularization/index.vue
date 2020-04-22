<template>
<!-- 普法宣传 -->
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl">
        <el-form :inline="true" class="cus-fl-1 cus-text-right">
          <el-form-item>
            <el-input v-model="advanceQueryParams.title" placeholder="普通模糊搜索:标题" suffix-icon="el-icon-search"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn-box">
          <el-button type="primary" @click="fetchTableDataList('submit')">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="result-box">
      <div class="btn-box cus-mb-10">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="$router.push('/comprehensiveInfo/addLawPopularization')"
        >新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="batchDelete('dataListTable', 'articleId')">删除</el-button>
      </div>
      <el-table v-loading="dataListLoading" :data="dataList" ref="dataListTable" border class="cus-mb-20">
        <el-table-column type="index" label="序号" width="55px"></el-table-column>
        <el-table-column type="selection" width="55px"></el-table-column>
        <el-table-column label="标题" prop="title" width="250px">
          <template slot-scope="scope">
            <span
              style="color: blue;text-decoration:underline"
              @click="$router.push('/generalInfo/xiangqing')"
            >{{scope.row.article.title}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="article.coverPicture" label="封面图">
          <template slot-scope="scope">
            <sv-image :sources="[scope.row.article.coverPicture]"></sv-image>
            <!-- <img class="table-column--img" :src="$global.generateImgPath(scope.row.article.coverPicture)" /> -->
          </template>
        </el-table-column>
        <el-table-column prop="article.village.title" label="村组"></el-table-column>
        <el-table-column prop="lastUpdateTime" label="修改时间">
          <template slot-scope="scope">
            {{scope.row.lastUpdateTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
          </template>
        </el-table-column>
        <el-table-column prop="article.enableStatus" :formatter="formatColumn('article.enableStatus', 'enableStatus1')" label="启用状态"></el-table-column>
        <el-table-column fixed="right" label="操作" width="85">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="$router.push('/comprehensiveInfo/editLawPopularization/' + scope.row.articleId)"
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
import LawPopularizationService from '@/api/comprehensiveInfo/LawPopularizationService'
import svImage from '@/components/svImage/index'

export default {
  mixins: [tableDataQueryMixin],
  components: {
    pwdDialog,
    svImage
  },
  name: 'LawPopularization',
  data() {
    return {
      dataList: [],
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined,
        title: undefined,
        thingType: undefined
      },
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        name: '',
        relation: '',
        sex: '',
        age: '',
        idCard: '',
        address: '',
        phone: '',
        nation: ''
      },
      // *****
      fastQueryParams: [],
      advanceQueryParams: {},
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
      return LawPopularizationService.removeBatchLawPopularization(idArrs)
    },
    fetchTableDataListPromise(entity) {
      return LawPopularizationService.listLawPopularization(entity)
    },
    getFastEntity() {
      return {
        title: this.advanceQueryParams.title
      }
    },
    getAdvanceEntity() {
      return {}
    }
  }
}
</script>
