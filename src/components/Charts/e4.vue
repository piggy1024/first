<template>
  <section class="chart-container">
    <div id="chartPie4" style="width:100%; height:300px;"></div>
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
      this.chartPie = echarts.init(document.getElementById('chartPie4'))
      this.chartPie.setOption({
        title: {
          text: '演示村青壮年劳动力统计',
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
          data: ['非青壮年劳动力', '青壮年劳动力']
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
                  fontSize: 6,
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
              { value: 62, name: '青壮年劳动力' },
              { value: 38, name: '非青壮年劳动力' }
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
