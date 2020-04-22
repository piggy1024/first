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
        <div class="height-level-box cus-pa-tb-10 cus-bg-f5f7f9" v-show="isHeightLevel">
          <el-form :inline="true" label-width="90px" class="demo-form-inline clearfix">
            <el-row>
              <el-form-item label="村民姓名">
                <el-input v-model="advanceQueryParams.name" placeholder="支持模糊搜索" style="width:250px"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="advanceQueryParams.sex" placeholder="请选择" style="width:250px">
                  <el-option label="男" value="man"></el-option>
                  <el-option label="女" value="women"></el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="身份证号">
                <el-input v-model="advanceQueryParams.idNumber" placeholder="支持模糊搜索" style="width:250px"></el-input>
              </el-form-item>
              <el-form-item label="财政代码">
                <el-input v-model="advanceQueryParams.financeCode" placeholder="支持模糊搜索" style="width:250px"></el-input>
              </el-form-item>
              <el-form-item label="是否取消">
                <el-select v-model="advanceQueryParams.statu" placeholder="请选择" style="width:250px">
                  <el-option label="是" value="shanghai"></el-option>
                  <el-option label="否" value="beijing"></el-option>
                </el-select>
              </el-form-item>
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
        <el-button
          type="primary"
          icon="el-icon-printer"
        >打印</el-button>
        <el-button
          type="primary"
          icon="el-icon-printer"
        >导出</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="pwdDialog.isShow = true">删除</el-button>
      </div>
      <el-table :data="tableData" border class="cus-mb-20">
        <el-table-column type="selection" width="55px"></el-table-column>
        <el-table-column prop="id" width="55px"></el-table-column>
        <el-table-column label="姓名" prop="name">
          <span
            style="color: blue;text-decoration:underline"
          >{{ name }}</span>
        </el-table-column>
        <el-table-column prop="nation" label="民族"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="idCard" label="身份证号" width="150px"></el-table-column>
        <el-table-column prop="diffType" label="多重类型"></el-table-column>
        <el-table-column prop="financeCode" label="财政代码" width="100px"></el-table-column>
        <el-table-column prop="bankAccount" label="银行账号" width="150px"></el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="100px"></el-table-column>
        <el-table-column prop="endTime" label="取消时间" width="100px"></el-table-column>
        <el-table-column prop="contactPhone" label="联系电话" width="100px"></el-table-column>
        <el-table-column prop="address" label="地址" width="200px"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作" width="210">
          <template>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="$router.push('/civilAffairs/distressHukouEdit')"
            >编辑</el-button>
            <el-button
              type="primary"
              icon="el-icon-printer"
              size="mini"
            >资料上传</el-button>
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
import pwdDialog from '@/components/pwdDialog'
export default {
  components: {
    pwdDialog
  },
  name: 'Index',
  data() {
    return {
      pwdDialog: {
        isShow: false
      },
      isHeightLevel: false,
      name: '张三',
      tableData: [
        {
          id: 1,
          name: '张三',
          idCard: '6666666666666666',
          diffType: '优扶对象',
          sex: '男',
          cardName: '',
          cardIdCard: '',
          caedAccount: '',
          financeCode: '',
          changeMoney: '',
          enjoyName: '',
          startTime: '2019-12-19',
          endTime: '2020-03-05',
          address: '演示县演示镇演示村1队',
          remark: ''
        }
      ],
      list: null,
      total: 0,
      advanceQueryParams: {
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
