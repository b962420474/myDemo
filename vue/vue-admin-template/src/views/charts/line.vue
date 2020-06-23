<template>
  <div class="chart-container">
    <chart  height="100%" width="100%" :option="option"/>
  </div>
</template>
<script>
import Chart from "@/components/Charts/Chart";

export default {
  name: "LineChart",
  components: { Chart },
  data() {
    return {
      option:{
        xAxis:{
          data:[1,2,3,4,5]
        },
        yAxis:[{},{}],
        series:[
          {
            type:"line",
            data:[242,344,255,298,360],
            yAxisIndex:0
          },
          {
            type:"bar",
            data:[40,50,53,35,60],
            yAxisIndex:1
          }
        ]
      }
    };
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>