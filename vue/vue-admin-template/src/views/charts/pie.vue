<template>
  <div class="chart-container">
    <chart ref="chart" height="100%" width="100%" :option="option"/>
  </div>
</template>
<script>
import Chart from "@/components/Charts/Chart";

export default {
  name: "PieChart",
  components: { Chart },
  data() {
    return {
      option: {
        backgroundColor: "#2c343c",
        visualMap: {
          // 不显示 visualMap 组件，只用于明暗度的映射
          show: false,
          // 映射的最小值为 80
          min: 80,
          // 映射的最大值为 600
          max: 600,
          inRange: {
            // 明暗度的范围是 0 到 1
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            roseType: "angle",
            data: [
              { value: 235, name: "视频广告" },
              { value: 274, name: "联盟广告" },
              { value: 310, name: "邮件营销" },
              { value: 335, name: "直接访问" },
              { value: 400, name: "搜索引擎" }
            ],
            label: {
              textStyle: {
                color: "rgba(255, 255, 255, 0.3)"
              }
            },
            // labelLine: {
            //     lineStyle: {
            //         color: 'rgba(255, 255, 255, 0.3)'
            //     }
            // },
            itemStyle: {
                // 阴影的大小
                //shadowBlur: 200,
                color: "#c23531",
                // 阴影颜色
                //shadowColor: "rgba(0, 0, 0, 0.5)"
            },
            emphasis: {
                //高亮样式
                itemStyle: {
                    shadowBlur: 200,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                },
            }
          }
        ]
      }
    };
  },
  mounted:function(){
    //   setInterval(()=>{
    //       this.option.series[0].data.forEach((element,index) => {
    //           element.value+=index;
    //       });
    //       this.$refs.chart.setOption();
    //   },500)
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