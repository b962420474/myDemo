<template>
  <div class="container">
    <leftDiv :userid="userid"></leftDiv>
    <router-view />
  </div>
</template>
<script>
import leftDiv from "./Leftdiv.vue";
export default {
  props: ["userid"],
  components: { leftDiv }
};
</script>
<style scoped>
.container {
  padding: 8px 0 0;
  margin: 0 auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 1516px;
}
</style>


