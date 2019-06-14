<template>
  <div>
    <leftDiv :userid="userid"></leftDiv>
    <!-- <router-view /> -->
  </div>
</template>
<script>
import leftDiv from "./Leftdiv.vue"
export default {
    props:['userid'],
    components:{leftDiv}
}
</script>
<style scoped>

</style>


