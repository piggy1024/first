<template>
  <section class="chart-container">
    <div id="chartPie11" style="width:450px; height:300px;"></div>
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
      this.chartPie = echarts.init(document.getElementById('chartPie11'))
      this.chartPie.setOption({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            '纠正对象',
            '刑满释放',
            '吸毒重点',
            '精神病',
            '犯罪青少年',
            '邪教',
            '信访'
          ],
          axisLabel: {
            interval: 0,
            formatter: function(value) {
              // x轴的文字改为竖版显示
              var str = value.split('')
              return str.join('\n')
            }
          }
        },
        yAxis: {
          type: 'value',
          data: [0.1, 0.3, 0.4, 0.5, 0.6, 0.8, 1]
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
