<template>
  <div class="lines">
    <div v-for="i in num" :key="i"  :class="{'active-line':i===index+1}" class="line"></div>
  </div>
</template>
<script>
export default {
  props: ['num',"index"],
  data() {
    return {
    };
  }
};
</script>
<style scoped>
.lines {
    display: -webkit-flex;
    -webkit-justify-content: center;
    z-index: 1;
    position: absolute;
    top: 5px;
    width: 100%;
}
.line {
    width: 6px;
    height: 6px;
    background-color: #9E9E9E;
    margin: 10px 5px;
    border-radius: 6px;
}
.active-line {
    background-color: white;
}
</style>


