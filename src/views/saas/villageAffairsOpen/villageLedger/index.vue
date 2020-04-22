<template>
  <!-- 村务台账 -->
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl">
        <el-form :inline="true" class="cus-fl-1 cus-text-right" :style="{visibility:isHeightLevel?'hidden':'visible'}">
          <el-form-item>
            <el-input v-model="advanceQueryParams.applyPerson" placeholder="模糊搜索:申请人" suffix-icon="el-icon-search"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="fetchTableDataList()">搜索</el-button>
          </el-form-item>
        </el-form>
        <div class="btn-box">
          <el-button
            type="text"
            :icon="isHeightLevel? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            @click="isHeightLevel = !isHeightLevel"
          >高级搜索</el-button>
        </div>
      </div>
      <el-collapse-transition>
        <div class="height-level-box" v-show="isHeightLevel">
          <el-form label-width="70px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="7">
                <el-form-item label="申请人">
                  <el-input v-model="advanceQueryParams.applyPerson" placeholder="支持模糊搜索"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="事项类型">
                  <el-select v-model="advanceQueryParams.thingType" placeholder="请选择">
                    <el-option
                      v-for="item in selectOptionsMap.thingType"
                       :key="item.dataCode"
                      :label="item.meaning"
                      :value="item.dataCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="发表时间">
                  <el-date-picker
                    v-model="advanceQueryParams.queryDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="cus-text-right cus-pr-15">
            <el-button type="primary"  @click="fetchTableDataList()">搜索</el-button>
            <el-button @click="resetQueryParams()">清空</el-button>
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <div class="result-box">
      <div class="btn-box cus-mb-10">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="$router.push('/villageAffairsOpen/addLedger')"
        >新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="batchDelete('dataListTable', 'villageAffairsId')">删除</el-button>
        <el-button type="primary" icon="el-icon-printer">打印</el-button>
      </div>
      <el-table ref="dataListTable" v-loading="dataListLoading" :data="dataList" border class="cus-mb-20">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column label="受理事项" min-width="150">
          <template slot-scope="scope">
            <router-link
              class="text-blue"
              to="/villageAffairsOpen/detailLedger"
            >{{scope.row.acceptThing}}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="thingType" :formatter="formatColumn('thingType')" label="事项类型" width="100"></el-table-column>
        <el-table-column label="办理事项图" width="100">
          <template slot-scope="scope">
            <sv-image :sources="[scope.row.acceptThingPicture]"></sv-image>
            <!-- <img class="table-column--img" v-if="scope.row.acceptThingPicture" :src="$global.generateImgPath(scope.row.acceptThingPicture)" /> -->
          </template>
        </el-table-column>
        <el-table-column prop="acceptDate" label="受理时间" width="100">
          <template slot-scope="scope">
            {{scope.row.acceptDate | parseTime('{y}-{m}-{d}')}}
          </template>
        </el-table-column>
        <el-table-column prop="person.name" label="申请人" width="120"></el-table-column>
        <el-table-column prop="person.idCardNumber" label="申请人身份证" width="170"></el-table-column>
        <el-table-column prop="person.phoneNumber" label="申请人电话" width="120"></el-table-column>
        <el-table-column prop="villageCadre.villager.person.name" label="经办人" width="120"></el-table-column>
        <el-table-column prop="handleResult" :formatter="formatColumn('handleResult')" label="办理结果" width="120"></el-table-column>
        <el-table-column prop="settleDate" label="办结或退回日期" width="150">
          <template slot-scope="scope">
            {{scope.row.settleDate | parseTime('{y}-{m}-{d}')}}
          </template>
        </el-table-column>
        <el-table-column prop="villageCadre.villager.village.name" label="村组" min-width="120"></el-table-column>
        <el-table-column prop="wechatDisplay" :formatter="formatColumn('wechatDisplay')" label="微信端显示" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="210">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="$router.push('/villageAffairsOpen/editLedger/'+scope.row.villageAffairsId)"
            >编辑</el-button>
            <el-button type="danger" size="mini" @click="showDeleteAcceptThingPictureDialog(scope.row.villageAffairsId, scope.row)">删除办理事项图</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChangeHandler"
        @current-change="currentChangeHandler"
        class="cus-text-right"
        :current-page="otherQueryParams.page"
        :page-sizes="$global.configs.pagination.pageSizes"
        :page-size="otherQueryParams.pageSize"
        :layout="$global.configs.pagination.layout"
        :total="totalRecord"
        background
      ></el-pagination>
    </div>
    <el-dialog title="确认" width="30%" :visible.sync="outerVisible">
      <p>确认删除事项图吗？</p>
      <el-dialog width="30%" title="输入密码" :visible.sync="innerVisible" append-to-body>
        <el-input autocomplete="off" placeholder="请输入密码"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false; outerVisible = false">取 消</el-button>
          <!-- confirm -->
          <!-- innerVisible = false;outerVisible = false -->
          <el-button type="primary" @click="confirmToDeleteAcceptThingPicture">确定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">确定</el-button>
      </div>
    </el-dialog>
    <pwd-dialog :pwd-dialog="pwdDialog" @success="validPwdSuc"></pwd-dialog>
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
import VillageAffairsService from '@/api/villageAffairsOpen/VillageAffairsService'
import tableDataQueryMixin from '../_mixins/mixins'
import pwdDialog from '@/components/pwdDialog'
import svImage from '@/components/svImage/index'

