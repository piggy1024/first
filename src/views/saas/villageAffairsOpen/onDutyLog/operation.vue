<template>
  <div class="app-container">
    <div class="btn-box cus-mb-10">
      <el-button type="success" @click="submit">{{this.oprationType==='save'?"保存":"更新"}}</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-collapse v-model="collapseBasicInfo">
        <!-- label-position="left" -->
        <el-form ref="form" label-width="100px" :rules="rules">
          <el-collapse-item title="基本信息" name="1">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="值班人" prop="villageCadre.villager.person.name">
                  <!-- <el-input v-model="entity.villageCadre.villager.person.name" readonly></el-input> -->
                  <select-villager-cadre v-model="entity.villageCadre.villager.person.name" @confirm="confirmOnDutyPersonHandler"></select-villager-cadre>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="启用状态" prop="enableStatus">
                  <el-select v-model="entity.enableStatus" placeholder="请选择">
                    <el-option
                      v-for="item in enableStatusOption"
                      :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="值班日期" prop="onDutyDate">
                  <el-date-picker v-model="entity.onDutyDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="值班图" prop="onDutyPicture">
                  <uploader v-model="entity.onDutyPicture"></uploader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="值班情况" prop="onDutySituation">
              <el-input
                v-model="entity.onDutySituation"
                type="textarea"
                placeholder="限800字以内"
                :autosize="{ minRows: 10, maxRows: 10}"
                maxlength="800"
              ></el-input>
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
import onDutyLogService from '@/api/villageAffairsOpen/OnDutyLogService'
import selectVillagerCadre from '@/components/cusDialog/selectVillagerCadre/index'
import dataCodeService from '@/api/DataCodeService'
import Uploader from '@/components/uploader/index'
import FileService from '@/api/FileService'

export default {
  components: { selectVillagerCadre, Uploader },
  data() {
    return {
      oprationType: 'save',
      onDutyLogId: null,
      collapseBasicInfo: ['1'],
      enableStatusOption: [],
      entity: {
        onDutyDate: null,
        enableStatus: null,
        onDutySituation: null,
        onDutyPicture: null,
        villageCadre: {
          villager: {
            person: {
              name: ''
            }
          }
        }
      },
      rules: {
        onDutyDate: [{ required: true, message: '值班日期必填', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.loadEnableStatusOption()
    this.loadEntity()
  },
  methods: {
    loadEnableStatusOption() {
      dataCodeService.getDataCodeByCodeCategory('enableStatus1').then(ret => {
        this.enableStatusOption = ret
      })
    },
    loadEntity: function() {
      if (this.$route.name === 'OnDutyLogUpdate') {
        this.oprationType = 'update'
        // 如果是更新，则加载数据
        const { onDutyLogId } = this.$route.query
        this.onDutyLogId = onDutyLogId
        onDutyLogService.getOnDutyLogById(onDutyLogId).then((res) => {
          this.entity = {
            ...this.entity,
            ...res
          }
        })
      }
    },
    submit: function() {
      // let { onDutyPicture } = this.entity
      const onDutyDate = this.entity.onDutyDate
      const onDutySituation = this.entity.onDutySituation
      const onDutyPicture = this.entity.onDutyPicture || ''

      if (this.oprationType === 'save') {
        onDutyLogService.saveOnDutyLog({
          onDutyDate,
          onDutyPicture,
          onDutySituation,
          onDutyPerson: this.entity.onDutyPerson,
          enableStatus: this.entity.enableStatus
        }).then((res) => {
          this.$router.push('/villageAffairsOpen/onDutyLog')
          // 推送图片
          FileService.commitSaveFile(onDutyPicture)
        })
      } else if (this.oprationType === 'update') {
        onDutyLogService.updateOnDutyLog({
          ...this.entity,
          onDutyLogId: this.onDutyLogId,
          onDutyDate,
          onDutyPicture,
          onDutySituation,
          onDutyPerson: this.entity.onDutyPerson,
          enableStatus: this.entity.enableStatus
        }).then((res) => {
          this.$router.push('/villageAffairsOpen/onDutyLog')
          // 推送图片
          // import FileService from '@/api/FileService'
          const fileIdList = [
            this.entity.onDutyPicture || ''
          ].filter(d => d !== '')
          FileService.commitSaveFileList(fileIdList)
        })
      }
    },
    confirmOnDutyPersonHandler(data) {
      console.log('data: ', data)
      this.entity.onDutyPerson = data.villageCadreId
    }
  }
}
</script>
