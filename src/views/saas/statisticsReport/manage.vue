<template>
  <div class="container">
    <el-col :span="8">
      <div class="left">
        <div class="charts" style="text-align:center">
          <div class="e1">
            <echarts3 />
          </div>
          <div class="e2">
            <echarts4 />
          </div>
          <div class="e3">
            <echarts5 />
          </div>
          <div class="e4">
            <echarts6 />
          </div>
        </div>
        <div class="otherData">
          <h5 style="text-align:center">村镇其他数据</h5>
          <ul>
            <li>土地总面积0平方米,房屋面积总数0平方米</li>
            <li>收通知通告1份</li>
            <li>已收信1份文件,回复1份文件</li>
            <li>季度工程已完成0项,余0项进行中</li>
          </ul>
        </div>
        <div class="line" style="text-align:center">
          <h5>重点人口</h5>
          <div>
            <echarts7 />
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="middle">
        <div class="intro">
          <h4 style="text-align:center">演示村简介</h4>
          <p>xxxxxxxxxxxxxxxxx</p>
        </div>
        <div class="count">
          <h5 style="text-align:center">季度补助金额</h5>
          <echarts8 />
        </div>
        <div class="number">
          <h5 style="text-align:center">季度补助人数</h5>
          <echarts9 />
        </div>
        <div class="population">
          <h5 style="text-align:center">特殊人口统计</h5>
          <echarts10 />
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="right">
        <div class="thisyearsDataContainer">
          <h5 style="text-align:center">本年数据</h5>
          <div class="thisyearsData">
            <div class="yearData">
              <p>icon</p>
              <p>村总收入</p>
              <p>0元</p>
            </div>
            <div class="yearData">
              <p>icon</p>
              <p>村总收入</p>
              <p>0元</p>
            </div>
            <div class="yearData">
              <p>icon</p>
              <p>村总收入</p>
              <p>0元</p>
            </div>
            <div class="yearData">
              <p>icon</p>
              <p>村总收入</p>
              <p>0元</p>
            </div>
          </div>
        </div>
        <div class="handle">
          <h5 style="text-align:center">月季事项处理</h5>
          <echarts11 />
        </div>
        <div class="in-out" style="text-align:center">
          <h5>收入/支出对比</h5>
          <ul>
            <li>去年村收入0.00万元 / 支出0.00万元</li>
            <li>今年村收入0.00万元 / 支出0.00万元</li>
          </ul>
        </div>
        <div class="list" style="text-align:center">
          <h5>村务列表</h5>
          <template>
            <el-table :data="tableData" border="true">
              <el-table-column prop="cun" label="村"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="event" label="事件"></el-table-column>
              <el-table-column prop="time" label="时间"></el-table-column>
            </el-table>
          </template>
        </div>
      </div>
    </el-col>
  </div>
</template>
<style lang="scss">
.charts,
.otherData,
.line,
.intro,
.count,
.number,
.population,
.handle,
.list,
.thisyearsDataContainer,
.in-out {
  border: 1px solid rgb(221, 215, 215);
  border-radius: 10px;
  margin: 5px;
}
.line {
  height: 415px;
}
thisyearsdatacontainer {
  text-align: center;
}
.yearData {
  width: 150px;
  height: 110px;
  border: 1px solid rgb(221, 215, 215);
  border-radius: 10px;
  margin: 10px;
}

.intro {
  height: 200px;
}
.list {
  height: 366px;
}
.container {
  margin: 10px;
  width: 100%;
}
.charts,
.thisyearsData {
  text-align: center;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

e1,
e2,
e3,
e4 {
  width: 200px;
  height: 150px;
}
</style>
<script>
import echarts3 from '@/components/Charts/e7.vue'
import echarts4 from '@/components/Charts/e8.vue'
import echarts5 from '@/components/Charts/e9.vue'
import echarts6 from '@/components/Charts/e10.vue'
import echarts7 from '@/components/Charts/e11.vue'
import echarts8 from '@/components/Charts/e12.vue'
import echarts9 from '@/components/Charts/e13.vue'
import echarts10 from '@/components/Charts/e14.vue'
import echarts11 from '@/components/Charts/e15.vue'

export default {
  components: {
    echarts3,
    echarts4,
    echarts5,
    echarts6,
    echarts7,
    echarts8,
    echarts9,
    echarts10,
    echarts11
  },
  name: 'Manage',
  data() {
    return {
      tableData: [
        {
          cun: '演示村',
          name: '张戈',
          event: '关于上户咨询',
          time: '2019-12-01'
        },
        {
          cun: '演示村',
          name: '张戈',
          event: '关于服兵役通知',
          time: '2019-12-01'
        }
      ]
    }
  }
}
</script>

