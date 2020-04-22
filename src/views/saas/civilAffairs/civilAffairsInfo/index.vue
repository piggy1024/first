<template>
  <div class="app-container">
    <administrative-tree :is-show-tree="isShowTree" v-on:is-show-change="isShowTree = $event"></administrative-tree>
    <i class="el-icon-d-arrow-right tree-collapse" v-show="isShowTree" @click="isShowTree = false"></i>
    <div class="right-container" :class="{'is-add-margin': !isShowTree}">
      <div class="filter-container">
        <p class="filter-title">查询条件</p>
        <div class="filter-box cus-d-fl">
          <el-form :inline="true" class="cus-fl-1 cus-text-right">
            <el-form-item label="村民姓名">
              <el-input
                v-model="advanceQueryParams.name"
                placeholder="普通姓名模糊搜索"
                suffix-icon="el-icon-search"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="btn-box">
            <el-button type="primary" @click="fetchTableDataList('submit')">搜索</el-button>
            <el-button
              type="text"
              :icon="isHeightLevel? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
              @click="isHeightLevel = !isHeightLevel"
            >高级搜索</el-button>
          </div>
        </div>
        <el-collapse-transition>
          <div class="height-level-box cus-pa-tb-10" v-show="isHeightLevel">
            <el-form :inline="true" label-width="90px" class="clearfix">
              <el-form-item label="村民姓名">
                <el-input
                  v-model="advanceQueryParams.name"
                  placeholder="支持模糊搜索"
                  style="width:200px"
                ></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="advanceQueryParams.sex" placeholder="请选择" style="width:200px">
                  <el-option
                    v-for="item in selectOptionsMap.sex"
                    :key="item.dataCode"
                    :label="item.meaning"
                    :value="item.dataCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="身份证号">
                <el-input
                  v-model="advanceQueryParams.idCardNumber"
                  placeholder="支持模糊搜索"
                  style="width:200px"
                ></el-input>
              </el-form-item>
              <el-form-item label="村民状态">
                <el-select
                  v-model="advanceQueryParams.status"
                  placeholder="请选择"
                  style="width:200px"
                >
                  <el-option
                    v-for="item in selectOptionsMap.status"
                    :key="item.dataCode"
                    :label="item.meaning"
                    :value="item.dataCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="财政代码">
                <el-input
                  v-model="advanceQueryParams.financeCode"
                  placeholder="支持模糊搜索"
                  style="width:200px"
                ></el-input>
              </el-form-item>
              <el-form-item label="年龄段">
                <el-input v-model="advanceQueryParams.startAge" style="width:76px"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;
                <el-input v-model="advanceQueryParams.endAge" style="width:76px"></el-input>
              </el-form-item>
            </el-form>
            <div class="cus-text-right cus-pr-15">
              <el-button type="primary" @click="fetchTableDataList('submit')">搜索</el-button>
              <el-button @click="resetQueryParams()">清空</el-button>
            </div>
          </div>
        </el-collapse-transition>
      </div>
      <div class="result-box">
        <div class="btn-box cus-mb-10">
          <!-- <el-button type="danger" icon="el-icon-delete" @click="pwdDialog.isShow = true">删除</el-button> -->
        </div>
        <el-table :data="dataList" border class="cus-mb-20">
          <el-table-column type="selection" width="55px"></el-table-column>
          <el-table-column type="index" width="55px"></el-table-column>
          <el-table-column prop="person.name" label="姓名"></el-table-column>
          <el-table-column prop="andHshdMasterRelate" label="与户主关系" width="100"></el-table-column>
          <el-table-column prop="huoseholdMain" label="户名"></el-table-column>
          <el-table-column
            prop="person.sex"
            label="性别"
            :formatter="formatColumn('person.sex','sex')"
          ></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="person.idCardNumber" label="身份证号码" width="150"></el-table-column>
          <el-table-column prop="origHshdRgstAddress" label="户籍地址"></el-table-column>
          <el-table-column prop="person.phoneNumber" label="电话号码" width="110"></el-table-column>
          <el-table-column
            prop="person.ethnic"
            :formatter="formatColumn('person.ethnic','ethnic')"
            label="民族"
          ></el-table-column>
          <el-table-column prop="financeCode" label="财政代码" width="150"></el-table-column>
          <el-table-column prop="status" :formatter="formatColumn('status')" label="状态"></el-table-column>
          <el-table-column prop="benfFamiSubsidyPlainPsbk" label="惠农补贴明白折" width="150"></el-table-column>
          <el-table-column prop="benfFamiSubsidyPlainCard" label="惠农补贴明白卡" width="150"></el-table-column>
          <el-table-column prop="povtAleaSubsidyPlainPsbk" label="扶贫补贴明白折" width="150"></el-table-column>
          <el-table-column prop="povtAleaSubsidyPlainCard" label="扶贫补贴明白卡" width="150"></el-table-column>
          <el-table-column fixed="right" label="操作" width="90">
            <template>
              <el-button
                type="primary"
                size="mini"
                @click="$router.push('/civilAffairs/civilAffairsEdit')"
                icon="el-icon-edit"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="cus-text-right"
          :current-page="otherQueryParams.page"
          :page-sizes="$global.configs.pagination.pageSizes"
          :page-size="otherQueryParams.pageSize"
          :layout="$global.configs.pagination.layout"
          :total="totalRecord"
          background
          @size-change="sizeChangeHandler"
          @current-change="currentChangeHandler"
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
// components
import administrativeTree from '@/components/administrativeTree'

// api
import villagerService from '@/api/villager/VillagerService'

// mixin
import mixinIndex from '../_mixins/index'

export default {
  components: {
    administrativeTree
  },
  mixins: [mixinIndex],
  data() {
    return {
      isShowTree: false,
      isHeightLevel: false,
      fastQueryParams: {
        // 快速搜索参数
        name: ''
      },
      advanceQueryParams: {
        // 高级搜索
        name: '',
        sex: '',
        idCardNumber: '',
        status: '',
        financialCode: '',
        ageRange: '',
        startAge: '',
        endAge: ''
      },
      selectOptionsMap: {
        // 用于存储各个select下的options
        sex: [],
        ethnic: [],
        status: []
      }
    }
  },
  created() {
    this.getSelectOptions(['sex', 'ethnic', 'status'])
  },
  methods: {
    fetchTableDataListPromise(entity) {
      return villagerService.listVillagerByAdvanced(entity)
    },
    getFastEntity() {
      return {
        name: this.advanceQueryParams.name
      }
    },
    getAdvanceEntity() {
      this.advanceQueryParams.ageRange = [
        this.advanceQueryParams.startAge,
        this.advanceQueryParams.endAge
      ]
      return this.advanceQueryParams
    }
  }
}
</script>
