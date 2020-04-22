<template>
  <div class="app-container">
    <!-- <div :class="{'left-container':true,'show-width': isShowTree}">
      <h4 class="text-center tree-title">
        行政区域树
        <i class="el-icon-d-arrow-left" @click="isShowTree = true"></i>
      </h4>
      <div style="padding:0 10px 10px">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-tree
          class="filter-tree"
          :data="data"
          node-key="id"
          :props="defaultProps"
          @node-click="getCurrentKey()"
          default-expand-all
          :filter-node-method="filterNode"
          ref="tree"
        ></el-tree>
      </div>
    </div> -->
    <administrative-tree :is-show-tree="isShowTree" v-on:is-show-change="isShowTree = $event"></administrative-tree>
    <i class="el-icon-d-arrow-right tree-collapse" v-show="isShowTree" @click="isShowTree = false"></i>
    <div class="right-container" :class="{'is-add-margin': !isShowTree}">
      <div class="filter-container cus-bg-fa">
        <p class="filter-title">查询条件</p>
        <div class="filter-box cus-d-fl">
          <el-form :inline="true" class="cus-fl-1 cus-text-right">
            <el-form-item>
              <el-input
                v-model="queryParam.ownershipPersonName"
                placeholder="普通姓名模糊搜索"
                suffix-icon="el-icon-search"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="btn-box">
            <el-button type="primary" @click="queryData()">搜索</el-button>
            <el-button
              type="text"
              :icon="isHeightLevel? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
              @click="isHeightLevel = !isHeightLevel"
            >高级搜索
            </el-button>
          </div>
        </div>
        <el-collapse-transition>
          <div class="height-level-box cus-pa-tb-10" v-show="isHeightLevel">
            <el-form label-width="90px">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="村民姓名">
                    <el-input v-model="queryParam.ownershipPersonName" placeholder="支持模糊搜索"></el-input>
                  </el-form-item>
                  <!--<el-form-item label="产权类型">-->
                  <!--<el-select v-model="queryParam.ownershipType" placeholder="请选择">-->
                  <!--<el-option-->
                  <!--:label="item.meaning"-->
                  <!--:value="item.dataCode"-->
                  <!--v-for="(item,index) of ownershipTypeOption"-->
                  <!--:key="index"-->
                  <!--&gt;</el-option>-->
                  <!--&lt;!&ndash; <el-option label="集体自建" value="0"></el-option>-->
                  <!--<el-option label="两型补贴" value="1"></el-option>&ndash;&gt;-->
                  <!--</el-select>-->
                  <!--</el-form-item>-->
                  <el-form-item label="管理类型">
                    <el-select v-model="queryParam.managementType" placeholder="请选择">
                      <el-option
                        :label="item.meaning"
                        :value="item.dataCode"
                        v-for="(item,index) of managementTypeOption"
                        :key="index"
                      ></el-option>
                      <!-- <el-option label="集体自建" value="0"></el-option>
                      <el-option label="两型补贴" value="1"></el-option>-->
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号">
                    <el-input v-model="queryParam.ownershipPersonIdCard" placeholder="支持模糊搜索"></el-input>
                  </el-form-item>
                  <el-form-item label="房屋用途">
                    <el-select v-model="queryParam.houseUses" placeholder="请选择">
                      <el-option
                        :label="item.meaning"
                        :value="item.dataCode"
                        v-for="(item,index) of houseUsesOption"
                        :key="index+10"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="房屋类型">
                    <el-select v-model="queryParam.houseType" placeholder="请选择">
                      <el-option
                        :label="item.meaning"
                        :value="item.dataCode"
                        v-for="(item,index) of houseTypeOption"
                        :key="index+20"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="是否有产权">
                    <el-select v-model="queryParam.isHaveOwnershipCertif" placeholder="请选择">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="cus-text-right cus-pr-15">
              <el-button type="primary" @click="queryData()">搜索</el-button>
              <el-button @click="clearQueryParam">清空</el-button>
            </div>
          </div>
        </el-collapse-transition>
      </div>
      <div class="result-box">
        <div class="btn-box cus-mb-10">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="$router.push('/landAndHousing/houseAdd')"
          >新增
          </el-button>
          <el-button type="primary" icon="el-icon-upload2">导出</el-button>
          <el-button type="primary" icon="el-icon-printer">打印</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="removeBatch">删除</el-button>
        </div>
        <el-table ref="ids" :data="dataList" border class="cus-mb-20" @selection-change="onSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号" width="55"></el-table-column>
          <el-table-column prop="textHouseType" label="房屋类型" width="100">
            <!-- <template slot-scope="scope"> -->
            <!-- <span>{{scope.row.dataCode === '01' ?'自建房': '商品房' }}</span> -->
            <!-- <span>{{conversionField('houseType',scope.row.dataCode)}}</span> -->
            <!-- </template> -->
          </el-table-column>
          <el-table-column prop="textUseCategory" label="使用类别" width="100"></el-table-column>
          <el-table-column prop="textHouseUses" label="房屋用途" width="100"></el-table-column>
          <el-table-column prop="textManagementType" label="管理类型" width="100"></el-table-column>
          <el-table-column prop="isHaveOwnershipCertif" label="是否有产权" width="120">
            <template slot-scope="scope">
              <span>{{scope.row.isHaveOwnershipCertif === '0' ?'否': '是' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="houseOwnershipPersonList" :formatter="showHouseOwnershipPerson" label="产权人" min-width="120"></el-table-column>
          <!-- fixed="right" -->
          <el-table-column label="操作" fixed="right" width="150">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="$router.push('/landAndHousing/houseModify/'+scope.row.houseId)"
              >修改
              </el-button>
              <el-button size="mini" @click="$router.push('/landAndHousing/houseDetail/'+scope.row.houseId)">详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="cus-text-right"
          :current-page="queryParam.page"
          :page-sizes="[5,10,15,20,25]"
          :page-size="queryParam.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRecord"
          background
        ></el-pagination>
      </div>
      <pwd-dialog :pwd-dialog="pwdDialog" @success="validPwdSuc"></pwd-dialog>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .height-level-box /deep/ {
    .el-form-item .el-input,
    .el-form-item .el-date-editor {
      width: 100%;
    }
    .el-form-item .el-input {
      max-width: 200px;
    }
    .el-form-item .el-date-editor {
      max-width: 400px;
    }
  }
</style>

<script>
import pwdDialog from '@/components/pwdDialog'
import administrativeTree from '@/components/administrativeTree'

import houseService from '@/api/landAndHousing/HouseService'
import dataCodeService from '@/api/DataCodeService'

export default {
  components: {
    pwdDialog,
    administrativeTree
  },
  name: 'House',
  data() {
    return {
      selection: [],
      pwdDialog: {
        isShow: false,
        loading: false
      },
      isShowTree: false,
      isHeightLevel: false,
      totalRecord: 0,
      multipleSelection: [],
      dataList: [],
      queryParam: {
        pageSize: 5,
        page: 1,
        ownershipPersonName: '',
        houseUses: '',
        houseType: '',
        ownershipPersonIdCard: '',
        isHaveOwnershipCertif: '',
        managementType: ''
      },
      houseTypeOption: [],
      useCategoryOption: [],
      houseUsesOption: [],
      managementTypeOption: [],
      // 产权信息
      houseOwnershipPersonList: [
        {
          shareSituation: '',
          shareSituationDescr: '',
          villager: {
            person: {
              name: ''
            }
          }
        }
      ]
      // isHaveOwnershipCertifOption:[],
    }
  },
  created() {
    this.getSelectOption()
  },
  methods: {
    validPwdSuc(closeDialog) {
      houseService.removeBatchHouse(this.selection).then(res => {
        this.$message({
          message: `删除成功！`,
          type: 'success'
        })
        this.clearQueryParam()
        closeDialog()
      })
    },
    removeBatch() {
      this.pwdDialog.isShow = true
      const ids = this.$refs.ids.selection.map(s => s['houseId'])
      if (ids.length === 0) {
        this.$message({
          title: '您尚未选择数据!',
          type: 'warning'
        })
        return
      }
      this.selection = ids
    },
    showHouseOwnershipPerson(row) {
      return row.houseOwnershipPersonList.map(h => h.villager.person.name).join(' , ')
    },
    onSelectionChange: function(val) {
      // if (val) {
      //   let multipleSelection = [];
      //   for (let item of val) {

      //     let { onDutyLogId } = item;
      //     multipleSelection.push(onDutyLogId);
      //     console.log(multipleSelection);

      //   }
      //   this.multipleSelection = multipleSelection;
      // }
    },
    queryData(param) {
      // debugger
      houseService.listHouse(param || this.queryParam).then((res) => {
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
          for (let a = 0; a < this.managementTypeOption.length; a++) {
            if (this.managementTypeOption[a].dataCode === item.managementType) {
              item.textManagementType = this.managementTypeOption[a].meaning
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

        this.dataList = newData
      })
    },
    clearQueryParam() {
      this.queryParam = {
        pageSize: 5,
        page: 1,
        ownershipPersonName: '',
        houseUses: '',
        houseType: '',
        ownershipPersonIdCard: '',
        isHaveOwnershipCertif: '',
        ownershipType: ''
      }
      this.queryData(this.queryParam)
    },
    getSelectOption() {
      const houseType = dataCodeService.getDataCodeByCodeCategory('houseType').then((res) => {
        this.houseTypeOption = res
      })
      const houseUses = dataCodeService.getDataCodeByCodeCategory('houseUses').then((res) => {
        this.houseUsesOption = res
      })
      const ownershipType = dataCodeService.getDataCodeByCodeCategory('managementType').then((res) => {
        this.managementTypeOption = res
      })
      const useCategory = dataCodeService.getDataCodeByCodeCategory('useCategory').then((res) => {
        this.useCategoryOption = res
      })

      Promise.all([houseType, houseUses, ownershipType, useCategory]).then(() => {
        this.queryData()
      })
      // dataCodeService.getDataCodeByCodeCategory(type).then((res)=>{
      //   this[type+'Option'] = res
      // })
    }
  }
}
</script>
