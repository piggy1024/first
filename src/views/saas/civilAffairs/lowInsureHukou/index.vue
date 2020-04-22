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
              <el-form-item label="低保类型">
                <el-select v-model="advanceQueryParams.lowIncomeType" placeholder="请选择" style="width:250px">
                  <el-option
                    v-for="item in lowIncomeTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="属别">
                <el-select v-model="advanceQueryParams.attribute" placeholder="请选择" style="width:250px">
                  <el-option
                    v-for="item in attributeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
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
              <el-form-item label="类型">
                <el-select v-model="advanceQueryParams.type" placeholder="请选择" style="width:250px">
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
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
          @click="$router.push('/civilAffairs/lowIncome/print')"
        >打印</el-button>
        <el-button
          type="primary"
          icon="el-icon-printer"
          @click="$router.push('/civilAffairs/lowIncome/export')"
        >导出</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="pwdDialog.isShow = true">删除</el-button>
      </div>
      <el-table :data="tableData" border class="cus-mb-20">
        <el-table-column type="selection" width="55px"></el-table-column>
        <el-table-column prop="id" width="55px"></el-table-column>
        <el-table-column prop="change" label="异动" width="100px"></el-table-column>
        <el-table-column prop="town" label="乡镇"></el-table-column>
        <el-table-column prop="cunju" label="村居"></el-table-column>
        <el-table-column prop="group" label="组"></el-table-column>
        <el-table-column label="姓名" prop="name">
          <span
            style="color: blue;text-decoration:underline"
          >{{ name }}</span>
        </el-table-column>
        <el-table-column prop="host" label="户主"></el-table-column>
        <el-table-column prop="idCard" label="身份证号/出生年月" width="150px"></el-table-column>
        <el-table-column prop="lowincomeType" label="低保类别"></el-table-column>
        <el-table-column prop="diffType" label="多重类型"></el-table-column>
        <el-table-column prop="attribute" label="属别"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="total" label="总人数"></el-table-column>
        <el-table-column prop="mate" label="配偶"></el-table-column>
        <el-table-column prop="mateIdCard" label="配偶身份证" width="150px"></el-table-column>
        <el-table-column prop="children" label="子女" width="100px"></el-table-column>
        <el-table-column prop="childrenIdCard" label="子女身份证" width="150px"></el-table-column>
        <el-table-column prop="parent" label="父母" width="100px"></el-table-column>
        <el-table-column prop="parentIdCard" label="父母身份证" width="150px"></el-table-column>
        <el-table-column prop="other" label="其他人" width="100px"></el-table-column>
        <el-table-column prop="otherIdCard" label="其他人身份证" width="150px"></el-table-column>
        <el-table-column prop="bankAccount" label="银行账号" width="100px"></el-table-column>
        <el-table-column prop="financeCode" label="财政代码" width="100px"></el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="100px"></el-table-column>
        <el-table-column prop="endTime" label="取消时间" width="100px"></el-table-column>
        <el-table-column prop="reson" label="原因"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作" width="210">
          <template>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="$router.push('/civilAffairs/lowInsureHukouEdit')"
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
      name: '徐健柏',
      tableData: [
        {
          id: 1,
          change: '123123123',
          town: '黄兴乡',
          cunju: '黄兴村',
          group: '组',
          name: '',
          host: '徐健柏',
          idCard: '6666666666666666',
          lowincomeType: '农村',
          diffType: '',
          attribute: '扶贫',
          type: 'A类',
          total: '1',
          mate: 'xx',
          mateIdCard: '',
          children: 'xx',
          childrenIdCard: '',
          parent: 'xx',
          parentIdCard: '',
          other: 'xx',
          otherIdCard: '',
          bankAccount: '1231231211',
          financeCode: '',
          startTime: '2019-12-19',
          endTime: '2020-03-05',
          reson: '',
          remark: ''
        }
      ],
      attributeOptions: [
        {
          label: '请选择',
          value: '0'
        },
        {
          label: '兜底',
          value: '1'
        },
        {
          label: '普通',
          value: '2'
        },
        {
          label: '扶贫',
          value: '3'
        }
      ],
      lowIncomeTypeOptions: [
        {
          label: '请选择',
          value: '0'
        },
        {
          label: '城市',
          value: '1'
        },
        {
          label: '农村',
          value: '2'
        }
      ],
      typeOptions: [
        {
          label: '请选择',
          value: '0'
        },
        {
          label: 'A类',
          value: '1'
        },
        {
          label: 'B类',
          value: '2'
        },
        {
          label: 'C类',
          value: '3'
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
