<template>
  <section class="chart-container">
    <div id="chartPie12" style="width:400px; height:260px;"></div>
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
      this.chartPie = echarts.init(document.getElementById('chartPie12'))
      this.chartPie.setOption({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          data: [0.1, 0.3, 0.4, 0.5, 0.6, 0.8, 1]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '30%',
          containLabel: true
        },
        series: [
          {
            data: [0.1, 0.3, 0.4, 0.5, 0.6, 0.8, 1],
            type: 'line'
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
