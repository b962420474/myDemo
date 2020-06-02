<template>
  <div class="date">
    <div>
      <roll :list="yearList" class="item" @selectHandle="selectYear"></roll>
      <roll :list="monthlist" class="item" @selectHandle="selectMonth"></roll>
      <roll :list="date" class="item" @selectHandle="selectDate"></roll>
    </div>
    <div class="button" @click="tip()">
      <img src="../assets/img/HWMLayerCmpltngConfirmButton_BackgroundImage.png">
    </div>
    <Tip :title="title" ref="tip"></Tip>
  </div>
</template>
<script>
import Roll from "../components/Roll.vue";
import Tip from "../components/Tip.vue";
var dates = {
  1: 31,
  2: {
    'leap': 29,
    'other': 28
  },
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31
};
export default {
  components: { Roll, Tip },
  data() {
    return {
      title:this.$i18n.t('date_set'),
      yearList: [],
      monthlist: [
        { name: "January", isactive: false },
        { name: "February", isactive: false },
        { name: "March", isactive: false },
        { name: "April", isactive: false },
        { name: "May", isactive: true },
        { name: "June", isactive: false },
        { name: "July", isactive: false },
        { name: "August", isactive: false },
        { name: "September", isactive: false },
        { name: "October", isactive: false },
        { name: "November", isactive: false },
        { name: "December", isactive: false }
      ],
      date: [
        { name: "1", isactive: true },
        { name: "2", isactive: false },
        { name: "3", isactive: false },
        { name: "4", isactive: false },
        { name: "5", isactive: false }
      ],
      currentYear:2020,
      currentMonth:5,

    };
  },
  beforeMount: function() {
    for (var i = 1970; i < 2099; i++) {
      this.yearList.push({ name: i, isactive: i === 2020 });
    }
  },
  computed: {
    getDate: function() {
      return [1, 2, 3, 4, 5, 6];
    }
  },
  methods: {
    tip: function() {
      this.$refs.tip.show();
    },
    selectYear: function(index) {
      console.log("select year " + this.yearList[index].name);
      this.currentYear=this.yearList[index].name;
      var m=this.currentMonth+1;
      this.changeDateList(m);
    },
    selectMonth: function(index) {
      this.currentMonth=index;
      index++;
      this.changeDateList(index);
      console.log("select month " + this.monthlist[index].name);
    },
    selectDate: function(index) {
      console.log("select Date " + this.date[index].name);
    },
    isLeapYear: function(year) {
      if ((year % 100 != 0 && year % 4 == 0) || year % 400 == 0) {
        return true;
      } else {
        return false;
      }
    },
    changeDateList:function(index){
        var num=0;
    if (index == 2&&this.isLeapYear(this.currentYear)) {
          num=dates[2].leap;
      }
      else if (index == 2&&!this.isLeapYear(this.currentYear)) {
          num=dates[2].other;
      }
      else{
          num=dates[index];
      }
      console.log(num);
      this.date.splice(0,this.date.length);
      for(let i = 1; i <= num; i++){
          this.date.push({ name: i, isactive: i===1 });
      }
    }
  }
};
</script>
<style scoped>
.date {
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
}
.button {
  margin-top: 10px;
}
.item {
  width: 30%;
  display: inline-block;
}
</style>

