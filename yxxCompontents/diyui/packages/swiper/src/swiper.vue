<template>
  <div>
    <div
      @mousedown="onButtonDown"
      @touchstart="onButtonDown"
      :style="wrapperStyle"
      style="display:-webkit-flex"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "swiper",
  props: {},
  data() {
    return {
      hovering: false,
      dragging: false,
      isClick: false,
      startX: 0,
      currentX: 0,
      startY: 0,
      currentY: 0,
      startPosition: 0,
      newPosition: 0,
      isMove: false,
      length: 0,
      swiper_children: []
      //currentPage:0,
    };
  },
  mounted() {
    this.swiper_children = document.querySelectorAll(".zdy-swiper-slide");
    this.length = this.swiper_children.length;
  },
  computed: {
    wrapperStyle: function() {
      if (this.dragging) {
        return {
          transform: "translateX(" + this.newPosition + "px)",
          "-webkit-transform": "translateX(" + this.newPosition + "px)",
          transition: "all 0s",
          width: this.length * 100 + "%"
        };
      } else {
        return {
          transform: "translateX(" + this.newPosition + "px)",
          "-webkit-transform": "translateX(" + this.newPosition + "px)",
          transition: "all 0.2s",
          width: this.length * 100 + "%"
        };
      }
    }
  },
  methods: {
    onButtonDown(event) {
      event.preventDefault();
      this.onDragStart(event);
      window.addEventListener("mousemove", this.onDragging);
      window.addEventListener("touchmove", this.onDragging);
      window.addEventListener("mouseup", this.onDragEnd);
      window.addEventListener("touchend", this.onDragEnd);
    },
    onDragStart(event) {
      this.dragging = true;
      this.isClick = true;
      if (event.type === "touchstart") {
        event.clientY = event.touches[0].clientY;
        event.clientX = event.touches[0].clientX;
      }
      this.startX = event.clientX;
    },
    onDragging(event) {
      if (event.type === "touchmove") {
        event.clientY = event.touches[0].clientY;
        event.clientX = event.touches[0].clientX;
      }
      if (this.dragging && this.startX != event.clientX) {
        this.isClick = false;
        let diff = 0;
        this.currentX = event.clientX;
        diff = this.currentX - this.startX;
        this.newPosition = this.startPosition + diff;
      }
    },
    onDragEnd(event) {
      if (this.dragging) {
        //setTimeout(() => {
        this.dragging = false;
        this.setPosition(this.newPosition);
        this.startPosition = this.newPosition;
        //}, 0);
        window.removeEventListener("mousemove", this.onDragging);
        window.removeEventListener("touchmove", this.onDragging);
        window.removeEventListener("mouseup", this.onDragEnd);
        window.removeEventListener("touchend", this.onDragEnd);
      }
    },
    setPosition(newPosition) {
      if (
        this.swiper_children.length > 0 &&
        (newPosition - this.startPosition) * 5 >=
          this.swiper_children[0].clientWidth
      ) {
        this.newPosition =
          this.startPosition + this.swiper_children[0].clientWidth > 0
            ? 0
            : this.startPosition + this.swiper_children[0].clientWidth;
      } else if (
        this.swiper_children.length > 0 &&
        (newPosition - this.startPosition) * 5 <=
          -this.swiper_children[0].clientWidth
      ) {
        const end =
          -this.swiper_children[0].clientWidth *
          (this.swiper_children.length - 1);
        this.newPosition =
          this.startPosition - this.swiper_children[0].clientWidth < end
            ? end
            : this.startPosition - this.swiper_children[0].clientWidth;
      } else {
        this.newPosition = this.startPosition;
      }
      //this.currentPage=-this.newPosition/this.swiper_children[0].clientWidth;
      this.$emit(
        "onUpdate",
        this.swiper_children.length > 0
          ? -this.newPosition / this.swiper_children[0].clientWidth
          : 0
      );
    },
    left() {
      this.keyAudioUtils.play();
      this.setPosition(
        this.startPosition + this.swiper_children[0].clientWidth
      );
      this.startPosition = this.newPosition;
    },
    right() {
      this.keyAudioUtils.play();
      this.setPosition(
        this.startPosition - this.swiper_children[0].clientWidth
      );
      this.startPosition = this.newPosition;
    },
    initPosition() {
      this.newPosition = this.startPosition = 0;
      this.$emit("onUpdate", 0);
      this.dragging = true;
    }
  }
};
</script>

