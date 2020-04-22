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
          <el-form :inline="true" label-width="90px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="村民姓名">
                  <el-input
                    v-model="advanceQueryParams.name"
                    placeholder="支持模糊搜索"
                  ></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                  <el-input
                    v-model="advanceQueryParams.idCardNumber"
                    placeholder="支持模糊搜索"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="属别">
                  <el-select
                    v-model="advanceQueryParams.genus"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in attributeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="财政代码">
                  <el-input
                    v-model="advanceQueryParams.financeCode"
                    placeholder="支持模糊搜索"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否取消">
                  <el-select
                    v-model="advanceQueryParams.isCancel"
                    placeholder="请选择"
                  >
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
      <!-- 多重类型 开户人身份证 -->
      <el-table :data="dataList" border class="cus-mb-20">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="55"></el-table-column>
        <el-table-column prop="person.name" label="姓名"></el-table-column>
        <el-table-column prop="person.idCardNumber" label="身份证号" width="150"></el-table-column>
        <el-table-column prop="person.phoneNumber" label="电话号码" width="110"></el-table-column>
        <el-table-column prop="diffType" label="多重类型"></el-table-column>
        <el-table-column prop="attribute" label="属别" width="100"></el-table-column>
        <el-table-column prop="enlistTime" label="入伍时间" width="100"></el-table-column>
        <el-table-column prop="retireTime" label="退伍时间" width="100"></el-table-column>
        <el-table-column prop="accountOpenPerson" label="开户人"></el-table-column>
        <el-table-column prop="accountOpenPersonIdCard" label="开户人身份证" width="150"></el-table-column>
        <el-table-column prop="bankType" label="银行卡类型" width="100"></el-table-column>
        <el-table-column prop="bankAccountNumber" label="银行卡账号" width="200"></el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="100"></el-table-column>
        <el-table-column prop="cancelTime" label="取消时间" width="100"></el-table-column>
        <el-table-column prop="currentResideAddress" label="地址" width="200"></el-table-column>
        <el-table-column prop="remark" label="备注" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="210">
          <template>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="$router.push('/civilAffairs/preferentialCareObjectEdit')"
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
        @current-change="currentChangesHandler"
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
import PreferentialCareObjectService from '@/api/civilAffairs/PreferentialCareObjectService'

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
        idCardNumber: '',
        genus: '', // 属别
        financialCode: '',
        isCancel: '' // 未确定
      },
      selectOptionsMap: {
        // 用于存储各个select下的options
      },
      /*
      tableData: [
        {
          id: 1,
          name: '张三',
          idCard: '6666666666666666',
          phone: '1293820347',
          diffType: '优扶对象',
          attribute: '三属对象',
          joinTime: '2019-12-19',
          retireTime: '2019-12-19',
          kaihuren: 'xxx',
          kaihurenIdCard: '6666666666666666',
          cardType: '建行',
          cardNumber: '23094705923',
          startTime: '2019-12-19',
          endTime: '2020-03-05',
          address: '演示县演示镇演示村1队',
          remark: ''
        }
      ],
      */
      attributeOptions: [
        {
          label: '请选择',
          value: '0'
        },
        {
          label: '三属对象',
          value: '1'
        },
        {
          label: '参战退役',
          value: '2'
        },
        {
          label: '残疾军人',
          value: '3'
        },
        {
          label: '老复员军人',
          value: '4'
        },
        {
          label: '烈士子女',
          value: '5'
        },
        {
          label: '60岁退役',
          value: '6'
        },
        {
          label: '带病回乡',
          value: '7'
        }
      ]
    }
  },
  created() {
    // this.getSelectOptions(['sex'])
  },
  methods: {
    fetchTableDataListPromise(entity) {
      return PreferentialCareObjectService.listPreferentialCareObject(entity)
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
