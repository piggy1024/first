<template>
  <div class="app-container">
    <div class="filter-container cus-bg-fa">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl">
        <el-form :inline="true" class="cus-fl-1 cus-text-right">
          <el-form-item>
            <el-input
              v-model="tableData.name"
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
          <el-form :inline="true" label-width="100px" class="demo-form-inline clearfix">
            <el-form-item label="标题">
              <el-input v-model="listQuery.name" placeholder="支持模糊搜索" style="width:205px"></el-input>
            </el-form-item>
            <el-form-item label="公共文化类型">
              <el-select v-model="listQuery.public" placeholder="请选择">
                <el-option
                  v-for="item in publicCultureOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                class="pick_width"
                v-model="listQuery.sex"
                type="daterange"
                range-separator="至"
                start-placeholder="选择日期"
                end-placeholder="  选择日期"
                align="right"
                size="small"
                unlink-panels
              ></el-date-picker>
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
          @click="$router.push('/publicCulture/add')"
        >新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="pwdDialog.isShow = true">删除</el-button>
        <el-button type="primary" icon="el-icon-printer">打印</el-button>
      </div>
      <el-table :data="tableData" border class="cus-mb-20">
        <el-table-column type="selection" width="55px"></el-table-column>
        <el-table-column prop="id" label="序号" width="55px"></el-table-column>
        <el-table-column prop="name" label="标题"></el-table-column>
        <el-table-column prop="sex" label="公共文化类型" width="120px"></el-table-column>
        <el-table-column prop="nation" label="具体类型"></el-table-column>
        <el-table-column prop="address" label="封面图" width="100px"></el-table-column>
        <el-table-column prop="education" label="数量"></el-table-column>
        <el-table-column prop="creater" label="创建人" width="120px"></el-table-column>
        <el-table-column prop="joinTime" label="创建时间" width="120px"></el-table-column>
        <el-table-column prop="idCard" label="修改人" width="150px"></el-table-column>
        <el-table-column prop="birthDate" label="修改时间" width="120px"></el-table-column>
        <el-table-column prop="presentPost" label="村组"></el-table-column>
        <el-table-column prop="partymemberStatus" label="微信端显示"></el-table-column>
        <el-table-column fixed="right" label="操作" width="85">
          <template>
            <el-button
              type="primary"
              size="mini"
              @click="$router.push('/publicCulture/add')"
              icon="el-icon-edit"
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

  .height-level-box /deep/ {
    .el-form-item .el-input {
      width: 100%;
    }
    .el-form-item .el-date-editor {
      max-width: 400px;
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
export default {
  name: 'Service',
  data() {
    return {
      ruleForm: {
        service: '',
        fuwudian: '',
        cunzu: '',
        person: '',
        phone: false,
        startStatu: ''
      },
      rules: {
        service: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      dialogTableVisible: false,
      isHeightLevel: false,
      tableData: [
        {
          id: 1,
          name: 'xxx',
          sex: '男',
          nation: '汉',
          address: '演示村1队',
          education: '大专',
          birthDate: 'YYYY-MM-DD',
          joinTime: 'YYYY-MM-DD',
          idCard: '6666666666666666',
          branchOffice: '第一支部',
          presentPost: '村支书',
          partymemberStatus: '在家',
          phone: '13170444756',
          remark: ''
        },
        {
          id: 2,
          service: '有线电视业务',
          person: 'xxx',
          fuwudian: 'xx村',
          phone: 15674565798,
          remark: '',
          cunzu: '演示村',
          startStatu: '前后台启动'
        }
      ],
      publicCultureOptions: [
        {
          label: '请选择',
          value: '0'
        },
        {
          label: '文体设施',
          value: '1'
        },
        {
          label: '乡村书屋',
          value: '2'
        },
        {
          label: '民间艺术',
          value: '3'
        },
        {
          label: '非遗展示',
          value: '4'
        },
        {
          label: '动漫展示',
          value: '5'
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
