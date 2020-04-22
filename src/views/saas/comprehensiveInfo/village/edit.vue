<template>
  <div class="container">
    <div class="btn-box cus-mb-10">
      <el-button type="success" @click="submit('form')">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-collapse v-model="activeNames">
        <el-form ref="form" label-width="100px" :model="formData" :rules="rules">
          <el-collapse-item title="基本信息" name="1">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="标题:" prop="title">
                  <el-input style="width:200px" v-model="formData.title"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
                <el-form-item label="启用状态:" prop="startStuta">
                  <el-select placeholder="请选择" v-model="formData.relation" style="width:200px">
                    <el-option
                      v-for="item in selectOptionsMap.enableStatus1"
                      :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    />
                  </el-select>
                </el-form-item>
              </el-col> -->
            </el-row>
            <el-row :gutter="20">
              <el-col>
                <el-form-item label="介绍内容:" prop="introduceContent">
                  <tinymce :height="200" v-model="formData.introduceContent" id="tinymceContent"></tinymce>
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
import VillageService from '@/api/comprehensiveInfo/VillageService'
import ArticleMixin from '../_mixins/articleMixin'

export default {
  mixins: [ArticleMixin],
  components: { tinymce },
  name: 'AddLaw',
  data() {
    return {
      activeNames: ['1'],
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }]
        // type: [{ required: true, message: '请输入11', trigger: 'blur' }]
      },
      formData: {
        title: '',
        introduceContent: '',
        villageId: ''
      },
      selectOptionsMap: {
        enableStatus1: []
      }
    }
  },
  created() {
    // this.getSelectOptions(['enableStatus1'])
    const villageId = this.$route.params && this.$route.params.villageId
    if (!villageId) {
      this.$message({
        message: '村级介绍不存在！',
        type: 'warning'
      })
    } else {
      // 获取数据
      VillageService.getVillageById(villageId).then(ret => {
        this.formData = ret
      })
    }
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          VillageService.updateVillage(this.formData).then(() => {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
          })
        }
      })
    }
  }
}
</script>
<style>
.container {
  margin: 20px;
}
</style>
