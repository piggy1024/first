<template>
  <div class="app-container">
    <div class="right-container">
      <div class="filter-container cus-bg-fa">
        <p class="filter-title">查询条件</p>
        <div class="filter-box cus-d-fl">
          <el-form :inline="true" class="cus-fl-1 cus-text-right">
            <el-form-item>
              <el-input
                v-model="advanceQueryParams.name"
                placeholder="普通模糊搜索:村民姓名"
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
            <el-form :inline="true" label-width="100px" class="demo-form-inline clearfix">
              <el-form-item label="村民姓名">
                <el-input v-model="advanceQueryParams.name" placeholder="支持模糊搜索" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="残疾等级">
                <el-select v-model="advanceQueryParams.sex" placeholder="请选择">
                  <el-option label="男" value="man"></el-option>
                  <el-option label="女" value="women"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="残疾分类">
                <el-select v-model="advanceQueryParams.sex" placeholder="请选择">
                  <el-option label="重度残疾人" value="man"></el-option>
                  <el-option label="困难残疾人" value="women"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="身份证号">
                <el-input v-model="advanceQueryParams.idNumber" placeholder="支持模糊搜索" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="财政代码">
                <el-input v-model="advanceQueryParams.financeCode" placeholder="支持模糊搜索" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="是否取消">
                <el-select v-model="advanceQueryParams.statu" placeholder="请选择">
                  <el-option label="在家" value="shanghai"></el-option>
                  <el-option label="外出务工" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="补贴发放年份">
                <el-select v-model="advanceQueryParams.isHost" placeholder="请选择">
                  <el-option label="是" value="shanghai"></el-option>
                  <el-option label="否" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="补贴发放月份">
                <el-select v-model="advanceQueryParams.isCollect" placeholder="请选择">
                  <el-option label="是" value="shanghai"></el-option>
                  <el-option label="否" value="beijing"></el-option>
                </el-select>
              </el-form-item>
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
          <el-button type="primary" icon="el-icon-printer">打印</el-button>
          <el-button type="primary" icon="el-icon-upload2">导出</el-button>
        </div>
        <el-table :data="tableData" border class="cus-mb-20">
          <el-table-column type="selection" width="55px"></el-table-column>
          <el-table-column prop="id" width="55px"></el-table-column>
          <el-table-column label="姓名(享受人员)" width="150px">
            <span
              style="color: blue;text-decoration:underline"
              @click="$router.push('/villages/detail')"
            >{{ name }}</span>
          </el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="nation" label="民族"></el-table-column>
          <el-table-column prop="idCard" label="身份证号/出生年月" width="150px"></el-table-column>
          <el-table-column prop="allowanceMoney" label="补贴发放金额" width="120px"></el-table-column>
          <el-table-column prop="sendYear" label="补贴发放年" width="100px"></el-table-column>
          <el-table-column prop="sendMonth" label="补贴发放月" width="100px"></el-table-column>
          <el-table-column prop="allowanceType" label="补贴类型"></el-table-column>
          <el-table-column prop="financeCode" label="财政代码"></el-table-column>
          <el-table-column prop="cardName" label="一卡通户名" width="100px"></el-table-column>
          <el-table-column prop="cardIdCard" label="一卡通户名身份证" width="150px"></el-table-column>
          <el-table-column prop="cardAccount" label="一卡通账号" width="100px"></el-table-column>
          <el-table-column prop="changeMoney" label="异动金额"></el-table-column>
          <el-table-column prop="startTime" label="开始时间" width="100px"></el-table-column>
          <el-table-column prop="cancelTime" label="取消时间" width="100px"></el-table-column>
          <el-table-column prop="address" label="家庭住址" width="120px"></el-table-column>
          <el-table-column prop="phone" label="联系方式" width="120px"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
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
.filter-container {
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
</style>

<script>
export default {
  name: 'Allowance',
  data() {
    return {
      isHeightLevel: false,
      name: 'AB',
      tableData: [
        {
          id: 1,
          name: '',
          sex: '',
          nation: '',
          idCard: 4444444444444444,
          allowanceMoney: '',
          sendYear: '',
          sendMonth: '',
          allowanceType: '',
          financeCode: '',
          cardName: '',
          cardIdCard: '',
          cardAccount: '',
          changeMoney: '',
          startTime: '2019-12-19',
          cancelTime: '2020-03-05',
          address: '',
          phone: '',
          remark: ''
        }
      ],
      tableKey: 0,
      list: null,
      total: 0,
      advanceQueryParams: {
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
      },
      textMap: {
        update: '编辑',
        create: '创建'
      }
    }
  },
  created() {},
  methods: {}
}
</script>
