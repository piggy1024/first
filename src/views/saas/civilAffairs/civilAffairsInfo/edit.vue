<template>
  <div class="app-container">
    <div class="btn-box cus-mb-10">
      <el-button type="success" @click="submitData()">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <!-- <el-collapse v-model="activeNames" -->
      <!-- label-position="left" -->
      <el-form ref="form" label-width="110px">
        <cus-collapse-item
          collapse-title="留守儿童"
          :is-disabled="collapseSwitch.elderly"
          @item-change="collapseSwitch.leftBehindChildren = $event"
        >
          <template slot="itemContent">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="父亲务工地点">
                  <el-input
                    placeholder="请输入"
                    v-model="submitForm.leftBehindChildren.fatherWorkLocation"
                  ></el-input>
                </el-form-item>
                <el-form-item label="母亲务工地点">
                  <el-input
                    placeholder="请输入"
                    v-model="submitForm.leftBehindChildren.motherWorkLocation"
                  ></el-input>
                </el-form-item>
                <el-form-item label="就学情况">
                  <el-select
                    placeholder="请选择"
                    v-model="submitForm.leftBehindChildren.goToSchoolSituation"
                  >
                    <el-option
                      v-for="item in selectOptionsMap.goToSchoolSituation"
                      :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="上报类型">
                  <el-select placeholder="请选择" v-model="submitForm.leftBehindChildren.reportType">
                    <el-option
                      v-for="item in selectOptionsMap.reportType"
                      :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="有无发生侵害">
                  <el-select
                    placeholder="请选择"
                    v-model="submitForm.leftBehindChildren.haveNotHaveOccurInfringe"
                  >
                    <el-option label="有" value="1" />
                    <el-option label="无" value="0" />
                  </el-select>
                </el-form-item>
                <el-form-item label="残疾类型">
                  <el-select
                    placeholder="请选择"
                    v-model="submitForm.leftBehindChildren.disabilityCategory"
                  >
                    <el-option
                      v-for="item in selectOptionsMap.disabilityCategory"
                      :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="寄宿情况">
                  <el-select
                    placeholder="请选择"
                    v-model="submitForm.leftBehindChildren.boardingSituation"
                  >
                    <el-option label="寄宿" value="1" />
                    <el-option label="未寄宿" value="0" />
                  </el-select>
                </el-form-item>
                <el-form-item label="健康情况">
                  <el-select
                    placeholder="请选择"
                    v-model="submitForm.leftBehindChildren.healthSituation"
                  >
                    <el-option
                      v-for="item in selectOptionsMap.healthSituation"
                      :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="实际监护情况">
                  <el-select
                    placeholder="请选择"
                    v-model="submitForm.leftBehindChildren.actualGuardianshipSituation"
                  >
                    <el-option
                      v-for="item in selectOptionsMap.actualGuardianshipSituation"
                      :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="疑似残疾">
                  <el-select
                    placeholder="请选择"
                    v-model="submitForm.leftBehindChildren.suspectDisability"
                  >
                    <el-option
                      v-for="item in selectOptionsMap.suspectDisability"
                      :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="其他特殊情况">
                  <el-select
                    placeholder="请选择"
                    v-model="submitForm.leftBehindChildren.otherSpecialSituation"
                  >
                    <el-option
                      v-for="item in selectOptionsMap.otherSpecialSituation"
                      :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="残疾等级">
                  <el-select
                    placeholder="请选择"
                    v-model="submitForm.leftBehindChildren.disabilityLevel"
                  >
                    <el-option
                      v-for="item in selectOptionsMap.disabilityLevel"
                      :key="item.disabilityCategory"
                      :label="item.disabilityName"
                      :value="item.disabilityCategory"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="现居住地址">
                  <el-input
                    placeholder="请输入"
                    v-model="submitForm.leftBehindChildren.currentResideAddress"
                  ></el-input>
                </el-form-item>
                <el-form-item label="村委联系人">
                  <el-input
                    placeholder="请输入"
                    v-model="submitForm.leftBehindChildren.villageCmieContactPerson"
                  ></el-input>
                </el-form-item>
                <el-form-item label="村委联系电话">
                  <el-input
                    placeholder="请输入"
                    v-model="submitForm.leftBehindChildren.villageCmieContactPhone"
                  ></el-input>
                </el-form-item>
                <el-form-item label="是否登记户口">
                  <el-select
                    placeholder="请选择"
                    v-model="submitForm.leftBehindChildren.isRegisterHshdRgst"
                  >
                    <el-option label="是" value="1" />
                    <el-option label="否" value="0" />
                  </el-select>
                </el-form-item>
                <el-form-item label="大病病种">
                  <el-select
                    placeholder="请选择"
                    v-model="submitForm.leftBehindChildren.seriousIllnessDiseases"
                  >
                    <el-option
                      v-for="item in selectOptionsMap.seriousIllnessDiseases"
                      :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="社会福利">
                  <el-select
                    placeholder="请选择"
                    v-model="submitForm.leftBehindChildren.societyWelfareSituation"
                  >
                    <el-option
                      v-for="item in selectOptionsMap.societyWelfareSituation"
                      :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="16">
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="submitForm.leftBehindChildren.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </cus-collapse-item>
        <cus-collapse-item
          collapse-title="高龄老年人"
          :is-disabled="collapseSwitch.leftBehindChildren"
          @item-change="collapseSwitch.elderly = $event"
        >
          <template slot="itemContent">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="一卡通身份证">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="补贴起始时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="一卡通账号">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="补贴取消时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="一卡通户名">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="异动金额">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </cus-collapse-item>
        <cus-collapse-item
          collapse-title="残疾信息"
          @item-change="collapseSwitch.disabilityPerson = $event"
        >
          <template slot="itemContent">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="残疾证号">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="注册时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="银行类型">
                  <el-select placeholder="请选择" v-model="temp.sex">
                    <el-option
                      v-for="item in sexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="残疾等级">
                  <el-select placeholder="请选择" v-model="temp.sex">
                    <el-option
                      v-for="item in sexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="开始时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="银行卡账号">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="退伍时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </cus-collapse-item>
        <cus-collapse-item
          collapse-title="优抚对象"
          @item-change="collapseSwitch.preferentialCareObject = $event"
        >
          <template slot="itemContent">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="属别">
                  <el-select placeholder="请选择" v-model="temp.sex">
                    <el-option
                      v-for="item in sexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="银行类型">
                  <el-select placeholder="请选择" v-model="temp.sex">
                    <el-option
                      v-for="item in sexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="银行卡号">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="入伍时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="开始时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="一卡通账号">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="入伍时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </cus-collapse-item>
        <cus-collapse-item
          collapse-title="五保户"
          @item-change="collapseSwitch.fiveInsurePerson = $event"
        >
          <template slot="itemContent">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="银行类型">
                  <el-select placeholder="请选择" v-model="temp.sex">
                    <el-option
                      v-for="item in sexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="银行卡号">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="银行账户名">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="住房情况">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="起始供养时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="取消时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="供养证号">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="供养类别">
                  <el-select placeholder="请选择" v-model="temp.sex">
                    <el-option
                      v-for="item in sexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="护理类型">
                  <el-select placeholder="请选择" v-model="temp.sex">
                    <el-option
                      v-for="item in sexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </cus-collapse-item>
        <cus-collapse-item
          collapse-title="低保户"
          @item-change="collapseSwitch.lowInsurePerson = $event"
        >
          <template slot="itemContent">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="异动说明">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="低保类型">
                  <el-select placeholder="请选择" v-model="temp.sex">
                    <el-option
                      v-for="item in sexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="属别">
                  <el-select placeholder="请选择" v-model="temp.sex">
                    <el-option
                      v-for="item in sexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="类型">
                  <el-select placeholder="请选择" v-model="temp.sex">
                    <el-option
                      v-for="item in sexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="银行类型">
                  <el-select placeholder="请选择" v-model="temp.sex">
                    <el-option
                      v-for="item in sexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="银行卡号">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="进保时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="取消时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="原因">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="享受人">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </cus-collapse-item>
        <cus-collapse-item
          collapse-title="精简对象"
          @item-change="collapseSwitch.retrenchObject = $event"
        >
          <template slot="itemContent">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="银行类型">
                  <el-select placeholder="请选择" v-model="temp.sex">
                    <el-option
                      v-for="item in sexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="银行账号">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开始时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="取消时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备注">
                  <el-input type="textarea" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </cus-collapse-item>
        <cus-collapse-item
          collapse-title="临时救助"
          @item-change="collapseSwitch.tempSuccourObject = $event"
        >
          <template slot="itemContent">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="临时救助账号">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="银行类型">
                  <el-select placeholder="请选择" v-model="temp.sex">
                    <el-option
                      v-for="item in sexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开始时间">
                  <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="银行账号">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="取消时间">
                  <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </cus-collapse-item>
        <cus-collapse-item
          collapse-title="贫困户"
          @item-change="collapseSwitch.distressPerson = $event"
        >
          <template slot="itemContent">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="建档账号">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="银行类型">
                  <el-select placeholder="请选择" v-model="temp.sex">
                    <el-option
                      v-for="item in sexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开始时间">
                  <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="银行账号">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="取消时间">
                  <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </cus-collapse-item>
        <!-- <el-collapse-item title="高龄老人" name="2"></el-collapse-item> -->
        <!-- <el-collapse-item title="残疾信息" name="3"></el-collapse-item> -->
        <!-- <el-collapse-item title="优扶对象" name="4">
        </el-collapse-item>-->
        <!-- <el-collapse-item title="五保户" name="5">
        </el-collapse-item>-->
        <!-- <el-collapse-item title="低保户" name="6">
          </el-collapse-item>
          <el-collapse-item title="其他" name="7">
        </el-collapse-item>-->
      </el-form>
      <!-- </el-collapse> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-box {
  /deep/ .collapse-item {
    border-bottom: 1px solid #e6ebf5;
    .item-title {
      margin: 0;
      font-size: 16px;
      padding: 12px 8px 12px 0px;
      > i {
        font-size: 18px;
        font-weight: 700;
      }
    }
    .item-content {
      padding: 15px 26px 0 0;
      .el-form-item .el-input,
      .el-form-item .el-date-editor.el-input,
      .el-form-item .el-textarea,
      .el-form-item .el-select,
      .el-form-item .el-button {
        // width: 200px;
        width: 100%;
      }
    }
  }
}
</style>

