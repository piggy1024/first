<template>
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl">
        <el-form :inline="true" class="cus-fl-1 cus-text-right">
          <el-form-item>
            <el-input
              v-model="listQuery.name"
              placeholder="普通模糊搜索:干部名称"
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
            <el-form-item label="干部名称:">
              <el-input v-model="listQuery.name" placeholder="支持模糊搜索" style="width:205px"></el-input>
            </el-form-item>
            <el-form-item label="干部职务:">
              <el-select v-model="listQuery.position" placeholder="请选择">
                <el-option
                  v-for="item in positionOptions"
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
          @click="dialogTableVisible = true"
        >新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="pwdDialog.isShow = true">删除</el-button>
      </div>
      <el-dialog title="新增干部信息" :visible.sync="dialogTableVisible" width="550px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px">
          <el-row type="flex" justify="space-between" class="cus-mb-10">
            <el-col :span="12">
              <el-form-item label="干部姓名:" prop="name" style="width:240px">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="职务:" prop="job" style="width:240px">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                  <el-option label="村(社区)支部书记" value="shanghai"></el-option>
                  <el-option label="村(社区)主任" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="组别:" prop="service" style="width:240px">
                <el-select v-model="ruleForm.zubie" placeholder="请选择(村组队)">
                  <el-option label="1队" value="shanghai"></el-option>
                  <el-option label="2队" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人:" prop="person" style="width:240px">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="联系电话:" prop="phone" style="width:240px">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="电话短号:" prop="short_phone" style="width:240px">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="上传照片">
            <el-upload>
              <el-button type="primary" style="width:400px">
                <span>选择文件</span>
              </el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="职务介绍:" prop="remark">
            <el-input type="textarea" v-model="ruleForm.desc" style="width:400px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer text-center">
          <el-button type="success" @click="dialogTableVisible = false">保存</el-button>
          <el-button type="primary" @click="dialogTableVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <el-table :data="tableData" border class="cus-mb-20">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="id" label="序号" width="50px"></el-table-column>
        <el-table-column label="干部姓名" prop="name"></el-table-column>
        <el-table-column prop="pic" label="照片"></el-table-column>
        <el-table-column prop="job" label="职务"></el-table-column>
        <el-table-column prop="phone" label="电话" width="120px"></el-table-column>
        <el-table-column prop="short_phone" label="电话短号"></el-table-column>
        <el-table-column prop="job_introduce" label="职务介绍" width="250px"></el-table-column>
        <el-table-column fixed="right" label="操作" width="85">
          <template>
            <el-button
              type="primary"
              size="mini"
              @click="dialogTableVisible = true"
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
  name: 'AddressBook',
  data() {
    return {
      pwdDialog: {
        isShow: false
      },
      ruleForm: {
        name: '',
        job: '',
        zubie: '',
        person: '',
        phone: false,
        short_phone: ''
      },
      rules: {
        name: [{ required: true, message: '请选择', trigger: 'change' }],
        job: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      positionOptions: [
        {
          label: '请选择',
          value: '0'
        },
        {
          label: '村(社区)支部书记',
          value: '1'
        },
        {
          label: '村(社区)主任',
          value: '2'
        },
        {
          label: '村(社区)只两委',
          value: '3'
        },
        {
          label: '村(社区)委委员',
          value: '4'
        },
        {
          label: '村(社区)组长',
          value: '5'
        }
      ],
      dialogTableVisible: false,
      isHeightLevel: false,
      title: '农业支持保护补贴发放流程',
      tableData: [
        {
          id: 1,
          name: '张三',
          pic: '照片',
          job: '村（社区）委委员',
          phone: '13456347784',
          short_phone: '4523',
          job_introduce: '主管计划生育，分管文教卫生等'
        },
        {
          id: 2
        }
      ],
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        sex: undefined,
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
