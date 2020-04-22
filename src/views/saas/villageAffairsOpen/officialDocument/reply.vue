<template>
  <div class="app-container">
    <div :class="{'left-container':true,'show-width': isShowTree}">
      <h4 class="text-center tree-title">
        行政区域树
        <i class="el-icon-d-arrow-left" @click="isShowTree = true"></i>
      </h4>
      <div style="padding:0 10px 10px">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-tree
          class="filter-tree"
          :data="data"
          node-key="id"
          :props="defaultProps"
          @node-click="getCurrentKey()"
          default-expand-all
          :filter-node-method="filterNode"
          ref="tree"
        ></el-tree>
      </div>
    </div>
    <i class="el-icon-d-arrow-right tree-collapse" v-show="isShowTree" @click="isShowTree = false"></i>
    <div class="right-container" :class="{'is-add-margin': !isShowTree}">
      <div class="btn-box cus-mb-10">
        <el-button type="warning" :disabled="readonly" @click="saveDraft('form')">保存草稿</el-button>
        <el-button type="success" :disabled="readonly" @click="submit('form')">回复</el-button>
        <el-button type="primary" :disabled="readonly" @click="cacelReply('form')">取消</el-button>
      </div>
      <div class="content-box">
        <el-collapse v-model="activeNames">
          <!-- label-position="left" -->
          <el-form ref="form" :model="formData" label-width="100px" :rules="rules" class="cus-pr-15">
            <el-collapse-item title="基本信息" name="1">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="标题" prop="article.title">
                    <el-input disabled v-model="formData.article.title"></el-input>
                  </el-form-item>
                  <el-form-item label="收文登记日期" prop="createTime">
                    <el-input v-model="formData.createTime"></el-input>
                  </el-form-item>
                  <el-form-item label="收文状态" prop="receiptStatus">
                    <el-select v-model="formData.receiptStatus" placeholder="请选择">
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
                  <el-form-item label="是否签收" prop="signatureStatus">
                    <el-radio-group v-model="formData.signatureStatus">
                      <el-radio label="01">是</el-radio>
                      <el-radio label="02">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="回复人" prop="replyPersonName">
                    <el-input diasbled v-model="formData.replyPersonName"></el-input>
                  </el-form-item>
                  <el-form-item label="回复时间" prop="replyTime">
                    <el-date-picker v-model="formData.replyTime" type="date" placeholder="选择日期"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="回复内容" prop="replyContent">
                <tinymce :height="200" v-model="formData.replyContent" id="tinymceDocR"></tinymce>
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
import OfficialDocumentService from '@/api/villageAffairsOpen/OfficialDocumentService'
import { parseTime } from '@/utils/index'

// 收文状态
const Draft = '01'
const HadReplied = '02'
const NotReply = '03'

export default {
  components: { tinymce },
  data() {
    return {
      readonly: true,
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
      receiptStatusOption: [
        {
          label: '草稿',
          value: '1'
        },
        {
          label: '已回复',
          value: '2'
        },
        {
          label: '未回复',
          value: '3'
        }
      ],
      receiptTypeOption: [
        {
          label: '党委来文',
          value: '1'
        },
        {
          label: '行政来文',
          value: '2'
        },
        {
          label: '政府来文',
          value: '3'
        }
      ],
      replyManOption: [
        {
          label: '系统管理员',
          value: '1'
        },
        {
          label: '操作员',
          value: '2'
        },
        {
          label: '村干部',
          value: '3'
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
        signatureStatus: '', // 是否签收：是
        receiptType: '',
        createTime: '',
        receiptStatus: '', // 默认未恢复
        replyContent: '',
        replyPersonName: '',
        replyPerson: '',
        replyTime: ''
      },
      value1: '',
      rules: {
        name: [{ required: true, message: '请输入11', trigger: 'blur' }]
      },
      selectOptionsMap: {
        receiptType: [],
        receiptStatus: [],
        signatureStatus: []
      }
    }
  },
  created() {
    this.getSelectOptions(['receiptType', 'receiptStatus'])
    const articleId = this.$route.params && this.$route.params.articleId
    // const viewArticleId = this.$route.params && this.$route.params.viewArticleId
    // 存在 viewArticleId 则说明本页面的数据只能是已读
    this.readOnly = this.$route.params && this.$route.params.viewArticleId
    if (!articleId) {
      this.$message({
        message: '文章不存在！',
        type: 'warning'
      })
      return
    } else {
      OfficialDocumentService.getOfficialDocumentById(articleId).then(ret => {
        this.formData = ret
        this.initFormData()
      }).catch(() => {
        this.$message({
          message: '文章不存在！',
          type: 'warning'
        })
      })
    }
  },
  methods: {
    initFormData() {
      // *  回复人
      this.formData.replyPersonName = this.$global.userInfo.userName
      this.formData.replyPerson = this.$global.userInfo.userId
      // *  回复时间
      this.formData.replyTime = parseTime(new Date(), '{y}-{m}-{d}')
      // 村组
      this.formData.article.village.title = this.$global.userInfo.companyName
      this.formData.article.villageId = this.$global.userInfo.companyId
      // this.formData.article.enableStatus = '01'
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formData.article.replyTime = new Date().toISOString()
          this.formData.article.submitTime = new Date().toISOString()
          // 收文状态改为已回复
          this.formData.receiptStatus = HadReplied
          OfficialDocumentService.replyOfficialDocument(this.formData).then(() => {
            this.$message({
              message: '回复成功！',
              type: 'success'
            })
          })
        }
      })
    },
    // 保存为草稿
    saveDraft(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 收文状态改为草稿
          this.formData.receiptStatus = Draft
          this.formData.article.replyTime = new Date().toISOString()
          this.formData.article.submitTime = new Date().toISOString()
          OfficialDocumentService.saveDraftOfficialDocument(this.formData)
        }
      })
    },
    cacelReply(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 收文状态改为未回复
          this.formData.receiptStatus = NotReply
          this.formData.replyContent = ''
          this.formData.article.replyTime = null
          this.formData.article.submitTime = new Date().toISOString()
          OfficialDocumentService.replyOfficialDocument(this.formData)
        }
      })
    }
  }
}
</script>
