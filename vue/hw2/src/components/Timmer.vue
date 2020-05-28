<template>
      <div class="time" id="time"></div>
</template>
<script>
var $time;
export default {
  data() {
    return {
      time: {
        h: 0,
        m: 0,
        s: 0
      }
    };
  },
  beforeMount: function() {},
  mounted: function() {
    $time = document.getElementById("time");
    let date = new Date();
    this.time.h = date.getHours();
    this.time.m = date.getMinutes();
    this.time.s = date.getSeconds();
    this.updateTime();
  },
  computed: {},
  methods: {
    updateTime: function() {
      let self = this;
      if (this.time.m == 60) {
        this.time.m = 0;
        this.time.h++;
      }
      if (this.time.h == 24) {
        this.time.h = 0;
      }
      var html =
        (self.time.h < 10 ? "0" + self.time.h : self.time.h) +
        " : " +
        (self.time.m < 10 ? "0" + self.time.m : self.time.m);
      $time.innerHTML = html;
      setTimeout(function() {
        self.time.m++;
        self.updateTime();
      }, 60000);
    },
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


