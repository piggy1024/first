<template>
  <div class="container">
    <div class="btn-box cus-mb-10">
      <el-button type="success">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-collapse v-model="activeNames">
        <el-form ref="form" label-width="100px" :rules="rules">
          <el-collapse-item title="基本信息" name="1">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="文档名称:" prop="name">
                  <el-input style="width:200px" v-model="temp.name"></el-input>
                </el-form-item>
                <el-form-item label=" 创建人:">
                  <el-input style="width:200px" disabled="true" value="系统反显"></el-input>
                </el-form-item>
                <el-form-item label="启动显示:">
                  <el-select placeholder="请选择" v-model="temp.reviser" style="width:200px">
                    <el-option
                      v-for="item in educationOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="文档类型" prop="documentType">
                  <el-select placeholder="请选择" v-model="temp.relation" style="width:200px">
                    <el-option
                      v-for="item in relationOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="村组:" prop="cunzu">
                  <el-input disabled value="自动显示" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="修改人:" prop="reviser">
                  <el-input disabled value="自动显示" style="width:200px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="创建时间:" prop="createTime">
                  <el-input disabled value="自动显示" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="修改时间:" prop="createTime">
                  <el-input disabled value="自动显示" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="上传文档">
                  <el-upload>
                    <el-button type="primary" style="width:200px">
                      <span>选择文件</span>
                    </el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-form>
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
        name: [{ required: true, message: '请输入11', trigger: 'blur' }],
        documentType: [{ required: true, message: '请输入11', trigger: 'blur' }]
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
