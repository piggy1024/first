<template>
  <div class="container">
    <div class="btn-box cus-mb-10">
      <el-button type="success" @click="submitData()">{{isEdit ? '更新': '保存'}}</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-form ref="submitForm" :model="submitForm" label-width="120px" :rules="rules" autocomplete="off">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="基本信息" name="1">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="村民姓名" prop="person.name">
                  <el-input style="width:200px" v-model="submitForm.person.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="person.sex">
                  <el-select placeholder="请选择" v-model="submitForm.person.sex" style="width:200px">
                    <el-option
                      :label="item.meaning"
                      :value="item.dataCode"
                      v-for="(item,index) of selectOptionsMap.sex"
                      :key="item.dataCodeCategory+index"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="电话号码" prop="person.phoneNumber">
                  <el-input
                    v-model="submitForm.person.phoneNumber"
                    style="width:200px"
                    type="number"
                  ></el-input>
                </el-form-item>
                <el-form-item label="是否村民代表">
                  <el-select
                    placeholder="请选择"
                    v-model="submitForm.isVillagerRepresent"
                    style="width:200px"
                  >
                    <el-option
                      v-for="(item,index) of isTrueOrFalse"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="政治面貌">
                  <el-select
                    v-model="submitForm.politicalAffiliation"
                    placeholder="请选择"
                    style="width:200px"
                  >
                    <el-option
                      :label="item.meaning"
                      :value="item.dataCode"
                      v-for="(item,index) of selectOptionsMap.politicalAffiliation"
                      :key="item.dataCodeCategory+index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="集体经济" prop="collectiveEconomic">
                  <el-select
                    v-model="submitForm.collectiveEconomic"
                    placeholder="请选择"
                    style="width:200px"
                  >
                    <el-option
                      v-for="(item,index) of isTrueOrFalse"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="职业" prop="occupation">
                  <el-input v-model="submitForm.occupation" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="重点人群">
                  <el-select
                    v-model="submitForm.tempFocusCrowdList"
                    placeholder="请选择(可多选)"
                    style="width:200px"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      :label="item.meaning"
                      :value="item.dataCode"
                      v-for="(item,index) of selectOptionsMap.focusCrowdList"
                      :key="item.dataCodeCategory+index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="submitForm.person.remark" style="width:200px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件类型" prop="person.certifType">
                  <el-select
                    placeholder="请选择"
                    v-model="submitForm.person.certifType"
                    style="width:200px"
                  >
                    <el-option
                      :label="item.meaning"
                      :value="item.dataCode"
                      v-for="(item,index) of selectOptionsMap.certifType"
                      :key="item.dataCodeCategory+index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="出生日期">
                  <el-input style="width:200px" readonly placeholder="系统反显身份证" :value="submitForm.birthDate"></el-input>
                </el-form-item>
                <el-form-item label="所在村组" prop="villager.village">
                  <el-input
                    style="width:200px"
                    readonly
                    placeholder="请选择"
                    v-model="submitForm.villager.village"
                  >
                    <el-button
                      type="primary"
                      slot="append"
                      icon="el-icon-plus"
                      @click="handleVillageGroup()"
                    ></el-button>
                  </el-input>
                </el-form-item>
                <el-form-item label="文化程度">
                  <el-select
                    placeholder="请选择"
                    v-model="submitForm.educationLevel"
                    style="width:200px"
                  >
                    <el-option
                      :label="item.meaning"
                      :value="item.dataCode"
                      v-for="(item,index) of selectOptionsMap.educationLevel"
                      :key="item.dataCodeCategory+index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="入党日期">
                  <el-date-picker
                    v-model="submitForm.joinPartyDate"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="兵役状态">
                  <el-select
                    placeholder="请选择"
                    style="width:200px"
                    v-model="submitForm.militaryServiceStatus"
                  >
                    <el-option
                      :label="item.meaning"
                      :value="item.dataCode"
                      v-for="(item,index) of selectOptionsMap.militaryServiceStatus"
                      :key="item.dataCodeCategory+index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="外出务工地">
                  <el-input v-model="submitForm.goOutWorkLocation" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="死亡日期">
                  <el-date-picker
                    v-model="submitForm.deathTime"
                    type="date"
                    placeholder="村民状态为‘死亡’时必填"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="上传头像">
                  <el-upload
                    action="/paas-file/file/tempSaveFile"
                    name="multipartFile"
                    accept="image/*"
                    :on-success="uploadPhotoSuccess"
                    :on-error="uploadPhotoError"
                  >
                    <el-button style="width:200px" type="primary">点击选择</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件号码" prop="person.idCardNumber">
                  <el-input style="width:200px" v-model="submitForm.person.idCardNumber" @blur="idCardNumberBlur"></el-input>
                </el-form-item>
                <el-form-item label="民族" prop="person.ethnic">
                  <el-select
                    v-model="submitForm.person.ethnic"
                    placeholder="请选择"
                    style="width:200px"
                  >
                    <el-option
                      :label="item.meaning"
                      :value="item.dataCode"
                      v-for="(item,index) of selectOptionsMap.ethnic"
                      :key="item.dataCodeCategory+index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="村民状态" prop="status">
                  <el-select v-model="submitForm.status" placeholder="请选择" style="width:200px">
                    <el-option
                      :label="item.meaning"
                      :value="item.dataCode"
                      v-for="(item,index) of selectOptionsMap.status"
                      :key="item.dataCodeCategory+index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="家庭单位" prop="villager.homeCompany">
                  <el-input
                    style="width:200px"
                    readonly
                    placeholder="请选择"
                    v-model="submitForm.villager.homeCompany"
                  >
                    <el-button
                      type="primary"
                      slot="append"
                      icon="el-icon-plus"
                      @click="dialoghomeCompany = true"
                    ></el-button>
                  </el-input>
                </el-form-item>
                <el-form-item label="婚姻状况">
                  <el-select
                    v-model="submitForm.marriageSituation"
                    placeholder="请选择"
                    style="width:200px"
                  >
                    <el-option
                      :label="item.meaning"
                      :value="item.dataCode"
                      v-for="(item,index) of selectOptionsMap.marriageSituation"
                      :key="item.dataCodeCategory+index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="原户籍地址">
                  <el-input v-model="submitForm.origHshdRgstAddress" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="就业状态" prop="employmentStatus">
                  <el-select
                    placeholder="请选择"
                    v-model="submitForm.employmentStatus"
                    style="width:200px"
                  >
                    <el-option
                      :label="item.meaning"
                      :value="item.dataCode"
                      v-for="(item,index) of selectOptionsMap.employmentStatus"
                      :key="item.dataCodeCategory+index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="弱势群体">
                  <el-select
                    placeholder="请选择"
                    v-model="submitForm.underprivilegedIdList"
                    style="width:200px"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      :label="item.meaning"
                      :value="item.dataCode"
                      v-for="(item,index) of selectOptionsMap.underprivilegedList"
                      :key="item.dataCodeCategory+index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="现居住地址">
                  <el-input v-model="submitForm.currentResideAddress" style="width:200px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="户籍信息" name="2">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="与户主关系" prop="andHshdMasterRelate">
                  <el-select
                    placeholder="请选择"
                    v-model="submitForm.andHshdMasterRelate"
                    style="width:200px"
                  >
                    <el-option
                      :label="item.meaning"
                      :value="item.dataCode"
                      v-for="(item,index) of selectOptionsMap.andHshdMasterRelate"
                      :key="item.dataCodeCategory+index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="户籍地址" prop="hshdRgstAddress">
                  <el-input style="width:200px" v-model="submitForm.hshdRgstAddress"></el-input>
                </el-form-item>
                <el-form-item label="常住人口" prop="permanentlyResidePopulation">
                  <el-select
                    placeholder="请选择"
                    v-model="submitForm.permanentlyResidePopulation"
                    style="width:200px"
                  >
                    <el-option
                      v-for="(item,index) of isTrueOrFalse"
                      :key="'常住'+index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所在户" prop="householdId">
                  <el-input
                    style="width:200px"
                    readonly
                    placeholder="请选择"
                    :value="submitForm.householdId ? submitForm.huoseholdMain : '张三'"
                  >
                    <el-button
                      type="primary"
                      slot="append"
                      icon="el-icon-plus"
                      @click="dialogHoldhouse = true"
                    ></el-button>
                  </el-input>
                </el-form-item>
                <el-form-item label="户口类别" prop="hshdRgstCategory">
                  <el-select
                    placeholder="请选择"
                    v-model="submitForm.hshdRgstCategory"
                    style="width:200px"
                  >
                    <el-option
                      :label="item.meaning"
                      :value="item.dataCode"
                      v-for="(item,index) of selectOptionsMap.hshdRgstCategory"
                      :key="item.dataCodeCategory+index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="离户日期" prop>
                  <el-date-picker
                    v-model="submitForm.leavingHouseholdDate"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="入户日期" prop="registerHouseholdDate">
                  <el-date-picker
                    v-model="submitForm.registerHouseholdDate"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="户口性质" prop="hshdRgstProperty">
                  <el-select
                    placeholder="请选择"
                    v-model="submitForm.hshdRgstProperty"
                    style="width:200px"
                  >
                    <el-option
                      :label="item.meaning"
                      :value="item.dataCode"
                      v-for="(item,index) of selectOptionsMap.hshdRgstProperty"
                      :key="item.dataCodeCategory+index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="户籍注销日期">
                  <el-date-picker
                    v-model="submitForm.hshdRgstCancelDate"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="惠农信息" name="3">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="财政代码" label-width="120px">
                  <el-input style="width:200px" v-model="submitForm.financialCode"></el-input>
                </el-form-item>
                <el-form-item label="医保账号" label-width="120px">
                  <el-input style="width:200px" v-model="submitForm.healthInsureAccountNumber"></el-input>
                </el-form-item>
                <el-form-item label="扶贫补贴明白折" label-width="120px">
                  <el-input style="width:200px" v-model="submitForm.povtAleaSubsidyPlainPsbk"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="银行卡号" label-width="120px">
                  <el-input style="width:200px" v-model="submitForm.bankCardNo"></el-input>
                </el-form-item>
                <el-form-item label="惠农补贴明白折" label-width="120px">
                  <el-input style="width:200px" v-model="submitForm.benfFamiSubsidyPlainPsbk"></el-input>
                </el-form-item>
                <el-form-item label="扶贫补贴明白卡" label-width="120px">
                  <el-input style="width:200px" v-model="submitForm.povtAleaSubsidyPlainCard"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="社保账号" label-width="120px">
                  <el-input style="width:200px" v-model="submitForm.socialInsureAccountNumber"></el-input>
                </el-form-item>
                <el-form-item label="惠农补贴明白卡" label-width="120px">
                  <el-input style="width:200px" v-model="submitForm.benfFamiSubsidyPlainCard"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <!-- 与户主关系为户主时显示经济产物信息 -->
          <el-collapse-item title="经济产物信息" name="4" v-if="submitForm.andHshdMasterRelate === '01'">
            <el-button
              class="filter-item cus-mb-10"
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="addEconomicProductItem"
            >新增经济产物</el-button>
            <el-table :data="submitForm.economicProductList" border class="cus-mb-20">
              <!-- <el-table-column type="selection" width="55px"></el-table-column> -->
              <el-table-column>
                <template slot="header">
                  <span class="cus-text-red">*</span>
                  <span>经济产物类型</span>
                </template>
                <template slot-scope="scope">
                  <el-select
                    placeholder="请选择"
                    v-model="scope.row.type"
                    :disabled="scope.row.isReadOnly"
                    @change="economicProductListTypeChange($event,scope.$index)"
                  >
                    <el-option label="植物" value="02"></el-option>
                    <el-option label="动物" value="01"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot="header">
                  <span class="cus-text-red">*</span>
                  <span>经济产物</span>
                </template>
                <template slot-scope="scope">
                  <el-select
                    placeholder="请先选择经济产物类型"
                    v-model="scope.row.name"
                    :disabled="scope.row.isReadOnly"
                  >
                    <template v-if="scope.row.type === '01'">
                      <el-option
                        v-for="(item,index) of economicProductAnimalOption"
                        :value="item.value"
                        :label="item.label"
                        :key="index"
                      ></el-option>
                    </template>
                    <template v-if="scope.row.type === '02'">
                      <el-option
                        v-for="(item,index) of economicProductPlantOption"
                        :value="item.value"
                        :label="item.label"
                        :key="index"
                      ></el-option>
                    </template>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot="header">
                  <span class="cus-text-red">*</span>
                  <span>数量</span>
                </template>
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.quantity"
                    :readonly="scope.row.isReadOnly"
                    type="number"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot="header">
                  <span class="cus-text-red">*</span>
                  <span>产值（元）</span>
                </template>
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.outputValue"
                    :readonly="scope.row.isReadOnly"
                    type="number"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="年份">
                <template slot="header">
                  <span class="cus-text-red">*</span>
                  <span>年份</span>
                </template>
                <template slot-scope="scope">
                  <el-date-picker
                    style="width: 100%"
                    :readonly="scope.row.isReadOnly"
                    v-model="scope.row.year"
                    type="year"
                    value-format="yyyy"
                    placeholder="选择年"
                  ></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column label="备注">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.remark" :readonly="scope.row.isReadOnly"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="130">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    :type="scope.row.isReadOnly ? 'primary' : 'success'"
                    :icon="scope.row.isReadOnly ? 'el-icon-edit' : 'el-icon-circle-check-outline'"
                    @click="saveOrEditEconomicProductItem(scope.$index)"
                  ></el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    @click="deleteEconomicProductItem(scope.row,scope.$index)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </el-form>
      <div class="head-shot text-center" v-show="submitForm.person.headshot">
        <p>上传头像</p>
        <img :src="$global.generateImgPath(submitForm.person.headshot)" alt />
      </div>
    </div>
    <el-dialog title="请选择所在村组" :visible.sync="dialogVillageGroup" width="520px">
      <el-row type="flex" justify="space-between" class="cus-mb-10">
        <el-col :span="16">
          <el-input placeholder="若需新增队组,则在此输入队组的名称"></el-input>
        </el-col>
        <el-col :span="6" class="cus-text-right">
          <el-button type="primary">增加村组</el-button>
        </el-col>
      </el-row>
      <el-table :data="villageGroupData" border max-height="350px">
        <el-table-column property="country" label="所在村"></el-table-column>
        <el-table-column property="groupName" label="组名"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer text-center">
        <el-button type="primary" @click="dialogVillageGroup = false">确 定</el-button>
        <el-button @click="dialogVillageGroup = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="请选择所属家庭单位" :visible.sync="dialoghomeCompany" width="520px">
      <el-row type="flex" justify="space-between" class="cus-mb-10">
        <el-col :span="16">
          <el-input placeholder="若需家庭单位，则在此输入家庭单位的名称"></el-input>
        </el-col>
        <el-col :span="7" class="cus-text-right">
          <el-button type="primary">增加家庭单位</el-button>
        </el-col>
      </el-row>
      <el-table :data="homeCompanyData" border max-height="350px">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column property="groupName" label="家庭单位"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer text-center">
        <el-button type="primary" @click="dialoghomeCompany = false">确 定</el-button>
        <el-button @click="dialoghomeCompany = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="请选择所在户" :visible.sync="dialogHoldhouse" width="700px">
      <el-row type="flex" justify="space-between" class="cus-mb-10">
        <el-col :span="16">
          <el-input placeholder="村民姓名"></el-input>
        </el-col>
        <el-col :span="6" class="cus-text-right">
          <el-button type="primary">搜索</el-button>
        </el-col>
      </el-row>
      <el-table :data="holdHouseData" border max-height="350px">
        <el-table-column fixed type="selection" width="50"></el-table-column>
        <el-table-column property="person.name" label="姓名" width="100"></el-table-column>
        <el-table-column property="person.idCardNumber" label="身份证号码" width="160"></el-table-column>
        <el-table-column property="age" label="年龄" width="60"></el-table-column>
        <el-table-column property="person.sex" label="性别" width="60"></el-table-column>
        <el-table-column property="country" label="所属村" min-width="100"></el-table-column>
        <el-table-column property="groupName" label="组名" min-width="100"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer text-center">
        <el-button type="primary" @click="dialogHoldhouse = false">确 定</el-button>
        <el-button @click="dialogHoldhouse = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import villagerService from '@/api/villager/VillagerService'

