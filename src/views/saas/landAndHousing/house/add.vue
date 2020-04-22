<template>
  <div class="app-container">
    <div class="btn-box cus-mb-10">
      <el-button type="success" v-if="isAddOrEditOrDetail !== 2" @click="saveSubmitData()">{{this.$route.params.id ?
        '更新' : '保存'}}
      </el-button>
      <el-button type="primary" @click="$router.go(-1)">{{isAddOrEditOrDetail === 2 ? '返回': '取消'}}</el-button>
    </div>
    <div class="content-box">
      <el-form ref="submitParam" :model="submitParam" label-width="110px" :rules="rules" :disabled="isAddOrEditOrDetail === 2">
        <el-collapse v-model="activeNames">
          <!-- label-position="left" -->
          <el-collapse-item title="个人信息" name="1">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="房屋类型" prop="houseType">
                  <el-select
                    placeholder="请选择"
                    v-model="submitParam.houseType"
                    @change="handleHouseTypeChange"
                    :disabled="isAddOrEditOrDetail === 1"
                  >
                    <el-option
                      :label="item.meaning"
                      :value="item.dataCode"
                      v-for="(item,index) of houseTypeOption"
                      :key="index"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否有产权" prop="isHaveOwnershipCertif">
                  <el-select placeholder="请选择" v-model="submitParam.isHaveOwnershipCertif">
                    <el-option label="是" value="1"/>
                    <el-option label="否" value="0"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="不动产权证" prop="immobilityOwnershipCertif">
                  <el-input v-model="submitParam.immobilityOwnershipCertif"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="房屋信息" name="2">
            <!-- 自建房 -->
            <div class="house-self-build" v-if="submitParam.houseType === '01'">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="社区" prop="community">
                    <el-input v-model="submitParam.community"></el-input>
                  </el-form-item>
                  <el-form-item label="房屋用途" prop="houseUses">
                    <el-select placeholder="请选择" v-model="submitParam.houseUses">
                      <el-option
                        :label="item.meaning"
                        :value="item.dataCode"
                        v-for="(item,index) of houseUsesOption"
                        :key="index+10"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="宅基地面积" prop="selfBuiltHouse.homesteadArea">
                    <el-input v-model.number="submitParam.selfBuiltHouse.homesteadArea" type="number">
                      <template slot="append">
                        m
                        <sup>2</sup>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="建筑时间" prop="selfBuiltHouse.selfBuildTime">
                    <el-date-picker
                      v-model="submitParam.selfBuiltHouse.buildTime"
                      type="date"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="管理类型" prop="managementType">
                    <el-select placeholder="请选择" v-model="submitParam.managementType">
                      <el-option
                        :label="item.meaning"
                        :value="item.dataCode"
                        v-for="(item,index) of managementTypeOption"
                        :key="index+60"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="门牌号" prop="houseNumberNo">
                    <el-input v-model.number="submitParam.houseNumberNo"></el-input>
                  </el-form-item>
                  <el-form-item label="自建房类型" prop="selfBuildType">
                    <el-select placeholder="请选择" v-model="submitParam.selfBuiltHouse.houseType">
                      <el-option
                        :label="item.meaning"
                        :value="item.dataCode"
                        v-for="(item,index) of selfBuiltHousebuildTypeOption"
                        :key="index+10"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="建筑面积" prop="floorage">
                    <el-input v-model.number="submitParam.floorage" type="number">
                      <template slot="append">
                        m
                        <sup>2</sup>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="建设类型" prop="buildType">
                    <el-select placeholder="请选择" v-model="submitParam.selfBuiltHouse.buildType">
                      <el-option
                        :label="item.meaning"
                        :value="item.dataCode"
                        v-for="(item,index) of buildTypeOption"
                        :key="index+20"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input v-model="submitParam.remark"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="使用类别" prop="useCategory">
                    <el-select placeholder="请选择" v-model="submitParam.useCategory">
                      <el-option
                        :label="item.meaning"
                        :value="item.dataCode"
                        v-for="(item,index) of useCategoryOption"
                        :key="index+30"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="产权类型" prop="ownershipType">
                    <el-select placeholder="请选择" v-model="submitParam.selfBuiltHouse.ownershipType">
                      <el-option
                        :label="item.meaning"
                        :value="item.dataCode"
                        v-for="(item,index) of ownershipTypeOption"
                        :key="index+40"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="规划许可证" prop="selfBuiltHouse.planLicenseCertif">
                    <el-input v-model="submitParam.selfBuiltHouse.planLicenseCertif"></el-input>
                  </el-form-item>
                  <el-form-item label="房屋结构类型" prop="houseStructType">
                    <el-select
                      placeholder="请选择"
                      v-model="submitParam.selfBuiltHouse.houseStructType"
                    >
                      <el-option
                        :label="item.meaning"
                        :value="item.dataCode"
                        v-for="(item,index) of ownershipTypeOption"
                        :key="index+50"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="房屋照片" prop="housePhoto">
                    <!--<el-upload-->
                      <!--action="/paas-file/file/tempSaveFile"-->
                      <!--name="multipartFile"-->
                      <!--accept="image/*"-->
                      <!--:on-success="uploadPhotoSuccess"-->
                      <!--:on-error="uploadPhotoError"-->
                    <!--&gt;-->
                      <!--<el-button type="primary">点击上传</el-button>-->
                    <!--</el-upload>-->
                    <uploader v-model="submitParam.housePhoto"></uploader>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 商品房 -->
            <div class="house-commercial" v-else>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="社区" prop="community">
                    <el-input v-model="submitParam.community"></el-input>
                  </el-form-item>
                  <el-form-item label="所属单元">
                    <el-input v-model="submitParam.commercialHouse.belongUnit"></el-input>
                  </el-form-item>
                  <el-form-item label="房屋用途" prop="houseUses">
                    <el-select placeholder="请选择" v-model="submitParam.houseUses">
                      <el-option
                        :label="item.meaning"
                        :value="item.dataCode"
                        v-for="(item,index) of houseUsesOption"
                        :key="index+10"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="管理类型" prop="managementType">
                    <el-select placeholder="请选择" v-model="submitParam.managementType">
                      <el-option
                        :label="item.meaning"
                        :value="item.dataCode"
                        v-for="(item,index) of managementTypeOption"
                        :key="index+60"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="门牌号" prop="houseNumberNo">
                    <el-input v-model.number="submitParam.houseNumberNo"></el-input>
                  </el-form-item>
                  <el-form-item label="所属楼层">
                    <el-input v-model="submitParam.commercialHouse.belongFloor"></el-input>
                  </el-form-item>
                  <el-form-item label="建筑面积" prop="floorage">
                    <el-input v-model.number="submitParam.floorage" type="number">
                      <template slot="append">
                        m
                        <sup>2</sup>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input v-model="submitParam.remark"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="楼栋名称" prop="commercialHouse.buildingName">
                    <el-input v-model="submitParam.commercialHouse.buildingName"></el-input>
                  </el-form-item>
                  <el-form-item label="使用类别" prop="useCategory">
                    <el-select placeholder="请选择" v-model="submitParam.useCategory">
                      <el-option
                        :label="item.meaning"
                        :value="item.dataCode"
                        v-for="(item,index) of useCategoryOption"
                        :key="index+30"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="购买时间" prop="commercialHouse.buyTime">
                    <el-date-picker
                      v-model="submitParam.commercialHouse.buyTime"
                      type="date"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="房屋照片" prop="housePhoto">
                    <uploader v-model="submitParam.housePhoto"></uploader>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-collapse-item>
          <el-collapse-item title="产权信息" name="3">
            <div class="cus-mb-10">
              <select-villager @confirm="confirmPerson" width="55">
                <el-button type="primary" @click="addOwnshipCertDialog = true">引入产权人</el-button>
              </select-villager>
            </div>
            <el-table :data="submitParam.houseOwnershipPersonList" border>
              <el-table-column type="index" label="序号" width="55"></el-table-column>
              <el-table-column prop="villager.person.name" label="权利人"></el-table-column>
              <el-table-column prop="villager.person.idCardNumber" label="身份证号"></el-table-column>
              <el-table-column prop="shareSituation" :formatter="formatColumn('shareSituation')" label="共有情况"></el-table-column>
              <el-table-column prop="shareSituationDescr" label="其他情况说明"></el-table-column>
              <el-table-column label="操作" fixed="right" width="150">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="editHouseOwnershipPerson(scope.row, scope.$index)">
                    编辑
                  </el-button>
                  <el-button type="danger" size="mini" @click="deleteHouseOwnershipPerson(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </div>
    <!--<cus-villager :isShow="addOwnshipCertDialog" @is-show-change="addOwnshipCertDialog = false"></cus-villager>-->
    <el-dialog
      title="编辑产权信息"
      :visible.sync="editOwnershipCertDialog"
      :show-close="false"
      width="450px"
      @close="refreshForm"
    >
      <el-form :model="houseOwnershipPerson" label-width="110px" class="cus-pr-15">
        <el-form-item label="村组">
          <el-input readonly v-model="houseOwnershipPerson.villager.village.name"  disabled></el-input>
        </el-form-item>
        <el-form-item label="共有情况">
          <el-select v-model="houseOwnershipPerson.shareSituation" placeholder="请选择" style="width:100%">
            <el-option
              :label="item.meaning"
              :value="item.dataCode"
              v-for="(item,index) of shareSituationOption"
              :key="index+30"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="其他情况说明">
          <el-input v-model="houseOwnershipPerson.shareSituationDescr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-center">
        <el-button type="primary" @click="confirm()">确 定</el-button>
        <el-button @click="editOwnershipCertDialog = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
  .content-box {
    /deep/ .el-collapse {
      // .el-collapse-item__header {
      //   font-size: 16px;
      //   color: #333;
      //   font-weight: 700;
      //   > i {
      //     font-weight: bold;
      //   }
      // }
      .el-collapse-item__content {
        padding: 15px 0 0;
        // .el-col > .el-col {
        //   line-height: 33px;
        //   margin-bottom: 15px;
        // }
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
import houseService from '@/api/landAndHousing/HouseService'
import dataCodeService from '@/api/DataCodeService'
import fileService from '@/api/FileService'

import selectVillager from '@/components/cusDialog/selectVillager/index'
import uploader from '@/components/uploader/index'

export default {
  components: {
    selectVillager,
    uploader
  },
  data() {
    return {
      activeNames: ['1', '2', '3'],
      isAddOrEditOrDetail: 0,
      submitParam: {
        deletedOwnershipPersonIds: [],
        createPerson: '',
        lastUpdatePerson: '',
        createCompanyIdPath: '',
        createOrganIdPath: '',
        houseId: '',
        houseType: '01',
        isHaveOwnershipCertif: '',
        immobilityOwnershipCertif: '',
        // 自建房
        selfBuiltHouse: {
          buildType: '',
          planLicenseCertif: '',
          homesteadArea: '',
          houseStructType: '',
          buildTime: '',
          ownershipType: '', // 产权类型
          houseType: ''// 自建房房屋类型
        },
        community: '',
        houseNumberNo: '',
        useCategory: '',
        houseUses: '',
        floorage: '',
        buildType: '',
        managementType: '',
        remark: '',
        housePhoto: '',
        // 商品房
        commercialHouse: {
          buildingName: '',
          belongUnit: '',
          belongFloor: '',
          buyTime: ''
        },
        // 产权信息
        houseOwnershipPersonList: [
          {
            ownershipPersonId: '',
            shareSituation: '',
            shareSituationDescr: '',
            villager: {
              person: {
                name: '',
                idCardNumber: ''
              }
            }
          }
        ]
      },
      addOwnshipCertDialog: false,
      editOwnershipCertDialog: false,
      editWonershipCertForm: {},
      houseOwnershipPerson: {// 单个产权人
        ownershipPersonId: '',
        shareSituation: '',
        shareSituationDescr: '',
        villager: {
          person: {
            name: '',
            idCardNumber: ''
          },
          village: {
            name: ''
          }
        }
      },
      nowIndex: 0,
      // gridData: [
      //   {
      //     name: '张三',
      //     idCard: '41528556392545285',
      //     age: '22',
      //     group: '五队',
      //     household: '张大',
      //     relationship: '父子'
      //   },
      //   {
      //     name: '李四',
      //     idCard: '41528556392545285',
      //     age: '20',
      //     group: '六队',
      //     household: '李达',
      //     relationship: '父子'
      //   }
      // ],
      dialogRadio: '',
      houseTypeOption: [],
      houseUsesOption: [],
      buildTypeOption: [],
      selfBuiltHousebuildTypeOption: [],
      useCategoryOption: [],
      ownershipTypeOption: [],
      houseStructTypeOption: [],
      managementTypeOption: [],
      shareSituationOption: [],
      rules: {
        houseType: [
          { required: true, message: '请选择房屋类型', trigger: 'blur' }
        ],
        isHaveOwnershipCertif: [
          { required: true, message: '请选择是否有产权', trigger: 'blur' }
        ],
        immobilityOwnershipCertif: [
          { required: true, message: '请输入不动产权证', trigger: 'blur' }
        ],
        community: [
          { required: true, message: '请输入社区', trigger: 'blur' }
        ],
        houseNumberNo: [
          { required: true, message: '请输入门牌号', trigger: 'blur' },
          { type: 'number', message: '请输入数字值', trigger: 'blur' }
        ],
        useCategory: [
          { required: true, message: '请输入使用类型', trigger: 'blur' }
        ],
        houseUses: [
          { required: true, message: '请输入房屋用途', trigger: 'blur' }
        ],
        selfBuildType: [
          { required: true, message: '请选择自建房类型', trigger: 'blur' }
        ],
        ownershipType: [
          { required: true, message: '请选择产权类型', trigger: 'blur' }
        ],
        'selfBuiltHouse.planLicenseCertif': [
          { required: true, message: '请输入规划许可证', trigger: 'blur' }
        ],
        floorage: [
          { required: true, message: '请输入建筑面积', trigger: 'blur' },
          { type: 'number', message: '请输入数字值', trigger: 'blur' }
        ],
        'selfBuiltHouse.selfBuildTime': [
          { required: true, message: '请选择建筑时间', trigger: 'blur' }
        ],
        buildType: [
          { required: true, message: '请选择建筑类型', trigger: 'blur' }
        ],
        managementType: [
          { required: true, message: '请选择管理类型', trigger: 'blur' }
        ],
        'commercialHouse.buildingName': [
          { required: true, message: '请输入楼栋名称', trigger: 'blur' }
        ],
        'commercialHouse.buyTime': [
          { required: true, message: '请选择购买时间', trigger: 'change' }
        ],
        'selfBuiltHouse.homesteadArea': [
          { required: true, message: '请选择宅基地面积', trigger: 'blur' },
          { type: 'number', message: '请输入数字值', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.submitParam.houseOwnershipPersonList = []
    // console.log(this.$route.params);
    if (this.$route.params.id) {
      this.isAddOrEditOrDetail = 1
      this.getHouseInfo()
      // console.log(this.$route.path.indexOf('houseDetail') > 0);
      if (this.$route.path.indexOf('houseDetail') > 0) {
        this.isAddOrEditOrDetail = 2
      }
    }

    this.getSelectOptionBuyType('houseType')
    this.getSelectOptionBuyType('houseUses')
    this.getSelectOptionBuyType('buildType')
    this.getSelectOptionBuyType('selfBuiltHousebuildType')
    this.getSelectOptionBuyType('useCategory')
    this.getSelectOptionBuyType('ownershipType')
    this.getSelectOptionBuyType('houseStructType')
    this.getSelectOptionBuyType('managementType')
    this.getSelectOptionBuyType('shareSituation')
  },
  methods: {
    // 保存临时对象
    parseObj(villager) {
      const cloneObj = JSON.parse(JSON.stringify(this.houseOwnershipPerson))
      console.log('p: ', villager)
      cloneObj.villager = villager
      cloneObj.ownershipPersonId = villager.villagerId
      return cloneObj
    },
    confirmPerson(villager) {
      this.submitParam.houseOwnershipPersonList.push(this.parseObj(villager))
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
    handleCurrentChange(val) {
      console.log(val)
    },
    saveSubmitData() {
      let route = ''
      let tipsText = ''
      if (this.$route.params.id) {
        route = 'updateHouse'
        tipsText = '更新'
      } else {
        route = 'saveHouse'
        tipsText = '新增'
      }

      houseService[route](this.submitParam).then(res => {
        // console.log(res)
        if (this.submitParam.housePhoto) {
          fileService.commitSaveFile(this.submitParam.housePhoto).then(resp => {
            console.log(resp)
          })
        }
        this.$message({
          message: `${tipsText}成功！`,
          type: 'success',
          onClose: () => {
            this.$router.go(-1)
          }
        })
      })
    },
    getHouseInfo() {
      houseService.getHouseById(this.$route.params.id).then(res => {
        // console.log(res);
        if (res.housePhoto) {
          this.submitParam.housePhoto = res.housePhoto
          fileService.getFile(res.housePhoto).then(resp => {
            console.log(resp + '图片地址？-------')
          })
        }
        this.submitParam.createPerson = res.createPerson
        this.submitParam.lastUpdatePerson = res.lastUpdatePerson
        this.submitParam.createCompanyIdPath = res.createCompanyIdPath
        this.submitParam.createOrganIdPath = res.createOrganIdPath
        this.submitParam.houseId = res.houseId
        this.submitParam.houseType = res.houseType
        this.submitParam.isHaveOwnershipCertif = res.isHaveOwnershipCertif
        this.submitParam.immobilityOwnershipCertif =
            res.immobilityOwnershipCertif

        this.submitParam.community = res.community
        this.submitParam.houseNumberNo = res.houseNumberNo
        this.submitParam.useCategory = res.useCategory
        this.submitParam.houseUses = res.houseUses
        this.submitParam.floorage = res.floorage
        this.submitParam.buildType = res.buildType
        this.submitParam.managementType = res.managementType
        this.submitParam.remark = res.remark
        if (res.houseType === '01') {
          this.submitParam.selfBuiltHouse.houseType =
          res.selfBuiltHouse.houseType
          this.submitParam.selfBuiltHouse.ownershipType =
              res.selfBuiltHouse.ownershipType
          this.submitParam.selfBuiltHouse.buildType =
              res.selfBuiltHouse.buildType
          this.submitParam.selfBuiltHouse.planLicenseCertif =
              res.selfBuiltHouse.planLicenseCertif
          this.submitParam.selfBuiltHouse.homesteadArea =
              res.selfBuiltHouse.homesteadArea
          this.submitParam.selfBuiltHouse.houseStructType =
              res.selfBuiltHouse.houseStructType
          this.submitParam.selfBuiltHouse.buildTime =
              res.selfBuiltHouse.buildTime
        } else {
          this.submitParam.commercialHouse.buildingName =
              res.commercialHouse.buildingName
          this.submitParam.commercialHouse.belongUnit =
              res.commercialHouse.belongUnit
          this.submitParam.commercialHouse.belongFloor =
              res.commercialHouse.belongFloor
          this.submitParam.commercialHouse.buyTime =
              res.commercialHouse.buyTime
        }
        this.submitParam.houseOwnershipPersonList = res.houseOwnershipPersonList
      })
    },
    getSelectOptionBuyType(type) {
      dataCodeService.getDataCodeByCodeCategory(type).then(res => {
        this[type + 'Option'] = res
      })
      // console.log(this.houseTypeOption);
    },
    uploadPhotoSuccess(res, file, fileList) {
      console.log(res)
      if (res.fileId) {
        // fileService.commitSaveFile(res.fileId).then((resp)=>{
        //   console.log(resp);

        // })
        this.submitParam.housePhoto = res.fileId
      }
    },
    uploadPhotoError(err, file, fileList) {
      console.log(err)
    },
    handleHouseTypeChange(param) {
      // debugger
      // this.submitParam.houseType = param
      // this.resetForm('submitParam')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    editHouseOwnershipPerson(data, index) {
      this.editOwnershipCertDialog = true
      this.nowIndex = index

      const data2 = JSON.parse(JSON.stringify(data))
      this.houseOwnershipPerson = data2
    },
    // 编辑产权信息确定按钮
    confirm() {
      this.editOwnershipCertDialog = false

      this.$set(this.submitParam.houseOwnershipPersonList, this.nowIndex, this.houseOwnershipPerson)
    },
    // 产权列表删除按钮
    deleteHouseOwnershipPerson(index, row) {
      this.submitParam.houseOwnershipPersonList.splice(index, 1)
      if (row.ownershipPersonId) {
        if (Array.isArray(this.submitParam.deletedOwnershipPersonIds)) {
          this.submitParam.deletedOwnershipPersonIds.push(row.ownershipPersonId)
        } else {
          this.submitParam.deletedOwnershipPersonIds = [row.ownershipPersonId]
        }
      }
    },
    refreshForm() {
      this.houseOwnershipPerson = {}
    }
  }
}
</script>
