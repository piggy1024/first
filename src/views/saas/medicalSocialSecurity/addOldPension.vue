<template>
  <div class="app-container">
    <div class="btn-box cus-mb-10">
      <el-button type="success">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-form ref="form" label-width="110px" :rules="rules">
        <el-collapse v-model="activeNames">
          <!-- label-position="left" -->
          <el-collapse-item title="个人信息" name="1">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="村民姓名" prop="name">
                  <el-button type="primary" @click="dialogTableVisible = true">
                    <span>点击选择</span>
                    <!-- <i class="el-icon-arrow-right el-icon--right"></i> -->
                  </el-button>
                </el-form-item>
                <el-form-item label="性别">
                  <span class="cus-text-666">男</span>
                </el-form-item>
                <el-form-item label="与户主关系">
                  <span class="cus-text-666">户主</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份证号">
                  <span class="cus-text-666">6382739487304198</span>
                </el-form-item>
                <el-form-item label="民族">
                  <span class="cus-text-666">汉族</span>
                </el-form-item>
                <el-form-item label="电话号码">
                  <span class="cus-text-666">12556428254</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="年龄">
                  <span class="cus-text-666">45</span>
                </el-form-item>
                <el-form-item label="所在户">
                  <span class="cus-text-666">张三</span>
                </el-form-item>
                <el-form-item label="户籍地址">
                  <span class="cus-text-666">XX村</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="社保信息" name="2">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="社保账号" prop="account">
                  <el-input disabled="true" value="系统反显"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="领取金额" prop="money">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="领取日期" prop="date">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </div>
    <el-dialog title="请选择村民" :visible.sync="dialogTableVisible" :show-close="false" width="60%">
      <el-row type="flex" justify="space-between" class="cus-mb-10">
        <!-- <el-col :span="5">
           村民姓名/身份证号
        </el-col>-->
        <el-col :span="18">
          <el-input placeholder="村民姓名/身份证号" style="width:300px"></el-input>
        </el-col>
        <el-col :span="5" class="cus-text-right">
          <el-button type="primary">搜索</el-button>
        </el-col>
      </el-row>
      <el-table
        ref="singleTable"
        border
        :data="gridData"
        highlight-current-row
        @current-change="handleCurrentChange"
        max-height="200"
      >
        <el-table-column width="40">
          <template slot-scope="scope">
            <el-radio v-model="dialogRadio" :label="scope.row.name">
              <span v-show="false">11</span>
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="idCard" label="身份证号" width="170"></el-table-column>
        <el-table-column property="age" label="年龄"></el-table-column>
        <el-table-column property="group" label="所在组"></el-table-column>
        <el-table-column property="household" label="所在户" min-width="90"></el-table-column>
        <el-table-column property="relationship" label="与户主关系" min-width="100"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer text-center">
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
        <el-button @click="dialogTableVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.content-box {
  /deep/ .el-collapse {
    // .el-collapse-item__header {
    //   font-size: 16px;
    //   color: #333;
    //   font-weight: 700;
    //   > i {
    //     font-weight: bold;
    //   }
    // }
    .el-collapse-item__content {
      padding: 15px 0 0;
      // .el-col > .el-col {
      //   line-height: 33px;
      //   margin-bottom: 15px;
      // }
      .el-form-item .el-input,
      .el-form-item .el-date-editor.el-input,
      .el-form-item .el-button {
        width: 200px;
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      activeNames: ['1', '2'],
      dialogTableVisible: false,
      canbaoAtrribute: [
        {
          label: '未参加',
          value: '0'
        },
        {
          label: '连续参加',
          value: '1'
        }
      ],
      type: [
        {
          label: '无',
          value: '0'
        },
        {
          label: '城镇医疗保险',
          value: '1'
        }
      ],
      landConfirmDialogForm: {
        landGrade: '',
        landType: '',
        isFarmland: ''
      },
      rules: {
        account: [{ required: true, message: '请输入11', trigger: 'blur' }],
        money: [{ required: true, message: '请输入11', trigger: 'blur' }],
        date: [{ required: true, message: '请输入11', trigger: 'blur' }]
      },
      gridData: [
        {
          name: '张三',
          idCard: '41528556392545285',
          age: '22',
          group: '五队',
          household: '张大',
          relationship: '父子'
        },
        {
          name: '李四',
          idCard: '41528556392545285',
          age: '20',
          group: '六队',
          household: '李达',
          relationship: '父子'
        }
      ],
      dialogRadio: ''
    }
  },
  created() {},
  methods: {
    handleCurrentChange(val) {
      console.log(val)
    }
  }
}
</script>
