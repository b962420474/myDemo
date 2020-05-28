<template>
  <div class="circleProgress_wrapper">
    <div class="wrapper right" v-show="isshow">
      <div class="circleProgress rightcircle" :style="right"></div>
    </div>
    <div class="wrapper left" v-show="isshow">
      <div class="circleProgress leftcircle" :style="left"></div>
    </div>
    <div class="copywriting">
      <div v-show="isshow">{{title}}</div>
      <div v-show="!isshow">{{getTitle}}</div>
      <div class="num">{{getNum}}<span v-if="unit" style="font-size:10px;position: absolute;color:#ffffff6e;">{{unit}}</span></div>
      <div class="current" v-show="wea_show"><span>current&nbsp;</span><span>{{current_wea}}{{unit}}</span></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title", "base",'isshow','num','start','unit','wea_show','current_wea','my_type','extra'],
  data() {
    return {
    }
  },
  computed: {
    getTitle:function(){
      if(this.extra&&this.extra.getTitle){
        return this.extra.getTitle();
      }
      else if(this.my_type&&this.my_type=="timmer"){
        return "Cooking time";
      }
      return this.title;
    },
    getNum:function(){
      if(this.my_type&&this.my_type=="timmer"){
        return "0"+Math.floor(this.num/60)+":"+(this.num%60<10?"0"+this.num%60:this.num%60);
      }
      return this.num;
    },
    left: function() {
       let move=45;
        if ((this.num-this.start) / this.base> 0.5) {
          move+=(this.num-this.start) / this.base*360-180;
        }
        return {
             '-webkit-transform': 'rotate('+move+'deg)'
        }
    },
    right() {
       let move=225;
      if ((this.num-this.start) / this.base < 0.5) {
          move=45+(this.num-this.start) / this.base*360;
      }
      return {
             '-webkit-transform': 'rotate('+move+'deg)'
        }
    }
  },
  methods: {
    show:function(){
      this.isshow=true;
    },
    hide:function(){
      this.isshow=false;
    }
  }
};
</script>
<style scoped>
.current{
  font-size: 10px;
  color:#ffffff6e;
}
.copywriting {
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
}
.num {
  font-size: 30px;
}
.circleProgress_wrapper {
  width: 180px;
  height: 180px;
  margin: 0 auto;
  position: relative;
}

.wrapper {
  width: 90px;
  height: 180px;
  position: absolute;
  top: 0;
  overflow: hidden;
}

.right {
  right: 0;
}

.left {
  left: 0;
}

.circleProgress {
  width: 140px;
  height: 140px;
  border: 20px solid rgb(63, 81, 181);
  border-radius: 50%;
  position: absolute;
  top: 0;
}

.rightcircle {
  border-top: 20px solid #343232;
  border-right: 20px solid #343232;
  right: 0;
}

.leftcircle {
  border-bottom: 20px solid #343232;
  border-left: 20px solid #343232;
  left: 0;
}
</style>


