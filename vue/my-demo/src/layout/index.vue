<template>
<div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <!-- <sidebar class="sidebar-container" /> -->
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar @toggleClick="toggleSideBar"/>
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>
<script>
import { Navbar, AppMain,TagsView } from "./components";
export default {
  components: { Navbar, AppMain ,TagsView},
  data() {
    return {
        sidebar:{
            opened:true,
            withoutAnimation: false,
        },
        device:'despok',
        needTagsView:true,
        fixedHeader:true,
    };
  },
  computed: {
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods:{
    toggleSideBar() {
      this.sidebar.opened=!this.sidebar.opened
      this.sidebar.withoutAnimation=false
    },
    handleClickOutside:function(){
        this.sidebar.opened=false;
        this.sidebar.withoutAnimation=false
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
