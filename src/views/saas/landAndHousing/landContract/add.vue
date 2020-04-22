<template>
  <div class="app-container">
    <div class="btn-box cus-mb-10">
      <el-button type="success" v-if="isAddOrEditOrDetail !== 2" @click="saveSubmitData()">{{this.$route.params.id ?
        '更新' : '保存'}}
      </el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-collapse v-model="activeNames">
        <el-form ref="form" :model="submitData" label-width="110px" :rules="rules"  :disabled="isAddOrEditOrDetail === 2">
          <el-collapse-item title="承包方信息" name="1">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="承包类型" prop="contractType">
                  <el-select placeholder="请选择" v-model="submitData.contractType" @change="resetForm">
                    <el-option
                      :label="item.meaning"
                      :value="item.dataCode"
                      v-for="(item,index) of contractTypeOption"
                      :key="index+10"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="所在户">
                  <span class="cus-text-666" v-if="submitData.contractType === '01'">{{submitData.villager.huoseholdMain}}</span>
                  <span v-else>--</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="承包方代表" prop="name">
                  <span v-if="submitData.contractType === '01'"><select-villager v-model="submitData.contractorRepresentName" @confirm="confirmPerson"></select-villager></span>
                  <span v-if="submitData.contractType === '02'"><el-input v-model="submitData.contractorRepresentName"/></span>
                </el-form-item>
                <el-form-item label="与户主关系">
                  <!--<span class="cus-text-666" v-if="submitData.contractType === '1'">{{submitData.villager.andHshdMasterRelate}}</span>-->
                  <!--<span v-else>&#45;&#45;</span>-->
                  <el-select v-if="submitData.contractType === '01'" placeholder="与户主关系" v-model="submitData.villager.andHshdMasterRelate" disabled>
                    <el-option
                      :label="item.meaning"
                      :value="item.dataCode"
                      v-for="(item,index) of andHshdMasterRelateOption"
                      :key="index"
                    />
                  </el-select>
                  <span v-else>&#45;&#45;</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份证号">
                  <span class="cus-text-666" v-if="submitData.contractType === '01'">{{submitData.idCardNumber}}</span>
                  <el-input v-else v-model.number="submitData.villager.person.idCardNumber"></el-input>
                </el-form-item>
                <el-form-item label="电话号码">
                  <span class="cus-text-666" v-if="submitData.contractType === '01'">{{submitData.villager.person.phoneNumber}}</span>
                  <el-input v-else v-model.number="submitData.contractorContactMode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="经营权登记信息" name="2">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="承包方代码" prop="contractorCode">
                  <span v-if="this.$route.params.id" class="cus-text-666">{{submitData.contractorCode}}</span>
                  <el-input class="cus-text-666"  v-else v-model.number="submitData.contractorCode"></el-input>
                </el-form-item>
                <el-form-item label="发包方代码" prop="employerCode">
                  <el-input v-model.number="submitData.employerCode"></el-input>
                </el-form-item>
                <el-form-item label="承包开始时间" prop="contractStartTime">
                  <el-date-picker v-model="submitData.contractStartTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="承包总块数" prop="contractTotalPieceNumber">
                  <el-input v-model="submitData.contractTotalPieceNumber">
                    <!--{{submitData.landContractDetailList.length}}-->
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同代码" prop="contractCode">
                  <el-input v-model="submitData.contractCode"></el-input>
                </el-form-item>
                <el-form-item label="发包方全称" prop="employerFullName">
                  <el-input v-model="submitData.employerFullName"></el-input>
                </el-form-item>
                <el-form-item label="承包结束时间" prop="contractEndTime">
                  <el-date-picker v-model="submitData.contractEndTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="经营流水号">
                  <el-input v-model="submitData.franchiseCertifSerialNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="记录薄代码" prop="recordBookCode">
                  <el-input v-model.number="submitData.recordBookCode"></el-input>
                </el-form-item>
                <el-form-item label="发包方负责人" prop="employerRspsbPs">
                  <!--<el-input v-model="submitData.employerRspsbPs"></el-input>-->
                  <select-villager-cadre v-model="submitData.employerRspsbPs"  @confirm="confirmVillager"></select-villager-cadre>
                </el-form-item>
                <el-form-item label="承包总面积">
                  <el-input v-model="submitData.contractTotalArea"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="submitData.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="土地确权信息" name="3">
            <div class="btn-box cus-mb-10">
              <el-button
                type="primary"
                icon="el-icon-circle-plus-outline"
                @click="addDetail()"
