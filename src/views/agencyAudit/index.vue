<template>
  <div class="app-container">
    <div class="filter-container">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl">
        <div class="height-level-box cus-pa-tb-10 cus-bg-f5f7f9">
          <el-form :inline="true" label-width="90px" class="demo-form-inline clearfix">
            <el-form-item label="事项标题">
              <el-input v-model="listQuery.name" placeholder="支持模糊搜索" style="width:360px"></el-input>
            </el-form-item>
            <el-form-item label="审批状态">
              <el-select v-model="listQuery.sex" placeholder="请选择" style="width:250px">
                <el-option label="待审批" value="daishenpi"></el-option>
                <el-option label="已通过" value="acccept"></el-option>
                <el-option label="已驳回" value="refused"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="业务模块">
              <el-select v-model="listQuery.sex" placeholder="请选择" style="width:250px">
                <el-option label="..." value="man"></el-option>
                <el-option label="..." value="women"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发放日期">
              <el-date-picker
                v-model="listQuery.sex"
                type="daterange"
                range-separator="至 "
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                unlink-panels
              ></el-date-picker>
            </el-form-item>
          </el-form>
          <div class="cus-text-right cus-pr-15">
            <el-button type="primary">搜索</el-button>
            <el-button>清空</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="result-box">
      <el-dialog title="请输入审批意见" :visible.sync="dialogTableVisible" width="550px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px">
          <el-row>
            <el-form-item label="审批意见:" prop="approvalOpinion">
              <el-input
                type="textarea"
                v-model="ruleForm.approvalOpinion"
                style="width:400px"
                placeholder="限制1000字"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="审批结果:" prop="result">
              <el-radio v-model="radio" label="1">通过</el-radio>
              <el-radio v-model="radio" label="2">驳回</el-radio>
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer text-center">
          <el-button type="success" @click="dialogTableVisible = false">保存</el-button>
          <el-button type="primary" @click="dialogTableVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <el-table :data="tableData" border class="cus-mb-20">
        <el-table-column type="selection" width="55px"></el-table-column>
        <el-table-column prop="id" width="55px"></el-table-column>
        <el-table-column label="待审批事项标题" prop="title" width="200px">
          <span
            style="color: blue;text-decoration:underline"
            @click="$router.push('/villages/detail')"
          >{{ title }}</span>
        </el-table-column>
        <el-table-column prop="yewuModule" label="业务模块"></el-table-column>
        <el-table-column prop="cunzu" label="村组"></el-table-column>
        <el-table-column prop="submitPerson" label="提交人"></el-table-column>
        <el-table-column prop="submitDate" label="提交日期" width="160px"></el-table-column>
        <el-table-column prop="shenpiPerson" label="审批人"></el-table-column>
        <el-table-column prop="shenpiTime" label="审批时间" width="160px"></el-table-column>
        <el-table-column prop="shenpiStatus" label="审批状态"></el-table-column>
        <el-table-column fixed="right" label="操作" width="280">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini">查看事项详情</el-button>
            <el-button
              type="primary"
              icon="el-icon-printer"
              size="mini"
              @click="dialogTableVisible = true"
            >签署审批意见</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="cus-text-right"
        :current-page="1"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
        background
      ></el-pagination>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filter-container {
  border-radius: 3px;
  padding: 0px 15px 10px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .filter-title {
    text-align: left;
    line-height: 40px;
    margin: 0;
    color: #666;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
    font-size: 14px;
  }
}

.result-box {
  /* background-color: #f5f7f9; */
  /* border-radius: 3px; */
  /* padding: 10px 15px; */
  /* box-shadow: 0 1px 3px 0 rgba(0,0,0,0.12), 0 0 3px 0 rgba(0,0,0,0.04); */
  /deep/ .btn-box {
    margin-bottom: 10px;
  }
}
</style>

<script>
export default {
  name: 'Diasbility',
  data() {
    return {
      radio: '1',
      ruleForm: {
        approvalOpinion: ''
      },
      rules: {
        result: [{ required: true, message: '请选择', trigger: 'change' }],
        approvalOpinion: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      dialogTableVisible: false,
      title: '村民照片上传',
      tableData: [
        {
          id: 1,
          yewuModule: '村民管理',
          cunzu: '演示村',
          submitPerson: '张三',
          submitDate: '2020-01-01 09:00:00',
          shenpiPerson: '王xx)',
          shenpiTime: '2020-01-01 09:00:00',
          shenpiStatus: '已通过'
        },
        {
          id: 2,
          yewuModule: '村民管理',
          cunzu: '演示村',
          submitPerson: '张三',
          submitDate: '2020-01-01 09:00:00',
          shenpiPerson: '王xx)',
          shenpiTime: '2020-01-01 09:00:00',
          shenpiStatus: '已通过'
        }
      ],
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined,
        title: undefined,
        thingType: undefined
      },
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        name: '',
        relation: '',
        sex: '',
        age: '',
        idCard: '',
        address: '',
        phone: '',
        nation: ''
      }
    }
  },
  created() {},
  methods: {}
}
</script>
