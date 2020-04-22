<template>
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
            <el-form-item label="标  题:">
              <el-input v-model="advanceQueryParams.title" placeholder="支持模糊搜索" style="width:205px"></el-input>
            </el-form-item>
            <el-form-item label="事项类型:">
              <el-select v-model="advanceQueryParams.thingType" placeholder="请选择">
                <el-option
                  v-for="item in selectOptionsMap.thingType"
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
          @click="$router.push('/comprehensiveInfo/addBusinessGuide')"
        >新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="batchDelete('dataListTable', 'articleId')">删除</el-button>
        <el-button type="primary" icon="el-icon-printer">打印</el-button>
      </div>
      <el-table v-loading="dataListLoading" ref="dataListTable" :data="dataList" border class="cus-mb-20">
        <el-table-column type="selection" width="55px"></el-table-column>
        <el-table-column type="index" label="序号" width="55px"></el-table-column>
        <el-table-column label="标题" width="170px">
          <template slot-scope="scope">
            <span
              style="color: blue;text-decoration:underline"
              @click="$router.push('/generalInfo/xiangqing')"
            >{{scope.row.article.title}}</span>
          </template>
        </el-table-column>
        <el-table-column label="封面图" width="100px">
          <template slot-scope="scope">
            <sv-image :sources="[scope.row.article.coverPicture]"></sv-image>
            <!-- <img class="table-column--img" :src="$global.generateImgPath(scope.row.article.coverPicture)" /> -->
          </template>
        </el-table-column>
        <el-table-column prop="thingType" :formatter="formatColumn('thingType')" label="办事类型"></el-table-column>
        <el-table-column prop="createVillager.person.name" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="170px">
          <template slot-scope="scope">
            {{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
          </template>
        </el-table-column>
        <el-table-column prop="updateVillager.person.name" label="修改人"></el-table-column>
        <el-table-column prop="lastUpdateTime" label="修改时间" width="200px">
          <template slot-scope="scope">
            {{scope.row.lastUpdateTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
          </template>
        </el-table-column>
        <el-table-column prop="article.village.title" label="村组" width="100px"></el-table-column>
        <el-table-column prop="article.enableStatus" :formatter="formatColumn('article.enableStatus', 'enableStatus1')" label="启动状态" width="100px"></el-table-column>
        <el-table-column fixed="right" label="操作" width="85">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="$router.push('/comprehensiveInfo/editBusinessGuide/' + scope.row.articleId)"
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
import BusinessGuideService from '@/api/comprehensiveInfo/BusinessGuideService'
import svImage from '@/components/svImage/index'
export default {
  mixins: [tableDataQueryMixin],
  components: {
    pwdDialog,
    svImage
  },
  name: 'Guide',
  data() {
    return {
      isHeightLevel: false,
      title: '农业支持保护补贴发放流程',
      dataList: [
        {
          id: 1,
          title: '农业支持保护补贴发放流程',
          type: '农业',
          creater: '张三',
          createTime: 'YYYY-MM-DD,hh:mm:ss',
          reviser: '李四',
          reviseTime: 'YYYY-MM-DD,hh:mm:ss',
          cunzu: '演示村',
          startStatu: '前后台启动'
        },
        {
          id: 2,
          title: '农民进城就业指南',
          type: '就业指南',
          creater: 'xx',
          createTime: 'YYYY-MM-DD,hh:mm:ss',
          reviser: 'xx',
          reviseTime: 'YYYY-MM-DD,hh:mm:ss',
          cunzu: '演示村',
          startStatu: '前后台启动'
        }
      ],
      mattertypeOptions: [
        {
          label: '请选择',
          value: '0'
        },
        {
          label: '农业',
          value: '1'
        },
        {
          label: '财政',
          value: '2'
        },
        {
          label: '民政',
          value: '3'
        },
        {
          label: '户籍',
          value: '4'
        },
        {
          label: '国土住建',
          value: '5'
        },
        {
          label: '计生服务',
          value: '6'
        },
        {
          label: '就业指南',
          value: '7'
        },
        {
          label: '惠民政策',
          value: '8'
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
      advanceQueryParams: {
        title: '',
        thingType: ''
      },
      totalRecord: 0,
      selectOptionsMap: {
        thingType: [],
        enableStatus1: []
      }
    }
  },
  created() {
    this.getSelectOptions(['thingType', 'enableStatus1'])
  },
  methods: {
    confirmBatchDelete(idArrs) {
      return BusinessGuideService.removeBatchBusinessGuide(idArrs)
    },
    fetchTableDataListPromise(entity) {
      return BusinessGuideService.listBusinessGuide(entity)
    },
    getFastEntity() {
      return {
        title: this.advanceQueryParams.title
      }
    },
    getAdvanceEntity() {
      return {
        title: this.advanceQueryParams.title,
        thingType: this.advanceQueryParams.thingType
      }
    }
  }
}
</script>
