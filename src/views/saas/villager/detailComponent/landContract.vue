<template>
  <div>
    <el-table :data="soid_tableData" stripe border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="$router.push('/landAndHousing/landContractDetail/'+scope.row.landContractId)">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="contractorRepresentName" label="姓名" min-width="100"></el-table-column>
      <el-table-column prop="idCardNumber" label="身份证号码" width="170"></el-table-column>
      <el-table-column prop="villager.huoseholdMain" label="所在户" width="100"></el-table-column>
      <el-table-column prop="contractCode" label="合同代码" width="110"></el-table-column>
      <el-table-column prop="contractTotalPieceNumber" label="承包总块数" width="100"></el-table-column>
      <el-table-column prop="contractTotalArea" label="承包总面积" width="100"></el-table-column>
      <el-table-column prop="employerFullName" label="发包方全称" min-width="120"></el-table-column>
      <el-table-column label="承包开始时间" width="110">
        <template slot-scope="scope">
          <span>{{scope.row.contractStartTime |parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="承包结束时间" width="110">
        <template slot-scope="scope">
          <span>{{scope.row.contractEndTime |parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import landContractService from '@/api/landAndHousing/LandContractService'
export default {
  props: {
    personId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      soid_tableData: []
    }
  },
  created() {
    this.queryData()
  },
  methods: {
    queryData() {
      landContractService.listLandContract({
        // personId: 1
        personId: this.personId
      }).then(res => {
        this.soid_tableData = res.dataList
        // console.log(res)
      })
    }
  }
}
</script>
