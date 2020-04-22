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
            >高级搜索</el-button>
          </div>
        </div>
        <el-collapse-transition>
          <div class="height-level-box cus-pa-tb-10" v-show="isHeightLevel">
            <el-form :inline="true" label-width="90px" class="demo-form-inline clearfix">
              <el-form-item label="村民姓名">
                <el-input v-model="queryParam.name" placeholder="支持模糊搜索" style="width:205px"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="queryParam.sex" placeholder="请选择">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="身份证号">
                <el-input
                  v-model="queryParam.idCardNumber"
                  placeholder="支持模糊搜索"
                  style="width:205px"
                ></el-input>
              </el-form-item>
              <el-form-item label="村民状态">
                <el-select v-model="queryParam.status" placeholder="请选择">
                  <el-option
                    :label="item.meaning"
                    :value="item.dataCode"
                    v-for="(item,index) of selectOptionsMap.status"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否户主">
                <el-select v-model="queryParam.andHukouMasterRelate" placeholder="请选择">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="家庭单位">
                <el-input v-model="queryParam.financeCode" placeholder="支持模糊搜索" style="width:205px"></el-input>
              </el-form-item>-->
              <el-form-item label="年龄段">
                <el-input v-model="queryParam.startAge" type="number" style="width:76px"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-input v-model="queryParam.endAge" type="number" style="width:76px"></el-input>
              </el-form-item>
              <el-form-item label="集体经济">
                <el-select v-model="queryParam.collectiveEconomic" placeholder="请选择">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
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
            @click="$router.push('/villager/villagerAdd')"
          >新增</el-button>
          <el-button type="primary" icon="el-icon-upload2">导出</el-button>
          <el-button type="primary" icon="el-icon-printer">打印</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="pwdDialog.isShow = true">删除</el-button>
        </div>
        <!-- 字段： 户籍地址，家庭单位 年龄 -->
        <el-table :data="dataList" border class="cus-mb-20" @selection-change="onSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号" width="55"></el-table-column>
          <el-table-column label="姓名" min-width="100">
            <template slot-scope="scope">
              <router-link
                :to="'/villager/villagerDetail/'+scope.row.villagerId"
                class="text-blue"
              >{{scope.row.person.name}}</router-link>
            </template>
          </el-table-column>
          <el-table-column prop="huoseholdMain" label="所在户" width="100"></el-table-column>
          <el-table-column prop="andHshdMasterRelate" label="与户主关系" :formatter="formatColumn('andHshdMasterRelate')" width="100"></el-table-column>
          <el-table-column prop="person.sex" label="性别" width="100" :formatter="formatColumn('person.sex','sex')"></el-table-column>
          <el-table-column prop="age" label="年龄" width="100"></el-table-column>
          <el-table-column prop="person.idCardNumber" label="身份证号码" width="160"></el-table-column>
          <el-table-column prop="origHshdRgstAddress" label="户籍地址" min-width="120"></el-table-column>
          <el-table-column prop="person.phoneNumber" label="电话号码" width="110"></el-table-column>
          <el-table-column prop="person.ethnic" label="民族" width="100" :formatter="formatColumn('person.ethnic','ethnic')"></el-table-column>
          <!-- <el-table-column prop label="家庭单位" width="100"></el-table-column> -->
          <el-table-column prop="status" label="村民状态" width="100" :formatter="formatColumn('status')"></el-table-column>
          <el-table-column fixed="right" label="操作" width="80px">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="$router.push('/villager/villagerEdit/'+scope.row.villagerId)"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="cus-text-right"
          :current-page="queryParam.page"
          :page-sizes="$global.configs.pagination.pageSizes"
          :page-size="queryParam.pageSize"
          :layout="$global.configs.pagination.layout"
          :total="totalRecord"
          background
        ></el-pagination>
      </div>
      <pwd-dialog :pwd-dialog="pwdDialog"></pwd-dialog>
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
import pwdDialog from '@/components/pwdDialog'
import administrativeTree from '@/components/administrativeTree'

import villagerService from '@/api/villager/VillagerService'
// import dataCodeService from '@/api/DataCodeService.js'

import mixinIndex from './_mixins/index'
export default {
  mixins: [mixinIndex],
  components: {
    pwdDialog,
    administrativeTree
  },
  name: 'Villager',
  data() {
    return {
      pwdDialog: {
        isShow: false
      },
      totalRecord: 0,
      isShowTree: false,
      isHeightLevel: false,
      multipleSelection: [],
      dataList: [],
      queryParam: {
        pageSize: 10,
        page: 1,
        name: '',
        sex: '',
        idCardNumber: '',
        status: '', // 待确定
        andHukouMasterRelate: '',
        ageRange: '', // 待确定
        startAge: '',
        endAge: ''
      },
      selectOptionsMap: {
        sex: [],
        status: [],
        collectiveEconomic: [],
        andHshdMasterRelate: [],
        ethnic: []
      }
      // statusOption: [],
      // collectiveEconomicOption: []
    }
  },
  created() {
    // this.getSelectOptionBuyType('status')
    // this.getSelectOptionBuyType("collectiveEconomic");
    this.getSelectOptions(['sex', 'status', 'collectiveEconomic', 'andHshdMasterRelate', 'ethnic'])

    this.queryData()
  },
  methods: {
    queryData() {
      // console.log(this.queryParam)
      this.queryParam.ageRange = [this.queryParam.startAge, this.queryParam.endAge]

      villagerService
        .listVillagerByAdvanced(this.queryParam)
        .then(res => {
          // console.log(res);
          this.totalRecord = res.totalRecord
          this.dataList = res.dataList
        })
        .catch(err => {
          console.log(err)
        })
    },
    clearQueryParam() {
      this.queryParam = {
        pageSize: 5,
        page: 1,
        totalRecord: 0,
        name: '',
        sex: '',
        idCardNumber: '',
        status: '',
        andHukouMasterRelate: '',
        startAge: '',
        endAge: ''
      }
      this.queryData()
    },
    onSelectionChange: function(val) {}
    // getSelectOptionBuyType(type) {
    //   dataCodeService.getDataCodeByCodeCategory(type).then(res => {
    //     this[type + 'Option'] = res
    //   })
    // }
  }
}
</script>
