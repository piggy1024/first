<template>
<!-- 公告公示 -->
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl cus-jc-end">
        <el-form :inline="true" ref="f1">
          <el-form-item>
            <el-input v-model="advanceQueryParams.title" placeholder="普通模糊搜索:标题" suffix-icon="el-icon-search"></el-input>
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
          <el-form label-width="80px" label-position="left" ref="f2">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="标题">
                  <el-input v-model="advanceQueryParams.title" placeholder="普通模糊搜索:标题"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="公示类型">
                  <el-select v-model="advanceQueryParams.announcementType" placeholder="请选择">
                    <el-option
                      v-for="item in selectOptionsMap.announcementType"
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
            <el-button type="primary" @click="fetchTableDataList('submit')">搜索</el-button>
            <el-button @click="resetQueryParams">清空</el-button>
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <div class="result-box">
      <div class="btn-box cus-mb-10">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="$router.push('/villageAffairsOpen/addAnnouncement')">新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="batchDelete('dataListTable', 'announcementId')">删除</el-button>
        <!-- <el-button type="primary" icon="el-icon-printer">打印</el-button> -->
      </div>
      <el-table v-loading="dataListLoading" :data="dataList" ref="dataListTable" border class="cus-mb-20">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column label="标题" min-width="160">
          <template slot-scope="scope">
            <router-link class="text-blue" to="/villageAffairsOpen/detailPublicAnnounce">{{scope.row.article.title}}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="announcementType" :formatter="formatColumn('announcementType')" label="公示类型" width="120"></el-table-column>
        <el-table-column prop="article.coverPicture" label="封面图" width="100">
          <template slot-scope="scope">
            <sv-image :sources="[scope.row.article.coverPicture]"></sv-image>
            <!-- <img class="table-column--img" :src="$global.generateImgPath(scope.row.article.coverPicture)" /> -->
          </template>
        </el-table-column>
        <el-table-column prop="beforeHandNearPic" label="事前近图" width="100">
          <template slot-scope="scope">
            <sv-image :sources="[scope.row.beforehandNearPicture]"></sv-image>
            <!-- <img class="table-column--img" :src="$global.generateImgPath(scope.row.beforehandNearPicture)" /> -->
          </template>
        </el-table-column>
        <el-table-column prop="beforeHandFarPic" label="事前远图" width="100">
          <template slot-scope="scope">
            <sv-image :sources="[scope.row.beforehandFarPicture]"></sv-image>
            <!-- <img class="table-column--img" :src="$global.generateImgPath(scope.row.beforehandFarPicture)" /> -->
          </template>
        </el-table-column>
        <el-table-column prop="afterHandNearPic" label="事后近图" width="100">
          <template slot-scope="scope">
            <sv-image :sources="[scope.row.afterwardsNearPicture]"></sv-image>
            <!-- <img class="table-column--img" :src="$global.generateImgPath(scope.row.afterwardsNearPicture)" /> -->
          </template>
        </el-table-column>
        <el-table-column prop="afterwardsFarPicture" label="事后远图" width="100">
          <template slot-scope="scope">
            <sv-image :sources="[scope.row.afterHandFarPic]"></sv-image>
            <!-- <img class="table-column--img" :src="$global.generateImgPath(scope.row.afterHandFarPic)" /> -->
          </template>
        </el-table-column>
        <!-- <el-table-column prop="article.submitPerson" label="提交人" width="100"></el-table-column> -->
        <el-table-column prop="article.villager.person.name" label="提交人" width="100"></el-table-column>
        <el-table-column prop="article.submitTime" label="提交时间" width="155">
          <template slot-scope="scope">
            {{scope.row.article.submitTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
          </template>
        </el-table-column>
        <el-table-column prop="publicityTime" label="公示日期" width="100">
          <template slot-scope="scope">
            {{scope.row.publicityTime | parseTime('{y}-{m}-{d}')}}
          </template>
        </el-table-column>
        <el-table-column prop="cancelPublicityTime" label="取消公示日期" width="110">
          <template slot-scope="scope">
            {{scope.row.cancelPublicityTime | parseTime('{y}-{m}-{d}')}}
          </template>
        </el-table-column>
        <el-table-column prop="article.village.title" label="村组" min-width="100"></el-table-column>
        <el-table-column prop="article.enableStatus" :formatter="formatColumn('article.enableStatus', 'enableStatus1')" label="微信端显示" width="100"></el-table-column>
        <!-- fixed="right" -->
        <el-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="$router.push('/villageAffairsOpen/editAnnouncement/' + scope.row.announcementId)"
            >编辑</el-button>
            <el-button
              type="primary"
              size="mini"
            >打印</el-button>
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
import AnnouncementService from '@/api/villageAffairsOpen/AnnouncementService'
import tableDataQueryMixin from '../_mixins/mixins'
import pwdDialog from '@/components/pwdDialog'
import svImage from '@/components/svImage/index'

export default {
  mixins: [tableDataQueryMixin],
  components: { pwdDialog, svImage },
  data() {
    return {
      isHeightLevel: false,
      queryParam: {
        title: '',
        announcementType: '0'
      },
      dataList: [],
      publicType: '',
      publicTypeOption: [
        {
          value: '1',
          label: '党建'
        },
        {
          value: '2',
          label: '国土住建'
        },
        {
          value: '3',
          label: '民政'
        },
        {
          value: '4',
          label: '财政'
        },
        {
          value: '5',
          label: '计生服务'
        },
        {
          value: '6',
          label: '村级财务'
        },
        {
          value: '7',
          label: '财务制度'
        },
        {
          value: '8',
          label: '综合治理'
        },
        {
          value: '9',
          label: '经管劳保'
        },
        {
          value: '10',
          label: '农业'
        },
        {
          value: '11',
          label: '治安管理'
        },
        {
          value: '12',
          label: '人武'
        },
        {
          value: '13',
          label: '其他'
        }
      ],
      // 以下四个参数是使用tableDataQueryMixin必须的参数
      fastQueryParams: { // 快速搜索参数
        title: ''
      },
      advanceQueryParams: { // 高级搜索
        title: '',
        announcementType: ''
      },
      totalRecord: 0,
      selectOptionsMap: {
        announcementType: [],
        enableStatus1: []
      }
    }
  },
  created() {
    this.getSelectOptions(['announcementType', 'enableStatus1'])
  },
  methods: {
    confirmBatchDelete(idArrs) {
      return AnnouncementService.removeBatchAnnouncement(idArrs)
    },
    fetchTableDataListPromise(entity) {
      return AnnouncementService.listAnnouncement(entity)
    },
    getFastEntity() {
      return {
        title: this.advanceQueryParams.title
      }
    },
    getAdvanceEntity() {
      return {
        title: this.advanceQueryParams.title,
        announcementType: this.advanceQueryParams.announcementType
      }
    }
  }
}
</script>
