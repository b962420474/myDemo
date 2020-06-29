<template>
  <div class="chart-container">
    <chart ref="chart" height="100%" width="100%" :option="option"/>
  </div>
</template>
<script>
import Chart from "@/components/Charts/Chart";

export default {
  name: "DatasetChart",
  components: { Chart },
  data() {
    return {
      option: {
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ["product", "Matcha Latte", "Milk Tea", "Cheese Cocoa"],
          source: [
            // ["product", "2012", "2013", "2014", "2015"],
            // ["Matcha Latte", 41.1, 30.4, 65.1, 53.3],
            // ["Milk Tea", 86.5, 92.1, 85.7, 83.1],
            // ["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4],

            ["product", "Matcha Latte", "Milk Tea", "Cheese Cocoa"],
            ["2012", 41.1, 86.5, 24.1],
            ["2013", 30.4, 92.1, 67.2],
            ["2014", 65.1, 85.7, 79.5],
            ["2015", 53.3, 83.1, 86.4]
          ]
          
        },
        xAxis: [
          { type: "category", gridIndex: 0 },
          { type: "category", gridIndex: 1 },
          { gridIndex: 2 },
          {  gridIndex: 3 }
        ],
        yAxis: [
          { gridIndex: 0 },
          { gridIndex: 1 },
          { gridIndex: 2 ,type: 'category'},
          { gridIndex: 3,type: 'category' }
        ],
        grid: [
          { bottom: "55%", right: "55%" },
          { bottom: "55%", left: "55%" },
          { top: "55%", right: "55%" },
          { top: "55%", left: "55%" }
        ],
        series: [
          {
            type: "bar",
            xAxisIndex: 0,
            yAxisIndex: 0,
            encode: {
              x: "product",
              y: "Matcha Latte",
              tooltip: [0, 1, 2, 3]
            }
          },
          {
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
          },
          {
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
          },
          {
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
          },
          {
            type: "bar",
            xAxisIndex: 2,
            yAxisIndex: 2,
            // encode: {
            //   x: "Milk Tea",
            //   y: "product",
            // }
          },
          {
            type: "bar",
            xAxisIndex: 2,
            yAxisIndex: 2,
            // encode: {
            //   x: ["Matcha Latte"],
            //   y: "product",
            // }
          },
          {
            type: "bar",
            xAxisIndex: 2,
            yAxisIndex: 2,
            // encode: {
            //   x: "Cheese Cocoa",
            //   y: "product",
            // }
          },
          {
            type: "bar",
            xAxisIndex: 3,
            yAxisIndex: 3,
            encode: {
              x: "Matcha Latte",
              y: "product",
              //tooltip: [0, 1, 2, 3]
            }
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