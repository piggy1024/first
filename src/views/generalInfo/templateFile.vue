<template>
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl">
        <el-form :inline="true" class="cus-fl-1 cus-text-right">
          <el-form-item>
            <el-input
              v-model="listQuery.name"
              placeholder="普通模糊搜索:文档名称"
              suffix-icon="el-icon-search"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="btn-box">
          <el-button type="primary">搜索</el-button>
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
              <el-input v-model="listQuery.name" placeholder="支持模糊搜索" style="width:205px"></el-input>
            </el-form-item>
            <el-form-item label="文档类型:">
              <el-select v-model="listQuery.fileType" placeholder="请选择">
                <el-option
                  v-for="item in fileTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <div class="cus-text-right cus-pr-15">
            <el-button type="primary">搜索</el-button>
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
          @click="$router.push('/generalInfo/addTemplate')"
        >新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="pwdDialog.isShow = true">删除</el-button>
      </div>
      <el-table :data="tableData" border class="cus-mb-20">
        <el-table-column type="selection" width="55px"></el-table-column>
        <el-table-column prop="id" label="序号" width="55px"></el-table-column>
        <el-table-column label="文档名称" prop="docName" width="250px">
          <span
            style="color: blue;text-decoration:underline"
            @click="$router.push('/generalInfo/xiangqing')"
          >村级财务收入明细表</span>
        </el-table-column>
        <el-table-column prop="type" label="文档类型" width="100px"></el-table-column>
        <el-table-column prop="creater" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="250px"></el-table-column>
        <el-table-column prop="reviser" label="修改人"></el-table-column>
        <el-table-column prop="reviseTime" label="修改时间" width="200px"></el-table-column>
        <el-table-column prop="cunzu" label="村组" width="100px"></el-table-column>
        <el-table-column prop="wxShow" label="微信端显示" width="100px"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180x">
          <template>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="$router.push('/generalInfo/editTempalte')"
            >修改</el-button>
            <el-button type="primary" size="mini" icon="el-icon-download">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="cus-text-right"
        :current-page="1"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
        background
      ></el-pagination>
    </div>
    <pwd-dialog :pwd-dialog="pwdDialog"></pwd-dialog>
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
export default {
  components: {
    pwdDialog
  },
  name: 'TemplateFile',
  data() {
    return {
      pwdDialog: {
        isShow: false
      },
      isHeightLevel: false,
      title: '农业支持保护补贴发放流程',
      tableData: [
        {
          id: 1,
          docName: '农业支持保护补贴发放流程',
          type: '国土住建部',
          creater: '系统管理员',
          createTime: 'YYYY-MM-DD,hh:mm:ss',
          reviser: 'xxx',
          reviseTime: 'YYYY-MM-DD,hh:mm:ss',
          cunzu: '演示村',
          startStatu: '禁用'
        },
        {
          id: 2
        }
      ],
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
      }
    }
  },
  created() {},
  methods: {}
}
</script>
