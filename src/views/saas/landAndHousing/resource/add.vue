<template>
  <div class="app-container">
    <div class="btn-box cus-mb-20">
      <!--<el-button type="success" v-if="isAddOrEditOrDetail !== 2">保存</el-button>-->
      <el-button type="success" v-if="isAddOrEditOrDetail !== 2" @click="saveSubmitData()">{{this.$route.params.id ?
        '更新' : '保存'}}
      </el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-form ref="form" label-width="110px" :model="submitFormData" :rules="rules" :disabled="isAddOrEditOrDetail === 2">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="姓名" prop="person.name">
              <!--<el-button type="primary" @click="dialogVillagerIsShow = true" @confirm="confirmPerson">-->
              <!--<span>{{submitFormData.person.name ? submitFormData.person.name : '点击选择'}}</span>-->
              <!--</el-button>-->
              <select-villager v-model="submitFormData.person.name" @confirm="confirmPerson"></select-villager>
            </el-form-item>
            <el-form-item label="与户主关系">
              <!--<span class="cus-text-666">{{submitFormData.villager.andHshdMasterRelate}}</span>-->
              <el-select placeholder="请选择" v-model="submitFormData.villager.andHshdMasterRelate" disabled>
                <el-option
                  :label="item.meaning"
                  :value="item.dataCode"
                  v-for="(item,index) of andHshdMasterRelateOption"
                  :key="index"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="产权类型" prop="ownershipType">
              <el-select placeholder="请选择" v-model="submitFormData.ownershipType">
                <el-option
                  :label="item.meaning"
                  :value="item.dataCode"
                  v-for="(item,index) of resourceOwnershipTypeOption"
                  :key="index"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="开始日期" prop="startDate">
              <el-date-picker v-model="submitFormData.startDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号">
              <span class="cus-text-666">{{submitFormData.person.idCardNumber}}</span>
            </el-form-item>
            <el-form-item label="电话号码">
              <span class="cus-text-666">{{submitFormData.person.phoneNumber}}</span>
            </el-form-item>
            <el-form-item label="土地类型" prop="landType">
              <el-select placeholder="请选择" v-model="submitFormData.landType">
                <el-option
                  :label="item.meaning"
                  :value="item.dataCode"
                  v-for="(item,index) of landTypeOption"
                  :key="index+10"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="结束日期" prop="endDate">
              <el-date-picker v-model="submitFormData.endDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在户">
              <span class="cus-text-666">{{submitFormData.villager.huoseholdMain}}</span>
            </el-form-item>
            <el-form-item label="户籍地址">
              <span class="cus-text-666">{{submitFormData.villager.origHshdRgstAddress}}</span>
            </el-form-item>
            <el-form-item label="资源面积" prop="resourceArea">
              <el-input v-model.number="submitFormData.resourceArea"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="submitFormData.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!--<cus-dialog-villager-->
      <!--:isShow="dialogVillagerIsShow"-->
      <!--@is-show-change="dialogVillagerIsShow = $event"-->
    <!--&gt;</cus-dialog-villager>-->
  </div>
</template>

<style scoped lang="scss">
.content-box {
  /deep/ .el-form-item .el-input,
  /deep/ .el-form-item .el-date-editor.el-input,
  /deep/ .el-form-item .el-button {
    width: 200px;
  }
}
</style>

<script>
// import cusDialogVillager from '@/components/cusDialog/cusVillager'
import resourceService from '@/api/landAndHousing/ResourceService'
import dataCodeService from '@/api/DataCodeService'

import selectVillager from '@/components/cusDialog/selectVillager/index'

export default {
  components: {
    selectVillager
  },
  data() {
    return {
      isAddOrEditOrDetail: 0, // 0 添加，1 修改，2 详情
      submitFormData: {
        resourceId: '',
        villagerId: '',
        person: {
          name: '',
          idCardNumber: '',
          phoneNumber: ''
        },
        villager: {
          andHshdMasterRelate: '',
          origHshdRgstAddress: '',
          huoseholdMain: ''
        },
        ownershipType: '',
        landType: '',
        resourceArea: '',
        startDate: '',
        endDate: '',
        remark: ''
      },
      dialogVillagerIsShow: false,
      andHshdMasterRelateOption: [],
      resourceOwnershipTypeOption: [],
      landTypeOption: [],
      rules: {
        'person.name': [{ required: true, message: '请选择村民', trigger: 'blur' }],
        ownershipType: [
          { required: true, message: '请输入产权类型', trigger: 'blur' }
        ],
        startDate: [{ required: true, message: '请输入开始日期', trigger: 'blur' }],
        endDate: [{ required: true, message: '请输入结束日期', trigger: 'blur' }],
        landType: [{ required: true, message: '请输入土地类型', trigger: 'blur' }],
        resourceArea: [
          { required: true, message: '请输入资源面积', trigger: 'blur' },
          { type: 'number', message: '请输入数字值', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.$route.params.id) {
      this.isAddOrEditOrDetail = 1
      this.getResourceDetail()
      if (this.$route.path.indexOf('resourceDetail') > 0) {
        this.isAddOrEditOrDetail = 2
      }
    }

    this.getSelectOptionBuyType('andHshdMasterRelate')
    this.getSelectOptionBuyType('resourceOwnershipType')
    this.getSelectOptionBuyType('landType')
  },
  methods: {
    // 选择村民
    confirmPerson(villager) {
      // console.log('p: ', villager)
      this.$set(this.submitFormData, 'villager', villager)
      this.$set(this.submitFormData, 'villagerId', villager.villagerId)
      this.$set(this.submitFormData, 'person', villager.person)
    },
    getSelectOptionBuyType(type) {
      dataCodeService.getDataCodeByCodeCategory(type).then(res => {
        // console.log(res);
        this[type + 'Option'] = res
      })
    },
    saveSubmitData() {
      let route = ''
      let tipsText = ''
      if (this.$route.params.id) {
        route = 'updateResource'
        tipsText = '更新'
      } else {
        route = 'saveResource'
        tipsText = '新增'
      }

      resourceService[route](this.submitFormData).then(res => {
        // console.log(res)
        this.$message({
          message: `${tipsText}成功！`,
          type: 'success',
          onClose: () => {
            this.$router.go(-1)
          }
        })
      })
    },
    getResourceDetail() {
      resourceService.getResourceById(this.$route.params.id).then(res => {
        console.log(res)
        this.submitFormData = {
          resourceId: res.resourceId,
          villagerId: res.villagerId,
          person: {
            name: res.villager.person.name,
            idCardNumber: res.villager.person.idCardNumber,
            phoneNumber: res.villager.person.phoneNumber
          },
          villager: {
            andHshdMasterRelate: res.villager.andHshdMasterRelate,
            origHshdRgstAddress: res.villager.origHshdRgstAddress,
            huoseholdMain: res.villager.huoseholdMain
          },
          ownershipType: res.ownershipType,
          landType: res.landType,
          resourceArea: res.resourceArea,
          startDate: res.startDate,
          endDate: res.endDate,
          remark: res.remark
        }
      })
    }
  }
}
</script>
