<template>
  <div class="app-container">
    <div class="result-box">
      <div class="btn-box cus-mb-10">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="dialogTableVisible = true"
        >新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="pwdDialog.isShow = true">删除</el-button>
      </div>
      <pwd-dialog :pwd-dialog="pwdDialog"></pwd-dialog>
      <el-dialog title="新增轮播图" :visible.sync="dialogTableVisible" width="550px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px">
          <el-form-item label="轮播图" prop="lunbotu">
            <el-upload>
              <el-button type="primary" style="width:400px">
                <span>选择文件</span>
              </el-button>
            </el-upload>
          </el-form-item>
          <el-row type="flex" justify="space-between" class="cus-mb-10">
            <el-col :span="12">
              <el-form-item label="排序:" prop="sort" style="width:230px">
                <el-input v-model="ruleForm.name" resize></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="启用状态:" prop="startStatus" style="width:230px">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                  <el-option label="前后台启用" value="shanghai"></el-option>
                  <el-option label="禁用" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer text-center">
          <el-button type="success" @click="dialogTableVisible = false">保存</el-button>
          <el-button type="primary" @click="dialogTableVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <el-table :data="tableData" border class="cus-mb-20">
        <el-table-column prop="id" label="序号" width="55px"></el-table-column>
        <el-table-column type="selection" label="选择" width="55px"></el-table-column>
        <el-table-column prop="pic" label="轮播图"></el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="startStatu" label="启动状态"></el-table-column>
        <el-table-column fixed="right" label="操作" width="85">
          <template>
            <el-button
              type="primary"
              size="mini"
              @click="dialogTableVisible = true"
              icon="el-icon-edit"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="cus-text-right"
        :current-page="1"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
        background
      ></el-pagination>
    </div>
    <pwd-dialog :pwd-dialog="pwdDialog"></pwd-dialog>
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
export default {
  components: {
    pwdDialog
  },
  name: 'UploadPic',
  data() {
    return {
      pwdDialog: {
        isShow: false
      },
      ruleForm: {
        lunbotu: undefined,
        sort: undefined,
        startStatus: undefined
      },
      rules: {
        lunbotu: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      dialogTableVisible: false,
      title: '农业支持保护补贴发放流程',
      tableData: [
        {
          id: 1,
          sort: 1,
          createTime: 'YYYY-MM-DD,hh:mm:ss',
          startStatu: '前后台启动'
        },
        {
          id: 2,
          sort: 2,
          createTime: 'YYYY-MM-DD,hh:mm:ss',
          startStatu: '前后台启动'
        }
      ],
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
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
      }
    }
  },
  created() {},
  methods: {}
}
</script>
