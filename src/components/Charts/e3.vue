<template>
  <section class="chart-container">
    <div id="chartPie3" style="width:100%; height:300px;"></div>
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
      this.chartPie = echarts.init(document.getElementById('chartPie3'))
      this.chartPie.setOption({
        title: {
          text: '演示村用户状态统计',
          x: 'center',
          backgroundColor: '#D8D8D8'
        },
        color: ['#00CCCC', '#9999CC', '#3399FF', '#FF9966', '#CC3333'],

        tooltip: {
          formatter: '{b}: {c} ({d}%)',
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',

          x: 'center',
          y: 'bottom'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            label: {
              show: true,
              position: 'insideRight',
              formatter: '{b}: {c} ({d}%)'
            },
            center: ['50%', '50%'],
            roseType: 'angle',
            data: [
              { value: 68, name: '在组' },
              { value: 18, name: '务工' },
              { value: 7, name: '务农' },
              { value: 5, name: '转出' },
              { value: 2, name: '单独立户' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
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
