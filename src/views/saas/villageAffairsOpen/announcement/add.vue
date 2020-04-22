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
                <el-form-item label="标题" prop="article.title">
                  <el-input v-model="formData.article.title"></el-input>
                </el-form-item>
                <el-form-item label="提交时间" prop="article.submitTime">
                  <el-input v-model="formData.article.submitTime" disabled></el-input>
                </el-form-item>
                <el-form-item label="封面图" prop="article.coverPicture">
                  <uploader v-model="formData.article.coverPicture"></uploader>
                </el-form-item>
                <el-form-item label="事前近图" prop="beforehandNearPicture">
                  <uploader v-model="formData.beforehandNearPicture"></uploader>
                </el-form-item>
                <el-form-item label="事后远图" prop="afterwardsFarPicture">
                  <uploader v-model="formData.afterwardsFarPicture"></uploader>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="公告公示类型" prop="announcementType">
                  <el-select v-model="formData.announcementType" placeholder="请选择">
                    <el-option
                      v-for="item in selectOptionsMap.announcementType"
                      :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="公示时间" prop="publicityTime">
                  <el-date-picker v-model="formData.publicityTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="村组" prop="article.village.title">
                  <el-input v-model="formData.article.village.title" disabled></el-input>
                </el-form-item>
                <el-form-item label="事前远图" prop="beforehandFarPicture">
                  <uploader v-model="formData.beforehandFarPicture"></uploader>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="提交人" prop="article.submitPerson">
                  <el-input disabled v-model="formData.article.submitPerson" readonly></el-input>
                </el-form-item>
                <el-form-item label="取消公示日期" prop="cancelPublicityTime">
                  <el-date-picker v-model="formData.cancelPublicityTime" type="date" placeholder="选择日期"></el-date-picker>
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
                <el-form-item label="事后近图" prop="afterwardsNearPicture">
                  <uploader v-model="formData.afterwardsNearPicture"></uploader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="事项内容" prop=“content”>
              <tinymce :height="200" v-model="formData.content" id="tinymceVillLed"></tinymce>
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
import AnnouncementService from '@/api/villageAffairsOpen/AnnouncementService'
import dataCodeService from '@/api/DataCodeService'
import tinymce from '@/components/Tinymce/index'
import { parseTime } from '@/utils/index'
import Uploader from '@/components/uploader/index'
import FileService from '@/api/FileService'

export default {
  components: { tinymce, Uploader },
  data() {
    return {
      activeNames: ['1'],
      enableStatusOption: [
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
      submitPeopleOption: [
        {
          value: '1',
          label: '系统管理员'
        },
        {
          value: '2',
          label: '操作员'
        },
        {
          value: '3',
          label: '村干部'
        }
      ],
      formData: {
        article: {
          title: '',
          content: '',
          coverPicture: '',
          submitPerson: '',
          submitTime: '',
          village: {
            title: ''
          },
          enableStatus: '',
          villageId: null
        },
        beforehandNearPicture: '', // 事前近图
        beforehandFarPicture: '', // 事前远图
        afterwardsNearPicture: '', // 事后近图
        afterwardsFarPicture: '', // 事后远图
        publicityTime: '',
        announcementType: '',
        enableStatus: '',
        publicType: '',
        submitPeople: '',
        content: ''
      },
      publicTypeOption: [
        {
          value: '1',
          label: '党建'
        },
        {
          value: '2',
          label: '国土住建'
        },
        {
          value: '3',
          label: '民政'
        },
        {
          value: '4',
          label: '财政'
        },
        {
          value: '5',
          label: '计生服务'
        },
        {
          value: '6',
          label: '村级财务'
        },
        {
          value: '7',
          label: '财务制度'
        },
        {
          value: '8',
          label: '综合治理'
        },
        {
          value: '9',
          label: '经管劳保'
        },
        {
          value: '10',
          label: '农业'
        },
        {
          value: '11',
          label: '治安管理'
        },
        {
          value: '12',
          label: '人武'
        },
        {
          value: '13',
          label: '其他'
        }
      ],
      value1: '',
      rules: {
        'article.title': [{ required: true, message: '请输入标题', trigger: 'blur' }],
        announcementType: [{ required: true, message: '请选择公示类型', trigger: 'blur' }],
        'article.submitPerson': [{ required: true, message: '请选择提交人', trigger: 'blur' }],
        publicityTime: [{ required: true, message: '请选择公示时间', trigger: 'blur' }]
      },
      selectOptionsMap: {
        announcementType: [],
        enableStatus1: []
      },
      request: null
    }
  },
  mounted() {},
  created() {
    this.getSelectOptions(['announcementType', 'enableStatus1'])
    const announcementId = this.$route.params && this.$route.params.announcementId
    if (announcementId) {
      // 编辑
      this.request = AnnouncementService.updateAnnouncement
      // 获取数据
      AnnouncementService.getAnnouncementById(announcementId).then(ret => {
        this.formData = ret
      }).catch(e => {
        // 文章不存在
      })
    } else {
      // 新增
      this.request = AnnouncementService.saveAnnouncement
      this.initFormData() // 新增页面是初始化某些需要反显的字段
    }
  },
  methods: {
    initFormData() {
      // 提交时间
      this.formData.article.submitTime = parseTime(new Date(), '{y}-{m}-{d}')
      // 提交人：显示当前登录用户的名字
      this.formData.article.submitPerson = this.$global.userInfo.userId
      this.formData.article.submitPersonName = this.$global.userInfo.userName
      // villageId
      this.formData.article.villageId = this.$global.userInfo.companyId
      this.formData.article.village.title = this.$global.userInfo.companyName
    },
    // 根据dataCode从后台拿字典
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
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //
          this.request(this.formData).then(ret => {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            // 图片
            const fileIdList = [
              this.formData.article.coverPicture || '',
              this.formData.beforehandNearPicture || '', // 事前近图
              this.formData.beforehandFarPicture || '', // 事前远图
              this.formData.afterwardsNearPicture || '', // 事后近图
              this.formData.afterwardsFarPicture || '' // 事后远图
            ].filter(d => d !== '')
            FileService.commitSaveFileList(fileIdList)
          }).catch(() => {
            this.$message({
              message: '保存失败！',
              type: 'error'
            })
          })
        }
      })
    }
  }
}
</script>
