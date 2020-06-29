<template>
  <div class="chart-container">
    <chart ref="chart" height="100%" width="100%" :option="option"/>
  </div>
</template>
<script>
import Chart from "@/components/Charts/Chart";

export default {
  name: "DataZoomChart",
  components: { Chart },
  data() {
    return {
      option: {
       xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'value'
    },
    dataZoom: [
        {
            type: 'slider',
            start: 1,
            xAxisIndex:0,
            end: 35
        },
        {
            type: 'inside',
            start: 1,
            xAxisIndex:0,
            end: 35
        },
        {
            type: 'slider',
            start: 1,
            yAxisIndex:0,
            end: 35
        },
        {
            type: 'inside',
            start: 1,
            yAxisIndex:0,
            end: 35
        },

    ],
    series: [
        {
            name: 'scatter',
            type: 'scatter',
            itemStyle: {
                normal: {
                    opacity: 0.8
                }
            },
            symbolSize: function (val) {
                return val[2] * 40;
            },
            data: [["14.616","7.241","0.896"],["3.958","5.701","0.955"],["2.768","8.971","0.669"],["9.051","9.710","0.171"],["14.046","4.182","0.536"],["12.295","1.429","0.962"],["4.417","8.167","0.113"],["0.492","4.771","0.785"],["7.632","2.605","0.645"],["14.242","5.042","0.368"]]
        }
    ]
      }
    };
  },
  mounted: function() {}
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>