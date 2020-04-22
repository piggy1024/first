<template>
  <div class="app-container">
    <div class="btn-box cus-mb-10">
      <el-button type="success" @click="submit('form')">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-collapse v-model="activeNames">
        <!-- label-position="left" -->
        <el-form ref="form" :model="formData" label-width="100px" :rules="rules">
          <el-collapse-item title="基本信息" name="1">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="受理事项" prop="acceptThing">
                  <el-input v-model="formData.acceptThing"></el-input>
                </el-form-item>
                <el-form-item label="申请人电话" prop="contactPhone">
                  <el-input v-model="formData.contactPhone"></el-input>
                </el-form-item>
                <el-form-item label="受理日期" prop="acceptDate">
                  <el-date-picker v-model="formData.acceptDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="办理结果" prop>
                  <el-select v-model="formData.handleResult" placeholder="请选择">
                    <el-option
                      v-for="item in selectOptionsMap.handleResult"
                       :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请人" prop="person.name">
                  <select-villager v-model="formData.person.name" @confirm="confirmPerson">
                    <el-button type="primary">选择申请人</el-button>
                  </select-villager>
                </el-form-item>
                <el-form-item label="事项类型" prop="thingType">
                  <el-select v-model="formData.thingType" placeholder="请选择">
                    <el-option
                      v-for="item in selectOptionsMap.thingType"
                       :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="受理事项图" prop="acceptThingPicture">
                  <uploader v-model="formData.acceptThingPicture"></uploader>
                </el-form-item>
                <el-form-item label="微信端显示" prop="wechatDisplay">
                  <el-select v-model="formData.wechatDisplay" placeholder="请选择">
                    <el-option
                      v-for="item in selectOptionsMap.wechatDisplay"
                       :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份证号" prop="person.idCardNumber">
                  <el-input v-model="formData.person.idCardNumber"></el-input>
                </el-form-item>
                <el-form-item label="经办人" prop="villageCadre.villager.person.name">
                  <select-villager-cadre v-model="formData.villageCadre.villager.person.name"  @confirm="confirmVillager"></select-villager-cadre>
                </el-form-item>
                <el-form-item label="结退日期" prop="settleDate">
                  <el-date-picker v-model="formData.settleDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="事项内容" prop="thingContent">
              <tinymce :height="200" v-model="formData.thingContent" id="tinymceVillLed"></tinymce>
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
import tinymce from '@/components/Tinymce/index'
import dataCodeService from '@/api/DataCodeService'
import VillageAffairsService from '@/api/villageAffairsOpen/VillageAffairsService'
import selectVillager from '@/components/cusDialog/selectVillager/index'
import selectVillagerCadre from '@/components/cusDialog/selectVillagerCadre/index'
import Uploader from '@/components/uploader/index'
import FileService from '@/api/FileService'

// 台账的新增与编辑都在此页面 saveVillageAffairs
// updateVillageAffairs
export default {
  components: { tinymce, selectVillager, selectVillagerCadre, Uploader },
  data() {
    return {
      activeNames: ['1'],
      options: [
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
      handleResultOptions: [
        {
          value: '1',
          label: '请选择'
        },
        {
          value: '1',
          label: '正在处理'
        },
        {
          value: '3',
          label: '已办结'
        },
        {
          value: '4',
          label: '已退回'
        }
      ],
      itemTypeOptions: [
        {
          value: '1',
          label: '财政'
        },
        {
          value: '2',
          label: '司法'
        },
        {
          value: '3',
          label: '公安'
        },
        {
          value: '4',
          label: '民政'
        },
        {
          value: '5',
          label: '人武'
        },
        {
          value: '6',
          label: '农业'
        },
        {
          value: '7',
          label: '国土住建'
        },
        {
          value: '8',
          label: '计生服务'
        },
        {
          value: '9',
          label: '文化娱乐'
        },
        {
          value: '10',
          label: '经营劳保'
        },
        {
          value: '11',
          label: '综合治理'
        },
        {
          value: '12',
          label: '其他'
        }
      ],
      formData: {
        acceptThing: '',
        acceptDate: null,
        handleResult: '',
        itemType: '',
        applyPerson: '', // 申请人id
        handelPeople: '', // 处理人员id
        contactPhone: '',
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
        thingType: '',
        acceptThingPicture: '',
        wechatDisplay: '',
        settleDate: null,
        thingContent: ''
      },
      rules: {
        'person.name': [{ required: true, message: '请选择申请人' }],
        'acceptThing': [{ required: true, message: '请输入受理事项', trigger: 'blur' }],
        'acceptDate': [{ required: true, message: '请选择受理日期', trigger: 'blur' }],
        'thingType': [{ required: true, message: '请选择事项类型', trigger: 'blur' }],
        'contactPhone': [{ required: true, message: '请输入手机号码', trigger: 'blur' }]
        // 'villageCadre.villager.name': [{ required: true, message: '请选择经办人' }]
      },
      selectOptionsMap: {
        thingType: [],
        wechatDisplay: [],
        handleResult: []
      },
      request: null
    }
  },
  created() {
    this.getSelectOptions(['thingType', 'wechatDisplay', 'handleResult'])
    const villageAffairsId = this.$route.params && this.$route.params.villageAffairsId
    if (villageAffairsId) {
      // 编辑
      this.request = VillageAffairsService.updateVillageAffairs
      // 根据id获取数据并填充表单
      VillageAffairsService.getVillageAffairsById(villageAffairsId).then(data => {
        console.log('dd:', data)
        this.formData = data
      })
    } else {
      // 新增
      this.request = VillageAffairsService.saveVillageAffairs
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
    submit(formName) {
      console.log(this.formData)
      this.$refs[formName].validate((valid) => {
        console.log('v:', valid)
        if (valid) {
          this.request(this.formData).then(() => {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            // commit 图片
            const fileIdList = [
              this.formData.acceptThingPicture || ''
            ].filter(d => d !== '')
            FileService.commitSaveFileList(fileIdList)
          })
        }
      })
    },
    // 申请人
    confirmPerson(person) {
      console.log('p: ', person)
      this.$set(this.formData, 'person', person.person)
      this.$set(this.formData, 'applyPerson', person.person.personId)
    },
    // 经办人
    confirmVillager(villageCadre) {
      this.$set(this.formData, 'villageCadre', villageCadre)
      this.$set(this.formData, 'handlePerson', villageCadre.villager.person.personId)
    }
  }
}
</script>
