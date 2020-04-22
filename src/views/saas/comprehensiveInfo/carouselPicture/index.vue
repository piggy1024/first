<template>
  <div class="app-container">
    <div class="result-box">
      <div class="btn-box cus-mb-10">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addCarouseHandler"
        >新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="batchDelete('dataListTable', 'carouselPictureId')">删除</el-button>
      </div>
      <pwd-dialog :pwd-dialog="pwdDialog"></pwd-dialog>
      <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" width="550px">
        <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="85px">
          <el-form-item label="轮播图" prop="carouselPicture">
            <uploader v-model="formData.carouselPicture"></uploader>
          </el-form-item>
          <el-row type="flex" justify="space-between" class="cus-mb-10">
            <el-col :span="12">
              <el-form-item label="排序:" prop="sortNo" style="width:230px">
                <el-input v-model="formData.sortNo" resize></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="启用状态:" prop="enableStatus" style="width:230px">
                <el-select v-model="formData.enableStatus" placeholder="请选择">
                  <el-option
                    v-for="item in selectOptionsMap.enableStatus1"
                    :label="item.meaning"
                    :value="item.dataCode"
                    :key="item.dataCode"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer text-center">
          <el-button type="success" @click="submit('ruleForm')">保存</el-button>
          <el-button type="primary" @click="dialogTableVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <el-table v-loading="dataListLoading" :data="dataList" ref="dataListTable" border class="cus-mb-20">
        <el-table-column type="index" label="序号" width="55px"></el-table-column>
        <el-table-column type="selection" label="选择" width="55px"></el-table-column>
        <el-table-column prop="pic" label="轮播图">
          <template slot-scope="scope">
            <sv-image :sources="[scope.row.carouselPicture]"></sv-image>
            <!-- <img :src="$global.generateImgPath(scope.row.carouselPicture)" class="table-column--img" /> -->
          </template>
        </el-table-column>
        <el-table-column prop="sortNo" label="排序"></el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            {{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
          </template>
        </el-table-column>
        <el-table-column prop="enableStatus" :formatter="formatColumn('enableStatus', 'enableStatus1')" label="启动状态"></el-table-column>
        <el-table-column fixed="right" label="操作" width="85">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="editCarouseHandler(scope)"
              icon="el-icon-edit"
            >修改</el-button>
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
    <pwd-dialog :pwd-dialog="pwdDialog" @success="validPwdSuc"></pwd-dialog>
  </div>
</template>

<style scoped lang="scss">
.result-box {
  /* background-color: #f5f7f9; */
  /* border-radius: 3px; */
  /* padding: 10px 15px; */
  /* box-shadow: 0 1px 3px 0 rgba(0,0,0,0.12), 0 0 3px 0 rgba(0,0,0,0.04); */
  /deep/ .btn-box {
    margin-bottom: 10px;
  }
}
</style>

<script>
import pwdDialog from '@/components/pwdDialog'
import tableDataQueryMixin from '../_mixins/mixins'
import CrouselPictureService from '@/api/comprehensiveInfo/CrouselPictureService'
import Uploader from '@/components/uploader/index'
import FileService from '@/api/FileService'
import svImage from '@/components/svImage/index'

export default {
  mixins: [tableDataQueryMixin],
  components: {
    pwdDialog,
    Uploader,
    svImage
  },
  name: 'UploadPic',
  data() {
    return {
      actionType: '',
      actionTypeAdd: 'ADD',
      actionTypeEdit: 'EDIT',
      formData: {
        carouselPicture: '',
        sortNo: '',
        enableStatus: '',
        villageId: ''
      },
      immutableFormData: {},
      rules: {
        carouselPicture: [{ required: true, message: '请选择图片', trigger: 'change' }]
      },
      dialogTableVisible: false,
      dialogTitle: '',
      dataList: [],
      // *****
      advanceQueryParams: {},
      totalRecord: 0,
      selectOptionsMap: {
        enableStatus1: []
      }
    }
  },
  created() {
    this.getSelectOptions(['enableStatus1'])
    this.immutableFormData = JSON.parse(JSON.stringify(this.formData))
  },
  methods: {
    confirmBatchDelete(idArrs) {
      return CrouselPictureService.removeBatchCarouselPicture(idArrs)
    },
    fetchTableDataListPromise(entity) {
      return CrouselPictureService.listCarouselPicture(entity)
    },
    getFastEntity() {
      return {}
    },
    getAdvanceEntity() {
      return {}
    },
    addCarouseHandler() {
      this.dialogTitle = '新增轮播图'
      this.dialogTableVisible = true
      this.actionType = this.actionTypeAdd
      this.$nextTick(() => {
        this.formData = JSON.parse(JSON.stringify(this.immutableFormData))
      })
    },
    editCarouseHandler(scope) {
      const cloneRow = JSON.parse(JSON.stringify(scope.row))
      this.dialogTitle = '编辑轮播图'
      this.dialogTableVisible = true
      this.actionType = this.actionTypeEdit
      this.$nextTick(() => {
        this.formData = cloneRow
      })
    },
    commitSaveFileList() {
      // commit 图片
      const fileIdList = [
        this.formData.carouselPicture || ''
      ].filter(d => d !== '')
      FileService.commitSaveFileList(fileIdList)
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formData.villageId = this.$global.userInfo.companyId
          if (this.actionType === this.actionTypeAdd) {
            CrouselPictureService.saveCarouselPicture(this.formData).then(() => {
              this.$message({
                message: '新增成功！',
                type: 'success'
              })
              this.dialogTableVisible = false
              // commit 图片
              this.commitSaveFileList()
              this.fetchTableDataList()
            })
          }
          if (this.actionType === this.actionTypeEdit) {
            CrouselPictureService.updateCarouselPicture(this.formData).then(() => {
              this.$message({
                message: '编辑成功！',
                type: 'success'
              })
              this.dialogTableVisible = false
              // commit 图片
              this.commitSaveFileList()
              this.fetchTableDataList()
            })
          }
        }
      })
    }
  }
}
</script>
