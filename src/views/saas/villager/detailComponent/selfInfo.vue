<template>
  <div>
    <el-form ref="form" label-width="120px">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基本信息" name="1">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="村民姓名">
                <span>{{personBasicData.person.name}}</span>
              </el-form-item>
              <el-form-item label="性别">
                <span>{{personBasicData.person.sex ? '男' : '女'}}</span>
              </el-form-item>
              <el-form-item label="电话号码">
                <span>{{personBasicData.person.phoneNumber}}</span>
              </el-form-item>
              <el-form-item label="是否村民代表">
                <span>{{personBasicData.isVillagerRepresent ? '是' : '否'}}</span>
              </el-form-item>
              <el-form-item label="政治面貌">
                <span>{{personBasicData.politicalAffiliation}}</span>
              </el-form-item>
              <el-form-item label="集体经济">
                <span>{{personBasicData.collectiveEconomic ? '是' : '否'}}</span>
              </el-form-item>
              <el-form-item label="职业">
                <span>{{personBasicData.occupation}}</span>
              </el-form-item>
              <el-form-item label="重点人群">
                <span>{{personBasicData.focusCrowd}}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{personBasicData.person.remark}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号">
                <span>{{personBasicData.person.idCardNumber}}</span>
              </el-form-item>
              <el-form-item label="出生日期">
                <span
                  v-if="personBasicData.birthDate"
                >{{personBasicData.birthDate | parseTime('{y}-{m}-{d}')}}</span>
                <span v-else>无</span>
              </el-form-item>
              <el-form-item label="所在村组">
                <span>{{personBasicData.villager.village}}</span>
              </el-form-item>
              <el-form-item label="文化程度">
                <span>{{personBasicData.educationLevel}}</span>
              </el-form-item>
              <el-form-item label="入党日期">
                <template v-if="personBasicData.joinPartyDate">
                  <span>{{personBasicData.joinPartyDate | parseTime('{y}-{m}-{d}')}}</span>
                </template>
                <span v-else>无</span>
              </el-form-item>
              <el-form-item label="兵役状态">
                <span>{{personBasicData.militaryServiceStatus}}</span>
              </el-form-item>
              <el-form-item label="外出务工地">
                <span>{{personBasicData.goOutWorkLocation}}</span>
              </el-form-item>
              <el-form-item label="死亡日期">
                <span
                  v-if="personBasicData.deathTime"
                >{{personBasicData.deathTime | parseTime('{y}-{m}-{d}')}}</span>
                <span v-else>无</span>
              </el-form-item>
              <el-form-item label="头像">
                <span>{{personBasicData.person.headshot}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="民族">
                <span>{{personBasicData.person.ethnic}}</span>
              </el-form-item>
              <el-form-item label="村民状态">
                <span>{{personBasicData.status}}</span>
              </el-form-item>
              <el-form-item label="家庭单位">
                <!-- 未定字段 -->
                <span>{{personBasicData.villager.homeCompany}}</span>
              </el-form-item>
              <el-form-item label="婚姻状况">
                <span>{{personBasicData.marriageSituation}}</span>
              </el-form-item>
              <el-form-item label="原户籍地址">
                <span>{{personBasicData.origHshdRgstAddress}}</span>
              </el-form-item>
              <el-form-item label="就业状态">
                <span>{{personBasicData.employmentStatus}}</span>
              </el-form-item>
              <el-form-item label="弱势群体">
                <span>{{personBasicData.underprivileged}}</span>
              </el-form-item>
              <el-form-item label="现居住地址">
                <span>{{personBasicData.currentResideAddress}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="户籍信息" name="2">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="与户主关系">
                <span>{{personBasicData.andHshdMasterRelate}}</span>
              </el-form-item>
              <el-form-item label="户籍地址">
                <span>{{personBasicData.origHshdRgstAddress}}</span>
              </el-form-item>
              <el-form-item label="常住人口">
                <span>{{personBasicData.permanentlyResidePopulation ? '是' : '否'}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所在户">
                <span>{{personBasicData.huoseholdMain}}</span>
              </el-form-item>
              <el-form-item label="户口类别">
                <span>{{personBasicData.hshdRgstCategory}}</span>
              </el-form-item>
              <el-form-item label="离户日期">
                <span
                  v-if="personBasicData.leavingHouseholdDate"
                >{{personBasicData.leavingHouseholdDate | parseTime('{y}-{m}-{d}')}}</span>
                <span v-else>无</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入户日期">
                <span>{{personBasicData.registerHouseholdDate | parseTime('{y}-{m}-{d}')}}</span>
              </el-form-item>
              <el-form-item label="户口性质">
                <span>{{personBasicData.hshdRgstProperty}}</span>
              </el-form-item>
              <el-form-item label="户籍注销日期">
                <template v-if="personBasicData.hshdRgstCancelDate">
                  <span>{{personBasicData.hshdRgstCancelDate | parseTime('{y}-{m}-{d}')}}</span>
                </template>
                <span v-else>无</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="惠农信息" name="3">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="财政代码">
                <span>{{personBasicData.financialCode}}</span>
              </el-form-item>
              <el-form-item label="医保账号">
                <span>{{personBasicData.healthInsureAccountNumber}}</span>
              </el-form-item>
              <el-form-item label="扶贫补贴明白折">
                <span>{{personBasicData.povtAleaSubsidyPlainPsbk}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行卡号">
                <span>{{personBasicData.bankCardNo}}</span>
              </el-form-item>
              <el-form-item label="惠农补贴明白折">
                <span>{{personBasicData.benfFamiSubsidyPlainPsbk}}</span>
              </el-form-item>
              <el-form-item label="扶贫补贴明白卡">
                <span>{{personBasicData.povtAleaSubsidyPlainCard}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="社保账号">
                <span>{{personBasicData.socialInsureAccountNumber}}</span>
              </el-form-item>
              <el-form-item label="惠农补贴明白卡">
                <span>{{personBasicData.benfFamiSubsidyPlainCard}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="经济产物信息" name="4">
          <div class="select cus-mb-20">
            <span>统计年份</span>
            <el-date-picker value-format="yyyy" @change="getEconomicProductData" v-model="economicProductParams.year" type="year" placeholder="请选择"></el-date-picker>
          </div>
          <div class="table">
            <el-table :data="personBasicData.economicProductList" border>
              <el-table-column type="index" width="55px"></el-table-column>
              <el-table-column prop="type" label="经济产物类型"></el-table-column>
              <el-table-column prop="name" label="经济产物"></el-table-column>
              <el-table-column prop="quantity" label="数量"></el-table-column>
              <el-table-column prop="outputValue" label="产值(元)"></el-table-column>
              <el-table-column prop="year" label="年份"></el-table-column>
              <el-table-column prop="remark" label="备注"></el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>

<script>
import economicProductService from '@/api/economicProduct/EconomicProductService'

export default {
  props: {
    householdId: {
      type: String,
      default: ''
    },
    selfInfoData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted() {

  },
  data() {
    return {
      activeNames: ['1', '2', '3', '4'],
      personBasicData: this.selfInfoData,
      economicProductParams: {
        year: '',
        householdId: this.householdId
      }
    }
  },
  methods: {
    getEconomicProductData() {
      economicProductService.listEconomicProductById(this.economicProductParams).then(res => {
        // console.log(res);
        this.personBasicData.economicProductList = res
      })
    }
  }
}
</script>