import fileService from '@/api/FileService'

import mixinIndex from './_mixins/index'

export default {
  mixins: [mixinIndex],
  name: 'VillagerAdd',
  data() {
    return {
      holdHouseData: [],
      villageGroupData: [],
      homeCompanyData: [],
      dialogVillageGroup: false,
      dialogHoldhouse: false,
      dialoghomeCompany: false,
      isEdit: false,
      activeNames: ['1', '2', '3', '4'],
      isTrueOrFalse: [
        {
          label: '是',
          value: '1'
        },
        {
          label: '否',
          value: '0'
        }
      ],
      /**
       * 村民状态为死亡，关联死亡日期和户籍注销日期为必选
       * 村民状态为转入时，原户籍地址必填
       */
      headshotUrl: '',
      submitForm: {
        person: {
          name: '',
          sex: '',
          phoneNumber: '',
          idCardNumber: '',
          ethnic: '01',
          personType: '01', // 01 村民 ，02 外部人员
          headshot: '',
          remark: '',
          certifType: ''
        },
        birthDate: '',
        isVillagerRepresent: '',
        politicalAffiliation: '',
        collectiveEconomic: '',
        occupation: '',
        educationLevel: '',
        joinPartyDate: '',
        militaryServiceStatus: '',
        employmentStatus: '01',
        goOutWorkLocation: '',
        marriageSituation: '',
        hshdRgstAddress: '',
        origHshdRgstAddress: '',
        focusCrowdIdList: [],
        tempFocusCrowdList: [],
        focusCrowdList: [],
        deathTime: '',
        // underprivilegedIdList: [],
        // tempUnderprivilegedList: [],
        underprivilegedList: [],
        status: '',
        currentResideAddress: '',
        villager: {
          village: '01',
          homeCompany: '01'
        },

        andHshdMasterRelate: '01',
        permanentlyResidePopulation: '',
        hshdRgstCategory: '01',
        // huoseholdMain: '01',
        leavingHouseholdDate: '',
        registerHouseholdDate: '',
        hshdRgstProperty: '01',
        financialCode: '',
        bankCardNo: '',
        socialInsureAccountNumber: '',

        householdId: '01',
        // 经济产物
        economicProductList: [
          // {
          //   type: '',
          //   name: '',
          //   quantity: '',
          //   outputValue: '',
          //   year: '',
          //   remark: ''
          // }
        ]
      },
      selectOptionsMap: {
        certifType: [], // 证件类型
        sex: [],
        ethnic: [],
        status: [],
        educationLevel: [],
        politicalAffiliation: [],
        marriageSituation: [],
        militaryServiceStatus: [],
        employmentStatus: [],
        focusCrowdList: [],
        underprivilegedList: [],
        andHshdMasterRelate: [],
        hshdRgstCategory: [],
        hshdRgstProperty: []
      },
      // 经济产物
      economicProductListNameOption: [],
      // 植物
      economicProductPlantOption: [
        {
          label: '水稻',
          value: '01'
        },
        {
          label: '棉花',
          value: '02'
        },
        {
          label: '玉米',
          value: '03'
        },
        {
          label: '油菜籽',
          value: '04'
        },
        {
          label: '水果',
          value: '05'
        },
        {
          label: '烟草',
          value: '06'
        },
        {
          label: '其他',
          value: '07'
        }
      ],
      // 动物
      economicProductAnimalOption: [
        {
          label: '猪',
          value: '01'
        },
        {
          label: '牛',
          value: '02'
        },
        {
          label: '羊',
          value: '03'
        },
        {
          label: '其他',
          value: '04'
        }
      ],
      rules: {
        'person.name': [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        'person.sex': [{ required: true, message: '请选择性别', trigger: 'change' }],
        'person.phoneNumber': [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ],
        collectiveEconomic: [
          { required: true, message: '请选择是否集体经济', trigger: 'change' }
        ],
        occupation: [{ required: true, message: '输入职业', trigger: 'blur' }],
        'person.certifType': [
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        'person.idCardNumber': [
          {
            pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
            message: '请输入正确的身份证号',
            trigger: 'blur'
          }
        ],
        'villager.village': [
          { required: true, message: '请选择所在村组', trigger: 'change' }
        ],
        'villager.homeCompany': [
          { required: true, message: '请选择家庭单位', trigger: 'change' }
        ],
        'person.ethnic': [{ required: true, message: '请选择民族', trigger: 'change' }],
        status: [
          { required: true, message: '请选择村民状态', trigger: 'change' }
        ],
        employmentStatus: [
          { required: true, message: '请选择就业状态', trigger: 'change' }
        ],
        andHshdMasterRelate: [
          { required: true, message: '请选择与户主关系', trigger: 'change' }
        ],
        householdId: [
          { required: true, message: '请选择所在户', trigger: 'change' }
        ],
        hshdRgstAddress: [
          { required: true, message: '请输入户籍地址', trigger: 'blur' }
        ],
        permanentlyResidePopulation: [
          { required: true, message: '请选择是否为常住人口', trigger: 'change' }
        ],
        hshdRgstCategory: [
          { required: true, message: '请选择户口类别', trigger: 'change' }
        ],
        registerHouseholdDate: [
          { required: true, message: '请选择入户日期', trigger: 'blur' }
        ],
        hshdRgstProperty: [
          { required: true, message: '请选择户口性质', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getSelectOptions(
      [
        'certifType',
        'sex',
        'ethnic',
        'status',
        'educationLevel',
        'politicalAffiliation',
        'marriageSituation',
        'militaryServiceStatus',
        'employmentStatus',
        'focusCrowdList',
        'underprivilegedList',
        'andHshdMasterRelate',
        'hshdRgstCategory',
        'hshdRgstProperty'
      ]
    )

    if (this.$route.params.id) {
      this.isEdit = true
      this.getVillagerDetail()
    }
  },
  methods: {
    getVillagerDetail() {
      villagerService.acquireVillagerById(this.$route.params.id).then(res => {
        // console.log(res);
        res.tempFocusCrowdList = []
        res.underprivilegedIdList = []
        if (res.focusCrowdList) {
          res.focusCrowdList.forEach(item => {
            res.tempFocusCrowdList.push(item.focusCrowd)
          })
        }
        if (res.underprivilegedList) {
          res.underprivilegedList.forEach(item => {
            res.underprivilegedIdList.push(item.underprivileged)
          })
        }
        res.economicProductList.forEach((item, index) => {
          item.isReadOnly = true
        })
        // if(res.person.headshot){
        //   fileService.getFile(res.person.headshot).then(res=>{
        //     this.headshotUrl = res
        //   })
        // }
        if (res.status) {
          res.frontStatus = res.status
        }
        this.submitForm = res
        // 临时增加村民相关信息，所在村组，家庭单位
        this.submitForm.villager = {
          village: '01',
          homeCompany: '01'
        }
      })
    },
    submitData() {
      // this.$refs['submitForm'].validate((valid) => {
      //   if (valid) {
      //       alert('submit!');
      //     } else {
      //       console.log('error submit!!');
      //     }
      // })
      let paramText = ''
      const newFocusCrowd = []
      const newFocusCrowdId = []
      const newUnderprivileged = []
      if (this.isEdit) {
        paramText = 'update'
      } else {
        paramText = 'save'
      }

      this.submitForm.focusCrowdList.forEach((item, index) => {
        let isTrue = false
        this.submitForm.tempFocusCrowdList.forEach(item2 => {
          if (item.focusCrowd === item2) {
            isTrue = true
          }
        })
        if (!isTrue) {
          newFocusCrowdId.push(item.focusCrowd)
        }
      })
      this.submitForm.tempFocusCrowdList.forEach(item => {
        newFocusCrowd.push({ focusCrowd: item })
      })
      this.submitForm.underprivilegedIdList.forEach((item, index) => {
        newUnderprivileged.push({ underprivileged: item })
      })
      this.submitForm.focusCrowdList = newFocusCrowd
      this.submitForm.focusCrowdIdList = newFocusCrowdId
      this.submitForm.underprivilegedList = newUnderprivileged

      // console.log(this.submitForm.focusCrowdList);
      // debugger

      if (this.submitForm.person.headshot) {
        fileService
          .commitSaveFile(this.submitForm.person.headshot)
          .then(resp => {
            console.log(resp)
          })
      }
      villagerService[paramText + 'Villager'](this.submitForm).then(res => {
        // console.log(res);
        this.$message({
          message: `${paramText === 'save' ? '保存' : '更新'}成功！`,
          type: 'success',
          onClose: () => {
            this.$router.go(-1)
          }
        })
      })
    },
    addEconomicProductItem() {
      this.submitForm.economicProductList.push({
        type: '',
        name: '',
        quantity: '',
        outputValue: '',
        year: '',
        remark: '',
        isReadOnly: false
      })
    },
    saveOrEditEconomicProductItem(index) {
      this.submitForm.economicProductList[index].isReadOnly = !this.submitForm
        .economicProductList[index].isReadOnly
    },
    deleteEconomicProductItem(row, index) {
      this.submitForm.economicProductList.splice(index, 1)
      if (row.economicProductId) {
        if (Array.isArray(this.submitForm.economicProductIdList)) {
          this.submitForm.economicProductIdList.push(row.economicProductId)
        } else {
          this.submitForm.economicProductIdList = [row.economicProductId]
        }
      }
    },
    economicProductListTypeChange(value, index) {
      this.submitForm.economicProductList[index].name = ''
    },
    // 头像上传
    uploadPhotoSuccess(res, file, fileList) {
      console.log(res)
      if (res.fileId) {
        this.submitForm.person.headshot = res.fileId
      }
    },
    uploadPhotoError(err, file, fileList) {
      console.log(err)
    },
    // 所在村组弹窗
    handleVillageGroup() {
      // villagerService.
    },
    // 根据身份证获取出生日期
    idCardNumberBlur(event) {
      const idCartdValue = event.target.value
      let tempBirth = ''
      if (idCartdValue.length === 15) {
        tempBirth = idCartdValue.match(/(?<=\d{6})(\d{2})(\d{2})(\d{2})(?=\d{3})/)
      } else if (idCartdValue.length === 18) {
        tempBirth = idCartdValue.match(/(?<=\d{6})(\d{4})(\d{2})(\d{2})(?=\d{3})/)
      }
      // console.log(tempBirth);
      // debugger
      if (Array.isArray(tempBirth)) {
        this.submitForm.birthDate = `${tempBirth[1].length > 2 ? tempBirth[1] : '19' + tempBirth[1]}-${tempBirth[2]}-${tempBirth[3]}`
      } else {
        this.submitForm.birthDate = ''
      }
    }
  }
}
</script>

<style>
.container {
  margin: 20px;
}

.dialog-footer {
  margin-top: 50px;
  text-align: center;
}
</style>
