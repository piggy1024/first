<template>
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl">
        <el-form :inline="true" class="cus-fl-1 cus-text-right">
          <el-form-item>
            <el-input
              v-model="tableData.name"
              placeholder="普通模糊搜索:村民姓名"
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
            <el-form-item label="村民姓名">
              <el-input v-model="listQuery.name" placeholder="支持模糊搜索" style="width:205px"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="listQuery.idNumber" placeholder="支持模糊搜索" style="width:205px"></el-input>
            </el-form-item>
            <el-form-item label="入党年度">
              <el-select v-model="listQuery.statu" placeholder="请选择">
                <el-option label="在家" value="shanghai"></el-option>
                <el-option label="外出务工" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年龄段">
              <el-input v-model="listQuery.min_age" style="width:75px"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-input v-model="listQuery.max_age" style="width:75px"></el-input>
            </el-form-item>
            <el-form-item label="下级组">
              <el-select v-model="listQuery.isHost" placeholder="请选择">
                <el-option label="是" value="shanghai"></el-option>
                <el-option label="否" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="listQuery.isCollect" placeholder="请选择">
                <el-option label="是" value="shanghai"></el-option>
                <el-option label="否" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="党员状态">
              <el-select v-model="listQuery.isHost" placeholder="请选择">
                <el-option label="是" value="shanghai"></el-option>
                <el-option label="否" value="beijing"></el-option>
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
        <el-button type="primary" icon="el-icon-circle-plus-print">打印预览</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-edit">导出</el-button>
      </div>
      <el-table :data="tableData" border class="cus-mb-20">
        <el-table-column type="selection" width="55px"></el-table-column>
        <el-table-column prop="id" label="序号" width="55px"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="nation" label="民族"></el-table-column>
        <el-table-column prop="address" label="详细地址" width="100px"></el-table-column>
        <el-table-column prop="education" label="文化程度"></el-table-column>
        <el-table-column prop="birthDate" label="出生日期" width="120px"></el-table-column>
        <el-table-column prop="joinTime" label="入党时间" width="120px"></el-table-column>
        <el-table-column prop="idCard" label="身份证" width="150px"></el-table-column>
        <el-table-column prop="branchOffice" label="所在支部"></el-table-column>
        <el-table-column prop="presentPost" label="现任职务"></el-table-column>
        <el-table-column prop="partymemberStatus" label="党员状态"></el-table-column>
        <el-table-column prop="phone" label="联系方式" width="120px"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作" width="85">
          <template>
            <el-button
              type="primary"
              size="mini"
              @click="$router.push('/partyBuilding/membersList/edit')"
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
export default {
  name: 'Service',
  data() {
    return {
      ruleForm: {
        service: '',
        fuwudian: '',
        cunzu: '',
        person: '',
        phone: false,
        startStatu: ''
      },
      rules: {
        service: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      dialogTableVisible: false,
      isHeightLevel: false,
      tableData: [
        {
          id: 1,
          name: 'xxx',
          sex: '男',
          nation: '汉',
          address: '演示村1队',
          education: '大专',
          birthDate: 'YYYY-MM-DD',
          joinTime: 'YYYY-MM-DD',
          idCard: '6666666666666666',
          branchOffice: '第一支部',
          presentPost: '村支书',
          partymemberStatus: '在家',
          phone: '13170444756',
          remark: ''
        },
        {
          id: 2,
          service: '有线电视业务',
          person: 'xxx',
          fuwudian: 'xx村',
          phone: 15674565798,
          remark: '',
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