:disabled="isAddOrEditOrDetail === 2"
              >新增
              </el-button>
            </div>
            <el-table ref="multipleTable" :data="submitData.landContractDetailList" border>
              <!--<el-table-column type="selection" width="55"></el-table-column>-->
              <el-table-column prop="landPieceCode" label="地块代码"></el-table-column>
              <el-table-column prop="landPieceName" label="地块名称"></el-table-column>
              <el-table-column prop="rightContractArea" label="确认合同面积"></el-table-column>
              <el-table-column prop="landLevel" :formatter="formatColumn('landLevel')" label="土地等级"></el-table-column>
              <el-table-column prop="landClass" :formatter="formatColumn('landClass')" label="地类"></el-table-column>
              <el-table-column prop="isBasicFarmland" label="是否基本农田">
                <template slot-scope="scope">
                  <span>{{scope.row.isBasicFarmland === '1' ? '是': '否' }}</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="editDetail(scope.row, scope.$index)">修改</el-button>
                  <el-button type="danger" size="mini" @click="deleteDetail(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-form>
      </el-collapse>
    </div>
    <cus-villager :isShow="dialogTableVisible" @is-show-change="dialogTableVisible = false"></cus-villager>
    <el-dialog
      title="新增土地确权信息"
      :visible.sync="addLandConfrimDialog"
      :show-close="false"
      :close-on-click-modal="false"
      width="750"
    >
      <el-form
        :model="landContractDetail"
        label-width="120px"
        class="cus-pr-15"
        :rules="dialogLandRules"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="地块代码" prop="landPieceCode">
              <el-input autocomplete="off" v-model="landContractDetail.landPieceCode"></el-input>
            </el-form-item>
            <el-form-item label="原承包合同面积" prop="origContractContractArea">
              <el-input
                autocomplete="off"
                v-model="landContractDetail.origContractContractArea"></el-input>
            </el-form-item>
            <el-form-item label="确权合同面积" prop="rightContractArea">
              <el-input
                autocomplete="off"
                v-model="landContractDetail.rightContractArea"></el-input>
            </el-form-item>
            <el-form-item label="土地等级" prop="landLevel">
              <el-select v-model="landContractDetail.landLevel" placeholder="请选择">
                <el-option
                  :label="item.meaning"
                  :value="item.dataCode"
                  v-for="(item,index) of landLevelOption"
                  :key="index+10"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="是否基本农田" prop="isBasicFarmland">
              <el-select v-model="landContractDetail.isBasicFarmland" placeholder="请选择">
                <el-option
                  v-for="item in isFarmlandOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地块名称" prop="landPieceName">
              <el-input autocomplete="off" v-model="landContractDetail.landPieceName"></el-input>
            </el-form-item>
            <el-form-item label="实测面积" prop="measureArea">
              <el-input autocomplete="off" v-model="landContractDetail.measureArea"></el-input>
            </el-form-item>
            <el-form-item label="土地用途" prop="landUses">
              <el-input autocomplete="off" v-model="landContractDetail.landUses"></el-input>
            </el-form-item>
            <el-form-item label="地类" prop="landClass">
              <el-select v-model="landContractDetail.landClass" placeholder="请选择">
                <el-option
                  :label="item.meaning"
                  :value="item.dataCode"
                  v-for="(item,index) of landClassOption"
                  :key="index+10"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input autocomplete="off" v-model="landContractDetail.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="空间坐标" prop="spaceCoordinate">
          <el-input autocomplete="off" v-model="landContractDetail.spaceCoordinate" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-center">
        <el-button type="primary" @click="pushDetail()">确 定</el-button>
        <el-button @click="addLandConfrimDialog = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
  .content-box {
    /deep/ .el-collapse {
      .el-collapse-item__content {
        padding: 15px 0 0;
        .el-form-item .el-input,
        .el-form-item .el-date-editor.el-input,
        .el-form-item .el-button {
          width: 200px;
        }
      }
    }
  }
</style>

<script>
// import cusVillager from '@/components/cusDialog/cusVillager'
import landContractService from '@/api/landAndHousing/LandContractService'
import dataCodeService from '@/api/DataCodeService'

import selectVillager from '@/components/cusDialog/selectVillager/index'
import selectVillagerCadre from '@/components/cusDialog/selectVillagerCadre/index'

