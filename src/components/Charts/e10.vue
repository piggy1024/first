<template>
  <section class="chart-container">
    <div id="chartPie10" style="width:200px; height:300px;"></div>
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
      this.chartPie = echarts.init(document.getElementById('chartPie10'))
      this.chartPie.setOption({
        title: {
          text: '工程项目基金',
          x: 'center',
          backgroundColor: '#D8D8D8'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2月', '6月', '10月']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
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
