<template>
  <!-- 补贴公示照片 -->
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl cus-jc-end">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="公示类型">
            <el-select v-model="filterForm.publicType" placeholder="请选择">
              <el-option label="生活性补贴" value="1"></el-option>
              <el-option label="生产性补贴" value="2"></el-option>
              <el-option label="其他补贴" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="btn-box">
          <el-button type="primary">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="result-box">
      <div class="btn-box cus-mb-10">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="$router.push('/huinongSubsidy/addSubsidyPubliPic')"
        >新增</el-button>
        <el-button type="primary" icon="el-icon-printer">打印</el-button>
        <!-- <el-button type="primary" icon="el-icon-upload2">导出</el-button> -->
        <el-button type="danger" icon="el-icon-delete" @click="pwdDialog.isShow = true">删除</el-button>
      </div>
      <el-table :data="tableData" border class="cus-mb-20">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="temp1" label="村名" min-width="120"></el-table-column>
        <el-table-column prop="temp2" label="补贴类型" width="100"></el-table-column>
        <el-table-column prop="temp3" label="公示时间" width="100"></el-table-column>
        <el-table-column prop="temp4" label="补贴公示近图" width="120">
          <template slot-scope="scope">
            <el-image :src="scope.row.temp4" fit="contain">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="temp5" label="补贴公示远图" width="120">
          <template slot-scope="scope">
            <el-image :src="scope.row.temp4" fit="contain">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="temp6" label="补贴到户1" width="120">
          <template slot-scope="scope">
            <el-image :src="scope.row.temp4" fit="contain">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="temp7" label="补贴到户2" width="120">
          <template slot-scope="scope">
            <el-image :src="scope.row.temp4" fit="contain">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="temp8" label="补贴到户3" width="120">
          <template slot-scope="scope">
            <el-image :src="scope.row.temp4" fit="contain">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="temp9" label="内容" width="120"></el-table-column>
        <!-- fixed="right" -->
        <el-table-column label="操作" fixed="right" width="150">
          <template>
            <el-button
              type="primary"
              size="mini"
              @click="$router.push('/huinongSubsidy/addSubsidyPubliPic')"
            >编辑</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="$router.push('/huinongSubsidy/addSubsidyPubliPic')"
            >详情</el-button>
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
  .el-form-item .el-date-editor {
    width: 100%;
  }
}
</style>

<script>
import pwdDialog from '@/components/pwdDialog'
export default {
  components: {
    pwdDialog
  },
  data() {
    return {
      isHeightLevel: false,
      tableData: [
        {
          temp1: '演示村',
          temp2: '生活性补贴',
          temp3: '2020-03-14',
          temp4: '',
          temp5: '',
          temp6: '',
          temp7: '',
          temp8: '',
          temp9: 'xxx'
        },
        {
          temp1: '演示村2',
          temp2: '其他补贴',
          temp3: '2020-03-16',
          temp4: '',
          temp5: '',
          temp6: '',
          temp7: '',
          temp8: '',
          temp9: 'xxx'
        }
      ],
      filterForm: {
        publicType: ''
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
