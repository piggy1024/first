<template>
  <section class="chart-container">
    <div id="chartPie13" style="width:400px; height:260px;"></div>
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
      this.chartPie = echarts.init(document.getElementById('chartPie13'))
      this.chartPie.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '30%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [
            '低保户',
            '残疾人',
            '五保户',
            '高龄老人',
            '优抚对象',
            '临时救助',
            '精简对象'
          ],
          axisLabel: {
            textStyle: {
              fontSize: 8
            }
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '直接访问',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [0, 0.1, 0.4, 0.5, 0.7, 0.8, 1],
            barWidth: 30
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
