<template>
  <div id="app" tabindex="0">
    <headDiv></headDiv>
    <menuDiv></menuDiv>
    <div id="content">
    <router-view/>
    </div>
  </div>
</template>

<script>
import headDiv from "./components/header.vue"
import menuDiv from "./components/menu.vue"
import "./css/style.css"
import "./css/iconfont.css"
export default {
  components: { headDiv, menuDiv },
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
