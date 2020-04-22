<template>
  <div class="app-container">
    <div class="btn-box cus-mb-10">
      <el-button type="success" @click="submit('form')">保存</el-button>
      <el-button type="primary" @click="closeCurrentTag()">取消</el-button>
    </div>
    <div class="content-box">
      <el-collapse v-model="activeNames">
        <!-- label-position="left" -->
        <el-form ref="form" :model="formData" label-width="110px" :rules="rules">
          <el-collapse-item title="已婚育龄妇女信息" name="1">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="原籍地址" prop="villager.origHshdRgstAddress">
                  <el-input type="textarea" v-model="formData.villager.origHshdRgstAddress"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话" prop="person.phoneNumber">
                  <el-input v-model="formData.person.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="villager.status">
                  <el-select v-model="formData.villager.status">
                    <el-option
                      v-for="item in selectOptionsMap.status"
                      :label="item.meaning"
                      :value="item.dataCode"
                      :key="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备注" prop="remark">
                  <el-input type="textarea" v-model="formData.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
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
      .el-form-item .el-textarea {
        .el-textarea__inner {
            height: 95px;
        }
      }
    }
  }
}
</style>

<script>
import PopulationAndFPService from '@/api/populationAndFP/PopulationAndFPService'
import utilMixin from '../_mixins/utilMixin'
import storeMixin from '@/mixins/storeMixin'
export default {
  mixins: [utilMixin, storeMixin],
  data() {
    return {
      activeNames: ['1'],
      formData: {
        person: {
          phoneNumber: ''
        },
        villager: {
          status: '',
          origHshdRgstAddress: ''
        },
        remark: ''
      },
      rules: {
        // name: [{ required: true, message: '请输入11', trigger: 'blur' }]
      },
      selectOptionsMap: {
        status: []
      }
    }
  },
  created() {
    this.getSelectOptions(['status'])
    const villagerId = this.$route.params && this.$route.params.villagerId
    if (villagerId) {
      // 获取人员数据
      PopulationAndFPService.listPopulationAndFp({
        villagerId,
        populationAndFpType: '05'
      }).then(ret => {
        this.formData = ret.dataList && ret.dataList[0] || this.formData
      })
    } else {
      this.$message({
        message: '该人员不存在',
        type: 'error'
      })
      this.closeCurrentTag()
    }
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          PopulationAndFPService.updatePopulationAndFp(this.formData).then(_ => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.closeCurrentTag()
          })
        }
      })
    }
  }
}
</script>
