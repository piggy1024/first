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
                <el-form-item label="标题:" prop="title">
                  <el-input style="width:200px" v-model="temp.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="启用状态:" prop="startStuta">
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
            </el-row>
            <el-row :gutter="20">
              <el-col>
                <el-form-item label="介绍内容:" prop>
                  <tinymce :height="200" v-model="content" id="tinymceContent"></tinymce>
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
import tinymce from '@/components/Tinymce/index'

export default {
  components: { tinymce },
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
