<template>
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl">
        <el-form :inline="true" class="cus-fl-1 cus-text-right">
          <el-form-item>
            <el-input
              v-model="filterForm.name"
              placeholder="普通模糊搜索：项目名称"
              suffix-icon="el-icon-search"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="btn-box">
          <el-button type="primary">搜索</el-button>
          <el-button
            type="text"
            :icon="isHeightLevel? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            @click="isHeightLevel = !isHeightLevel"
          >高级搜索</el-button>
        </div>
      </div>
      <el-collapse-transition>
        <div class="height-level-box cus-pa-tb-10" v-show="isHeightLevel">
          <el-form label-width="90px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="项目名称">
                  <el-input v-model="filterForm.name" placeholder="支持模糊搜索"></el-input>
                </el-form-item>
                <el-form-item label="是否存档">
                  <el-select v-model="filterForm.isSave" placeholder="请选择">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目类型">
                  <el-select
                    v-model="filterForm.projectType"
                    multiple
                    collapse-tags
                    placeholder="请选择"
                  >
                    <el-option label="亮化工程" value="1"></el-option>
                    <el-option label="村级道路" value="2"></el-option>
                    <el-option label="灌溉" value="3"></el-option>
                    <el-option label="渠道" value="4"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="施工时间">
                  <el-date-picker
                    v-model="filterForm.constructionTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="承包人">
                  <el-input v-model="filterForm.contractMan"></el-input>
                </el-form-item>
                <el-form-item label="扶贫项目号">
                  <el-input v-model="filterForm.projectNumber"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="cus-text-right cus-pr-15">
            <el-button type="primary">搜索</el-button>
            <el-button>清空</el-button>
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <div class="result-box">
      <div class="btn-box cus-mb-10">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="$router.push('/engineeringProject/addProjectDeclare')"
        >新增</el-button>
        <!-- <el-button type="primary" icon="el-icon-printer">打印</el-button> -->
        <!-- <el-button type="danger" icon="el-icon-delete" @click="pwdDialog.isShow = true">删除</el-button> -->
      </div>
      <el-table :data="tableData" border class="cus-mb-20">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="townshipName" label="乡镇名" min-width="150"></el-table-column>
        <el-table-column prop="villageName" label="村名" min-width="150"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" min-width="150"></el-table-column>
        <el-table-column prop="projectType" label="项目类型" width="100"></el-table-column>
        <el-table-column prop="buildType" label="建设方式" width="100"></el-table-column>
        <el-table-column prop="contractMan" label="承包人" width="100"></el-table-column>
        <el-table-column prop="budgetAmount" label="预算金额" width="100"></el-table-column>
        <el-table-column prop="startTime" label="开始施工日期" width="110"></el-table-column>
        <el-table-column prop="endime" label="结束施工日期" width="110"></el-table-column>
        <el-table-column prop="submitStatus" label="提交状态" width="100"></el-table-column>
        <!-- fixed="right" -->
        <el-table-column label="操作" fixed="right" width="220">
          <template>
            <el-button
              type="primary"
              size="mini"
              @click="$router.push('/engineeringProject/detailProjectDeclare')"
            >详情</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="$router.push('/engineeringProject/addProjectDeclare')"
            >修改</el-button>
            <el-button type="danger" size="mini" @click="pwdDialog.isShow = true">删除</el-button>
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
.height-level-box /deep/ {
  .el-form-item .el-input,
  .el-form-item .el-select,
  .el-form-item .el-date-editor {
    width: 100%;
  }
}
</style>

<script>
import pwdDialog from '@/components/pwdDialog'
export default {
  name: '',
  components: {
    pwdDialog
  },
  data() {
    return {
      isShowTree: false,
      isHeightLevel: false,
      tableData: [
        {
          townshipName: '演示乡',
          villageName: '演示村',
          projectName: 'XX光电建设项目',
          projectType: '亮化工程',
          buildType: '自建',
          contractMan: '王小虎',
          startTime: '2020-03-11',
          budgetAmount: '100',
          endime: '2020-04-15',
          submitStatus: '草稿'
        },
        {
          townshipName: '演示乡2',
          villageName: '演示村2',
          projectName: 'XX光电建设项目2',
          projectType: '村级道路',
          buildType: '承包',
          contractMan: '张三',
          startTime: '2020-03-15',
          budgetAmount: '100',
          endime: '2020-04-15',
          submitStatus: '已提交'
        }
      ],
      filterForm: {
        name: '',
        isSave: '',
        projectType: [],
        constructionTime: '',
        contractMan: '',
        projectNumber: ''
      },
      pwdDialog: {
        isShow: false
      }
    }
  },
  created() {},
  methods: {}
}
</script>
