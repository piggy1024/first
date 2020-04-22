<template>
  <div class="container">
    <div class="btn-box cus-mb-10">
      <el-button type="success">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基本信息" name="1">
          <el-row :gutter="20">
            <el-form ref="form" label-width="100px" :rules="rules">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="  标题:" prop="title">
                    <el-input style="width:200px" v-model="temp.name"></el-input>
                  </el-form-item>
                  <el-form-item label="  创建时间">
                    <el-input style="width:200px" disabled="true" value="自动显示"></el-input>
                  </el-form-item>
                  <el-form-item label="   村组">
                    <el-input style="width:200px" disabled="true" value="自动显示"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="创建人:" prop="name">
                    <el-input style="width:200px" disabled value="系统反显"></el-input>
                  </el-form-item>
                  <el-form-item label="修改时间:" prop="name">
                    <el-input style="width:200px" disabled value="自动显示"></el-input>
                  </el-form-item>
                  <el-form-item label="微信端显示" prop="type">
                    <el-select placeholder="请选择" v-model="temp.relation" style="width:200px">
                      <el-option
                        v-for="item in relationOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="封面图">
                    <el-upload>
                      <el-button type="primary" style="width:200px">
                        <span>选择文件</span>
                      </el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="  修改人:" prop="name">
                    <el-input style="width:200px" disabled value="系统反显"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="22">
                  <el-form-item label="事项内容" prop>
                    <tinymce :height="200" v-model="content" id="tinymceBase"></tinymce>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import tinymce from '@/components/Tinymce'
export default {
  name: 'AddGuide',
  components: { tinymce },
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
