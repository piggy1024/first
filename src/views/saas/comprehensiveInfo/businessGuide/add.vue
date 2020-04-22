<template>
  <div class="container">
    <div class="btn-box cus-mb-10">
      <el-button type="success" @click="submit('form')">保存</el-button>
      <el-button type="primary" @click="closeCurrentTag()">取消</el-button>
    </div>
    <div class="content-box">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基本信息" name="1">
          <el-row :gutter="20">
            <el-form ref="form" :model="formData" label-width="100px" :rules="rules">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="  标题:" prop="article.title">
                    <el-input style="width:200px" v-model="formData.article.title"></el-input>
                  </el-form-item>
                  <el-form-item label="  创建人" prop="createPerson">
                    <el-input style="width:200px" v-model="formData.createPersonName" disabled="true" value="系统反显"></el-input>
                  </el-form-item>
                  <el-form-item label="   修改人" prop="lastUpdatePersonName">
                    <el-input style="width:200px" v-model="formData.lastUpdatePersonName" disabled="true" value="系统反显"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="启用状态" prop="article.enableStatus">
                    <el-select placeholder="请选择" v-model="formData.article.enableStatus" style="width:200px">
                      <el-option
                        v-for="item in selectOptionsMap.enableStatus1"
                        :key="item.dataCode"
                        :label="item.meaning"
                        :value="item.dataCode"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="事项类型" prop="thingType">
                    <el-select placeholder="请选择" v-model="formData.thingType" style="width:200px">
                      <el-option
                        v-for="item in selectOptionsMap.thingType"
                        :key="item.dataCode"
                        :label="item.meaning"
                        :value="item.dataCode"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="修改时间:" prop="lastUpdateTime">
                    <el-input style="width:200px" v-model="formData.lastUpdateTime" disabled value="自动显示"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="封面图" prop="article.coverPicture">
                    <uploader v-model="formData.article.coverPicture"></uploader>
                  </el-form-item>
                  <el-form-item label="  创建时间:" prop="createTime">
                    <el-input style="width:200px" v-model="formData.createTime" disabled value="自动显示"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="22">
                  <el-form-item label="事项内容" prop="content">
                    <tinymce :height="200" v-model="formData.content" id="tinymceBase"></tinymce>
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
import BusinessGuideService from '@/api/comprehensiveInfo/BusinessGuideService'
import Uploader from '@/components/uploader/index'
import articleMixin from '../_mixins/articleMixin'
import { parseTime } from '@/utils/index'
import FileService from '@/api/FileService'
import storeMixin from '@/mixins/storeMixin'

export default {
  name: 'AddGuide',
  mixins: [articleMixin, storeMixin],
  components: { tinymce, Uploader },
  created() {
    this.getSelectOptions(['thingType', 'enableStatus1'])
    const articleId = this.$route.params && this.$route.params.articleId
    if (!articleId) {
      // 新增
      this.request = BusinessGuideService.saveBusinessGuide
      this.initFormData()
    } else {
      // 编辑
      this.request = BusinessGuideService.updateBusinessGuide
      BusinessGuideService.getBusinessGuideById(articleId).then(ret => {
        this.formData = ret
      })
    }
  },
  data() {
    return {
      activeNames: ['1'],
      rules: {
        'article.title': [{ required: true, message: '请输入11', trigger: 'blur' }],
        type: [{ required: true, message: '请输入11', trigger: 'blur' }]
      },
      formData: {
        article: {
          title: '',
          enableStatus: '',
          coverPicture: '',
          submitPerson: '', // 提交人id
          submitTime: '',
          villageId: ''
        },
        createPerson: '', // 创建人id
        createPersonName: '', // 创建人名字
        lastUpdatePerson: '',
        lastUpdatePersonName: '',
        content: '',
        thingType: '',
        lastUpdateTime: ''
      },
      selectOptionsMap: {
        thingType: [],
        enableStatus1: []
      },
      request: null
    }
  },
  methods: {
    initFormData() {
      // 反显
      this.formData.createPerson = this.$global.userInfo.userId
      this.formData.createPersonName = this.$global.userInfo.userName
      this.formData.article.villageId = this.$global.userInfo.companyId
      this.formData.article.submitPerson = this.$global.userInfo.userId
      this.formData.article.submitTime = parseTime(new Date(), '{y}-{m}-{d}')
      this.formData.lastUpdatePerson = this.$global.userInfo.userId
      this.formData.lastUpdatePersonName = this.$global.userInfo.userName
      this.formData.lastUpdateTime = parseTime(new Date(), '{y}-{m}-{d}')
      this.formData.createTime = parseTime(new Date(), '{y}-{m}-{d}')
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 更新时间字段
          this.formData.article.submitTime = new Date().toISOString()
          this.formData.article.createTime = new Date().toISOString()
          this.request(this.formData).then(() => {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            // commit 图片
            // article.coverPicture
            const fileIdList = [
              this.formData.article.coverPicture
            ].filter(d => d !== '')
            FileService.commitSaveFileList(fileIdList)
            this.closeCurrentTag()
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

.dialog-footer {
  margin-top: 50px;
  text-align: center;
}
</style>
