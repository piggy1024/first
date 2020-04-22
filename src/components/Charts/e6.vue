<template>
  <section class="chart-container">
    <div id="chartPie6" style="width:100%; height:300px;"></div>
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
      this.chartPie = echarts.init(document.getElementById('chartPie6'))
      this.chartPie.setOption({
        title: {
          text: '演示妇女统计',
          x: 'center',
          backgroundColor: '#D8D8D8'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          x: 'center',
          y: 'bottom',
          data: ['非孕龄', '孕龄']
        },
        color: ['green', 'yellow'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
              formatter: '{b|{b}：} {c|{c}}  {per|{d}%}  ',
              backgroundColor: '#eee',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                b: {
                  fontSize: 12,
                  lineHeight: 22,
                  color: 'black'
                },
                c: {
                  color: 'black'
                },
                per: {
                  color: '#eee',
                  fontSize: 8,
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            },
            data: [
              { value: 62, name: '孕龄' },
              { value: 38, name: '非孕龄' }
            ]
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
