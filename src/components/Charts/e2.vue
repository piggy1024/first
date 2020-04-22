<template>
  <section class="chart-container">
    <div id="chartPie2" style="width:100%; height:275px;"></div>
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
      this.chartPie = echarts.init(document.getElementById('chartPie2'))
      this.chartPie.setOption({
        title: {
          text: '演示村政治面貌统计',
          x: 'center',
          backgroundColor: '#D8D8D8',
          height: '25px',
          width: '100px'
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
              { value: 516, name: '群众' },
              { value: 258, name: '团员' },
              { value: 161, name: '党员' },
              { value: 65, name: '少先队员' }
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
