<template>
  <div class="container">
    <div class="btn-box cus-mb-10">
      <el-button type="success" @click="submit('form')">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-collapse v-model="activeNames">
        <el-form ref="form" :model="formData" label-width="100px" :rules="rules">
          <el-collapse-item title="基本信息" name="1">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="文档名称:" prop="documentName">
                  <el-input style="width:200px" v-model="formData.documentName"></el-input>
                </el-form-item>
                <el-form-item label=" 创建人:" prop="createPerson">
                  <el-input style="width:200px" v-model="formData.createPersonName" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="启动显示:">
                  <el-select placeholder="请选择" v-model="formData.enableStatus" style="width:200px">
                    <el-option
                      v-for="item in selectOptionsMap.enableStatus1"
                      :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="文档类型" prop="documentType">
                  <el-select placeholder="请选择" v-model="formData.documentType" style="width:200px">
                    <el-option
                      v-for="item in selectOptionsMap.documentType"
                      :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item v-if="actionType === actionTypeEdit" label="修改人:" prop="lastUpdatePerson">
                  <el-input disabled v-model="formData.lastUpdatePersonName" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="村组:" prop="village.title">
                  <el-input disabled v-model="formData.village.title" style="width:200px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="创建时间:" prop="createTime">
                  <el-date-picker
                    disabled
                    v-model="formData.createTime"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="修改时间:" v-if="actionType === actionTypeEdit" prop="lastUpdateTime">
                  <el-date-picker
                    disabled
                    v-model="formData.lastUpdateTime"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="上传文档">
                  <el-upload>
                    <!-- documentFile -->
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
import TemplateDocumentService from '@/api/comprehensiveInfo/TemplateDocumentService'
import ArticleMixin from '../_mixins/articleMixin'

export default {
  name: 'AddGuide',
  mixins: [ArticleMixin],
  data() {
    return {
      activeNames: ['1'],
      actionType: '',
      actionTypeAdd: 'ADD',
      actionTypeEdit: 'EDIT',
      rules: {
        documentName: [{ required: true, message: '请输入文档名称', trigger: 'blur' }],
        documentType: [{ required: true, message: '请选择文档类型', trigger: 'blur' }]
      },
      formData: {
        documentName: '',
        createPerson: '',
        createPersonName: '',
        enableStatus: '',
        documentType: '',
        createTime: '',
        documentFile: '',
        villageId: '',
        village: {
          title: ''
        },
        lastUpdatePerson: '',
        lastUpdatePersonName: '',
        lastUpdateTime: ''
      },
      formDataWhenEdit: {
      },
      selectOptionsMap: {
        documentType: [],
        enableStatus1: []
      }
    }
  },
  created() {
    this.getSelectOptions(['documentType', 'enableStatus1'])
    const templateDocumentId = this.$route.params && this.$route.params.templateDocumentId
    if (!templateDocumentId) {
      // 新增
      this.actionType = this.actionTypeAdd
      this.initFormData()
    } else {
      // 编辑
      this.actionType = this.actionTypeEdit
      TemplateDocumentService.getTemplateDocumentById(templateDocumentId).then(ret => {
        this.formData = ret
        // 反显
        const { userId, userName } = this.$global.userInfo
        this.formData.lastUpdatePerson = userId
        this.formData.lastUpdatePersonName = userName
        this.formData.lastUpdateTime = new Date()
        this.formData.createPersonName = this.formData.createPerson
      })
    }
  },
  methods: {
    initFormData() {
      // 反显字段
      const { companyId, companyName, userId, userName } = this.$global.userInfo
      this.formData.createPerson = userId
      this.formData.createPersonName = userName
      this.formData.villageId = companyId
      this.formData.village.title = companyName
      this.formData.createTime = new Date()
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.actionType === this.actionTypeAdd) {
            TemplateDocumentService.saveTemplateDocument(this.formData).then(_ => {
              this.$message({
                message: '保存成功！',
                type: 'success'
              })
            })
          } else {
            TemplateDocumentService.updateTemplateDocument(this.formData).then(_ => {
              this.$message({
                message: '保存成功！',
                type: 'success'
              })
            })
          }
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

.dialog-footer {
  margin-top: 50px;
  text-align: center;
}
</style>
