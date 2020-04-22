<template>
  <div class="app-container">
    <div class="filter-container">
      <p class="filter-title">查询条件</p>
      <div class="filter-box cus-d-fl">
        <div class="height-level-box cus-pa-tb-10 cus-bg-f5f7f9">
          <el-form :inline="true" label-width="90px" class="demo-form-inline clearfix">
            <el-form-item label="用户状态">
              <el-select v-model="listQuery.userStatus" placeholder="请选择" style="width:250px">
                <el-option
                  v-for="item in userStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="年龄段">
              <el-input v-model="listQuery.min_age" style="width:150px" placeholder="请输入"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-input v-model="listQuery.max_age" style="width:150px" placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
          <div class="cus-text-right cus-pr-15">
            <el-button type="primary">搜索</el-button>
            <el-button>清空</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="table">
      <el-row>
        <el-col :span="8">
          <div style=" height:400px;">
            <echarts />
          </div>
        </el-col>
        <el-col :span="8">
          <div style=" height:400px;">
            <echarts1 />
          </div>
        </el-col>
        <el-col :span="8">
          <div style=" height:400px;">
            <echarts2 />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div style=" height:400px;">
            <echarts3 />
          </div>
        </el-col>
        <el-col :span="8">
          <div style=" height:400px;">
            <echarts4 />
          </div>
        </el-col>
        <el-col :span="8">
          <div style=" height:400px;">
            <echarts5 />
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="result-box">
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

  .height-level-box {
    width: 100%;
  }

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
import echarts from '@/components/Charts/e1.vue'
import echarts1 from '@/components/Charts/e2.vue'
import echarts2 from '@/components/Charts/e3.vue'
import echarts3 from '@/components/Charts/e4.vue'
import echarts4 from '@/components/Charts/e5.vue'
import echarts5 from '@/components/Charts/e6.vue'

export default {
  components: {
    echarts,
    echarts1,
    echarts2,
    echarts3,
    echarts4,
    echarts5
  },
  name: 'Table',
  data() {
    return {
      userStatusOptions: [
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
      listQuery: {
        userStatus: undefined,
        min_age: undefined,
        max_age: undefined
      }
    }
  },
  created() {},
  methods: {}
}
</script>
