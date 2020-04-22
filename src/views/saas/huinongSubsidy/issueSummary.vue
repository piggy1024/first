<template>
  <div class="app-container">
    <div class="right-container">
      <div class="filter-container">
        <p class="filter-title">查询条件</p>
        <div class="filter-box cus-d-fl">
          <div class="height-level-box cus-pa-tb-10 cus-bg-f5f7f9">
            <el-form :inline="true" label-width="90px" class="demo-form-inline clearfix">
              <el-form-item label="选择年度">
                <el-select v-model="listQuery.year" placeholder="请选择" style="width:380px">
                  <el-option
                    v-for="item in yearsOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="补贴类型">
                <el-select
                  v-model="listQuery.allwanceType"
                  placeholder="请选择"
                  style="width:250px"
                  multiple
                >
                  <el-option
                    v-for="item in allowanceTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="统计方式">
                <el-select v-model="listQuery.conutway" placeholder="请选择" style="width:250px">
                  <el-option
                    v-for="item in countWayOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
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
              <el-form-item label="是否公示">
                <el-select v-model="listQuery.sex" placeholder="请选择" style="width:250px">
                  <el-option label="是" value="yes"></el-option>
                  <el-option label="否" value="no"></el-option>
                </el-select>
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
        <div class="btn-box cus-mb-10">
          <el-button type="primary" icon="el-icon-upload2" @click="dialogTableVisible1 = true">公示</el-button>
          <el-button type="primary" icon="el-icon-upload2">导出</el-button>
          <el-button type="primary" icon="el-icon-printer">打印</el-button>
        </div>
        <el-dialog title="请选择公示日期" :visible.sync="dialogTableVisible1" width="500px" height="150">
          <el-form>
            <el-form-item label="公示日期">
              <el-date-picker
                v-model="listQuery.value1"
                type="date"
                placeholder="选择日期"
                style="width:120px"
              ></el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer text-center">
            <el-button type="primary" @click="dialogTableVisible1 = false">确 定</el-button>
            <el-button @click="dialogTableVisible1 = false">取 消</el-button>
          </div>
        </el-dialog>
        <el-table :data="tableData" border class="cus-mb-20">
          <el-table-column type="selection" width="55px"></el-table-column>
          <el-table-column prop="id" width="55px"></el-table-column>
          <el-table-column prop="town" label="乡镇名"></el-table-column>
          <el-table-column prop="vilName" label="村名"></el-table-column>
          <el-table-column prop="allowanceItem" label="补贴项目" width="100px"></el-table-column>
          <el-table-column prop="allowanceType" label="补贴类型" width="200px"></el-table-column>
          <el-table-column prop="noticeDate" label="通知日期" width="100px"></el-table-column>
          <el-table-column prop="releaseDate" label="发放日期" width="100px"></el-table-column>
          <el-table-column prop="allowanceStandard" label="补贴标准"></el-table-column>
          <el-table-column prop="allowanceCount" label="补贴数量"></el-table-column>
          <el-table-column prop="allowanceMoney" label="补贴金额(元)" width="120px"></el-table-column>
          <el-table-column prop="bankName" label="银行名称"></el-table-column>
          <el-table-column prop="announcementDate" label="公示日期" width="100px"></el-table-column>
          <el-table-column prop="isAnnounced" label="是否公示"></el-table-column>
          <el-table-column fixed="right" label="操作" width="90">
            <template>
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="dialogTableVisible1 = true"
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
    </div>
  </div>
</template>

<style scoped lang="scss">
.height-level-box /deep/ {
  .el-form-item .el-input,
  .el-form-item .el-date-editor {
    width: 100%;
  }

  .el-form-item .el-date-editor {
    max-width: 400px;
  }
}
</style>

<script>
export default {
  name: 'Allowance',
  data() {
    return {
      dialogTableVisible1: false,
      name: 'AB',
      tableData: [
        {
          id: 1,
          town: '演示乡',
          vilName: '演示村',
          allowanceItem: '生活性补贴',
          allowanceType: '农村最低生活保障资金',
          noticeDate: '2020-01-01',
          releaseDate: '2020-01-01',
          allowanceStandard: '100元/人',
          allowanceCount: '2',
          allowanceMoney: '200',
          bankName: '农商银行',
          announcementDate: '',
          isAnnounced: '否'
        }
      ],
      yearsOptions: [
        {
          label: '请选择',
          value: '0'
        }
      ],
      allwanceTypeOptions: [
        {
          label: '请选择',
          value: '0'
        }
      ],
      countWayOptions: [
        {
          label: '请选择',
          value: '0'
        },
        {
          label: '按村民统计',
          value: '1'
        },
        {
          label: '按补贴类型统计',
          value: '2'
        }
      ],
      tableKey: 0,
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        relation: undefined,
        idCard: undefined,
        sex: undefined,
        name: undefined,
        status: undefined,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      }
    }
  },
  created() {},
  methods: {}
}
</script>
n
