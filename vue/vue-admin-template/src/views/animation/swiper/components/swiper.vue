<template>
  <div @mousedown="onButtonDown" @touchstart="onButtonDown" :style="wrapperStyle">
    <div v-for="(item,index) in list" :key="index" style="width:100%;" ref="$list">
      <slot name="todo" v-bind:item="item" v-bind:index="index"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
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
      isMove:false,
      oldValue: this.value
    };
  },
  computed: {
    wrapperStyle: function() {
      if (this.dragging) {
        return {
          transform: "translateX(" + this.newPosition + "px)",
          transition: "all 0s",
          width: this.list.length * 100 + "%"
        };
      } else {
        return {
          transform: "translateX(" + this.newPosition + "px)",
          transition: "all 0.2s",
          width: this.list.length * 100 + "%"
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
      if (this.dragging) {
        this.isClick = false;
        let diff = 0;
        if (event.type === "touchmove") {
          event.clientY = event.touches[0].clientY;
          event.clientX = event.touches[0].clientX;
        }
        this.currentX = event.clientX;
        diff = this.currentX - this.startX;
        this.newPosition = this.startPosition + diff;
      }
    },
    onDragEnd(event) {
      if (this.dragging) {
        setTimeout(() => {
          this.dragging = false;
          this.setPosition(this.newPosition);
          this.startPosition = this.newPosition;
        }, 0);
        window.removeEventListener("mousemove", this.onDragging);
        window.removeEventListener("touchmove", this.onDragging);
        window.removeEventListener("mouseup", this.onDragEnd);
        window.removeEventListener("touchend", this.onDragEnd);
      }
    },
    setPosition(newPosition) {
      if((newPosition-this.startPosition)*2>=this.$refs.$list[0].clientWidth){
        this.newPosition = (this.startPosition + this.$refs.$list[0].clientWidth)>0?0:(this.startPosition + this.$refs.$list[0].clientWidth);
      }
      else if((newPosition-this.startPosition)*2<=-this.$refs.$list[0].clientWidth){
        const end=-this.$refs.$list[0].clientWidth*(this.$refs.$list.length-1)
        this.newPosition = (this.startPosition -this.$refs.$list[0].clientWidth)<end?end:(this.startPosition -this.$refs.$list[0].clientWidth);
      }
      else{
        this.newPosition = this.startPosition;
      }
    }
  }
};
</script>

