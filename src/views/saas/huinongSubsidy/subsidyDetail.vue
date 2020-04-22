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
            <el-form :inline="true" label-width="80px" class="demo-form-inline clearfix">
              <el-row :gutter="20">
                <el-form-item label="村民姓名">
                  <el-input v-model="listQuery.name" placeholder="支持模糊搜索" style="width:190px"></el-input>
                </el-form-item>
                <el-form-item label="补贴类型">
                  <el-select v-model="listQuery.sex" placeholder="请选择" style="width:350px">
                    <el-option label="男" value="man"></el-option>
                    <el-option label="女" value="women"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="身份证号">
                  <el-input v-model="listQuery.idNumber" placeholder="支持模糊搜索" style="width:200px"></el-input>
                </el-form-item>
              </el-row>
              <el-row :gutter="20">
                <el-form-item label="财政代码">
                  <el-input
                    v-model="listQuery.financeCode"
                    placeholder="支持模糊搜索"
                    style="width:190px"
                  ></el-input>
                </el-form-item>
                <el-form-item label="发放日期">
                  <el-date-picker
                    class="pick_width"
                    v-model="listQuery.sex"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="  结束日期"
                    align="right"
                    size="small"
                    unlink-panels
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="村民状态">
                  <el-select v-model="listQuery.statu" placeholder="请选择">
                    <el-option
                      v-for="item in statusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
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
            icon="el-icon-plus"
            @click="$router.push('/huinongSubsidy/addSubsidyDetail')"
          >新增</el-button>
          <el-button type="primary" icon="el-icon-out">批量导入</el-button>
          <el-button type="primary" icon="el-icon-upload2">导出</el-button>
          <el-button type="primary" icon="el-icon-printer">打印</el-button>
        </div>
        <el-table :data="tableData" border class="cus-mb-20">
          <el-table-column type="selection" width="55px"></el-table-column>
          <el-table-column prop="id" width="55px"></el-table-column>
          <el-table-column prop="town" label="乡镇名"></el-table-column>
          <el-table-column prop="vilName" label="村名"></el-table-column>
          <el-table-column prop="financeCode" label="财政代码" width="100"></el-table-column>
          <el-table-column prop="allowanceType" label="补贴类型" width="200px"></el-table-column>
          <el-table-column prop="allowanceObject" label="补贴对象"></el-table-column>
          <el-table-column prop="idCard" label="身份证号" width="150px"></el-table-column>
          <el-table-column prop="allowanceStandard" label="补贴标准"></el-table-column>
          <el-table-column prop="allowanceCount" label="补贴数量"></el-table-column>
          <el-table-column prop="allowanceMoney" label="补贴金额(元)" width="120px"></el-table-column>
          <el-table-column prop="releaseDate" label="发放日期" width="100px"></el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template>
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="$router.push('/huinongSubsidy/addSubsidyDetail')"
              >修改</el-button>
              <el-button type="primary" icon="el-icon-edit" size="mini">详情</el-button>
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
  </div>
</template>

<style scoped lang="scss">
.height-level-box /deep/ {
  .el-form-item .el-input {
    width: 100%;
  }
  .el-form-item .el-date-editor {
    max-width: 400px;
  }
}
.pick_width {
  width: 350px;
  .el-date-editor_inner {
    width: 60px;
  }
  .el-input__inner {
    margin-left: 10px;
  }
}
</style>

<script>
export default {
  name: 'Allowance',
  data() {
    return {
      isHeightLevel: false,
      isShowTree: false,
      name: 'AB',
      tableData: [
        {
          id: 1,
          town: '演示乡',
          vilName: '演示村',
          allowanceItem: '生活性补贴',
          financeCode: 'CZDM001',
          allowanceType: '农村最低生活保障资金',
          allowanceObject: 'A',
          idCard: '4192891987112943',
          releaseDate: '2020-01-01',
          allowanceStandard: '100元/人',
          allowanceCount: '2',
          allowanceMoney: '200'
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
      statusOptions: [
        {
          label: '请选择',
          value: '0'
        },
        {
          label: '在家',
          value: '1'
        },
        {
          label: '读书',
          value: '2'
        },
        {
          label: '服兵役',
          value: '3'
        },
        {
          label: '转入',
          value: '4'
        },
        {
          label: '转出',
          value: '5'
        },
        {
          label: '外出务工',
          value: '6'
        }
      ],
      tableKey: 0,
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        relation: undefined,
        idCard: undefined,
        sex: undefined,
        name: undefined,
        status: undefined,
        title: undefined,
        type: undefined,
        sort: '+id',
        value1: ''
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
      textMap: {
        update: '编辑',
        create: '创建'
      }
    }
  },
  created() {},
  methods: {}
}
</script>
