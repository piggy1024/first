<template>
  <div class="app-container">
    <administrative-tree :is-show-tree="isShowTree" v-on:is-show-change="isShowTree = $event"></administrative-tree>
    <i class="el-icon-d-arrow-right tree-collapse" v-show="isShowTree" @click="isShowTree = false"></i>
    <div class="right-container" :class="{'is-add-margin': !isShowTree}">
      <div class="filter-container cus-bg-fa">
        <p class="filter-title">查询条件</p>
        <div class="filter-box cus-d-fl">
          <el-form :inline="true" class="cus-fl-1 cus-text-right">
            <el-form-item>
              <el-input
                v-model="queryParam.name"
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
                    <el-input v-model="queryParam.name" placeholder="支持模糊搜索"></el-input>
                  </el-form-item>
                  <el-form-item label="土地类型">
                    <el-select v-model="queryParam.landType" placeholder="请选择">
                      <el-option
                        :label="item.meaning"
                        :value="item.dataCode"
                        v-for="(item,index) of landTypeOption"
                        :key="index"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号">
                    <el-input v-model="queryParam.idCardNumber" placeholder="支持模糊搜索"></el-input>
                  </el-form-item>
                  <el-form-item label="开始日期">
                    <el-date-picker v-model="queryParam.startDate" type="date" placeholder="选择日期"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="产权类型">
                    <el-select v-model="queryParam.ownershipType" placeholder="请选择">
                      <el-option
                        :label="item.meaning"
                        :value="item.dataCode"
                        v-for="(item,index) of ownershipTypeOption"
                        :key="index+20"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="结束日期">
                    <el-date-picker v-model="queryParam.endDate" type="date" placeholder="选择日期"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="cus-text-right cus-pr-15">
              <el-button type="primary" @click="queryData()">搜索</el-button>
              <el-button @click="clearQueryParam()">清空</el-button>
            </div>
          </div>
        </el-collapse-transition>
      </div>
      <div class="result-box">
        <div class="btn-box cus-mb-10">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="$router.push('/landAndHousing/resourceAdd')"
          >新增
          </el-button>
          <el-button type="primary" icon="el-icon-upload2">导出</el-button>
          <el-button type="primary" icon="el-icon-printer">打印</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="removeBatch">删除</el-button>
        </div>
        <el-table ref="ids" :data="dataList" border class="cus-mb-20" @selection-change="onSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号" width="55"></el-table-column>
          <el-table-column prop="villager.person.name" label="姓名" min-width="120"></el-table-column>
          <el-table-column prop="villager.person.idCardNumber" label="身份证号" width="170"></el-table-column>
          <el-table-column prop="villager.origHshdRgstAddress" label="户籍地址" min-width="150"></el-table-column>
          <el-table-column prop="textOwnershipType" label="产权类型" width="120"></el-table-column>
          <el-table-column prop="textLandType" label="土地类型" width="120"></el-table-column>
          <el-table-column prop="resourceArea" label="资源面积" width="120"></el-table-column>
          <el-table-column prop="startDate" label="开始日期" width="120">
            <!-- <template slot-scope="scope">
              <span>{{this.filters.parseTime(scope.row.startDate,'yyyy-mm-dd')}}</span>
            </template> -->
          </el-table-column>
          <el-table-column prop="endDate" label="结束日期" width="120"></el-table-column>
          <!-- fixed="right" -->
          <el-table-column label="操作" fixed="right" width="150">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="$router.push('/landAndHousing/resourceModify/'+scope.row.resourceId)"
              >修改
              </el-button>
              <el-button size="mini" @click="$router.push('/landAndHousing/resourceDetail/'+scope.row.resourceId)">详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="cus-text-right"
          :current-page="queryParam.page"
          :page-sizes="[5, 10, 15, 20, 25]"
          :page-size="queryParam.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRecord"
          background
        ></el-pagination>
      </div>
    </div>
    <pwd-dialog :pwd-dialog="pwdDialog" @success="validPwdSuc"></pwd-dialog>
  </div>
</template>

<style scoped lang="scss">
  .height-level-box /deep/ {
    .el-form-item .el-input,
    .el-form-item .el-date-editor {
      width: 100%;
    }
    .el-form-item .el-input,
    .el-form-item .el-date-editor {
      max-width: 200px;
    }
  }
</style>

<script>
import administrativeTree from '@/components/administrativeTree'

import resourceService from '@/api/landAndHousing/ResourceService'
import dataCodeService from '@/api/DataCodeService'
import pwdDialog from '@/components/pwdDialog'

import { parseTime } from '@/filters'

export default {
  name: 'Resource',
  components: {
    administrativeTree,
    pwdDialog
  },
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
        name: '',
        idCardNumber: '',
        ownershipType: '',
        landType: '',
        startDate: '',
        endDate: ''
      },
      landTypeOption: [],
      ownershipTypeOption: []
    }
  },
  created() {
    this.getSelectOption()
    // console.log(parseTime('2020-03-30T09:06:35.000+0000','{y}-{m}-{d}'));
  },
  methods: {
    validPwdSuc(closeDialog) {
      resourceService.removeBatchResource(this.selection).then(res => {
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
      const ids = this.$refs.ids.selection.map(s => s['resourceId'])
      if (ids.length === 0) {
        this.$message({
          title: '您尚未选择数据!',
          type: 'warning'
        })
        return
      }
      this.selection = ids
    },
    queryData(param) {
      resourceService.listResource(param || this.queryParam).then(res => {
        // console.log(res);
        const newData = []
        res.dataList.forEach((item, index) => {
          for (let a = 0; a < this.ownershipTypeOption.length; a++) {
            if (this.ownershipTypeOption[a].dataCode === item.ownershipType) {
              item.textOwnershipType = this.ownershipTypeOption[a].meaning
              break
            }
          }
          for (let a = 0; a < this.landTypeOption.length; a++) {
            if (this.landTypeOption[a].dataCode === item.landType) {
              item.textLandType = this.landTypeOption[a].meaning
              break
            }
          }
          item.startDate = parseTime(item.startDate, '{y}-{m}-{d}')
          item.endDate = parseTime(item.endDate, '{y}-{m}-{d}')
          newData.push(item)
        })

        this.dataList = newData
        // this.dataList = res
      })
    },
    onSelectionChange(value) {

    },
    getSelectOption() {
      const landType = dataCodeService.getDataCodeByCodeCategory('landType').then((res) => {
        this.landTypeOption = res
      })
      const ownershipType = dataCodeService.getDataCodeByCodeCategory('ownershipType').then((res) => {
        this.ownershipTypeOption = res
      })

      Promise.all([landType, ownershipType]).then(() => {
        this.queryData()
      })
    },
    clearQueryParam() {
      this.queryParam = {
        pageSize: 5,
        page: 1,
        name: '',
        idCardNumber: '',
        ownershipType: '',
        landType: '',
        startDate: '',
        endDate: ''
      }
      this.queryData(this.queryParam)
    }
  }
}
</script>
