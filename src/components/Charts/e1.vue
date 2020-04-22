<template>
  <section class="chart-container">
    <div id="chartPie1" style="width:100%; height:275px;"></div>
  </section>
</template>
<script>
import echarts from 'echarts'

export default {
  data() {
    return {
      chartPie: null
    }
  },
  methods: {
    drawPieChart() {
      this.chartPie = echarts.init(document.getElementById('chartPie1'))
      this.chartPie.setOption({
        title: {
          text: '演示村特殊人群统计',
          x: 'center',
          backgroundColor: '#D8D8D8'
        },
        color: ['#339900', '#CCCC33', '#003333'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['1队', '2队', '3队'],
          orient: 'horizontal',

          x: 'center',
          y: 'bottom'
        },
        grid: {
          left: '20%',
          right: '20%',
          bottom: '13%',
          containLabel: false
        },
        xAxis: {
          type: 'category',
          data: ['重点人员', '弱势群体', '志愿者', '资源人群']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '1队',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [4, 3, 20, 9]
          },
          {
            name: '2队',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [1, 5, 4, 6]
          },
          {
            name: '3队',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [10, 9, 6, 1]
          }
        ]
      })
    },
    drawCharts() {
      this.drawPieChart()
    }
  },

  mounted: function() {
    this.drawCharts()
  }
  // updated: function () {
  //     this.drawCharts()
  // }
}
</script>

<style scoped>
.el-col {
  padding: 30px 20px;
}
</style>
