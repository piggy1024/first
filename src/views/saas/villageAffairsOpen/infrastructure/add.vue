<template>
  <div class="app-container">
    <div class="btn-box cus-mb-10">
      <el-button type="success" @click="submit('form')">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-collapse v-model="activeNames">
        <!-- label-position="left" -->
        <el-form ref="form" :model="formData" label-width="110px" :rules="rules">
          <el-collapse-item title="基本信息" name="1">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="项目名称" prop="article.title">
                  <el-input  v-model="formData.article.title"></el-input>
                </el-form-item>
                <el-form-item label="施工单位" prop="constructCompany">
                  <el-input v-model="formData.constructCompany"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" prop="createTime">
                  <el-input v-model="formData.createTime" disabled></el-input>
                </el-form-item>
                <el-form-item label="微信端显示" prop="article.enableStatus">
                  <el-select v-model="formData.article.enableStatus" placeholder="请选择">
                    <el-option
                      v-for="item in selectOptionsMap.enableStatus1"
                       :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="拟投资(万元)" prop="expectInvest">
                  <el-input v-model="formData.expectInvest"></el-input>
                </el-form-item>
                <el-form-item label="项目实施地" prop="projectImplementSite">
                  <el-input v-model="formData.projectImplementSite"></el-input>
                </el-form-item>
                <el-form-item label="相关图片" prop="article.coverPicture">
                  <uploader v-model="formData.article.coverPicture"></uploader>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="负责人" prop="villager.person.name">
                  <select-villager v-model="formData.villager.person.name" @confirm="confirmRespPersonHandler"></select-villager>
                </el-form-item>
                <el-form-item label="建设时间" prop="buildTime">
                  <el-date-picker v-model="formData.buildTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="村组" prop="villager.village.name">
                  <el-input disabled value="自动显示" v-model="formData.villager.village.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="事项内容" prop="content">
              <tinymce :height="200" v-model="formData.content" id="tinymceBase"></tinymce>
            </el-form-item>
          </el-collapse-item>
        </el-form>
      </el-collapse>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-box {
  /deep/ .el-collapse {
    .el-collapse-item__content {
      padding-right: 25px;
      .el-form-item .el-textarea,
      .el-form-item .el-date-editor.el-input,
      .el-form-item .el-select,
      .el-form-item .el-button {
        width: 100%;
        // max-width: 200px
      }
      .el-form-item .el-upload {
        display: block;
      }
      // .el-form-item .el-textarea {
      //   max-width: 600px;
      // }
    }
  }
}
</style>

<script>
import tinymce from '@/components/Tinymce/index'
import selectVillager from '@/components/cusDialog/selectVillager/index'
import dataCodeService from '@/api/DataCodeService'
import InfrastructureService from '@/api/villageAffairsOpen/InfrastructureService'
import { parseTime } from '@/utils/index'
import Uploader from '@/components/uploader/index'
import FileService from '@/api/FileService'

export default {
  components: { tinymce, selectVillager, Uploader },
  data() {
    return {
      content: '',
      activeNames: ['1'],
      enableStatus: '',
      formData: {
        article: {
          title: '',
          enableStatus: '',
          coverPicture: '',
          villageId: '',
          submitPerson: '',
          submitTime: ''
        },
        villager: {
          person: {
            name: ''
          },
          village: {
            name: '',
            admstrAreaId: ''
          }
        },
        constructCompany: '',
        content: '',
        expectInvest: '',
        rspsbPs: void 0,
        createTime: null,
        projectImplementSite: '',
        buildTime: null
      },
      rules: {
        'article.title': [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
        expectInvest: [{ required: true, message: '请输入拟投资金额', trigger: 'blur' }],
        projectImplementSite: [{ required: true, message: '请输入项目实施地', trigger: 'blur' }],
        buildTime: [{ required: true, message: '请选择建设时间', trigger: 'blur' }],
        constructCompany: [{ required: true, message: '请填写施工单位', trigger: 'blur' }],
        'villager.person.name': [{ required: true, message: '请选择负责人', trigger: 'blur' }]
      },
      selectOptionsMap: {
        enableStatus1: []
      },
      request: () => ({})
    }
  },
  created() {
    this.getSelectOptions(['enableStatus1'])
    const articleId = this.$route.params && this.$route.params.articleId
    if (articleId) {
      // 编辑
      this.request = InfrastructureService.updateInfrastructure
      // 根据id获取详情
      InfrastructureService.getInfrastructureById(articleId).then(ret => {
        this.formData = ret
      })
    } else {
      // 新增
      this.request = InfrastructureService.saveInfrastructure
      // 自动设置用户所在村组
      // debugger
      const { companyId, companyName } = this.$global.userInfo
      this.$set(this.formData.villager.village, 'name', companyName)
      this.$set(this.formData.villager.village, 'admstrAreaId', companyId)
      this.$set(this.formData.article, 'villageId', companyId)
      this.$set(this.formData.article, 'submitPerson', this.$global.userInfo.userId)
      this.$set(this.formData, 'createTime', parseTime(new Date(), '{y}-{m}-{d}'))
    }
  },
  methods: {
    getSelectOptions(dataCodeArr) {
      // 从接口获取select中的options选项， 传入一个数组
      if (dataCodeArr) {
        dataCodeArr.forEach(type => {
          dataCodeService.getDataCodeByCodeCategory(type).then(ret => {
            this.$set(this.selectOptionsMap, type, ret)
          })
        })
      }
    },
    confirmRespPersonHandler(data) {
      this.$set(this.formData, 'rspsbPs', data.person.personId)
    },
    submit(formName) {
      console.log(this.$global)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$set(this.formData.article, 'submitTime', new Date().toISOString())
          typeof this.request === 'function' && this.request(this.formData).then(() => {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            // commit图片
            const fileIdList = [this.formData.article.coverPicture || ''].filter(d => d !== '')
            FileService.commitSaveFileList(fileIdList)
          })
        }
      })
    }
  }
}
</script>
