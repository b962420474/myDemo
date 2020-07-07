<template>
  <div class="main_content">
    <div class="date">
      <div class="item time">
        <div>{{getTime.h}}</div>:
        <div>{{getTime.m}}</div>
      </div>
      <div class="item week">
        <div>{{getTime.week}}</div>
        <div>{{getTime.date}}</div>
        <div>{{getTime.month}}</div>
      </div>
    </div>
    <div class="icon">
      <div @click="openLight()">
        <img :src="light.img_url">
      </div>
      <div @click="startlock()">
        <img :src="lock.img_url">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: {
        h: 0,
        m: 0,
        s: 0,
        date: 0,
        month: 0,
        week: ""
      },
        weekStr: [
            this.$i18n.t('Sun'),
            this.$i18n.t('Mon'),
            this.$i18n.t('Tue'),
            this.$i18n.t('Wed'),
            this.$i18n.t('Thu'),
            this.$i18n.t('Fri'),
            this.$i18n.t('Sat'),
      ],
      monthStr: [
        this.$i18n.t('Jan'),
            this.$i18n.t('Feb'),
            this.$i18n.t('Mar'),
            this.$i18n.t('Apr'),
            this.$i18n.t('May'),
            this.$i18n.t('Jun'),
            this.$i18n.t('Jul'),
            this.$i18n.t('Aug'),
            this.$i18n.t('Sept'),
            this.$i18n.t('Oct'),
            this.$i18n.t('Nov'),
            this.$i18n.t('Dec')
      ],
      light: {
        img_url: require("../assets/img/MMMLayerDefNoLightSmallButton_BackgroundImage.png"),
        urls: {
          up: require("../assets/img/MMMLayerDefNoLightSmallButton_BackgroundImage.png"),
          down: require("../assets/img/MMMLayerDefNoLightSmallButton_PressImage.png")
        }
      },
      lock: {
        img_url: require("../assets/img/MMMLayerDefLockSmallButton_BackgroundImage.png"),
        urls: {
          up: require("../assets/img/MMMLayerDefLockSmallButton_BackgroundImage.png"),
          down: require("../assets/img/MMMLayerDefLockSmallButton_PressImage.png")
        }
      },
      timer:null
    };
  },
  beforeMount: function() {
    let date = new Date();
    this.time.week = this.weekStr[date.getDay()];
    this.time.month = this.monthStr[date.getMonth()];
    this.time.date = date.getDate();
    this.time.h = date.getHours();
    this.time.m = date.getMinutes();
    this.time.s = date.getSeconds();
    this.updateTime();
  },
  computed: {
    getTime: function() {
      let self = this;
      return {
        time:
          self.time.h < 10
            ? "0" + self.time.h
            : self.time.h + " : " + self.time.m < 10
            ? "0" + self.time.m
            : self.time.m,
        h: self.time.h < 10 ? "0" + self.time.h : self.time.h,
        m: self.time.m < 10 ? "0" + self.time.m : self.time.m,
        date: self.time.date,
        month: self.time.month,
        week: self.time.week
      };
    }
  },
  beforeDestroy(){
    clearTimeout(this.timer);
  },
  methods: {
    changeImage(item) {
      item.img_url = item.urls.down;
    },
    openLight:function(){
        this.light.img_url=this.light.urls.down;
    },
    updateTime: function() {
      let self = this;
      if (this.time.m == 60) {
        this.time.m = 0;
        this.time.h++;
      }
      if (this.time.h == 24) {
        this.time.h = 0;
      }
      this.timer=setTimeout(function() {
        self.time.m++;
        self.updateTime();
      }, 60000);
    },
    startlock(){
        this.$emit("lock");
    }
  }
};
</script>
<style scoped>
.main_content {
  display: -webkit-flex;
  height: 100%;
  width: 100%;
}
.date {
  position: relative;
  -webkit-align-self: center;
  width: 66%;
}
.item {
  /* margin: 20px auto; */
  display: -webkit-flex;
  -webkit-justify-content: center;
}
.time {
  font-size: 60px;
}
.icon {
  -webkit-align-self: center;
}
.icon div {
  margin: 30px;
}
.week div {
  margin: 0 4px;
  font-size: 14px;
}
</style>


