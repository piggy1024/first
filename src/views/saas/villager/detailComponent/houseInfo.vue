<template>
  <div>
    <el-table :data="house_tableData" stripe border style="width: 100%">
      <el-table-column type="index" width="55"></el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="$router.push('/landAndHousing/houseDetail/'+scope.row.houseId)">详情</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="person.name" label="姓名"></el-table-column>
      <el-table-column prop="person.idCardNumber" label="身份证号码"></el-table-column>
      <el-table-column prop="hshdRgstAddress" label="户籍地址"></el-table-column> -->
      <el-table-column prop="textHouseType" label="房屋类型"></el-table-column>
      <el-table-column prop="textOwnershipType" label="产权类型"></el-table-column>
      <el-table-column prop="textUseCategory" label="使用类别"></el-table-column>
      <el-table-column prop="textHouseUses" label="房屋用途"></el-table-column>
      <el-table-column prop="isHaveOwnershipCertif" label="是否有产权">
        <template slot-scope="scope">
          <span v-if="scope.row.isHaveOwnershipCertif">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column label="权利人">
        <template slot-scope="scope">
          <span v-for="(item,index) of scope.row.houseOwnershipPersonList" :key="index">
            {{index === scope.row.houseOwnershipPersonList.length-1 ? item.villager.person.name: item.villager.person.name+','}}
            </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import houseService from '@/api/landAndHousing/HouseService'
import dataCodeService from '@/api/DataCodeService'
export default {
  props: {
    personId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      house_tableData: [],
      houseTypeOption: [],
      houseUsesOption: [],
      ownershipTypeOption: [],
      useCategoryOption: []
    }
  },
  created() {
    this.getSelectOption()
  },
  methods: {
    queryData(param) {
      // debugger
      houseService.listHouse(param || this.queryParam).then(res => {
        // console.log(res)
        // this.dataList = res.dataList
        const newData = []
        res.dataList.forEach((item, index) => {
          for (let a = 0; a < this.houseTypeOption.length; a++) {
            if (this.houseTypeOption[a].dataCode === item.houseType) {
              item.textHouseType = this.houseTypeOption[a].meaning
              break
            }
          }
          for (let a = 0; a < this.houseUsesOption.length; a++) {
            if (this.houseUsesOption[a].dataCode === item.houseUses) {
              item.textHouseUses = this.houseUsesOption[a].meaning
              break
            }
          }
          for (let a = 0; a < this.ownershipTypeOption.length; a++) {
            if (this.ownershipTypeOption[a].dataCode === item.ownershipType) {
              item.textOwnershipType = this.ownershipTypeOption[a].meaning
              break
            }
          }
          for (let a = 0; a < this.useCategoryOption.length; a++) {
            if (this.useCategoryOption[a].dataCode === item.useCategory) {
              item.textUseCategory = this.useCategoryOption[a].meaning
              break
            }
          }
          newData.push(item)
        })

        this.house_tableData = newData
      })
    },
    getSelectOption() {
      const houseType = dataCodeService
        .getDataCodeByCodeCategory('houseType')
        .then(res => {
          this.houseTypeOption = res
        })
      const houseUses = dataCodeService
        .getDataCodeByCodeCategory('houseUses')
        .then(res => {
          this.houseUsesOption = res
        })
      const ownershipType = dataCodeService
        .getDataCodeByCodeCategory('ownershipType')
        .then(res => {
          this.ownershipTypeOption = res
        })
      const useCategory = dataCodeService
        .getDataCodeByCodeCategory('useCategory')
        .then(res => {
          this.useCategoryOption = res
        })

      Promise.all([houseType, houseUses, ownershipType, useCategory]).then(
        () => {
          this.queryData({
            personId: this.personId
            // personId: '1'
          })
        }
      )
    }
  }
}
</script>
