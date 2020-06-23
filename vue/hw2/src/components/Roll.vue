<template>
  <div class="list" @mousedown="mousedown($event)" @mouseup="mouseup($event)">
    <ul :style="{'-webkit-transform':'translateY('+getStyle()+')'}" ref="ul">
      <li v-for="(item ,index) in list" :key="index" :class="{active:item.isactive}">{{item.name}}</li>
    </ul>
  </div>
</template>
<script>
function getTranslate(node, sty) {
  //获取transform值
  var translates = document.defaultView
    .getComputedStyle(node, null)
    .webkitTransform.substring(7);
  var result = translates.match(/\(([^)]*)\)/); // 正则()内容
  var matrix = result ? result[1].split(",") : translates.split(",");
  if (sty == "x" || sty == undefined) {
    return matrix.length > 6 ? parseFloat(matrix[12]) : parseFloat(matrix[4]);
  } else if (sty == "y") {
    return matrix.length > 6 ? parseFloat(matrix[13]) : parseFloat(matrix[5]);
  } else if (sty == "z") {
    return matrix.length > 6 ? parseFloat(matrix[14]) : 0;
  } else if (sty == "rotate") {
    return matrix.length > 6
      ? getRotate([
          parseFloat(matrix[0]),
          parseFloat(matrix[1]),
          parseFloat(matrix[4]),
          parseFloat(matrix[5])
        ])
      : getRotate(matrix);
  }
}
function getRotate(matrix) {
  var aa = Math.round((180 * Math.asin(matrix[0])) / Math.PI);
  var bb = Math.round((180 * Math.acos(matrix[1])) / Math.PI);
  var cc = Math.round((180 * Math.asin(matrix[2])) / Math.PI);
  var dd = Math.round((180 * Math.acos(matrix[3])) / Math.PI);
  var deg = 0;
  if (aa == bb || -aa == bb) {
    deg = dd;
  } else if (-aa + bb == 180) {
    deg = 180 + cc;
  } else if (aa + bb == 180) {
    deg = 360 - cc || 360 - dd;
  }
  return deg >= 360 ? 0 : deg;
}
function getIndex(elt) {
  return [].indexOf.call(elt.parentNode.querySelectorAll(elt.tagName), elt);
}
var startY, Y, moveEndY;
var translateY;
var offset;
var hasMove = false;
var time;
export default {
  props: ["list"],
  data() {
    return {
    };
  },
  computed:{
  },
  methods: {
    getActive:function(){
      let m=0;
      for (let i = 0; i < this.list.length; i++) {
        if(this.list[i].isactive){
          m=i;
          break;
        }
      }
      return m;
    },
    getStyle:function(){
      console.log(this.getActive());
      return 40*(2-this.getActive())+"px"
    },
    mousemove: function(e) {
      var target = e.currentTarget;
      //console.log(this);
      var ul = target.querySelector("ul");
      e.preventDefault();
      e.stopPropagation();
      moveEndY = e.pageY;
      Y = moveEndY - startY;
      var length = translateY;
      hasMove = true;
      console.log("move.....");
      length += Y;
      length = length > 2 * offset ? 2 * offset : length;
      length =
        length < -(ul.offsetHeight - 3 * offset)
          ? -(ul.offsetHeight - 3 * offset)
          : length;
      var $active = ul.querySelector(".active");
      var oldindex = getIndex($active);
      var newIndex = Math.round((-length + 2 * offset) / offset);
      if (newIndex != oldindex) {
        $active.classList.remove("active");
        ul.querySelectorAll("li")[newIndex].classList.add("active");
      }
      ul.style["-webkit-transform"] = "translateY(" + length + "px)";
      ul.style["transition"] = "all 0s";
    },
    mousedown: function(e) {
      var target = e.currentTarget;
      offset = target.querySelectorAll("li:not(.active)")[0].offsetHeight;
      var ul = target.querySelector("ul");
      e.preventDefault();
      e.stopPropagation();
      translateY = getTranslate(ul, "y");
      hasMove = false;
      startY = e.pageY;
      target.addEventListener("mousemove", this.mousemove);
    },
    mouseup: function(e) {
      var target = e.currentTarget;
      target.removeEventListener("mousemove", this.mousemove);
      var ul = target.querySelector("ul");
      var $active = ul.querySelector(".active");
      var oldindex = getIndex($active);
      ul.style["-webkit-transform"] = "translateY(" + (40*(2-oldindex)) + "px)";
      ul.style["transition"] = "all 0.2s";
      this.$emit("selectHandle",oldindex);
    },
    init(index){
      const ul=this.$refs.ul;
      ul.style["-webkit-transform"] = "translateY(" + (40*(2-index)) + "px)";
      ul.querySelector(".active").classList.remove("active");
      ul.querySelectorAll("li")[index].classList.add("active");
    }
  }
};
</script>
<style scoped>
.list {
  text-align: center;
  height: 200px;
  overflow: hidden;
}
.list ul {
  /* -webkit-transform: translateY(80px); */
  padding: 0;
  margin: 0;
}
.list li {
  height: 40px;
  line-height: 30px;
  font-size: 20px;
  /* padding: 5px; */
  opacity: 0.4;
}
.list .active {
  -webkit-transform: scale(1.2,1);
  font-size: 25px;
  color: white;
  opacity:1;
}
* {
  list-style: none;
  cursor: pointer;
}
</style>


