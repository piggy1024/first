<template>
  <div class="container">
    <div class="btn-box cus-mb-10">
      <el-button type="success">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="高龄老年人信息" name="1">
          <el-form ref="form" label-width="110px" :rules="rules">
            <el-row>
              <el-col :span="8">
                <el-form-item label="  异动金额 :" prop="remark">
                  <el-input style="width:200px" v-model="temp.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="  一卡通户名 :" prop="remark">
                  <el-input style="width:200px" v-model="temp.name" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="  一卡通身份证 :" prop="remark">
                  <el-input style="width:200px" v-model="temp.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="开始时间:">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="  一卡通账号 :" prop="remark">
                  <el-input style="width:200px" v-model="temp.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="取消时间:">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="  备注 :" prop="remark">
                  <el-input
                    type="textarea"
                    style="width:1055px"
                    v-model="temp.name"
                    placeholder="请输入"
                  ></el-input>
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