export default {
  components: {
    selectVillager,
    selectVillagerCadre
  },
  data() {
    return {
      isAddOrEditOrDetail: 0, // 0 添加，1 修改，2 详情
      activeNames: ['1', '2', '3'],
      submitData: {
        deletedLandContractDetailIds: [],
        createPerson: '',
        lastUpdatePerson: '',
        createCompanyIdPath: '',
        createOrganIdPath: '',
        landContractId: '',
        contractType: '01',
        contractorRepresentName: '', // 承包方代表名称
        idCardNumber: '', // 外部承包方身份证
        contractorContactMode: '', // 外部承包方联系方式(电话)
        contractorAddress: '', // 承包方住址
        villager: {
          villagerId: '',
          andHshdMasterRelate: '',
          huoseholdMain: '',
          person: {
            personId: '',
            phoneNumber: '',
            idCardNumber: ''
          }
        },
        contractorCode: '',
        contractCode: '',
        recordBookCode: '',
        employerCode: '',
        employerFullName: '', // 发包方全称
        employerRspsbPs: '', // 发包方负责人
        contractStartTime: '',
        contractEndTime: '',
        contractTotalArea: '',
        contractTotalPieceNumber: '',
        franchiseCertifSerialNumber: '',
        contractorRepresentId: '', // 承包方代表ID
        employerRspsbPsId: '', // 发包方负责人ID
        villageCadre: {
          villager: {
            villagerId: '',
            andHshdMasterRelate: '',
            huoseholdMain: '',
            person: {
              personId: '',
              phoneNumber: '',
              idCardNumber: ''
            }
          }
        },
        remark: '',
        landContractDetailList: [
          {
            landContractId: '',
            landContractDetailId: '',
            landPieceCode: '',
            landPieceName: '',
            landUses: '',
            landLevel: '',
            landClass: '',
            isBasicFarmland: '',
            origContractContractArea: '',
            measureArea: '',
            rightContractArea: '',
            remark: '',
            spaceCoordinate: ''
          }
        ]
      },
      contractTypeOption: [],
      landLevelOption: [],
      landClassOption: [],
      andHshdMasterRelateOption: [],
      rules: {
        contractCode: [{ required: true, message: '请输入合同代码', trigger: 'blur' }],
        recordBookCode: [
          { required: true, message: '请输入记录薄代码', trigger: 'blur' },
          { type: 'number', message: '请输入2段19位数字', trigger: 'blur' }
        ],
        employerCode: [
          { required: true, message: '请输入发包方代码', trigger: 'blur' },
          { type: 'number', message: '请输入4段14位数字', trigger: 'blur' }
        ],
        employerRspsbPs: [{ required: true, message: '请输入发包方负责人', trigger: 'blur' }],
        employerFullName: [{ required: true, message: '请输入发包方全称', trigger: 'blur' }],
        contractorCode: [
          { required: true, message: '请输入承包方代码', trigger: 'blur' },
          { type: 'number', message: '请输入2段18位数字', trigger: 'blur' }
        ]
      },
      dialogTableVisible: false,
      addLandConfrimDialog: false,
      isFarmlandOption: [
        {
          label: '是',
          value: '1'
        },
        {
          label: '否',
          value: '0'
        }
      ],
      dialogLandRules: {
        landPieceCode: [{ required: true, message: '请输入地块代码', trigger: 'blur' }],
        landLevel: [{ required: true, message: '请输入土地等级', trigger: 'blur' }],
        isBasicFarmland: [{ required: true, message: '请选择是否基本农田', trigger: 'blur' }],
        landClass: [{ required: true, message: '请选择地类', trigger: 'blur' }]
      },
      landContractDetail: {
        landContractId: '',
        landContractDetailId: '',
        landPieceCode: '',
        landPieceName: '',
        landUses: '',
        landLevel: '',
        landClass: '',
        isBasicFarmland: '',
        origContractContractArea: '',
        measureArea: '',
        rightContractArea: '',
        remark: '',
        spaceCoordinate: ''
      },
      addFlag: false,
      nowIndex: 0
    }
  },
  created() {
    this.submitData.landContractDetailList = []
    if (this.$route.params.id) {
      this.isAddOrEditOrDetail = 1
      this.getLandContractDetail()
      if (this.$route.path.indexOf('landContractDetail') > 0) {
        this.isAddOrEditOrDetail = 2
      }
    }

    this.getSelectOptionBuyType('contractType')
    this.getSelectOptionBuyType('landLevel')
    this.getSelectOptionBuyType('landClass')
    this.getSelectOptionBuyType('andHshdMasterRelate')
  },
  methods: {
    // 确定按钮
    pushDetail() {
      this.addLandConfrimDialog = false
      if (this.addFlag) {
        this.submitData.landContractDetailList.push(this.landContractDetail)
      } else {
        this.$set(this.submitData.landContractDetailList, this.nowIndex, this.landContractDetail)
      }
    },
    // 删除
    deleteDetail(index, row) {
      this.submitData.landContractDetailList.splice(index, 1)
      if (row.landContractDetailId) {
        if (Array.isArray(this.submitData.deletedLandContractDetailIds)) {
          this.submitData.deletedLandContractDetailIds.push(row.landContractDetailId)
        } else {
          this.submitData.deletedLandContractDetailIds = [row.landContractDetailId]
        }
      }
    },
    // 添加弹框
    addDetail() {
      this.addLandConfrimDialog = true
      this.addFlag = true
      this.landContractDetail = {}
    },
    // 修改弹框
    editDetail(data, index) {
      this.addLandConfrimDialog = true
      this.addFlag = false
      this.nowIndex = index
      const data2 = JSON.parse(JSON.stringify(data))
      this.landContractDetail = data2
    },
    // 获取dataCode数值替换
    formatColumn(type, dataCode) {
      return (row) => {
        const args = type.split('.')
        const v = args.reduce((t, c) => t[c], row) // row[type]
        const v2 = this[`${dataCode || type}Option`].filter(op => op.dataCode === v)
        const ret = v2.length > 0 ? v2[0]['meaning'] : ''
        return ret
      }
    },
    resetForm() {
      this.submitData.contractorRepresentName = ''
    },
    // 选择村民 承包方
    confirmPerson(villager) {
      console.log('p: ', villager)
      this.$set(this.submitData, 'villager', villager)
      this.$set(this.submitData, 'contractorRepresentId', villager.person.personId)
      this.$set(this.submitData, 'contractorRepresentName', villager.person.name)
      this.$set(this.submitData, 'idCardNumber', villager.person.idCardNumber)
      this.$set(this.submitData, 'contractorContactMode', villager.person.phoneNumber)
      this.$set(this.submitData, 'contractorAddress', villager.currentResideAddress)
    },
    // 发包方
    confirmVillager(villageCadre) {
      this.$set(this.submitData, 'villageCadre', villageCadre)
      this.$set(this.submitData, 'employerRspsbPsId', villageCadre.villager.person.personId)
      this.$set(this.submitData, 'employerRspsbPs', villageCadre.villager.person.name)
    },
    getSelectOptionBuyType(type) {
      dataCodeService.getDataCodeByCodeCategory(type).then(res => {
        // console.log(res);
        this[type + 'Option'] = res
      })
    },
    getLandContractDetail() {
      landContractService.getLandContractById(this.$route.params.id).then(res => {
        console.log(res)
        this.submitData = {
          createPerson: res.createPerson,
          lastUpdatePerson: res.lastUpdatePerson,
          createCompanyIdPath: res.createCompanyIdPath,
          createOrganIdPath: res.createOrganIdPath,
          landContractId: res.landContractId,
          contractType: res.contractType,
          contractorRepresentName: res.contractorRepresentName,
          idCardNumber: res.idCardNumber,
          villager: {
            villagerId: res.villager.villagerId,
            andHshdMasterRelate: res.villager.andHshdMasterRelate,
            huoseholdMain: res.villager.huoseholdMain,
            person: {
              personId: res.villager.person.personId,
              phoneNumber: res.villager.person.phoneNumber,
              idCardNumber: res.villager.person.idCardNumber
            }
          },
          contractorCode: res.contractorCode,
          contractCode: res.contractCode,
          recordBookCode: res.recordBookCode,
          employerCode: res.employerCode,
          employerFullName: res.employerFullName,
          employerRspsbPs: res.employerRspsbPs,
          contractStartTime: res.contractStartTime,
          contractEndTime: res.contractEndTime,
          contractTotalArea: res.contractTotalArea,
          contractTotalPieceNumber: res.contractTotalPieceNumber,
          franchiseCertifSerialNumber: res.franchiseCertifSerialNumber,
          contractorRepresentId: res.contractorRepresentId,
          employerRspsbPsId: res.employerRspsbPsId,
          remark: res.remark,
          landContractDetailList: res.landContractDetailList,
          villageCadre: {
            villager: {
              villagerId: res.villageCadre.villager.villagerId,
              andHshdMasterRelate: res.villageCadre.villager.andHshdMasterRelate,
              huoseholdMain: res.villageCadre.villager.huoseholdMain,
              person: {
                personId: res.villageCadre.villager.person.personId,
                phoneNumber: res.villageCadre.villager.person.phoneNumber,
                idCardNumber: res.villageCadre.villager.person.idCardNumber
              }
            }
          }
        }
      })
    },
    saveSubmitData() {
      let route = ''
      let tipsText = ''
      if (this.$route.params.id) {
        route = 'updateLandContract'
        tipsText = '更新'
      } else {
        route = 'saveLandContract'
        tipsText = '新增'
      }
      landContractService[route](this.submitData).then(res => {
        // console.log(res)
        this.$message({
          message: `${tipsText}成功！`,
          type: 'success',
          onClose: () => {
            this.$router.go(-1)
          }
        })
      })
    }

  }
}
</script>
