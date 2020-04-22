<template>
  <div class="app-container">
    <div class="btn-box cus-mb-10">
      <el-button type="success">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-collapse v-model="activeNames">
        <!-- label-position="left" -->
        <el-form ref="form" label-width="110px" :rules="rules" class="cus-pr-15">
          <el-collapse-item title="项目基本信息" name="1">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="项目名称" prop="temp">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="坐落地点" prop="temp">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="承包人" prop="temp">
                  <el-input placeholder="若建设方式为承包，则必输"></el-input>
                </el-form-item>
                <el-form-item label="开始施工日期" prop="temp">
                  <el-date-picker v-model="formData.startTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="建设方式" prop="temp">
                  <el-select v-model="formData.buildType" placeholder="请选择">
                    <el-option value="0" label="承包"></el-option>
                    <el-option value="1" label="自建"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所在乡镇" prop="temp">
                  <el-button type="primary" @click="dialogTownshipInfo = true">点击选择</el-button>
                </el-form-item>
                <el-form-item label="扶贫项目号">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="结束施工日期" prop="temp">
                  <el-date-picker v-model="formData.endTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目类型" prop="temp">
                  <el-select v-model="formData.projectType" placeholder="请选择">
                    <el-option
                      v-for="item in projectTypeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="村名" prop="temp">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="立项审批日期" prop="temp">
                  <el-date-picker v-model="formData.approvalTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="项目基本概况" prop="temp">
              <el-input type="textarea"></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="预算信息" name="2">
            <template slot="title">
              <span>预算信息</span>
              <p class="total-money cus-text-red">预算合计：1000 元</p>
            </template>
            <div class="cus-mb-10">
              <el-button
                type="primary"
                icon="el-icon-circle-plus-outline"
                @click="dialogAddBudget = true"
              >新增</el-button>
            </div>
            <el-table :data="budgetInfo" border>
              <el-table-column prop="temp1" label="预算构成" min-width="160"></el-table-column>
              <el-table-column prop="temp2" label="类型"></el-table-column>
              <el-table-column prop="temp3" label="基础费用(元)"></el-table-column>
              <el-table-column prop="temp4" label="主体费用(元)"></el-table-column>
              <el-table-column prop="temp5" label="附庸费用(元)"></el-table-column>
              <el-table-column prop="temp6" label="合计"></el-table-column>
              <el-table-column prop="temp7" label="备注"></el-table-column>
              <el-table-column label="操作" width="150">
                <template>
                  <el-button type="primary" size="mini">修改</el-button>
                  <el-button type="danger" size="mini">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item title="资金来源" name="3">
            <div class="cus-mb-10">
              <el-button type="primary" icon="el-icon-circle-plus-outline">新增一行</el-button>
            </div>
            <el-table :data="fundSoureData" border>
              <el-table-column prop="temp1" label="资金来源类型">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.temp1" placeholder="请选择">
                    <el-option label="民政资金" value="1"></el-option>
                    <el-option label="财政资金" value="2"></el-option>
                    <el-option label="统筹资金" value="3"></el-option>
                    <el-option label="专项资金" value="4"></el-option>
                    <el-option label="村自筹资金" value="5"></el-option>
                    <el-option label="其他" value="6"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="temp2" label="金额(元)">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.temp2"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="temp3" label="备注">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.temp3"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="temp4" label="合计">
                <template slot-scope="scope">
                  <el-input readonly v-model="scope.row.temp4"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150">
                <template>
                  <el-button type="primary" size="mini">修改</el-button>
                  <el-button type="danger" size="mini">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item title="预算资料" name="4">
            <div class="cus-mb-10">
              <el-button
                type="primary"
                icon="el-icon-circle-plus-outline"
                @click="dialogAddDocData = true"
              >新增</el-button>
            </div>
            <el-table :data="budgetData" border>
              <el-table-column type="index" label="序号" width="55"></el-table-column>
              <el-table-column prop="temp1" label="需上传文档资料名称" min-width="160"></el-table-column>
              <el-table-column prop="temp2" label="重要性"></el-table-column>
              <el-table-column prop="temp3" label="附件名称">
                <template slot-scope="scope">
                  <a href class="text-blue">{{scope.row.temp3}}</a>
                </template>
              </el-table-column>
              <el-table-column prop="temp4" label="文件大小"></el-table-column>
              <el-table-column prop="temp5" label="上传用户"></el-table-column>
              <el-table-column prop="temp6" label="上传时间"></el-table-column>
              <el-table-column label="操作" width="190">
                <template>
                  <el-button type="success" size="mini" icon="el-icon-upload2"></el-button>
                  <el-button type="primary" size="mini" icon="el-icon-download"></el-button>
                  <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-form>
      </el-collapse>
      <el-dialog title="请选择乡镇信息" :visible.sync="dialogTownshipInfo" :show-close="false" width="40%">
        <el-row type="flex" justify="space-between" class="cus-mb-10">
          <!-- <el-col :span="5">
           村民姓名/身份证号
          </el-col>-->
          <el-col :span="18">
            <el-input placeholder="乡镇名/村名"></el-input>
          </el-col>
          <el-col :span="5" class="cus-text-right">
            <el-button type="primary">搜索</el-button>
          </el-col>
        </el-row>
        <el-table
          ref="singleTable"
          border
          :data="townshipInfoData"
          highlight-current-row
          @current-change="handleCurrentChange"
          max-height="200"
        >
          <!-- <el-table-column width="40">
            <template slot-scope="scope">
              <el-radio v-model="dialogRadio" :label="scope.row.name">
                <span v-show="false">11</span>
              </el-radio>
            </template>
          </el-table-column>-->
          <el-table-column property="townshipName" label="乡镇名"></el-table-column>
          <el-table-column property="villageName" label="村名"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer text-center">
          <el-button type="primary" @click="dialogTownshipInfo = false">确 定</el-button>
          <el-button @click="dialogTownshipInfo = false">取 消</el-button>
        </div>
      </el-dialog>
      <el-dialog title="新增预算" :visible.sync="dialogAddBudget" :show-close="false" width="400px">
        <el-form :model="budgetDialogForm" label-width="100px" class="cus-pr-15" :rules="rules">
          <el-form-item label="预算构成" prop="temp">
            <el-select v-model="budgetDialogForm.budgetConsitute" placeholder="请选择">
              <el-option
                v-for="item in budgetConsituteOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型" prop="temp">
            <el-select v-model="budgetDialogForm.type" placeholder="根据上面构成部分显示选项内容">
              <el-option label="根据上面构成部分显示选项内容" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="基础费用(元)" prop>
            <el-input placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="主体费用(元)" prop>
            <el-input placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="附属费用(元)" prop>
            <el-input placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer text-center">
          <el-button type="primary" @click="dialogAddBudget = false">确 定</el-button>
          <el-button @click="dialogAddBudget = false">取 消</el-button>
        </div>
      </el-dialog>
      <el-dialog title="新增文档资料" :visible.sync="dialogAddDocData" :show-close="false" width="400px">
        <el-form :model="docDataForm" label-width="100px" class="cus-pr-15" :rules="rules">
          <el-form-item label="文档名称" prop="temp">
            <el-input placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="重要性" prop="temp">
            <el-select v-model="docDataForm.importance" placeholder="请选择">
              <el-option label="必须" value="1"></el-option>
              <el-option label="可选" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="附件名称" prop>
            <el-upload>
              <el-button type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer text-center">
          <el-button type="primary" @click="dialogAddDocData = false">确 定</el-button>
          <el-button @click="dialogAddDocData = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-box {
  /deep/ .el-collapse {
    .el-collapse-item__content {
      .el-form-item .el-input,
      .el-form-item .el-date-editor.el-input,
      .el-form-item .el-select,
      .el-form-item .el-button {
        width: 100%;
      }
      .el-form-item .el-upload {
        display: block;
      }
    }
    .el-collapse-item {
      position: relative;
      .total-money {
        position: absolute;
        right: 50px;
        top: 0px;
        font-weight: normal;
        margin: 0;
        font-size: 12px;
      }
    }
  }
}
/deep/ .el-dialog {
  .el-form-item .el-input,
  .el-form-item .el-date-editor,
  .el-form-item .el-select,
  .el-form-item .el-button {
    width: 100%;
  }
  .el-form-item .el-upload {
    display: block;
  }
}
</style>

