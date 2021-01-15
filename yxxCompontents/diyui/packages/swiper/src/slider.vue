<template>
  <div class="zdy-swiper-slide" :style="wrapperStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "swiper-slide",
  data() {
    return {};
  },
  mounted() {

  },
  computed: {
    wrapperStyle: function() {
      return {
          width: 100/this.$parent.length+ "%"
        };
    }
  },
  methods: {}
};
</script>
