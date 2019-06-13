<template>
    <div>
        <headerDiv></headerDiv>
        <router-view>
        </router-view>
    </div>
</template>
<script>
import headerDiv from "./Header.vue"
export default {
    name: 'Home',
    components:{headerDiv}
}
</script>

