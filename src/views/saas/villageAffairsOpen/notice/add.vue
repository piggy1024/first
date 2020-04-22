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
                  <el-form-item label="启用状态" prop="article.enableStatus">
                    <el-select v-model="formData.article.enableStatus" placeholder="请选择">
                      <el-option
                        v-for="item in selectOptionsMap.enableStatus1"
                        :key="item.dataCode"
                        :label="item.meaning"
                        :value="item.dataCode"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="上传文档" prop="document">
                    <el-upload>
                      <el-button type="primary">点击上传</el-button>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="通知类型" prop="noticeType">
                    <el-select v-model="formData.noticeType" placeholder="请选择">
                      <el-option
                        v-for="item in selectOptionsMap.noticeType"
                        :key="item.dataCode"
                        :label="item.meaning"
                        :value="item.dataCode"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="村组" prop="article.village.title">
                    <el-input disabled v-model="formData.article.village.title"></el-input>
                  </el-form-item>
                  <el-form-item label="文档类型" prop="documentType">
                    <el-select v-model="formData.documentType" placeholder="请选择">
                      <el-option
                        v-for="item in selectOptionsMap.documentType"
                        :key="item.dataCode"
                        :label="item.meaning"
                        :value="item.dataCode"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="创建日期" prop="createTime">
                    <el-input disabled v-model="formData.createTime"></el-input>
                  </el-form-item>
                  <el-form-item label="封面图" prop="article.coverPicture">
                    <uploader v-model="formData.article.coverPicture"></uploader>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="具体内容" prop="content">
                <tinymce :height="200" v-model="formData.content" id="tinymceNotice"></tinymce>
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
import tinymce from '@/components/Tinymce'
import dataCodeService from '@/api/DataCodeService'
import NoticeService from '@/api/villageAffairsOpen/NoticeService'
import { parseTime } from '@/utils/index'
import Uploader from '@/components/uploader/index'
import FileService from '@/api/FileService'

export default {
  components: { tinymce, Uploader },
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
      startStatusOption: [
        {
          label: '前后台启用',
          value: '1'
        },
        {
          label: '后台启用',
          value: '2'
        },
        {
          label: '禁用',
          value: '3'
        }
      ],
      noticeTypeOption: [
        {
          label: '村规民约',
          value: '1'
        },
        {
          label: '书记说事',
          value: '2'
        },
        {
          label: '政府发文',
          value: '3'
        },
        {
          label: '开会通知',
          value: '4'
        }
      ],
      docTypeOption: [
        {
          label: '党政办',
          value: '1'
        },
        {
          label: '民政',
          value: '2'
        },
        {
          label: '财政',
          value: '3'
        },
        {
          label: '经管劳保',
          value: '4'
        },
        {
          label: '计生',
          value: '5'
        },
        {
          label: '综合治理',
          value: '6'
        },
        {
          label: '国土住建',
          value: '7'
        }
      ],
      formData: {
        article: {
          title: '',
          enableStatus: '',
          village: {
            title: ''
          },
          coverPicture: ''
        },
        document: '',
        documentType: '',
        content: '',
        noticeType: '',
        createTime: ''
      },
      value1: '',
      rules: {
        'article.title': [{ required: true, message: '请输入标题', trigger: 'blur' }],
        'noticeType': [{ required: true, message: '请选择通知类型', trigger: 'blur' }]
      },
      selectOptionsMap: {
        noticeType: [],
        documentType: [],
        enableStatus1: []
      },
      request: null
    }
  },
  created() {
    this.getSelectOptions(['noticeType', 'documentType', 'enableStatus1'])
    const articleId = this.$route.params && this.$route.params.articleId
    console.log('route:', this.$route)
    if (!articleId) {
      // 新增
      this.request = NoticeService.saveNotice
      this.initFormData()
    } else {
      // 编辑
      this.request = NoticeService.updateNotice
      NoticeService.getNoticeById(articleId).then(ret => {
        this.formData = ret
      })
    }
  },
  methods: {
    // 处理需要反显的字段
    initFormData() {
      //
      this.$set(this.formData.article, 'submitPerson', this.$global.userInfo.userId)
      this.$set(this.formData.article, 'submitTime', parseTime(new Date(), '{y}-{m}-{d}'))
      this.$set(this.formData.article, 'villageId', this.$global.userInfo.companyId)
      this.$set(this.formData.article.village, 'title', this.$global.userInfo.companyName)
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
    submit(fornName) {
      this.$refs[fornName].validate((valid) => {
        if (valid) {
          this.request(this.formData).then(() => {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            // commit 图片
            const fileIdList = [this.formData.article.coverPicture].filter(d => d !== '')
            FileService.commitSaveFileList(fileIdList)
          })
        }
      })
    }
  }
}
</script>
