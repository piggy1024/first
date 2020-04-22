<template>
  <div>
    <el-table :data="member_tableData" border style="width: 100%">
      <el-table-column fixed="left" label="操作" width="150">
        <template>
          <el-button type="primary" size="mini">修改</el-button>
          <el-button type="success" size="mini">保存</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="person.name" label="姓名"></el-table-column>
      <el-table-column label="与户主关系" prop="andHshdMasterRelate">
        <el-select placeholder="请选择">
          <el-option key="1" label="户主" value="1"></el-option>
          <el-option key="0" label="儿子" value="0"></el-option>
        </el-select>
      </el-table-column>
      <el-table-column prop="person.sex" label="性别"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="person.idCardNumber" label="身份证号码" width="150px"></el-table-column>
      <el-table-column prop="person.ethnic" label="民族"></el-table-column>
      <el-table-column prop="status" label="村民状态"></el-table-column>
    </el-table>
  </div>
</template>

<script>
// import dataCodeService from "@/api/DataCodeService.js";
import villagerService from '@/api/villager/VillagerService'
export default {
  props: {
    householdId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      member_tableData: [],
      andHshdMasterRelateOption: []
    }
  },
  created() {
    // this.getSelectOptionBuyType('andHshdMasterRelate')
  },
  mounted() {
    this.qureyData()
  },
  methods: {
    qureyData() {
      villagerService
        .listVillagerByAdvanced({
          householdId: this.householdId
        })
        .then(res => {
          // console.log(res);
          this.totalRecord = res.totalRecord
          this.member_tableData = res.dataList
        })
        .catch(err => {
          console.log(err)
        })
    }
    // getSelectOptionBuyType(type) {
    //   dataCodeService.getDataCodeByCodeCategory(type).then(res => {
    //     this[type + "Option"] = res;
    //   });
    // },
  }
}
</script>
