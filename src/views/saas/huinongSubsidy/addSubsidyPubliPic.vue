<template>
  <div class="app-container">
    <div class="btn-box cus-mb-20">
      <el-button type="success">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-form ref="form" label-width="110px" :rules="rules" class="cus-pr-15">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="村组" prop>
              <el-input value="系统反显" readonly></el-input>
            </el-form-item>
            <el-form-item label="公示近图">
              <el-upload>
                <el-button type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="补贴到户">
              <el-upload>
                <el-button type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="补贴类型" prop="temp">
              <el-select v-model="formData.publicType" placeholder="请选择">
                <el-option label="生活性补贴" value="1"></el-option>
                <el-option label="生产性补贴" value="2"></el-option>
                <el-option label="其他补贴" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="公示远图">
              <el-upload>
                <el-button type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="补贴到户">
              <el-upload>
                <el-button type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公示时间" prop="temp">
              <el-date-picker v-model="formData.publicTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="补贴到户">
              <el-upload>
                <el-button type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="补贴到户">
              <el-upload>
                <el-button type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-box /deep/ {
  .el-form-item .el-input,
  .el-form-item .el-date-editor.el-input,
  .el-form-item .el-select,
  .el-form-item .el-textarea,
  .el-form-item .el-button {
    width: 100%;
  }
  .el-form-item .el-upload {
      display: block;
  }
}
</style>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: '1',
          label: '村民留言'
        },
        {
          value: '2',
          label: '基础设施'
        },
        {
          value: '3',
          label: '值班日志'
        },
        {
          value: '5',
          label: '村务台账'
        },
        {
          value: '6',
          label: '村规民约'
        }
      ],
      Statusoptions: [
        {
          value: '1',
          label: '前后台启用'
        },
        {
          value: '2',
          label: '后台启用'
        },
        {
          value: '3',
          label: '禁用'
        }
      ],
      value: '',
      formData: {
        publicType: '',
        publicTime: ''
      },
      rules: {
        temp: [{ required: true, message: '请输入11', trigger: 'blur' }]
      }
    }
  },
  created() {},
  methods: {}
}
</script>
