<template>
  <div class="container">
    <div class="btn-box cus-mb-10">
      <el-button type="success">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-collapse v-model="activeNames">
        <el-form ref="form" label-width="120px" :rules="rules">
          <el-collapse-item title="补贴对象信息" name="1">
            <el-row :gutter="20">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="  补贴对象:" prop="allowanceObject">
                    <el-button
                      type="primary"
                      size="small"
                      style="width:200px"
                      @click="dialogTableVisible1 = true"
                    >
                      <span>请选择</span>
                      <i class="el-icon-arrow-right el-icon--right"></i>
                    </el-button>
                  </el-form-item>
                  <el-form-item label="  身份证号">
                    <el-input style="width:200px" disabled="true" value="系统反显"></el-input>
                  </el-form-item>
                  <el-form-item label="   与户主关系">
                    <el-input style="width:200px" disabled="true" value="系统反显"></el-input>
                  </el-form-item>
                  <el-form-item label="   村民状态">
                    <el-input style="width:200px" disabled="true" value="系统反显"></el-input>
                  </el-form-item>
                  <el-form-item label="   惠农补贴明白卡">
                    <el-input style="width:200px" disabled="true" value="系统反显 | 手动输入"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="  乡镇名">
                    <el-input style="width:200px" disabled="true" value="系统反显"></el-input>
                  </el-form-item>
                  <el-form-item label="  年龄">
                    <el-input style="width:200px" disabled="true" value="系统反显"></el-input>
                  </el-form-item>
                  <el-form-item label="   户籍地址">
                    <el-input style="width:200px" disabled="true" value="系统反显"></el-input>
                  </el-form-item>
                  <el-form-item label="   银行卡号">
                    <el-input style="width:200px" disabled="true" value="系统反显"></el-input>
                  </el-form-item>
                  <el-form-item label="   扶贫补贴明白折">
                    <el-input style="width:200px" disabled="true" value="系统反显 | 手动输入"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="  村名">
                    <el-input style="width:200px" disabled="true" value="系统反显"></el-input>
                  </el-form-item>
                  <el-form-item label="  所在户">
                    <el-input style="width:200px" disabled="true" value="系统反显"></el-input>
                  </el-form-item>
                  <el-form-item label="  电话号码">
                    <el-input style="width:200px" disabled="true" value="系统反显"></el-input>
                  </el-form-item>
                  <el-form-item label="  惠农补贴明白折">
                    <el-input style="width:200px" disabled="true" value="系统反显"></el-input>
                  </el-form-item>
                  <el-form-item label="  扶贫补贴明白卡">
                    <el-input style="width:200px" disabled="true" value="系统反显"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="补贴明细信息" name="2">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="村名姓名" prop="name">
                  <el-input style="width:200px" v-model="temp.name"></el-input>
                </el-form-item>
                <el-form-item label="补贴数量" prop="allowanceCount">
                  <el-input style="width:200px" v-model="temp.allowanceCount"></el-input>
                </el-form-item>
                <el-form-item label="银行名称" prop="bankName">
                  <el-input style="width:200px" v-model="temp.bankName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="补贴类型" prop="allowanceType">
                  <el-cascader
                    placeholder="请选择"
                    v-model="temp.relation"
                    style="width:200px"
                    :options="typeOptions"
                  ></el-cascader>
                </el-form-item>
                <el-form-item label="补贴金额(元)" prop="allowanceMoney">
                  <el-input style="width:200px" v-model="temp.idCard"></el-input>
                </el-form-item>
                <el-form-item label="   发放日期" prop="sendDate">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="补贴标准" prop="allowanceStandard">
                  <el-input style="width:200px" v-model="temp.idCard"></el-input>
                </el-form-item>
                <el-form-item label="发放账号" prop="sendAccount">
                  <el-input style="width:200px" v-model="temp.idCard"></el-input>
                </el-form-item>
                <el-form-item label="   通知日期" prop="noticeDate">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-dialog title="请选择村民" :visible.sync="dialogTableVisible1" width="900px">
            <el-row type="flex" justify="space-between" class="cus-mb-10">
              <el-col :span="10">
                <el-input placeholder="乡镇名/村名/村民姓名"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button style="width:100%" type="primary">搜索</el-button>
              </el-col>
            </el-row>
            <el-table :data="gridData1" border height="250px">
              <el-table-column fixed type="selection" width="55"></el-table-column>
              <el-table-column property="townName" label="乡镇名"></el-table-column>
              <el-table-column property="vilName" label="村名"></el-table-column>
              <el-table-column property="name" label="姓名"></el-table-column>
              <el-table-column property="idCard" label="身份证号" width="150"></el-table-column>
              <el-table-column property="age" label="年龄" width="90"></el-table-column>
              <el-table-column property="suozaizu" label="所在组"></el-table-column>
              <el-table-column property="zuozaihu" label="所在户"></el-table-column>
              <el-table-column property="relation" label="与户主关系" width="100"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer text-center">
              <el-button type="primary" @click="dialogTableVisible1 = false">确 定</el-button>
              <el-button @click="dialogTableVisible1 = false">取 消</el-button>
            </div>
          </el-dialog>
        </el-form>
      </el-collapse>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddGuide',
  data() {
    return {
      typeOptions: [
        {
          value: 'zhinan',
          label: '生活性补贴',
          children: [
            {
              value: 'shejiyuanze',
              label: '农村贫困家庭大学生助学金'
            },
            {
              value: 'daohang',
              label: '农村五保户补助资金'
            }
          ]
        },
        {
          value: 'zujian',
          label: '生产性补贴',
          children: [
            {
              value: 'basic',
              label: '农业支持保护补贴'
            },
            {
              value: 'form',
              label: "小麦'一喷三防'补助资金"
            },
            {
              value: 'data',
              label: '退耕还林粮改现补助资金'
            },
            {
              value: 'notice',
              label: '退耕还林种苗款'
            },
            {
              value: 'navigation',
              label: '退耕还林管理费'
            },
            {
              value: 'others',
              label: '设施农业现金补助'
            }
          ]
        },
        {
          value: 'otherAllowance',
          label: '其他补贴',
          children: [
            {
              value: 'axure',
              label: '廉价租房租赁补贴专项补助'
            },
            {
              value: 'sketch',
              label: '春节清真饮食习俗少数民族一次性补助'
            },
            {
              value: 'jiaohu',
              label: '生猪信息监测员补助'
            }
          ]
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
      },
      dialogTableVisible1: false,
      gridData1: [
        {
          townName: '演示镇A',
          vilName: '演示村',
          name: 'A',
          idCard: 'xxxxxxxxxxxxxxxx',
          age: 54,
          suozaizu: '1队',
          suozaihu: 'A',
          relation: '户主'
        },
        {
          townName: '演示镇A',
          vilName: '演示村',
          name: 'A',
          idCard: 'xxxxxxxxxxxxxxxx',
          age: 54,
          suozaizu: '1队',
          suozaihu: 'A',
          relation: '户主'
        },
        {
          townName: '演示镇A',
          vilName: '演示村',
          name: 'A',
          idCard: 'xxxxxxxxxxxxxxxx',
          age: 54,
          suozaizu: '1队',
          suozaihu: 'A',
          relation: '户主'
        }
      ],
      activeNames: ['1', '2'],
      rules: {
        allowanceStandard: [
          { required: true, message: '请输入11', trigger: 'blur' }
        ],
        noticeDate: [{ required: true, message: '请输入11', trigger: 'blur' }],
        allowanceType: [
          { required: true, message: '请输入11', trigger: 'blur' }
        ],
        allowanceMoney: [
          { required: true, message: '请输入11', trigger: 'blur' }
        ],
        sendDate: [{ required: true, message: '请输入11', trigger: 'blur' }],
        allowanceCount: [
          { required: true, message: '请输入11', trigger: 'blur' }
        ]
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
