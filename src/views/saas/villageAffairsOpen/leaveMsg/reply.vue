<template>
  <div class="app-container">
    <div class="btn-box cus-mb-20">
      <el-button type="success" @click="submit('form')">保存</el-button>
      <el-button type="primary" @click="closeCurrentTag()">取消</el-button>
    </div>
    <div class="content-box">
      <el-form ref="form" label-width="110px" :model="formData" :rules="rules" class="cus-pr-15">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="留言时间" prop="leaveMsgTime">
               <!-- value="YYYY-MM-DD来自微信" -->
              <!-- <el-input disabled v-model="formData.leaveMsgTime" readonly suffix-icon="el-icon-date"></el-input> -->
              <el-date-picker
                disabled
                v-model="formData.leaveMsgTime"
                type="datetime"
                placeholder="选择日期时间"
                format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="互动类型">
              <el-select disabled v-model="formData.interactiveType" placeholder="请选择">
                <el-option
                  v-for="item in selectOptionsMap.interactiveType"
                  :key="item.dataCode"
                  :label="item.meaning"
                  :value="item.dataCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="留言人" prop="villager.person.name">
              <el-input disabled v-model="formData.villager.person.name" readonly suffix-icon="el-icon-search"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="留言内容" prop>
          <el-input disabled type="textarea" readonly v-model="formData.leaveMsgContent"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="回复时间" prop="replyTime">
              <!-- value="自动显示"  -->
              <!-- <el-input disabled v-model="formData.replyTime" suffix-icon="el-icon-date"></el-input> -->
              <el-date-picker
                disabled
                v-model="formData.replyTime"
                type="datetime"
                placeholder="选择日期时间"
                format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="回复人" prop="villageCadre.villager.person.name">
               <!-- value="系统反显|村干部" -->
              <el-input disabled v-model="formData.villageCadre.villager.person.name" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="启用状态">
              <el-select v-model="formData.enableStatus" placeholder="请选择">
                <el-option
                  v-for="item in selectOptionsMap.enableStatus1"
                  :key="item.dataCode"
                  :label="item.meaning"
                  :value="item.dataCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="回复内容" prop="replyContent">
          <el-input type="textarea" v-model="formData.replyContent"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-box /deep/ {
  .el-form-item .el-input,
  .el-form-item .el-date-editor.el-input,
  .el-form-item .el-select,
  .el-form-item .el-textarea,
  .el-form-item .el-button {
    width: 100%;
  }
}
</style>

<script>
import LeaveMsgService from '@/api/villageAffairsOpen/LeaveMsgService.js'
import utilMixin from '@/mixins/utilMixin'
import storeMixin from '@/mixins/storeMixin'

export default {
  mixins: [utilMixin, storeMixin],
  data() {
    return {
      options: [
        {
          value: '1',
          label: '村民留言'
        },
        {
          value: '2',
          label: '基础设施'
        },
        {
          value: '3',
          label: '值班日志'
        },
        {
          value: '5',
          label: '村务台账'
        },
        {
          value: '6',
          label: '村规民约'
        }
      ],
      Statusoptions: [
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
      value: '',
      formData: {
        leaveMsgTime: '', // 留言时间
        leaveMsgContent: '',
        replyTime: '',
        replyContent: '',
        villager: {
          person: {
            name: ''
          }
        },
        person: {
          name: ''
        },
        villageCadre: {
          villager: {
            person: {
              name: ''
            }
          }
        },
        enableStatus: '0',
        interactionType: ''
      },
      rules: {
        'villageCadre.villager.person.name': [{ required: true, message: '回复人不能为空！', trigger: 'blur' }],
        replyTime: [{ required: true, message: '回复时间不能为空！', trigger: 'blur' }],
        replyContent: [{ required: true, message: '回复内容不能为空！', trigger: 'blur' }]
      },
      selectOptionsMap: { // 用于存储各个select下的options
        enableStatus1: [],
        interactiveType: []
      },
      replyRequest: null
    }
  },
  created() {
    this.getSelectOptions(['enableStatus1', 'interactiveType'])

    const leaveMsgId = this.$route.params && this.$route.params.leaveMsgId
    if (this.$route.name === 'leaveMsgReply') {
      // 新增回复
      this.replyRequest = LeaveMsgService.replyLeaveMsg
    }
    if (this.$route.name === 'leaveMsgModify') {
      // 修改回复
      this.replyRequest = LeaveMsgService.updateLeaveMsg
    }

    if (!leaveMsgId) {
      // 提示留言不存在
      return
    }
    LeaveMsgService.getLeaveMsgById(leaveMsgId).then((ret) => {
      console.log('ret:', ret)
      this.formData = ret
    })
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        // 提交内容
        this.formData.replyTime = new Date().toISOString()
        this.replyRequest(this.formData).then((ret) => {
          this.$message({
            message: '回复成功！',
            type: 'success'
          })
          this.closeCurrentTag()
        })
      })
    }
  }
}
</script>
