<template>
    <div class="layout_card_content">
       <div ref="echarts_bar" style="width:100%;height:500px"></div>
    </div>
</template>



<script>
import { addListener, removeListener } from 'resize-detector'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import debounce from 'lodash/debounce'
export default {
  created() {
    
  },
  mounted(){

    this.myChart = echarts.init(this.$refs.echarts_bar);
     this.myChart.setOption({
        title: {
            text: 'ECharts 入门示例'
        },
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    });
    this.resize = debounce(this.resize,300)
    addListener(this.$refs.echarts_bar,this.resize)
    this.$once('hook:beforeDestroy', () => {
      removeListener(this.$refs.echarts_bar,this.resize)
    })
  },
  methods:{
    resize(){
      this.myChart.resize()
    }
  }

}
</script>