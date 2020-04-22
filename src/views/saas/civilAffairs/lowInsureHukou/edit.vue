<template>
  <div class="container">
    <div class="btn-box cus-mb-10">
      <el-button type="success">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="低保户信息" name="1">
          <el-row :gutter="20">
            <el-form ref="form" label-width="100px" :rules="rules">
              <el-col :span="8">
                <el-form-item label="  异动说明 " prop="changeExplain">
                  <el-input style="width:200px" v-model="temp.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="  属别">
                  <el-select placeholder="请选择" v-model="temp.creater" style="width:200px">
                    <el-option key="1" label="是" value="1"></el-option>
                    <el-option key="0" label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="   享受人员 " prop="changeExplain">
                  <el-input style="width:200px" v-model="temp.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="  备注 " prop="remark">
                  <el-input
                    type="textarea"
                    style="width:200px"
                    v-model="temp.name"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="   银行卡账号 " prop="bankAccount">
                  <el-input style="width:200px" v-model="temp.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="  类型">
                  <el-select placeholder="请选择" v-model="temp.creater" style="width:200px">
                    <el-option key="1" label="是" value="1"></el-option>
                    <el-option key="0" label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="   人数 " prop="changeExplain">
                  <el-input style="width:200px" v-model="temp.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="  低保类型">
                  <el-select placeholder="请选择" v-model="temp.creater" style="width:200px">
                    <el-option key="1" label="是" value="1"></el-option>
                    <el-option key="0" label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="   原因 " prop="changeExplain">
                  <el-input style="width:200px" v-model="temp.name" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddGuide',
  data() {
    return {
      activeNames: ['1'],
      rules: {
        title: [{ required: true, message: '请输入11', trigger: 'blur' }],
        type: [{ required: true, message: '请输入11', trigger: 'blur' }]
      },
      temp: {
        id: undefined,
        importance: 1,
        creater: undefined,
        reviser: undefined
      }
    }
  }
}
</script>
<style>
.container {
  margin: 20px;
}

.dialog-footer {
  margin-top: 50px;
  text-align: center;
}
</style>