<script>
export default {
  data() {
    return {
      activeNames: ['1', '2', '3', '4'],
      formData: {
        startTime: '',
        endTime: '',
        buildType: '',
        projectType: '',
        approvalTime: '',
        fundSoureType: ''
      },
      budgetInfo: [
        {
          temp1: '材料',
          temp2: '土石',
          temp3: '100',
          temp4: '60',
          temp5: '40',
          temp6: '100',
          temp7: 'xxx'
        },
        {
          temp1: '工资',
          temp2: '运输',
          temp3: '100',
          temp4: '60',
          temp5: '40',
          temp6: '100',
          temp7: 'xxx'
        }
      ],
      budgetData: [
        {
          temp1: '村民代表大会会议记录',
          temp2: '必须',
          temp3: '文档1.doc',
          temp4: '100k',
          temp5: '测试用户',
          temp6: '2020-03-11'
        },
        {
          temp1: '村民代表大会会议记录2',
          temp2: '必须',
          temp3: '文档2.doc',
          temp4: '100k',
          temp5: '测试用户2',
          temp6: '2020-03-11'
        }
      ],
      fundSoureData: [
        {
          temp1: '1',
          temp2: '300',
          temp3: 'xxx',
          temp4: '系统反显'
        }
      ],
      projectTypeOption: [
        {
          label: '灌溉',
          value: '1'
        },
        {
          label: '村级道路',
          value: '2'
        },
        {
          label: '幸福园',
          value: '3'
        },
        {
          label: '亮化工程',
          value: '4'
        },
        {
          label: '电力',
          value: '5'
        },
        {
          label: '沟渠',
          value: '6'
        },
        {
          label: '村级绿化',
          value: '7'
        },
        {
          label: '平台建设',
          value: '8'
        },
        {
          label: '产业结构',
          value: '9'
        }
      ],
      rules: {
        temp: [{ required: true, message: '请输入11', trigger: 'blur' }]
      },
      dialogTownshipInfo: false,
      townshipInfoData: [
        {
          townshipName: '演示乡',
          villageName: '演示村'
        },
        {
          townshipName: '演示乡2',
          villageName: '演示村2'
        }
      ],
      dialogAddBudget: false,
      budgetDialogForm: {
        budgetConsitute: '',
        type: ''
      },
      budgetConsituteOption: [
        {
          label: '材料',
          value: '0'
        },
        {
          label: '工资',
          value: '1'
        },
        {
          label: '其他',
          value: '2'
        },
        {
          label: '税金',
          value: '3'
        }
      ],
      dialogAddDocData: false,
      docDataForm: {
        importance: ''
      }
    }
  },
  created() {},
  methods: {}
}
</script>
