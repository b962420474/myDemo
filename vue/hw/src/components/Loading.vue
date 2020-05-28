<template>
  <div class="loading" v-show="isshow">
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>
<script>
export default {
  props: ['isshow'],
  data() {
    return {
    };
  }
};
</script>
<style scoped>
.loading {
  width: 150px;
  height: 6px;
  margin: 0 auto;
  text-align: center;
}
.loading span {
  display: inline-block;
  width: 6px;
  height: 100%;
  margin-right: 5px;
  background: white;
   border-radius: 6px;
  -webkit-animation: load 1.04s ease infinite;
}
.loading span:last-child {
  margin-right: 0px;
}
@-webkit-keyframes load {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.loading span:nth-child(1) {
  -webkit-animation-delay: 0.13s;
}
.loading span:nth-child(2) {
  -webkit-animation-delay: 0.26s;
}
.loading span:nth-child(3) {
  -webkit-animation-delay: 0.39s;
}
</style>


