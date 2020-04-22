<template>
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl">
        <el-form :inline="true" class="cus-fl-1 cus-text-right">
          <el-form-item>
            <el-input v-model="listQuery.name" placeholder="普通模糊搜索:标题" suffix-icon="el-icon-search"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn-box">
          <el-button type="primary">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="result-box">
      <div class="btn-box cus-mb-10">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="$router.push('/partyBuilding/partyBuilding/add')"
        >新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="pwdDialog.isShow = true">删除</el-button>
      </div>
      <el-table :data="tableData" border class="cus-mb-20">
        <el-table-column type="selection" width="55px"></el-table-column>
        <el-table-column prop="id" label="序号" width="55px"></el-table-column>
        <el-table-column label="标题" prop="title" width="250px">
          <span
            style="color: blue;text-decoration:underline"
            @click="$router.push('/generalInfo/xiangqing')"
          >中国共产党巡视工作条例</span>
        </el-table-column>
        <el-table-column prop="pic" label="封面图" width="100px"></el-table-column>
        <el-table-column prop="submitPerson" label="提交人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="250px"></el-table-column>
        <el-table-column prop="reviser" label="修改人"></el-table-column>
        <el-table-column prop="reviseTime" label="修改时间" width="200px"></el-table-column>
        <el-table-column prop="cunzu" label="村组" width="100px"></el-table-column>
        <el-table-column prop="startStatu" label="微信端显示" width="100px"></el-table-column>
        <el-table-column fixed="right" label="操作" width="85">
          <template>
            <el-button
              type="primary"
              size="mini"
              @click="$router.push('/partyBuilding/partyBuilding/add')"
              icon="el-icon-edit"
            >修改</el-button>
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
  name: 'Guide',
  data() {
    return {
      pwdDialog: {
        isShow: false
      },
      isHeightLevel: false,
      tableData: [
        {
          id: 1,
          title: '农业支持保护补贴发放流程',
          submitPerson: '张三',
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
