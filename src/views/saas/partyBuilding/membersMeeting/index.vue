<template>
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl">
        <el-form :inline="true" class="cus-fl-1 cus-text-right">
          <el-form-item>
            <span>会议日期</span>
            <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-form>
        <div class="btn-box">
          <el-button type="primary">搜索</el-button>
          <el-button type="primary">清空</el-button>
        </div>
      </div>
    </div>
    <div class="result-box">
      <div class="btn-box cus-mb-10">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="$router.push('/partyBuilding/membersMeeting/add')"
        >新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="pwdDialog.isShow = true">删除</el-button>
      </div>
      <el-table :data="tableData" border class="cus-mb-20">
        <el-table-column type="selection" width="55px"></el-table-column>
        <el-table-column prop="id" label="序号" width="55px"></el-table-column>
        <el-table-column label="会议主题" prop="title" width="250px">
          <span
            style="color: blue;text-decoration:underline"
            @click="$router.push('/generalInfo/xiangqing')"
          >探讨实现建设现代化农村</span>
        </el-table-column>
        <el-table-column prop="host" label="主持人"></el-table-column>
        <el-table-column prop="meetingDate" label="会议日期" width="120px"></el-table-column>
        <el-table-column prop="recorder" label="记录人"></el-table-column>
        <el-table-column prop="meetingPalce" label="会议地点" width="150px"></el-table-column>
        <el-table-column prop="meetingMember" label="与会人员"></el-table-column>
        <el-table-column prop="meetingType" label="会议类型"></el-table-column>
        <el-table-column prop="creater" label="创建人" width="80px"></el-table-column>
        <el-table-column prop="createDate" label="创建日期" width="120px"></el-table-column>
        <el-table-column prop="meetingContent" label="会议内容" width="120px"></el-table-column>
        <el-table-column fixed="right" label="操作" width="85">
          <template>
            <el-button
              type="primary"
              size="mini"
              @click="$router.push('/partyBuilding/membersMeeting/add')"
              icon="el-icon-edit"
            >修改</el-button>
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
    <pwd-dialog :pwd-dialog="pwdDialog"></pwd-dialog>
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

  .height-level-box {
    /deep/ .el-form-item {
      width: calc(100% / 3);
      box-sizing: border-box;
      margin-right: 0;
      padding-right: 15px;
      float: left;
      display: flex;

      .el-form-item__label {
        text-align: left;
      }

      .el-form-item__content {
        flex: 1;
      }
    }
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
import pwdDialog from '@/components/pwdDialog'
export default {
  components: {
    pwdDialog
  },
  name: 'Guide',
  data() {
    return {
      pwdDialog: {
        isShow: false
      },
      isHeightLevel: false,
      tableData: [
        {
          id: 1,
          title: '农业支持保护补贴发放流程',
          host: '李善保',
          meetingDate: 'YYYY-MM-DD',
          recorder: '方永胜',
          meetingPlace: '村委办公室',
          meetingMember: '李善保等',
          meetingType: '党员大会',
          creater: '系统管理员',
          createDate: 'YYYY-MM-DD',
          meetingContent: '略'
        },
        {
          id: 2
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
