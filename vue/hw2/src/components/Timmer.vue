<template>
  <div class="time" id="time">{{html}}</div>
</template>
<script>
export default {
  data() {
    return {
      time: {
        h: 0,
        m: 0,
        s: 0
      },
      html: "",
      timer:null
    };
  },
  beforeMount: function() {},
  created: function() {
    this.getTime();
    this.updateTime();
  },
   beforeDestroy(){
    clearTimeout(this.timer);
  },
  computed: {},
  methods: {
    updateTime: function() {
      let self = this;
      this.timer=setTimeout(function() {
        self.getTime();
        // console.log(self.html+" : "+self.time.s);
        self.updateTime();
      }, 10000);
    },
    getTime:function(){
      let date = new Date();
      this.time.h = date.getHours();
      this.time.m = date.getMinutes();
      this.time.s = date.getSeconds();
      this.html =
      (this.time.h < 10 ? "0" + this.time.h : this.time.h) +
      " : " +
      (this.time.m < 10 ? "0" + this.time.m : this.time.m);
    }
  }
};
</script>
<style scoped>
.time {
  font-size: 20px;
  width: 340px;
  text-align: center;
  line-height: 54px;
}
</style>


