<template>
  <div>
    <el-table :data="banli_tableData" border class="cus-mb-20">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column label="受理事项" prop="banlishixiang" width="200">
        <template slot-scope="scope">
          <router-link
            class="text-blue"
            to="/villageAffairsOpen/detailLedger"
          >{{scope.row.acceptThing}}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="thingType" label="事项类型" width="100"></el-table-column>
      <el-table-column label="办理事项图" width="100">
        <template slot-scope="scope">
          <img style="object-fit: contain;" :src="scope.row.acceptThingPicture" />
        </template>
      </el-table-column>
      <el-table-column label="受理时间" width="110">
        <template slot-scope="scope">{{scope.row.acceptDate | parseTime('{y}-{m}-{d}')}}</template>
      </el-table-column>
      <el-table-column prop="person.name" label="申请人"></el-table-column>
      <el-table-column prop="person.idCardNumber" label="申请人身份证" width="170"></el-table-column>
      <el-table-column prop="person.phoneNumber" label="申请人电话" width="110"></el-table-column>
      <el-table-column prop="villageCadre.villager.name" label="经办人" width="100"></el-table-column>
      <el-table-column prop="handleResult" label="办理结果" min-width="100"></el-table-column>
      <el-table-column label="办结或退回日期" width="120">
        <template slot-scope="scope">{{scope.row.settleDate | parseTime('{y}-{m}-{d}')}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import VillageAffairsService from '@/api/villageAffairsOpen/VillageAffairsService'
export default {
  props: {
    personId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      banli_tableData: []
    }
  },
  created() {
    this.queryData()
  },
  methods: {
    queryData() {
      VillageAffairsService.listVillageAffairs({
        personId: this.personId
      }).then(res => {
        console.log(res)
        this.banli_tableData = res.dataList
      })
    }
  }
}
</script>