export default {
  mixins: [tableDataQueryMixin],
  components: {
    pwdDialog,
    svImage
  },
  data() {
    return {
      isHeightLevel: false,
      dataList: [],
      currentRow: null, // 当前要操作的行
      outerVisible: false,
      innerVisible: false,
      // ****
      fastQueryParams: { // 快速搜索参数
        applyPerson: ''
      },
      advanceQueryParams: { // 高级搜索
        applyPerson: '',
        thingType: '',
        queryDate: null,
        startDate: '',
        endDate: ''
      },
      totalRecord: 0,
      selectOptionsMap: {
        thingType: [],
        wechatDisplay: [],
        handleResult: []
      }
    }
  },
  created() {
    this.getSelectOptions(['thingType', 'wechatDisplay', 'handleResult'])
  },
  methods: {
    confirmBatchDelete(idArrs) {
      return VillageAffairsService.removeBatchVillageAffairs(idArrs)
    },
    fetchTableDataListPromise(entity) {
      return VillageAffairsService.listVillageAffairs(entity)
    },
    getFastEntity() {
      return {
        page: this.otherQueryParams.page,
        pageSize: this.otherQueryParams.pageSize,
        applyPerson: this.advanceQueryParams.applyPerson
      }
    },
    getAdvanceEntity() {
      return {
        page: this.otherQueryParams.page,
        pageSize: this.otherQueryParams.pageSize,
        applyPerson: this.advanceQueryParams.applyPerson,
        thingType: this.advanceQueryParams.thingType,
        startDate: this.advanceQueryParams.queryDate && this.advanceQueryParams.queryDate[0],
        endDate: this.advanceQueryParams.queryDate && this.advanceQueryParams.queryDate[1]
      }
    },
    showDeleteAcceptThingPictureDialog(villageAffairsId, row) {
      this.outerVisible = true
      this.currentRow = row
    },
    confirmToDeleteAcceptThingPicture() {
      // 判断密码是否正确
      const villageAffairsId = this.currentRow.villageAffairsId
      VillageAffairsService.deleteAcceptThingPicture(villageAffairsId).then(() => {
        // 更新数据
        this.currentRow.acceptThingPicture = null
        // 关闭弹窗并提示成功
        this.outerVisible = false
        this.$message({
          message: '删除村务受理事项图成功！',
          type: 'success'
        })
      })
    }
  }
}
</script>
