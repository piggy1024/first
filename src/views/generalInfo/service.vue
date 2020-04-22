<template>
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl">
        <el-form :inline="true" class="cus-fl-1 cus-text-right">
          <el-form-item>
            <el-input v-model="tableData.name" placeholder="普通姓名模糊搜索" suffix-icon="el-icon-search"></el-input>
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
            <el-form-item label="联 系 人:">
              <el-input v-model="listQuery.name" placeholder="支持模糊搜索" style="width:205px"></el-input>
            </el-form-item>
            <el-form-item label="服务事项:">
              <el-select v-model="listQuery.serviceMatter" placeholder="请选择">
                <el-option
                  v-for="item in servicMattereOptions"
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
      <el-dialog title="新增中介服务" :visible.sync="dialogTableVisible" width="550px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px">
          <el-row type="flex" justify="space-between" class="cus-mb-10">
            <el-col :span="12">
              <el-form-item label="服务事项:" prop="service" style="width:230px">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="服务点:" prop="fuwudian" style="width:230px">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="村组:" prop="cunzu" style="width:230px">
                <el-input disabled value="演示村"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人:" prop="person" style="width:230px">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="联系电话:" prop="phone" style="width:230px">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="启用状态:" prop="startstatus" style="width:230px">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注:" prop="remark">
            <el-input
              type="textarea"
              v-model="ruleForm.desc"
              style="width:400px"
              placeholder="限制200字"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer text-center">
          <el-button type="success" @click="dialogTableVisible = false">保存</el-button>
          <el-button type="primary" @click="dialogTableVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <el-table :data="tableData" border class="cus-mb-20">
        <el-table-column type="selection" width="55px"></el-table-column>
        <el-table-column prop="id" label="序号" width="55px"></el-table-column>
        <el-table-column label="服务事项" prop="service" width="150px"></el-table-column>
        <el-table-column prop="person" label="联系人" width="100px"></el-table-column>
        <el-table-column prop="fuwudian" label="服务点"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="remark" label="备注" width="150px"></el-table-column>
        <el-table-column prop="cunzu" label="村组"></el-table-column>
        <el-table-column prop="startStatu" label="启用状态" width="100px"></el-table-column>
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
  name: 'Service',
  data() {
    return {
      pwdDialog: {
        isShow: false
      },
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
      servicMattereOptions: [
        {
          label: '请选择',
          value: '0'
        },
        {
          label: '有线电视服务',
          value: '1'
        },
        {
          label: '自来水开户',
          value: '2'
        },
        {
          label: '电力咨询',
          value: '3'
        },
        {
          label: '宽带,固话,手机充值',
          value: '4'
        },
        {
          label: '物流快递',
          value: '5'
        },
        {
          label: '煤气运送及缴费',
          value: '6'
        },
        {
          label: '水电工推荐',
          value: '7'
        },
        {
          label: '家政服务',
          value: '8'
        },
        {
          label: '医疗门诊',
          value: '9'
        }
      ],
      dialogTableVisible: false,
      isHeightLevel: false,
      tableData: [
        {
          id: 1,
          service: '有线电视业务',
          person: '杨春才',
          fuwudian: '有线电视公司负责人',
          phone: 15674436110,
          remark: '',
          cunzu: '演示村',
          startStatu: '前后台启动'
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
