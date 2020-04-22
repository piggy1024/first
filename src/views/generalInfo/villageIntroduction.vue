<template>
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl">
        <el-form :inline="true" class="cus-fl-1 cus-text-right">
          <el-form-item>
            <el-input v-model="listQuery.name" placeholder="普通模糊搜索:标题" suffix-icon="el-icon-search"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn-box">
          <el-button type="primary">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="result-box">
      <div class="btn-box cus-mb-10">
        <el-button type="danger" icon="el-icon-delete" @click="dialogTableVisible =true">删除</el-button>
      </div>
      <el-dialog title="确认" :visible.sync="dialogTableVisible" width="550px">
        <p>
          <span>
            <i class="el-icon-key" /> 确认要删除选中的村级介绍吗?
          </span>
        </p>
        <div slot="footer" class="dialog-footer text-center">
          <el-button type="primary" @click="dialogTableVisible = false,dialogTableVisible1 =true">确认</el-button>
          <el-button @click="dialogTableVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <el-dialog title="确认" :visible.sync="dialogTableVisible1" width="550px">
        <el-form>
          <el-col :span="16">
            <el-form-item label="请输入密码" prop="pwd">
              <el-input style="width:200px"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer text-center">
          <el-button type="primary" @click="dialogTableVisible1 = false">确认</el-button>
          <el-button @click="dialogTableVisible1 = false">取消</el-button>
        </div>
      </el-dialog>
      <el-table :data="tableData" border class="cus-mb-20">
        <el-table-column type="selection" width="55px"></el-table-column>
        <el-table-column prop="id" label="序号" width="55px"></el-table-column>
        <el-table-column label="标题" prop="title">
          <span
            style="color: blue;text-decoration:underline"
            @click="$router.push('/generalInfo/xiangqing')"
          >演示村</span>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="85">
          <template>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="$router.push('/generalInfo/addIntroduce')"
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
export default {
  name: 'Index',
  data() {
    return {
      dialogTableVisible: false,
      dialogTableVisible1: false,
      title: '演示村',
      tableData: [
        {
          id: 1,
          title: '演示村'
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
