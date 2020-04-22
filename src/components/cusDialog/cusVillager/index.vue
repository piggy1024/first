<template>
  <div>
    <el-dialog title="请选择村民" :visible.sync="isShow" :show-close="false" width="700" :close-on-click-modal="false" :modal-append-to-body="true" :append-to-body="true">
      <el-row type="flex" justify="space-between" :gutter="20" class="cus-mb-10">
        <el-col :span="20">
          <el-input placeholder="村民姓名/身份证号" v-model="queryParams.name"></el-input>
        </el-col>
        <el-col :span="4" class="cus-text-right">
          <el-button type="primary" @click="searchVillager('submit')">搜索</el-button>
        </el-col>
      </el-row>
      <el-table
        ref="table"
        border
        :data="dataList"
        highlight-current-row
        @current-change="handleCurrentChange"
        max-height="300"
      >
        <el-table-column
        type="selection"
        width="55"
        v-if="multiple">
        </el-table-column>
        <el-table-column property="person.name" label="姓名"></el-table-column>
        <el-table-column property="person.idCardNumber" label="身份证号" width="170"></el-table-column>
        <el-table-column property="age" label="年龄"></el-table-column>
        <el-table-column property="" label="所在组"></el-table-column>
        <el-table-column property="" label="所在户" min-width="90"></el-table-column>
        <el-table-column property="andHshdMasterRelate" label="与户主关系" min-width="100"></el-table-column>
      </el-table>
      <el-pagination
          class="cus-text-right"
          @size-change="sizeChangeHandler"
          @current-change="currentChangeHandler"
          :current-page="queryParams.page"
          :page-sizes="[10, 15, 20, 30]"
          :page-size="queryParams.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="totalRecord"
          background
        ></el-pagination>
      <div slot="footer" class="dialog-footer text-center">
        <el-button type="primary" @click="confirm()">确 定</el-button>
        <el-button @click="cancel()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">

</style>

<script>
import request from '@/utils/request'
const API_URL = '/saas-smart-village/villager/listVillagerByAdvanced' // 获取村民
const SUBMIT_FLAG = 'submit'

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    multiple: { // 单选多选，默认单选
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      totalRecord: 0,
      queryParams: {
        name: '',
        pageSize: 10,
        page: 1
      },
      dataList: [],
      selectedColumns: [], // 可能用于以后多选
      currentSelectedColumn: null
    }
  },
  created() {
    this.searchVillager()
  },
  methods: {
    sizeChangeHandler(size) {
      this.queryParams.pageSize = size
      this.searchVillager()
    },
    currentChangeHandler(page) {
      this.queryParams.page = page
      this.searchVillager()
    },
    handleCurrentChange(val) {
      console.log(val)
      this.currentSelectedColumn = val
    },
    searchVillager(flag) {
      const Entity = {}
      if (this.queryParams.name !== '' && this.queryParams.name.match(/^\d+$/)) {
        Entity.idCardNumber = this.queryParams.name
      } else {
        Entity.name = this.queryParams.name
      }
      request({
        url: API_URL,
        method: 'post',
        data: {
          ...Entity,
          page: flag === SUBMIT_FLAG ? 1 : this.queryParams.page,
          pageSize: this.queryParams.pageSize
        }
      }).then((data) => {
        console.log('villager: ', data)
        this.dataList = data.dataList
        this.totalRecord = data.totalRecord
      })
    },
    isShowChange() {
      this.$emit('is-show-change', false)
    },
    _closeDialog() {
      this.$emit('is-show-change', false)
    },
    confirm() {
      this._closeDialog()
      if (this.currentSelectedColumn) {
        this.$emit('confirm', this.currentSelectedColumn)
      } else {
        console.warn('尚未选中数据')
      }
    },
    cancel() {
      this._closeDialog()
    }
  }
}
</script>
