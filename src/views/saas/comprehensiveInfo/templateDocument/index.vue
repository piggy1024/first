<template>
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl">
        <el-form :inline="true" class="cus-fl-1 cus-text-right">
          <el-form-item>
            <el-input
              v-model="advanceQueryParams.documentName"
              placeholder="普通模糊搜索:文档名称"
              suffix-icon="el-icon-search"
            ></el-input>
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
          <el-form :inline="true" label-width="90px" class="demo-form-inline clearfix">
            <el-form-item label="文档名称:">
              <el-input v-model="advanceQueryParams.documentName" placeholder="支持模糊搜索" style="width:205px"></el-input>
            </el-form-item>
            <el-form-item label="文档类型:">
              <el-select v-model="advanceQueryParams.documentType" placeholder="请选择">
                <el-option
                  v-for="item in selectOptionsMap.documentType"
                  :key="item.dataCode"
                  :label="item.meaning"
                  :value="item.dataCode"
                />
              </el-select>
            </el-form-item>
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
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="$router.push('/comprehensiveInfo/addTemplateDocument')"
        >新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="batchDelete('dataListTable', 'templateDocumentId')">删除</el-button>
      </div>
      <el-table v-loading="dataListLoading" :data="dataList" ref="dataListTable" border class="cus-mb-20">
        <el-table-column type="selection" width="55px"></el-table-column>
        <el-table-column type="index" label="序号" width="55px"></el-table-column>
        <el-table-column label="文档名称" prop="docName" width="250px">
          <template slot-scope="scope">
            <span
              style="color: blue;text-decoration:underline"
              @click="$router.push('/generalInfo/xiangqing')"
            >{{scope.row.documentName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="documentType" :formatter="formatColumn('documentType')" label="文档类型" width="100px"></el-table-column>
        <el-table-column prop="createVillager.person.name" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="160px">
          <template slot-scope="scope">
            {{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
          </template>
        </el-table-column>
        <el-table-column prop="updateVillager.person.name" label="修改人"></el-table-column>
        <el-table-column prop="lastUpdateTime" label="修改时间" width="160px">
          <template slot-scope="scope">
            {{scope.row.lastUpdateTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
          </template>
        </el-table-column>
        <el-table-column prop="village.title" label="村组" width="100px"></el-table-column>
        <el-table-column prop="enableStatus" :formatter="formatColumn('enableStatus', 'enableStatus1')" label="微信端显示" width="100px"></el-table-column>
        <el-table-column fixed="right" label="操作" width="190x">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="$router.push('/comprehensiveInfo/editTemplateDocument/' + scope.row.templateDocumentId)"
            >修改</el-button>
            <el-button type="primary" size="mini" icon="el-icon-download">下载</el-button>
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

  .height-level-box {
    /deep/ .el-form-item {
      width: calc(100% / 3);
      box-sizing: border-box;
      margin-right: 0;
      padding-right: 15px;
      float: left;
      display: flex;

      .el-form-item__label {
        text-align: left;
      }

      .el-form-item__content {
        flex: 1;
      }
    }
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
import TemplateDocumentService from '@/api/comprehensiveInfo/TemplateDocumentService'

export default {
  mixins: [tableDataQueryMixin],
  components: {
    pwdDialog
  },
  name: 'TemplateFile',
  data() {
    return {
      isHeightLevel: false,
      title: '农业支持保护补贴发放流程',
      dataList: [],
      fileTypeOptions: [
        {
          label: '请选择',
          value: '0'
        },
        {
          label: '党政办',
          value: '1'
        },
        {
          label: '民政',
          value: '2'
        },
        {
          label: '财政',
          value: '3'
        },
        {
          label: '经管劳保',
          value: '4'
        },
        {
          label: '计生',
          value: '5'
        },
        {
          label: '综合治理',
          value: '6'
        },
        {
          label: '国土住建',
          value: '7'
        }
      ],
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
      advanceQueryParams: {},
      totalRecord: 0,
      selectOptionsMap: {
        documentType: [],
        enableStatus1: []
      }
    }
  },
  created() {
    this.getSelectOptions(['documentType', 'enableStatus1'])
  },
  methods: {
    confirmBatchDelete(idArrs) {
      return TemplateDocumentService.removeBatchTemplateDocument(idArrs)
    },
    fetchTableDataListPromise(entity) {
      return TemplateDocumentService.listTemplateDocument(entity)
    },
    getFastEntity() {
      return {
        documentName: this.advanceQueryParams.documentName
      }
    },
    getAdvanceEntity() {
      return {
        documentName: this.advanceQueryParams.documentName,
        documentType: this.advanceQueryParams.documentType
      }
    }
  }
}
</script>
