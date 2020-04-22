<template>
  <!-- 通知公告首页 -->
  <div class="app-container">
    <div :class="{'left-container':true,'show-width': isShowTree}">
      <h4 class="text-center tree-title">
        行政区域树
        <i class="el-icon-d-arrow-left" @click="isShowTree = true"></i>
      </h4>
      <div style="padding:0 10px 10px">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-tree
          class="filter-tree"
          :data="data"
          node-key="id"
          :props="defaultProps"
          @node-click="getCurrentKey()"
          default-expand-all
          :filter-node-method="filterNode"
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
            <el-form-item>
              <el-input
                v-model="advanceQueryParams.title"
                placeholder="普通模糊搜索：标题"
                suffix-icon="el-icon-search"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="btn-box">
            <el-button type="primary" @click="fetchTableDataList()">搜索</el-button>
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
                  <el-form-item label="标题">
                    <el-input placeholder="普通模糊搜索:标题" v-model="advanceQueryParams.title"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="通知类型">
                    <el-select v-model="advanceQueryParams.noticeType" placeholder="请选择">
                      <el-option
                        v-for="item in selectOptionsMap.noticeType"
                        :key="item.dataCode"
                        :label="item.meaning"
                        :value="item.dataCode"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="创建时间">
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
              <el-button type="primary" @click="fetchTableDataList()">搜索</el-button>
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
            @click="$router.push('/villageAffairsOpen/addNotice')"
          >新增</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="batchDelete('dataListTable', 'articleId')">删除</el-button>
        </div>
        <el-table v-loading="dataListLoading" :data="dataList" ref="dataListTable" border class="cus-mb-20">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号" width="55"></el-table-column>
          <el-table-column label="标题" min-width="160">
            <template slot-scope="scope">
              <router-link
                class="text-blue"
                to="/villageAffairsOpen/detailNoticeAnnounce"
              >{{scope.row.article.title}}</router-link>
            </template>
          </el-table-column>
          <el-table-column prop="noticeType" label="通知类型" :formatter="formatColumn('noticeType')" width="120"></el-table-column>
          <el-table-column label="封面图" width="100">
            <template slot-scope="scope">
              <sv-image :sources="[scope.row.article.coverPicture]"></sv-image>
              <!-- <img :src="$global.generateImgPath(scope.row.article.coverPicture)" class="table-column--img" /> -->
            </template>
          </el-table-column>
          <el-table-column prop="doc" label="文档" width="100">
            <template slot-scope="scope">
              <a :href="scope.row.document">
                <i class="el-icon-document"></i>
              </a>
            </template>
          </el-table-column>
          <el-table-column prop="documentType" label="文档类型" :formatter="formatColumn('documentType')" width="100"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="100">
            <template slot-scope="scope">
              {{scope.row.createTime | parseTime('{y}-{m}-{d}')}}
            </template>
          </el-table-column>
          <el-table-column prop="article.village.title" label="村组" min-width="150"></el-table-column>
          <el-table-column prop="article.enableStatus" :formatter="formatColumn('article.enableStatus', 'enableStatus1')" label="启动状态" width="100"></el-table-column>
          <!-- fixed="right" -->
          <el-table-column label="操作" fixed="right" width="80">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="$router.push('/villageAffairsOpen/editNotice/' + scope.row.articleId)"
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
    </div>
    <pwd-dialog :pwd-dialog="pwdDialog" @success="validPwdSuc"></pwd-dialog>
  </div>
</template>

<style scoped lang="scss">
.height-level-box /deep/ {
  .el-form-item .el-input,
  .el-form-item .el-date-editor,
  .el-form-item .el-button {
    width: 100%;
  }
}
</style>

<script>
import NoticeService from '@/api/villageAffairsOpen/NoticeService'
import tableDataQueryMixin from '../_mixins/mixins'
import pwdDialog from '@/components/pwdDialog'
import svImage from '@/components/svImage/index'

export default {
  name: '',
  mixins: [tableDataQueryMixin],
  components: {
    pwdDialog,
    svImage
  },
  data() {
    return {
      isHeightLevel: false,
      isShowTree: false,
      dataList: [
        {
          title: '演示村村规民约',
          noticeType: '村规民约',
          coverPic: '演示.jpg',
          doc: '演示文档.doc',
          docType: '',
          buildTime: '2020-03-18',
          village: '演示村',
          startStatus: '后台启用'
        },
        {
          title: '扶贫情况调研成果',
          noticeType: '书记说事',
          coverPic: '演示.jpg',
          doc: '演示文档.doc',
          docType: '',
          buildTime: '2020-03-19',
          village: '演示村2',
          startStatus: '禁用'
        }
      ],
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
        title: '',
        status: '',
        type: '',
        time: '',
        noticeType: ''
      },
      noticeTypeOption: [
        {
          label: '村规民约',
          value: '1'
        },
        {
          label: '书记说事',
          value: '2'
        },
        {
          label: '政府发文',
          value: '3'
        },
        {
          label: '开会通知',
          value: '4'
        }
      ],
      // 以下四个参数是使用tableDataQueryMixin必须的参数
      fastQueryParams: { // 快速搜索参数
        title: ''
      },
      advanceQueryParams: { // 高级搜索
        title: '',
        noticeType: '',
        queryDate: null,
        startDate: '',
        endDate: ''
      },
      totalRecord: 0,
      selectOptionsMap: {
        noticeType: [],
        documentType: [],
        enableStatus1: []
      }
    }
  },
  created() {
    this.getSelectOptions(['noticeType', 'documentType', 'enableStatus1'])
  },
  methods: {
    confirmBatchDelete(idArrs) {
      return NoticeService.removeBatchNotice(idArrs)
    },
    fetchTableDataListPromise(entity) {
      return NoticeService.listNotice(entity)
    },
    getFastEntity() {
      return {
        page: this.otherQueryParams.page,
        pageSize: this.otherQueryParams.pageSize,
        title: this.fastQueryParams.title
      }
    },
    getAdvanceEntity() {
      return {
        page: this.otherQueryParams.page,
        pageSize: this.otherQueryParams.pageSize,
        title: this.advanceQueryParams.title,
        noticeType: this.advanceQueryParams.noticeType,
        startDate: this.advanceQueryParams.queryDate && this.advanceQueryParams.queryDate[0],
        endDate: this.advanceQueryParams.queryDate && this.advanceQueryParams.queryDate[1]
      }
    }
  }
}
</script>