<script>
// component
import cusCollapseItem from '../_components/cusCollapseItem'

// api
import dataCodeService from '@/api/DataCodeService'
import civilAffairsService from '@/api/civilAffairs/CivilAffairsService'

export default {
  components: {
    cusCollapseItem
  },
  data() {
    return {
      // activeNames: ['1', '2', '3', '4', '5', '6', '7'],
      // activeNames: [],
      submitForm: {
        // 留守儿童
        leftBehindChildren: {
          fatherWorkLocation: '',
          motherWorkLocation: '',
          goToSchoolSituation: '',
          reportType: '',
          haveNotHaveOccurInfringe: '',
          disabilityCategory: '',
          remark: '',
          boardingSituation: '',
          healthSituation: '',
          actualGuardianshipSituation: '',
          suspectDisability: '',
          otherSpecialSituation: '',
          disabilityLevel: '',
          currentResideAddress: '',
          villageCmieContactPerson: '',
          villageCmieContactPhone: '',
          isRegisterHshdRgst: '',
          seriousIllnessDiseases: '',
          societyWelfareSituation: ''
        },
        // 高龄老年人
        elderly: {},
        // 残疾人员
        disabilityPerson: {},
        // 优抚对象
        preferentialCareObject: {},
        // 五保户
        fiveInsurePerson: {},
        // 低保户
        lowInsurePerson: {},
        // 精简对象
        retrenchObject: {},
        // 临时救助
        tempSuccourObject: {},
        // 贫困户
        distressPerson: {}
      },
      collapseSwitch: {
        leftBehindChildren: false,
        elderly: false,
        disabilityPerson: false,
        preferentialCareObject: false,
        fiveInsurePerson: false,
        lowInsurePerson: false,
        retrenchObject: false,
        tempSuccourObject: false,
        distressPerson: false
      },
      selectOptionsMap: {
        goToSchoolSituation: [],
        reportType: [],
        disabilityCategory: [],
        healthSituation: [],
        actualGuardianshipSituation: [],
        suspectDisability: [],
        otherSpecialSituation: [],
        disabilityLevel: [], // 残疾等级，独立接口
        seriousIllnessDiseases: [],
        societyWelfareSituation: []
      },
      sexOptions: [
        {
          label: '请选择',
          value: '0'
        },
        {
          label: '男',
          value: '女'
        },
        {
          label: '女',
          value: '男'
        }
      ],
      temp: {
        id: undefined,
        importance: 1,

        name: '',
        sex: '',
        isDaibiao: '',
        education: '',
        address: '',
        changzhurenkou: '',
        status: '',
        remark: '',

        idCard: '',
        relation: '',
        phone: '',
        isMarry: '',
        isWeak: '',
        old_address: '',
        isCity: '',
        isSoldier: '',

        isHan: '',
        suozaicunzu: '',
        suozaihu: '',
        isVillage: '',
        politicalStatus: '',
        isFocupeople: '',
        workPlace: '',
        isColletive: '',

        timestamp: new Date(),
        title: '',
        nation: ''
      }
    }
  },
  created() {
    this.getSelectOptions([
      'goToSchoolSituation',
      'reportType',
      'disabilityCategory',
      'healthSituation',
      'actualGuardianshipSituation',
      'suspectDisability',
      'otherSpecialSituation',
      'seriousIllnessDiseases',
      'societyWelfareSituation'
    ])
  },
  methods: {
    submitData() {
      for (const key in this.collapseSwitch) {
        if (!this.collapseSwitch[key]) {
          this.submitForm[key] = null
        }
      }

      civilAffairsService.saveCivilAffairs(this.submitForm).then(res => {
        console.log(res)
      })
    },
    // switch 开关
    handleSwitchChange(value) {
      // console.log(value,flag);
      // debugger
      // if(value){
      //   this.activeNames.push(flag)
      // }else{
      //   this.activeNames.splice(flag.indexOf(this.activeNames),1)
      // }
    },
    // 根据dataCode从后台拿字典
    getSelectOptions(dataCodeArr) {
      // 从接口获取select中的options选项， 传入一个数组
      if (dataCodeArr) {
        dataCodeArr.forEach(type => {
          dataCodeService.getDataCodeByCodeCategory(type).then(ret => {
            this.$set(this.selectOptionsMap, type, ret)
          })
        })
      }
    }
  }
}
</script>
