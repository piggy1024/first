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
          <el-button type="primary">搜索</el-button>
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
                  <el-input
                    v-model="advanceQueryParams.name"
                    placeholder="支持模糊搜索"
                    style="width:250px"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="民族">
                  <el-select
                    v-model="advanceQueryParams.ethnic"
                    placeholder="请选择"
                    style="width:250px"
                  >
                   <el-option
                      v-for="item in selectOptionsMap.ethnic"
                      :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别">
                  <el-select v-model="advanceQueryParams.sex" placeholder="请选择" style="width:250px">
                    <el-option
                      v-for="item in selectOptionsMap.sex"
                      :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="身份证号">
                  <el-input
                    v-model="advanceQueryParams.idCardNumber"
                    placeholder="支持模糊搜索"
                    style="width:250px"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="出生日期">
                  <el-date-picker
                    v-model="advanceQueryParams.birthDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="cus-text-right cus-pr-15">
            <el-button type="primary">搜索</el-button>
            <el-button>清空</el-button>
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
      <el-table :data="dataList" border class="cus-mb-20">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="55"></el-table-column>
        <el-table-column prop="person.name" label="姓名" ></el-table-column>
        <el-table-column prop="person.ethnic" label="民族"></el-table-column>
        <el-table-column prop="person.sex" label="性别" :formatter="formatColumn('person.sex','sex')"></el-table-column>
        <el-table-column prop="person.birthDate" label="出生日期" width="100"></el-table-column>
        <el-table-column prop="origHshdRgstAddress" label="户籍地" width="100"></el-table-column>
        <el-table-column prop="isRegisterHshdRgst" label="是否登记户口" width="150"></el-table-column>
        <el-table-column prop="fatherWorkLocation" label="父亲务工地" width="100"></el-table-column>
        <el-table-column prop="motherWorkLocation" label="母亲务工地" width="100"></el-table-column>
        <el-table-column prop="goToSchoolSituation" label="就学情况"></el-table-column>
        <el-table-column prop="boardingSituation" label="寄宿情况"></el-table-column>
        <el-table-column prop="healthSituation" label="健康情况"></el-table-column>
        <el-table-column prop="actualGuardianshipSituation" label="实际监护情况" width="150"></el-table-column>
        <el-table-column prop="villageCmieContactPerson" label="村委联系人" width="100"></el-table-column>
        <el-table-column prop="villageCmieContactPhone" label="村委联系电话" width="150"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作" width="90">
          <template>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="$router.push('/civilAffairs/leftBehindChildrenEdit')"
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
    <pwd-dialog :pwd-dialog="pwdDialog"></pwd-dialog>
  </div>
</template>

<style scoped lang="scss">

</style>

<script>
import pwdDialog from '@/components/pwdDialog'

// api
import leftBehindChildrenService from '@/api/civilAffairs/LeftBehindChildrenService'

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
        ethnic: '',
        birthDate: ''
      },
      selectOptionsMap: {
        // 用于存储各个select下的options
        sex: [],
        ethnic: []
      }
      /*
      tableData: [
        {
          id: 1,
          name: "张三",
          nation: "汉",
          sex: "男",
          bornDate: "2019-11-13",
          honetown: "",
          isRegister: "",
          dadWorkplace: "",
          momWorkplace: "",
          learnStituation: "",
          boardingStituation: "",
          health: "",
          realMonitorStituation: "",
          contactPerson: "2019-12-19",
          contactPhone: "",
          remark: ""
        }
      ],
      */
    }
  },
  created() {
    this.getSelectOptions(['sex', 'ethnic'])
  },
  methods: {
    fetchTableDataListPromise(entity) {
      return leftBehindChildrenService.listLeftBehindChildren(entity)
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
