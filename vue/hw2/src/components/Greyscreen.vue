<template>
  <div class="shade" v-show="isshow"></div>
</template>
<script>
export default {
  props: ["isshow"],
  data() {
    return {};
  }
};
</script>
<style scoped>
.shade {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
}
</style>

