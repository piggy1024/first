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
          <el-collapse-item title="暂住人口信息" name="1">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="原居住地址" prop="villager.origHshdRgstAddress">
                  <el-input type="textarea" v-model="formData.villager.origHshdRgstAddress"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话" prop="person.phoneNumber">
                  <el-input v-model="formData.person.phoneNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备注" prop="populationAndFp.remark">
                  <el-input type="textarea" v-model="formData.populationAndFp.remark"></el-input>
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
      // .el-form-item .el-textarea {
      //   max-width: 600px;
      // }
    }
  }
}
</style>

<script>
import TempResidePersonService from '@/api/populationAndFP/TempResidePersonService'
import storeMixin from '@/mixins/storeMixin'
export default {
  mixins: [storeMixin],
  data() {
    return {
      activeNames: ['1'],
      formData: {
        villager: {
          origResideAddress: ''
        },
        person: {
          phoneNumber: ''
        },
        populationAndFp: {
          remark: ''
        }
      },
      rules: {}
    }
  },
  created() {
    const villagerId = this.$route.params && this.$route.params.villagerId
    if (villagerId) {
      // 获取人员数据
      TempResidePersonService.listTempResidePerson({
        villagerId
      }).then(ret => {
        this.formData = ret['dataList'][0]
      })
    } else {
      this.$message({
        message: '该人员不存在',
        type: 'warning'
      })
      this.closeCurrentTag()
    }
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          TempResidePersonService.updateTempResidePerson(this.formData).then(() => {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            this.closeCurrentTag()
          }).catch(_ => {
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
