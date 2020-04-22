<template>
<!-- 干部通讯录 -->
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl">
        <el-form :inline="true" class="cus-fl-1 cus-text-right">
          <el-form-item>
            <el-input
              v-model="advanceQueryParams.name"
              placeholder="普通模糊搜索:干部名称"
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
          <el-form :inline="true" label-width="90px" class="demo-form-inline clearfix">
            <el-form-item label="干部名称:">
              <el-input v-model="advanceQueryParams.name" placeholder="支持模糊搜索" style="width:205px"></el-input>
            </el-form-item>
            <el-form-item label="干部职务:">
              <el-select v-model="advanceQueryParams.duties" placeholder="请选择">
                <el-option
                  v-for="item in selectOptionsMap.duties"
                  :key="item.dataCode"
                  :label="item.meaning"
                  :value="item.dataCode"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <div class="cus-text-right cus-pr-15">
            <el-button type="primary" @click="fetchTableDataList('submit')">搜索</el-button>
            <el-button @click="resetQueryParams">清空</el-button>
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <div class="result-box">
      <div class="btn-box cus-mb-10">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addIntermediaService"
        >新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="batchDelete('dataListTable', 'villageCadreId')">删除</el-button>
      </div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" width="550px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px">
          <el-row type="flex" justify="space-between" class="cus-mb-10">
            <el-col :span="12">
              <el-form-item label="干部姓名:" prop="villager.person.name" style="width:240px">
                <!-- <el-input v-model="ruleForm.villager.name"></el-input> -->
                <select-villager-cadre v-model="ruleForm.villager.person.name" @confirm="confirmSelectVillagerCadreHandler"></select-villager-cadre>
              </el-form-item>
              <el-form-item label="职务:" prop="duties" style="width:240px">
                <el-select v-model="ruleForm.duties" placeholder="请选择">
                  <el-option
                    v-for="item in selectOptionsMap.duties"
                    :key="item.dataCode"
                    :label="item.meaning"
                    :value="item.dataCode"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="组别:" prop="villageGroup" style="width:240px">
                <el-select v-model="ruleForm.villageGroup" placeholder="请选择(村组队)">
                  <el-option
                    v-for="item in selectOptionsMap.villageGroups"
                    :key="item.dataCode"
                    :label="item.meaning"
                    :value="item.dataCode"
                    ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- <el-form-item label="联系人:" prop="villager.person.phoneNumber" style="width:240px">
                <el-input v-model="ruleForm.villager.phoneNumber"></el-input>
              </el-form-item> -->
              <el-form-item label="联系电话:" prop="villager.person.phoneNumber" style="width:240px">
                <el-input v-model="ruleForm.villager.person.phoneNumber"></el-input>
              </el-form-item>
              <el-form-item label="电话短号:" prop="phoneShortNo" style="width:240px">
                <el-input v-model="ruleForm.phoneShortNo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="上传照片" prop="photo">
            <uploader v-model="ruleForm.photo"></uploader>
          </el-form-item>
          <el-form-item label="职务介绍:" prop="dutiesIntroduce">
            <el-input type="textarea" v-model="ruleForm.dutiesIntroduce" style="width:400px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer text-center">
          <el-button type="success" @click="submit">保存</el-button>
          <el-button type="primary" @click="dialogTableVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <el-table v-loading="dataListLoading" :data="dataList" ref="dataListTable" border class="cus-mb-20">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="序号" width="50px"></el-table-column>
        <el-table-column label="干部姓名" prop="villager.person.name"></el-table-column>
        <el-table-column prop="photo" label="照片">
          <template slot-scope="scope">
            <sv-image :sources="[scope.row.photo]"></sv-image>
            <!-- <img class="table-column--img" :src="$global.generateImgPath(scope.row.photo)" /> -->
          </template>
        </el-table-column>
        <el-table-column prop="duties" :formatter="formatColumn('duties')" label="职务"></el-table-column>
        <el-table-column prop="villager.person.phoneNumber" label="电话" width="120px"></el-table-column>
        <el-table-column prop="phoneShortNo" label="电话短号"></el-table-column>
        <el-table-column prop="dutiesIntroduce" label="职务介绍" width="250px"></el-table-column>
        <el-table-column fixed="right" label="操作" width="85">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="editIntermediaService(scope)"
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
.filter-container {
  border-radius: 3px;
  padding: 0px 15px 10px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .filter-title {
    text-align: left;
    line-height: 40px;
    margin: 0;
    color: #666;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
    font-size: 14px;
  }

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
import VillageCadreService from '@/api/comprehensiveInfo/VillageCadreService'
import selectVillagerCadre from '@/components/cusDialog/selectVillagerCadre/index'
import Uploader from '@/components/uploader/index'
import AdmstrAreaService from '@/api/AdmstrAreaService'
import FileService from '@/api/FileService'
import svImage from '@/components/svImage/index'

export default {
  mixins: [tableDataQueryMixin],
  components: {
    pwdDialog,
    selectVillagerCadre,
    Uploader,
    svImage
  },
  name: 'AddressBook',
  data() {
    return {
      actionType: '', // ADD 新增 || EDIT 编辑
      actionTypeAdd: 'ADD',
      actionTypeEdit: 'EDIT',
      dialogTitle: '',
      ruleForm: {
        villager: {
          person: {
            name: '',
            phoneNumber: ''
          }
        },
        duties: '',
        villageGroup: '',
        contactPhone: '',
        phoneShortNo: '',
        photo: '',
        dutiesIntroduce: '',
        villagerId: ''
      },
      immutableRuleForm: {},
      rules: {
        'villager.person.name': [{ required: true, message: '请选择干部', trigger: 'change' }],
        duties: [{ required: true, message: '请选择职务', trigger: 'change' }]
      },
      positionOptions: [
        {
          label: '请选择',
          value: '0'
        },
        {
          label: '村(社区)支部书记',
          value: '1'
        },
        {
          label: '村(社区)主任',
          value: '2'
        },
        {
          label: '村(社区)只两委',
          value: '3'
        },
        {
          label: '村(社区)委委员',
          value: '4'
        },
        {
          label: '村(社区)组长',
          value: '5'
        }
      ],
      dialogTableVisible: false,
      isHeightLevel: false,
      title: '农业支持保护补贴发放流程',
      dataList: [],
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        sex: undefined,
        name: undefined,
        title: undefined,
        thingType: undefined
      },
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        name: '',
        relation: '',
        sex: '',
        age: '',
        idCard: '',
        address: '',
        phone: '',
        nation: ''
      },
      // *****
      advanceQueryParams: {
        name: '',
        duties: ''
      },
      totalRecord: 0,
      selectOptionsMap: {
        duties: [],
        villageGroups: []
      }
    }
  },
  created() {
    this.getSelectOptions(['duties'])
    this.fetchVillageGroup()
    this.immutableRuleForm = JSON.parse(JSON.stringify(this.ruleForm))
  },
  methods: {
    confirmBatchDelete(idArrs) {
      return VillageCadreService.removeBatchVillageCadre(idArrs)
    },
    // 获取村子下的各个大队
    fetchVillageGroup() {
      function transform(villageGroupsArr) {
        return villageGroupsArr.map(vg => ({
          dataCode: vg.admstrAreaId,
          meaning: vg.name
        }))
      }

      const villageId = this.$global.userInfo.companyId
      const ShowLevel = '7' // 大队所在的level
      if (villageId) {
        AdmstrAreaService.treeChildAdmstrAreaList(villageId).then(ret => {
          console.log('group: ', ret)
          const villageGroups = ret.filter(g => g.level === ShowLevel)
          const villageGroupOptions = transform(villageGroups)
          this.selectOptionsMap.villageGroups = villageGroupOptions
        })
      }
    },
    fetchTableDataListPromise(entity) {
      return VillageCadreService.listVillageCadre(entity)
    },
    getFastEntity() {
      return {
        name: this.advanceQueryParams.name
      }
    },
    getAdvanceEntity() {
      return {
        name: this.advanceQueryParams.name,
        duties: this.advanceQueryParams.duties
      }
    },
    confirmSelectVillagerCadreHandler(data) {
      const villagerId = data.villager.person.personId
      this.ruleForm.villagerId = villagerId
    },
    addIntermediaService() {
      this.actionType = this.actionTypeAdd
      this.dialogTitle = '新增干部信息'
      this.dialogTableVisible = true
      this.$nextTick(() => {
        this.ruleForm = this.immutableRuleForm
      })
    },
    editIntermediaService(scope) {
      this.actionType = this.actionTypeEdit
      this.dialogTitle = '编辑干部信息'
      this.dialogTableVisible = true
      this.$nextTick(() => {
        this.ruleForm = this.immutableRuleForm
        const cloneRow = JSON.parse(JSON.stringify(scope.row))
        this.ruleForm = cloneRow
      })
    },
    commitFileIdList() {
      const fileIdList = [
        this.ruleForm.photo || ''
      ].filter(d => d !== '')
      FileService.commitSaveFileList(fileIdList)
    },
    submit() {
      if (this.actionType === this.actionTypeAdd) {
        VillageCadreService.saveVillageCadre(this.ruleForm).then(() => {
          this.$message({
            message: '新增成功！',
            type: 'success'
          })
          // commit 图片
          this.commitFileIdList()
        })
      }
      if (this.actionType === this.actionTypeEdit) {
        VillageCadreService.updateVillageCadre(this.ruleForm).then(() => {
          this.$message({
            message: '编辑成功！',
            type: 'success'
          })
          // commit 图片
          this.commitFileIdList()
        })
      }
    }
  }
}
</script>
