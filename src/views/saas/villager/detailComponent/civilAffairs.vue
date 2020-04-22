<template>
  <div>
    <el-table :data="minzheng_tableData" style="width: 100%" border>
      <el-table-column prop="id" width="55"></el-table-column>
      <el-table-column prop="type" label="补贴类型" width="200"></el-table-column>
      <el-table-column prop="biaozhun" label="补贴标准"></el-table-column>
      <el-table-column prop="account" label="补贴数量"></el-table-column>
      <el-table-column prop="money" label="补贴金额(元)"></el-table-column>
      <el-table-column prop="date" label="发放日期" width="120"></el-table-column>
      <el-table-column prop="cardNumber" label="银行卡账号" width="150"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    personId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      minzheng_tableData: []
    }
  }
}
</script>
