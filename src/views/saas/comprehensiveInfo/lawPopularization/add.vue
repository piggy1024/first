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
                <el-form-item label="标题:" prop="article.title">
                  <el-input style="width:200px" v-model="formData.article.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="启用状态:" prop="article.enableStatus">
                  <el-select placeholder="请选择" v-model="formData.article.enableStatus" style="width:200px">
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
                <el-form-item label="封面图" prop="article.coverPicture">
                  <uploader v-model="formData.article.coverPicture"></uploader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="修改时间:" prop="lastUpdateTime">
                  <el-input v-model="formData.lastUpdateTime" disabled style="width:200px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="22">
                <el-form-item label="创建内容:" prop='content'>
                  <tinymce :height="200" v-model="formData.content" id="tinymceContent"></tinymce>
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
import LawPopularizationService from '@/api/comprehensiveInfo/LawPopularizationService'
import Uploader from '@/components/uploader/index'
import { parseTime } from '@/utils/index'
import articleMixin from '../_mixins/articleMixin'
import FileService from '@/api/FileService'

export default {
  mixins: [articleMixin],
  components: {
    tinymce,
    Uploader
  },
  name: 'AddLaw',
  data() {
    return {
      activeNames: ['1'],
      rules: {
        'article.title': [{ required: true, message: '请输入标题', trigger: 'blur' }]
      },
      formData: {
        article: {
          title: '',
          enableStatus: '',
          coverPicture: ''
        },
        lastUpdateTime: '',
        content: ''
      },
      selectOptionsMap: {
        enableStatus1: []
      },
      request: null
    }
  },
  created() {
    this.getSelectOptions(['enableStatus1'])
    const articleId = this.$route.params && this.$route.params.articleId
    if (!articleId) {
      // 新增
      this.request = LawPopularizationService.saveLawPopularization
      this.initFormData()
    } else {
      // 编辑
      this.request = LawPopularizationService.updateLawPopularization
      // 获取详情数据
      LawPopularizationService.getLawPopularizationById(articleId).then(ret => {
        this.formData = ret
      })
    }
  },
  methods: {
    initFormData() {
      // 初始化隐藏字段和反显字段
      this.formData.lastUpdateTime = parseTime(new Date(), '{y}-{m}-{d}')
      this.formData.article.submitPerson = this.$global.userInfo.userId
      this.formData.article.submitTime = parseTime(new Date(), '{y}-{m}-{d}')
      this.formData.article.villageId = this.$global.userInfo.companyId
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formData.lastUpdateTime = new Date().toISOString()
          this.formData.article.submitTime = new Date().toISOString()
          this.request(this.formData).then(() => {
            // submit 图片
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            const fileIdList = [
              this.formData.article.coverPicture || ''
            ].filter(d => d !== '')
            FileService.commitSaveFileList(fileIdList)
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
