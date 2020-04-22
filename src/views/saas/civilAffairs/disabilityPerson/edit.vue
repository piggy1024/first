<template>
  <div class="container">
    <div class="btn-box cus-mb-10">
      <el-button type="success">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="残疾信息" name="1">
          <el-form ref="form" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="残疾证号">
                  <el-input v-model="submitForm.disabilityCertifNo" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="注册时间">
                  <el-date-picker v-model="submitForm.registerTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="银行类型">
                  <el-select placeholder="请选择" v-model="submitForm.bankType">
                    <el-option key="1" label="是" value="1"></el-option>
                    <el-option key="0" label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="残疾等级" prop="startStuta">
                  <el-select placeholder="请选择" v-model="submitForm.disabilityLevel">
                    <el-option
                      v-for="item in relationOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="开始时间">
                  <el-date-picker v-model="submitForm.startTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="银行卡账号">
                  <el-input placeholder="请输入" v-model="submitForm.bankCardAccountNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户人">
                  <el-input v-model="submitForm.accountOpenPerson" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="取消时间">
                  <el-date-picker v-model="submitForm.registerTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="16">
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="submitForm.remark" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
// api
// import dataCodeService from '@/api/DataCodeService'
// import disabilityPersonService from '@/api/civilAffairs/DisabilityPersonService'

export default {
  data() {
    return {
      activeNames: ['1'],
      submitForm: {
        disabilityCertifNo: '',
        registerTime: '',
        bankType: '',
        remark: '',
        disabilityLevel: '',
        startTime: '',
        bankCardAccountNumber: '',
        accountOpenPerson: ''
      }
    }
  }
}
</script>
<style scoped lang="scss">
.container {
  margin: 20px;
}
.content-box {
  padding-right: 26px;
  /deep/ .el-collapse-item {
    .el-form-item .el-input,
      .el-form-item .el-date-editor.el-input,
      .el-form-item .el-textarea,
      .el-form-item .el-select,
      .el-form-item .el-button {
        // width: 200px;
        width: 100%;
      }
  }
}
.dialog-footer {
  margin-top: 50px;
  text-align: center;
}
</style>
