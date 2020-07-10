<template>
  <div>
    <canvas id="cavsElem" width="600" height="600">你的浏览器不支持canvas，请升级浏览器.浏览器不支持，显示此行文本</canvas>
  </div>
</template>
<script>
import { getMax, getMaxN } from "@/utils/math.js";
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
      this.drawArc([1, 4, 3, 8, 2, 6]);
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
          x + (w / array.length) * (i + 0.5),
          y - (array[i] / l) * h
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
          x + (w / array.length) * (i + 0.2),
          y - (array[i] / l) * h,
          (w / array.length) * 0.6,
          (array[i] / l) * h
        );
      }
      this.context.fillStyle = "yellow";
      this.context.fill();
    },
    drawArc(array) {
      var sum = array.reduce((num, total) => {
        return num + total;
      });
      let end=0,start=0;
      this.context.beginPath();
      array.forEach(element => {
          start=end;
          end=start+element/sum*360;
          console.log(start+":"+end)
          this.context.arc(this.canvas.width/2,this.canvas.height/2,100,start/180*Math.PI,end/180*Math.PI,false);
          this.context.fillStyle = getRandomColor();
          this.context.fill();
          this.context.stroke();
      });
      
    }
  }
};
</script>

