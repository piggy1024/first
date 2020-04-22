<template>
  <div class="container">
    <div class="btn-box cus-mb-10">
      <el-button type="success">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="前科人员信息" name="1">
          <el-row :gutter="20">
            <el-form ref="form" label-width="100" :rules="rules">
              <el-col :span="8">
                <el-form-item label="违法行为:" prop="behavior">
                  <el-input
                    placeholder="请输入内容"
                    type="textarea"
                    style="width:200px"
                    v-model="temp.name"
                  ></el-input>
                </el-form-item>
                <el-form-item label="备注:" prop="remark">
                  <el-input
                    placeholder="请输入内容"
                    type="textarea"
                    style="width:200px"
                    v-model="temp.name"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话:" prop="remark">
                  <el-input style="width:200px" v-model="temp.name"></el-input>
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
  name: 'AddLaw',
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
</style>
