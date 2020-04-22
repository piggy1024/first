<template>
  <div class="app-container">
    <div class="header cus-mb-20">
      <el-row type="flex" align="middle" :gutter="20">
        <el-col :span="6" class="text-center">
          <h4 class="project-title">xx光电建设项目</h4>
          <p class="cus-text-666 desc">xx项目</p>
          <el-tag size="medium">结算阶段</el-tag>
        </el-col>
        <el-col :span="6">
          <div class="item cus-mb-10">
            <span class="title">项目编号</span>
            <span class="content">PE42115162151</span>
          </div>
          <div class="item">
            <span class="title">预算金额</span>
            <span class="content">7000.00万</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item cus-mb-10">
            <span class="title">建设方式</span>
            <span class="content">承包</span>
          </div>
          <div class="item">
            <span class="title">决算金额</span>
            <span class="content">7000.00万</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item cus-mb-10">
            <span class="title">承包人</span>
            <span class="content">张三</span>
          </div>
          <div class="item">
            <span class="title">累计支付金额</span>
            <span class="content">7000.00万</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-tabs v-model="tabAtiveName" @tab-click="handleTabClick">
      <el-tab-pane label="项目基本信息" name="first">
        <el-collapse v-model="firstActiveNames">
          <!-- label-position="left" -->
          <el-form ref="form" label-width="110px" :rules="rules">
            <el-collapse-item title="基本信息" name="1">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="项目名称" prop="name">
                    <el-input value="系统反显" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="坐落地点" prop="name">
                    <el-input value="系统反显" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="承包人" prop="name">
                    <el-input value="系统反显" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="开始施工日期" prop="name">
                    <el-input value="系统反显" readonly></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="建设方式" prop="name">
                    <el-input value="系统反显" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="所在乡镇" prop="name">
                    <el-input value="系统反显" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="扶贫项目号" prop>
                    <el-input value="系统反显" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="结束施工日期" prop="name">
                    <el-input value="系统反显" readonly></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="项目类型" prop="name">
                    <el-input value="系统反显" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="村名" prop="name">
                    <el-input value="系统反显" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="立项审批日期" prop="name">
                    <el-input value="系统反显" readonly></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="项目基本概况" prop="name">
                <el-input type="textarea" value="系统反显" readonly></el-input>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item name="2">
              <template slot="title">
                <span>决算信息</span>
                <p class="total-money cus-text-red">决算金额合计：1000 元</p>
              </template>
              <el-table :data="totalAccountData" border>
                <el-table-column prop="temp1" label="决算构成"></el-table-column>
                <el-table-column prop="temp2" label="类型"></el-table-column>
                <el-table-column prop="temp3" label="基础费用(元)"></el-table-column>
                <el-table-column prop="temp4" label="主体费用(元)"></el-table-column>
                <el-table-column prop="temp5" label="附属费用(元)"></el-table-column>
                <el-table-column prop="temp6" label="合计"></el-table-column>
                <el-table-column prop="temp7" label="备注"></el-table-column>
              </el-table>
            </el-collapse-item>
            <el-collapse-item title="资金来源" name="3">
              <el-table :data="fundsSourceData" border>
                <el-table-column prop="temp" label="资金来源类型"></el-table-column>
                <el-table-column prop="temp" label="金额(元)"></el-table-column>
                <el-table-column prop="temp" label="合计"></el-table-column>
                <el-table-column prop="temp" label="备注"></el-table-column>
              </el-table>
            </el-collapse-item>
            <el-collapse-item name="4">
              <template slot="title">
                <span>结算信息</span>
                <p class="total-money cus-text-red">累计结算合计：1000 元</p>
              </template>
              <el-table :data="fundsSourceData" border>
                <el-table-column prop="temp" label="报账信息"></el-table-column>
                <el-table-column prop="temp" label="转账金额"></el-table-column>
                <el-table-column prop="temp" label="预付款金额"></el-table-column>
                <el-table-column prop="temp" label="领款人"></el-table-column>
                <el-table-column prop="temp" label="备注"></el-table-column>
              </el-table>
            </el-collapse-item>
          </el-form>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="项目文档资料" name="second">
        <el-collapse v-model="secondActiveNames">
          <el-form ref="form" label-width="110px" :rules="rules">
            <el-collapse-item title="预算资料" name="1">
              <el-table :data="budgetData" border>
                <el-table-column type="index" label="序号" width="55"></el-table-column>
                <el-table-column prop="temp1" label="需上传文档资料名称" min-width="160"></el-table-column>
                <el-table-column prop="temp2" label="重要性"></el-table-column>
                <el-table-column prop="temp3" label="附件名称">
                  <template slot-scope="scope">
                    <a href="" class="text-blue" >{{scope.row.temp3}}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="temp4" label="文件大小"></el-table-column>
                <el-table-column prop="temp5" label="上传用户"></el-table-column>
                <el-table-column prop="temp6" label="上传时间"></el-table-column>
                <el-table-column label="操作" width="70">
                  <template>
                    <el-button type="primary" size="mini" icon="el-icon-download"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
            <el-collapse-item title="决算资料" name="2">
              <el-table :data="budgetData" border>
                <el-table-column type="index" label="序号" width="55"></el-table-column>
                <el-table-column prop="temp1" label="需上传文档资料名称" min-width="160"></el-table-column>
                <el-table-column prop="temp2" label="重要性"></el-table-column>
                <el-table-column prop="temp3" label="附件名称">
                  <template slot-scope="scope">
                    <a href="" class="text-blue" >{{scope.row.temp3}}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="temp4" label="文件大小"></el-table-column>
                <el-table-column prop="temp5" label="上传用户"></el-table-column>
                <el-table-column prop="temp6" label="上传时间"></el-table-column>
                <el-table-column label="操作" width="70">
                  <template>
                    <el-button type="primary" size="mini" icon="el-icon-download"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
            <el-collapse-item title="结算资料" name="3">
              <el-table :data="budgetData" border>
                <el-table-column type="index" label="序号" width="55"></el-table-column>
                <el-table-column prop="temp1" label="需上传文档资料名称" min-width="160"></el-table-column>
                <el-table-column prop="temp2" label="重要性"></el-table-column>
                <el-table-column prop="temp3" label="附件名称">
                  <template slot-scope="scope">
                    <a href="" class="text-blue" >{{scope.row.temp3}}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="temp4" label="文件大小"></el-table-column>
                <el-table-column prop="temp5" label="上传用户"></el-table-column>
                <el-table-column prop="temp6" label="上传时间"></el-table-column>
                <el-table-column label="操作" width="70">
                  <template>
                    <el-button type="primary" size="mini" icon="el-icon-download"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
          </el-form>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="流程信息" name="third"></el-tab-pane>
      <el-tab-pane label="审批信息" name="fourth"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  .header {
    padding: 10px 5px;
    background-color: #f3f5f7;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    .project-title {
      font-size: 18px;
    }
    h4,
    p {
      margin: 0;
    }
    .desc {
      margin: 5px 0;
      font-size: 12px;
    }
    .item {
      display: flex;
      font-size: 14px;
      > .title {
        width: 100px;
        text-align: right;
        margin-right: 15px;
        color: #333;
      }
      > .content {
        flex: 1;
        color: #666;
      }
    }
  }
  /deep/ .el-collapse-item {
    position: relative;
    .total-money {
      position: absolute;
      right: 50px;
      top: 0px;
      font-weight: normal;
      margin: 0;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      tabAtiveName: 'second',
      firstActiveNames: ['1', '2', '3', '4'],
      secondActiveNames: ['1', '2', '3'],
      totalAccountData: [
        {
          temp1: '材料',
          temp2: '土石',
          temp3: '100',
          temp4: '60',
          temp5: '40',
          temp6: '系统反显',
          temp7: 'xxx'
        },
        {
          temp1: '工资',
          temp2: '运输',
          temp3: '100',
          temp4: '60',
          temp5: '40',
          temp6: '系统反显',
          temp7: 'xxx'
        }
      ],
      fundsSourceData: [
        {
          temp: '系统反显'
        },
        {
          temp: '系统反显'
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
      rules: {
        name: [{ required: true, message: '请输入11', trigger: 'change' }]
      }
    }
  },
  created() {},
  methods: {
    handleTabClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
