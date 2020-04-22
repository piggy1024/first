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
                  <el-input v-model="advanceQueryParams.name" placeholder="支持模糊搜索"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                  <el-input v-model="advanceQueryParams.idCardNumber" placeholder="支持模糊搜索"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="残疾等级">
                  <el-select v-model="advanceQueryParams.disabilityLevel" multiple placeholder="请选择">
                    <el-option
                      v-for="item in selectOptionsMap.disabilityLevel"
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
                <el-form-item label="残疾分类">
                  <el-select v-model="advanceQueryParams.disabilityCategory" multiple placeholder="请选择">
                    <el-option
                      v-for="item in selectOptionsMap.disabilityCategory"
                      :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是否取消">
                  <el-select v-model="advanceQueryParams.subsidyCancelTime" placeholder="请选择">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
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
        <el-button type="primary" icon="el-icon-upload2">导出</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="pwdDialog.isShow = true">删除</el-button>
      </div>
      <!-- 多重类型，开户人身份证 -->
      <el-table :data="dataList" border class="cus-mb-20">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="55"></el-table-column>
        <el-table-column prop="person.name" label="姓名"></el-table-column>
        <el-table-column prop="person.sex" label="性别"></el-table-column>
        <el-table-column prop="person.idCardNumber" label="身份证号" width="150"></el-table-column>
        <el-table-column prop="disabilityCertifNo" label="残疾证号"></el-table-column>
        <el-table-column label="残疾等级" width="100">
          <template slot-scope="scope">
            <span v-for="(item,index) of scope.row.disabilityLevelList" :key="index">{{item.disabilityCodes.disabilityName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="disabilityCategory" :formatter="formatterDisabilityCate" label="残疾类型"></el-table-column>
        <el-table-column prop="person.phoneNumber" label="电话号码" width="110"></el-table-column>
        <el-table-column prop="difType" label="多重类型"></el-table-column>
        <el-table-column prop="registerTime" label="注册时间" width="100"></el-table-column>
        <el-table-column prop="accountOpenPerson" label="开户人"></el-table-column>
        <el-table-column prop="kaihurenIdCard" label="开户人身份证" width="150"></el-table-column>
        <el-table-column prop="bankType" label="银行卡类型" width="100"></el-table-column>
        <el-table-column prop="bankCardAccountNumber" label="银行卡账号" width="200"></el-table-column>
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
              @click="$router.push('/civilAffairs/disabilityPersonEdit')"
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

<script>
// components
import pwdDialog from '@/components/pwdDialog'

// api
import disabilityPersonService from '@/api/civilAffairs/DisabilityPersonService'

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
        disabilityLevel: [],
        disabilityCategory: '',
        subsidyCancelTime: ''
      },
      selectOptionsMap: {
        // 用于存储各个select下的options
        disabilityLevel: [],
        disabilityCategory: []
      },
      disLevelOptions: [
        {
          label: '请选择',
          value: '0'
        },
        {
          label: '视力(一级)',
          value: '1'
        },
        {
          label: '视力(二级)',
          value: '2'
        },
        {
          label: '视力(三级)',
          value: '3'
        },
        {
          label: '视力(四级)',
          value: '4'
        },
        {
          label: '视力(五级)',
          value: '5'
        },
        {
          label: '听力(一级)',
          value: '6'
        },
        {
          label: '听力(二级)',
          value: '7'
        },
        {
          label: '听力(三级)',
          value: '8'
        },
        {
          label: '听力(四级)',
          value: '9'
        },
        {
          label: '听力(五级)',
          value: '10'
        },
        {
          label: '言语(一级)',
          value: '11'
        },
        {
          label: '言语(二级)',
          value: '12'
        },
        {
          label: '言语(三级)',
          value: '13'
        },
        {
          label: '言语(四级)',
          value: '14'
        },
        {
          label: '言语(五级)',
          value: '15'
        },
        {
          label: '肢体(一级)',
          value: '16'
        },
        {
          label: '肢体(二级)',
          value: '2'
        },
        {
          label: '肢体(三级)',
          value: '3'
        },
        {
          label: '肢体(四级)',
          value: '4'
        },
        {
          label: '肢体(五级)',
          value: '5'
        }
      ],
      disSortedOptions: [
        {
          label: '请选择',
          value: '0'
        },
        {
          label: '重度残疾人',
          value: '1'
        },
        {
          label: '困难残疾人',
          value: '2'
        }
      ]
    }
  },
  created() {
    this.getSelectOptions(['disabilityLevel', 'disabilityCategory'])
  },
  methods: {
    fetchTableDataListPromise(entity) {
      return disabilityPersonService.listDisabilityPerson(entity)
    },
    getFastEntity() {
      return {
        name: this.advanceQueryParams.name
      }
    },
    getAdvanceEntity() {
      return this.advanceQueryParams
    },
    // 格式化残疾人员
    formatterDisabilityCate(row, col) {
      // console.log(row);
      for (let index = 0; index < row.disabilityLevelList.length; index++) {
        const element = row.disabilityLevelList[index].disabilityCodes.disabilityCategory
        if (element === '01') {
          return '重度残疾'
        }
      }
      return '困难残疾'
    }
  }
}
</script>

<style scoped lang="scss">
.height-level-box /deep/ {
  .el-form-item .el-input,
  .el-form-item .el-select {
    width: 220px;
  }
}
</style>
