<template>
  <div>
    <canvas id="cavsElem" width="600" height="600">你的浏览器不支持canvas，请升级浏览器.浏览器不支持，显示此行文本</canvas>
  </div>
</template>
<script>
import { getMax, getMaxN, getTextSize } from "@/utils/math.js";
import { getRandomColor } from "@/utils/util.js";
export default {
  data() {
    return {
      canvas: null,
      context: null
    };
  },
  created() {
    this.$nextTick(() => {
      this.canvas = document.getElementById("cavsElem");
      this.context = this.canvas.getContext("2d");
      //this.drawTriangle();
      //   this.draw([1, 4, 3, 8, 2, 6], "line");
      //   this.draw([1, 4, 3, 8, 2, 6], "bar");
      this.drawArc([
        { name: "c", data: 50 },
        { name: "jaya", data: 38},
        { name: "js", data: 40 },
        { name: "python", data: 5 }
      ]);
      // this.drawLine([0.8,0.9,3]);
      // this.drawLine([0.8,0.9,0.3]);
      // this.drawLine([8,9,10]);
      // this.drawLine([8,9,7]);
    });
  },
  mounted() {},
  methods: {
    drawTriangle() {
      this.context.beginPath();
      this.context.moveTo(100, 100);
      this.context.lineTo(200, 100);
      this.context.lineTo(100, 200);
      this.context.closePath();
      this.context.strokeStyle = "blue";
      this.context.lineWidth = 4;
      this.context.stroke();
      this.context.fillStyle = "blue";
      this.context.fill();
    },
    draw_coordinate_system() {
      var margin = 50;
      var radsH = 10;
      this.context.beginPath();
      this.context.moveTo(margin - radsH, margin + radsH);
      this.context.lineTo(margin, margin);
      this.context.lineTo(margin + radsH, margin + radsH);
      this.context.moveTo(margin, margin);
      this.context.lineTo(margin, this.canvas.height - margin);
      this.context.lineTo(
        this.canvas.width - margin,
        this.canvas.height - margin
      );
      this.context.lineTo(
        this.canvas.width - margin - radsH,
        this.canvas.height - margin - radsH
      );
      this.context.moveTo(
        this.canvas.width - margin,
        this.canvas.height - margin
      );
      this.context.lineTo(
        this.canvas.width - margin - radsH,
        this.canvas.height - margin + radsH
      );
      this.context.strokeStyle = "green";
      this.context.lineWidth = 4;
      this.context.stroke();
      return {
        w: this.canvas.width - margin - radsH - margin,
        h: this.canvas.height - margin - (margin + radsH),
        x: margin,
        y: this.canvas.height - margin
      };
    },
    drawLine(x, y, w, h, l, array) {
      this.context.beginPath();
      for (var i = 0; i < array.length; i++) {
        this.context.lineTo(
          x + w / array.length * (i + 0.5),
          y - array[i] / l * h
        );
      }
    },
    draw(array, type) {
      var max = getMax(array);
      var n = getMaxN(max);
      var l;
      var { x, y, w, h } = this.draw_coordinate_system();
      if (max === Math.pow(10, n + 1)) {
        l = max;
      } else {
        l =
          Math.pow(10, n + 1) - max > Math.pow(10, n)
            ? max + Math.pow(10, n)
            : Math.pow(10, n + 1);
      }
      switch (type) {
        case "line":
          this.drawLine(x, y, w, h, l, array);
          break;
        case "bar":
          this.drawBar(x, y, w, h, l, array);
          break;
      }
      this.context.strokeStyle = "black";
      this.context.lineWidth = 2;
      this.context.stroke();
    },
    drawBar(x, y, w, h, l, array) {
      this.context.beginPath();
      for (var i = 0; i < array.length; i++) {
        this.context.rect(
          x + w / array.length * (i + 0.2),
          y - array[i] / l * h,
          w / array.length * 0.6,
          array[i] / l * h
        );
      }
      this.context.fillStyle = "yellow";
      this.context.fill();
    },
    drawArc(array) {
      var sum = array.reduce((num, total) => {
        return {data:num.data + total.data};
      }).data;
      let end = -Math.PI / 2,
        start = -Math.PI / 2;
      this.context.lineWidth = 1;
      array.forEach(element => {
        this.context.beginPath();
        start = end;
        end = start + element.data / sum * 2 * Math.PI;
        let r = this.canvas.height / 4+this.canvas.height / 4 * element.data / sum;
        console.log(start+"  "+element.data+"  "+r );
        this.context.moveTo(this.canvas.width / 2, this.canvas.height / 2);
        this.context.arc(
          this.canvas.width / 2,
          this.canvas.height / 2,
          r,
          start,
          end,
          false
        );
        var color = getRandomColor();
        this.context.fillStyle = color;
        this.context.strokeStyle = color;
        this.context.closePath();
        var { x, y ,rad} = getTextSize(
          this.canvas.width / 2,
          this.canvas.height / 2,
          start,
          end,
         r+20
        );
        this.context.font = '20px "微软雅黑"'; //设置字体
        if(rad>-Math.PI/2&&rad<Math.PI/2){
          this.context.textAlign="right";
        }
        else{
          this.context.textAlign="left";
        }
        this.context.textBaseline = "bottom"; //设置字体底线对齐绘制基线
        this.context.fillText(element.name, x, y);
        this.context.fill();
      });
      this.context.stroke();
    }
  }
};
</script>

