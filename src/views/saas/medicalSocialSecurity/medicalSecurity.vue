<template>
  <div class="app-container">
    <div :class="{'left-container':true,'show-width': isShowTree}">
      <h4 class="text-center tree-title">
        行政区域树
        <i class="el-icon-d-arrow-left" @click="isShowTree = true"></i>
      </h4>
      <div style="padding:0 10px 10px">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-tree
          class="filter-tree"
          :data="data"
          node-key="id"
          :props="defaultProps"
          @node-click="getCurrentKey()"
          default-expand-all
          :filter-node-method="filterNode"
          ref="tree"
        ></el-tree>
      </div>
    </div>
    <i class="el-icon-d-arrow-right tree-collapse" v-show="isShowTree" @click="isShowTree = false"></i>
    <div class="right-container" :class="{'is-add-margin': !isShowTree}">
      <div class="filter-container cus-bg-fa">
        <p class="filter-title">查询条件</p>
        <div class="filter-box cus-d-fl">
          <el-form :inline="true" class="cus-fl-1 cus-text-right">
            <el-form-item>
              <el-input
                v-model="listQuery.name"
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
            <el-form :inline="true" label-width="90px" class="demo-form-inline clearfix">
              <el-form-item label="村民姓名:">
                <el-input v-model="listQuery.name" placeholder="支持模糊搜索" style="width:205px"></el-input>
              </el-form-item>
              <el-form-item label="保险类别:">
                <el-select v-model="listQuery.coverage" placeholder="请选择">
                  <el-option
                    v-for="item in coverageOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="身份证号:">
                <el-input v-model="listQuery.idCard" placeholder="支持模糊搜索" style="width:205px"></el-input>
              </el-form-item>
              <el-form-item label="医保账号:">
                <el-input v-model="listQuery.name" placeholder="支持模糊搜索" style="width:205px"></el-input>
              </el-form-item>
              <el-form-item label="缴费统计:">
                <el-select v-model="listQuery.years" placeholder="请选择">
                  <el-option
                    v-for="item in yearsOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
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
            icon="el-icon-circle-plus-outline"
            @click="$router.push('/medicalSocialSecurity/addMedicalSecurity')"
          >新增</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="pwdDialog.isShow = true">删除</el-button>
          <el-button type="primary" icon="el-icon-printer">导出</el-button>
          <el-button type="primary" icon="el-icon-printer">打印</el-button>
        </div>
        <el-table :data="tableData" border class="cus-mb-20">
          <el-table-column type="selection" width="55px"></el-table-column>
          <el-table-column prop="id" label="序号" width="55px"></el-table-column>
          <el-table-column prop="name" label="村民姓名"></el-table-column>
          <el-table-column prop="relation" label="与户主关系" width="100px"></el-table-column>
          <el-table-column prop="sex" label="性别" width="50px"></el-table-column>
          <el-table-column prop="age" label="年龄" width="50px"></el-table-column>
          <el-table-column prop="idCard" label="身份证号" width="130px"></el-table-column>
          <el-table-column prop="address" label="户籍地址" width="130px"></el-table-column>
          <el-table-column prop="birthDate" label="出生日期" width="130px"></el-table-column>
          <el-table-column prop="nation" label="民族"></el-table-column>
          <el-table-column prop="account" label="医保账号" width="130px"></el-table-column>
          <el-table-column prop="attribute" label="参保属性"></el-table-column>
          <el-table-column prop="type" label="医保类型" width="130px"></el-table-column>
          <el-table-column prop="money" label="缴费金额"></el-table-column>
          <el-table-column prop="date" label="缴费日期" width="130px"></el-table-column>
          <el-table-column prop="number" label="票据号码"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column label="操作" fixed="right">
            <template>
              <el-button
                type="primary"
                size="mini"
                @click="$router.push('/medicalSocialSecurity/addMedicalSecurity')"
                icon="el-icon-edit-outline"
              >编辑</el-button>
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
export default {
  components: {
    pwdDialog
  },
  name: 'MedicalSecurity',
  data() {
    return {
      pwdDialog: {
        isShow: false
      },
      isShowTree: false,
      isHeightLevel: false,
      tableData: [
        {
          id: 1,
          name: 'AB',
          relation: '户主',
          sex: '男',
          age: '40',
          idCard: 'xxxxxxxxxxxxxxx',
          address: 'xx村xx',
          birthDate: 'YYYY-MM-DD',
          nation: '汉族',
          account: 'XXXXXXXXXXX',
          attribute: '连续参加',
          type: '新农合医疗保险',
          money: '100',
          date: 'YYYY-MM-DD',
          number: '0456354',
          remark: ''
        },
        {
          id: 2
        }
      ],
      data: [
        {
          id: 1,
          label: '河北省',
          children: [
            {
              id: 4,
              label: '刑台市',
              children: [
                {
                  id: 9,
                  label: '演示县',
                  children: [
                    {
                      id: 10,
                      label: '演示村'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      coverageOptions: [
        {
          label: '请选择',
          value: '0'
        },
        {
          label: '无',
          value: '1'
        },
        {
          label: '新农合医疗保险',
          value: '2'
        },
        {
          label: '城镇医疗保险',
          value: '3'
        }
      ],
      yearsOptions: [
        {
          label: '请选择',
          value: '0'
        },
        {
          label: '2015',
          value: '1'
        },
        {
          label: '2015',
          value: '2'
        },
        {
          label: '2016',
          value: '3'
        },
        {
          label: '2017',
          value: '4'
        },
        {
          label: '2018',
          value: '5'
        },
        {
          label: '2019',
          value: '6'
        },
        {
          label: '2020',
          value: '7'
        },
        {
          label: '2021',
          value: '8'
        },
        {
          label: '2022',
          value: '9'
        },
        {
          label: '2023',
          value: '10'
        },
        {
          label: '2024',
          value: '11'
        },
        {
          label: '2025',
          value: '12'
        },
        {
          label: '2026',
          value: '13'
        },
        {
          label: '2027',
          value: '14'
        },
        {
          label: '2028',
          value: '15'
        },
        {
          label: '2029',
          value: '16'
        },
        {
          label: '2030',
          value: '17'
        },
        {
          label: '2031',
          value: '18'
        },
        {
          label: '2032',
          value: '19'
        },
        {
          label: '2033',
          value: '20'
        },
        {
          label: '2034',
          value: '21'
        },
        {
          label: '2035',
          value: '22'
        },
        {
          label: '2036',
          value: '23'
        },
        {
          label: '2037',
          value: '24'
        },
        {
          label: '2038',
          value: '25'
        },
        {
          label: '2039',
          value: '26'
        },
        {
          label: '2040',
          value: '27'
        },
        {
          label: '2041',
          value: '28'
        },
        {
          label: '2042',
          value: '29'
        },
        {
          label: '2043',
          value: '30'
        },
        {
          label: '2044',
          value: '31'
        },
        {
          label: '2045',
          value: '32'
        },
        {
          label: '2046',
          value: '33'
        },
        {
          label: '2047',
          value: '34'
        },
        {
          label: '2048',
          value: '35'
        },
        {
          label: '2049',
          value: '36'
        },
        {
          label: '2050',
          value: '37'
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
