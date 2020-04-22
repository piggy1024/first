<template>
  <!-- 政府文件首页 -->
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
                placeholder="普通姓名模糊搜索"
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
            <el-form label-width="100px" label-position="left">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="标题">
                    <el-input placeholder="普通模糊搜索:标题" v-model="advanceQueryParams.title"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="收文状态">
                    <el-select v-model="advanceQueryParams.receiptStatus" placeholder="请选择">
                      <el-option
                        v-for="item in selectOptionsMap.receiptStatus"
                        :key="item.dataCode"
                        :label="item.meaning"
                        :value="item.dataCode"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="收文类型">
                    <el-select v-model="advanceQueryParams.receiptType" placeholder="请选择">
                      <el-option
                        v-for="item in selectOptionsMap.receiptType"
                        :key="item.dataCode"
                        :label="item.meaning"
                        :value="item.dataCode"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="16">
                  <el-form-item label="收文登记时间">
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
                <el-col :span="8">
                  <el-form-item label="签收状态">
                    <el-select v-model="advanceQueryParams.signatureStatus" placeholder="请选择">
                      <el-option
                        v-for="item in selectOptionsMap.signatureStatus"
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
              <el-button type="primary" @click="fetchTableDataList()">搜索</el-button>
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
            @click="$router.push('/villageAffairsOpen/receiptRegist')"
          >收文登记</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="batchDelete('dataListTable', 'articleId')">删除</el-button>
          <el-button type="primary" icon="el-icon-circle-check-outline" @click="confirmSignatureHandler">确认签收</el-button>
          <!-- <el-button type="primary" icon="el-icon-upload2">导出</el-button>
          <el-button type="primary" icon="el-icon-printer">打印</el-button>-->
        </div>
        <el-table ref="dataListTable" v-loading="dataListLoading" :data="dataList" border class="cus-mb-20">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号" width="55"></el-table-column>
          <el-table-column label="标题" min-width="220">
            <template slot-scope="scope">
              <router-link
                class="text-blue"
                to="/villageAffairsOpen/detailGovernmentDoc"
              >{{scope.row.article.title}}</router-link>
            </template>
          </el-table-column>
          <el-table-column prop="receiptType" :formatter="formatColumn('receiptType')" label="收文类型" width="100"></el-table-column>
          <el-table-column prop="createTime" label="收文登记日期" width="155">
            <template slot-scope="scope">
              {{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
            </template>
          </el-table-column>
          <el-table-column prop="replyPerson" label="回复人" width="100"></el-table-column>
          <el-table-column prop="replyTime" label="回复日期" width="100">
            <template slot-scope="scope">
              {{scope.row.replyTime | parseTime('{y}-{m}-{d}')}}
            </template>
          </el-table-column>
          <el-table-column prop="article.village.title" label="村组" min-width="120"></el-table-column>
          <el-table-column prop="receiptStatus" :formatter="formatColumn('receiptStatus')" label="收文状态" min-width="100"></el-table-column>
          <el-table-column prop="signatureStatus" label="是否签收"  :formatter="formatColumn('signatureStatus')" width="100"></el-table-column>
          <!-- fixed="right" -->
          <el-table-column label="操作" fixed="right" width="150">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="doReplyHandler(scope.row)"
              >回复</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="editor-content(scope.row)"
              >查看</el-button>
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
  .el-form-item .el-date-editor--daterange.el-input__inner,
  .el-form-item .el-button {
    width: 100%;
  }
}
</style>

<script>
import OfficialDocumentService from '@/api/villageAffairsOpen/OfficialDocumentService'
import tableDataQueryMixin from '../_mixins/mixins'
import pwdDialog from '@/components/pwdDialog'

const Draft = '01'
const HadReplied = '02'
const NotReply = '03'

export default {
  name: 'LandContract',
  mixins: [tableDataQueryMixin],
  components: {
    pwdDialog
  },
  data() {
    return {
      isHeightLevel: false,
      isShowTree: false,
      dataList: [],
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
      // 以下四个参数是使用tableDataQueryMixin必须的参数
      fastQueryParams: { // 快速搜索参数
        title: ''
      },
      advanceQueryParams: { // 高级搜索
        title: '',
        receiptStatus: '',
        signatureStatus: '',
        receiptType: '',
        startDate: '',
        endDate: '',
        queryDate: ''
      },
      totalRecord: 0,
      selectOptionsMap: {
        receiptStatus: [], // 收文状态
        signatureStatus: [
          { dataCode: '01', meaning: '是' },
          { dataCode: '02', meaning: '否' }
        ], // 签收状态
        receiptType: [] // 收文类型
      }
    }
  },
  created() {
    this.getSelectOptions(['receiptStatus', 'receiptType'])
  },
  methods: {
    confirmBatchDelete(idArrs) {
      return OfficialDocumentService.removeBatchOfficialDocument(idArrs)
    },
    fetchTableDataListPromise(entity) {
      return OfficialDocumentService.listOfficialDocument(entity)
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
        receiptStatus: this.advanceQueryParams.receiptStatus,
        signatureStatus: this.advanceQueryParams.signatureStatus,
        receiptType: this.advanceQueryParams.receiptType,
        startDate: this.advanceQueryParams.queryDate && this.advanceQueryParams.queryDate[0],
        endDate: this.advanceQueryParams.queryDate && this.advanceQueryParams.queryDate[1]
      }
    },
    doReplyHandler(row) {
      if (row.receiptStatus === Draft || row.receiptStatus === NotReply) {
        this.$router.push('/villageAffairsOpen/replyReceipt/' + row.articleId)
      } else if (row.receiptStatus === HadReplied) {
        // 已回复
        this.$message({
          message: '只能回复未回复的内容！',
          type: 'warning'
        })
      }
    },
    // 查看回复
    viewReplyHandler(row) {
      const CurrentReceiptStatus = row.receiptStatus
      if (CurrentReceiptStatus === NotReply) {
        // 未恢复提示：先回复
        this.$message({
          message: '请先回复！',
          type: 'warning'
        })
        return
      }
      if (CurrentReceiptStatus === Draft) {
        // 草稿，跳转到编辑回复页面
        this.$router.push('/villageAffairsOpen/editReceiptRegist' + row.articleId)
        return
      }
      if (CurrentReceiptStatus === HadReplied) {
        console.log('查看会问详情')
      }
    },
    // 确认签收
    confirmSignatureHandler() {
      const SelectedList = this.$refs.dataListTable.selection
      if (!SelectedList || SelectedList.length === 0) {
        this.$message({
          message: '请勾选需要确认签收的条目！',
          type: 'warning'
        })
        return
      }
      this.$confirm(`确认要签收选中的${SelectedList.length}条数据吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const officialDocumentIdList = SelectedList.map(sl => sl.articleId)
        OfficialDocumentService.confirmSignature(officialDocumentIdList).then(() => {
          this.$message({
            type: 'success',
            message: '签收成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '签收失败!'
          })
        }).finally(() => {
          // 跟新数据
          this.fetchTableDataList()
        })
      })
    }
  }
}
</script>
