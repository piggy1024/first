<template>
  <div class="app-container">
    <div class="filter-container">
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
          <el-form label-width="90px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="村民姓名">
                  <el-input v-model="advanceQueryParams.name" placeholder="支持模糊搜索"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                  <el-input v-model="advanceQueryParams.idCardNumber" placeholder="支持模糊搜索"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别">
                  <el-select v-model="advanceQueryParams.sex" placeholder="请选择">
                    <el-option
                      v-for="item in selectOptionsMap.sex"
                      :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="财政代码">
                  <el-input v-model="advanceQueryParams.financeCode" placeholder="支持模糊搜索"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否取消">
                  <el-select v-model="advanceQueryParams.isCancel" placeholder="请选择">
                    <el-option label="是" value="shanghai"></el-option>
                    <el-option label="否" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
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
        <el-button type="primary" icon="el-icon-printer">打印</el-button>
        <el-button type="primary" icon="el-icon-printer">导出</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="pwdDialog.isShow = true">删除</el-button>
      </div>
      <!-- 多重类型 一卡通户名身份证 享受人姓名 -->
      <el-table :data="dataList" border class="cus-mb-20">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="55"></el-table-column>
        <el-table-column prop="person.name" label="姓名"></el-table-column>
        <el-table-column prop="person.idCardNumber" label="身份证号/出生年月" width="150"></el-table-column>
        <el-table-column prop="diffType" label="多重类型"></el-table-column>
        <el-table-column prop="person.sex" label="性别"></el-table-column>
        <el-table-column prop="oneCardPassAccountName" label="一卡通户名" width="100"></el-table-column>
        <el-table-column prop="oneCardPassAccountNameIdCard" label="一卡通户名身份证" width="150"></el-table-column>
        <el-table-column prop="oneCardPassAccountNumber" label="一卡通账号" width="100"></el-table-column>
        <el-table-column prop="financialCode" label="财政代码" width="100"></el-table-column>
        <el-table-column prop="unusualActionAmount" label="异动金额"></el-table-column>
        <el-table-column prop="enjoyName" label="享受人员姓名" width="150"></el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="100"></el-table-column>
        <el-table-column prop="cancelTime" label="取消时间" width="100"></el-table-column>
        <el-table-column prop="currentResideAddress" label="地址" width="200"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作" width="210">
          <template>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="$router.push('/civilAffairs/elderlyEdit')"
            >编辑</el-button>
            <el-button type="primary" icon="el-icon-printer" size="mini">资料上传</el-button>
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
    <pwd-dialog :pwd-dialog="pwdDialog"></pwd-dialog>
  </div>
</template>

<style scoped lang="scss">
.height-level-box /deep/ {
  .el-form-item .el-input,
  .el-form-item .el-select {
    width: 220px;
  }
}
</style>

<script>
import pwdDialog from '@/components/pwdDialog'

// api
import elderlyService from '@/api/civilAffairs/ElderlyService'

// mixin
import mixinIndex from '../_mixins/index'

export default {
  mixins: [mixinIndex],
  components: {
    pwdDialog
  },
  data() {
    return {
      pwdDialog: {
        isShow: false
      },
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
        financialCode: '',
        isCancel: '' // 未确定
      },
      selectOptionsMap: {
        // 用于存储各个select下的options
        sex: []
      }
      /*
      tableData: [
        {
          id: 1,
          name: "张三",
          idCard: "6666666666666666",
          diffType: "优扶对象",
          sex: "男",
          cardName: "",
          cardIdCard: "",
          caedAccount: "",
          financeCode: "",
          changeMoney: "",
          enjoyName: "",
          startTime: "2019-12-19",
          endTime: "2020-03-05",
          address: "演示县演示镇演示村1队",
          remark: ""
        }
      ],
      */
    }
  },
  created() {
    this.getSelectOptions(['sex'])
  },
  methods: {
    fetchTableDataListPromise(entity) {
      return elderlyService.listElderly(entity)
    },
    getFastEntity() {
      return {
        name: this.advanceQueryParams.name
      }
    },
    getAdvanceEntity() {
      return this.advanceQueryParams
    }
  }
}
</script>
