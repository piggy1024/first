<template>
  <div class="app-container">
    <tree :is-show-tree="isShowTree" v-on:is-show-change="isShowTree = $event"></tree>
    <i class="el-icon-d-arrow-right tree-collapse" v-show="isShowTree" @click="isShowTree = false"></i>
    <div class="right-container" :class="{'is-add-margin': !isShowTree}">
      <div class="btn-box cus-mb-10">
        <el-button type="success" @click="submit('form')">保存</el-button>
        <el-button type="primary" @click="$router.go(-1)">取消</el-button>
      </div>
      <div class="content-box">
        <el-collapse v-model="activeNames">
          <!-- label-position="left" -->
          <el-form ref="form" :model="formData" label-width="100px" :rules="rules" class="cus-pr-15">
            <el-collapse-item title="基本信息" name="1">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="标题" prop="article.title">
                    <el-input v-model="formData.article.title"></el-input>
                  </el-form-item>
                  <el-form-item label="收文状态" prop="receiptStatus">
                    <el-select disabled v-model="formData.receiptStatus" placeholder="请选择">
                      <el-option
                        v-for="item in selectOptionsMap.receiptStatus"
                        :key="item.dataCode"
                        :label="item.meaning"
                        :value="item.dataCode"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="收文类型" prop="receiptType">
                    <el-select v-model="formData.receiptType" placeholder="请选择">
                      <el-option
                        v-for="item in selectOptionsMap.receiptType"
                        :key="item.dataCode"
                        :label="item.meaning"
                        :value="item.dataCode"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="村组" prop="article.village.title">
                    <el-input disabled v-model="formData.article.village.title"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="收文登记日期" prop="createTime">
                    <el-input disabled v-model="formData.createTime"></el-input>
                  </el-form-item>
                  <el-form-item label="是否签收" prop="name">
                    <el-radio-group disabled v-model="formData.signatureStatus">
                      <el-radio label="01">是</el-radio>
                      <el-radio label="02">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="事项内容" prop="content">
                <tinymce :height="200" v-model="formData.content" id="tinymceRecReg"></tinymce>
              </el-form-item>
            </el-collapse-item>
          </el-form>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-box {
  /deep/ .el-collapse {
    .el-collapse-item__content {
      .el-form-item .el-input,
      .el-form-item .el-date-editor.el-input,
      .el-form-item .el-button {
        width: 100%;
        max-width: 200px;
      }
      .el-form-item .el-upload {
        display: block;
        max-width: 200px;
      }
    }
    // .el-collapse-item__content .width-right {
    //   .el-form-item .el-input,
    //   .el-form-item .el-date-editor.el-input,
    //   .el-form-item .el-button {
    //     width: 290px;
    //   }
    // }
  }
}
</style>

<script>
import dataCodeService from '@/api/DataCodeService'
import tinymce from '@/components/Tinymce/index'
import Tree from '@/components/administrativeTree/index'
import OfficialDocumentService from '@/api/villageAffairsOpen/OfficialDocumentService'
import { parseTime } from '@/utils/index'

export default {
  components: { tinymce, Tree },
  data() {
    return {
      content: '',
      isShowTree: false,
      activeNames: ['1'],
      data: [
        {
          id: 1,
          label: '河北省',
          children: [
            {
              id: 4,
              label: '刑台市',
              children: [
                {
                  id: 9,
                  label: '演示县',
                  children: [
                    {
                      id: 10,
                      label: '演示村',
                      children: [
                        {
                          id: 11,
                          label: '1队'
                        },
                        {
                          id: 12,
                          label: '2队'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      formData: {
        article: {
          title: '',
          village: {
            title: ''
          },
          villageId: ''
        },
        signatureStatus: '02', // 默认为否
        receiptType: '',
        createTime: '',
        receiptStatus: '03', // 默认未恢复
        content: ''
      },
      rules: {
        // name: [{ required: true, message: '请输入11', trigger: 'blur' }],
        'article.title': [{ required: true, message: '请输入标题', trigger: 'blur' }],
        'receiptType': [{ required: true, message: '请选择收文类型', trigger: 'blur' }],
        'receiptStatus': [{ required: true, message: '请选择收文状态', trigger: 'blur' }]
        // 'signatureStatus': [{ required: true, message: '请输入11', trigger: 'blur' }]
      },
      selectOptionsMap: {
        receiptType: [],
        receiptStatus: [],
        signatureStatus: []
      }
    }
  },
  created() {
    this.getSelectOptions(['receiptType', 'receiptStatus', 'signatureStatus'])
    this.initFormData()
  },
  methods: {
    initFormData() {
      // 默认反显字段
      this.formData.article.village.title = this.$global.userInfo.companyName
      this.formData.article.villageId = this.$global.userInfo.companyId
      this.formData.createTime = parseTime(new Date(), '{y}-{m}-{d}')
      this.formData.article.enableStatus = '01'
      this.formData.article.submitPerson = this.$global.userInfo.userId
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
      // OfficialDocumentService
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 更新disabled
          this.formData.createTime = new Date().toISOString()
          this.formData.article.submitTime = new Date().toISOString()
          OfficialDocumentService.saveOfficialDocument(this.formData).then(() => {
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
