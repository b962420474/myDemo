<template>
  <div>
    <Back path="/" postTitle="Heating"></Back>
    <VueHeating type="heating"></VueHeating>
  </div>
</template>
<script>
import Back from "../components/Back.vue";
import VueHeating from "../components/VueHeating.vue";
export default {
  components: { Back, VueHeating },
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>
<style scoped>
.menu_content {
  width: 200%;
  display: -webkit-flex;
  -webkit-transform: translateX(0);
}
.menu_item {
  width: 480px;
  text-align: left;
}
.menu_item li {
  margin: 20px 37px;
  display: inline-block;
}
</style>


