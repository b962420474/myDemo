<template>
    <div class="main">
        <router-link v-for="item in list" :key="item.name" :to="item.path" tag="li" class="item">
            <div class="iconfont" v-html="item.icon"></div>
            <div>{{item.name}}</div>
        </router-link>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:[
                {name:"wifi",icon:'&#xe604;',path:"/wifi"},
                {name:"more",icon:"&#xe64f;",path:"/brightness"}
            ]    
        }
    }
}
</script>
<style scoped>
.main{
    display: -webkit-flex;
    -webkit-justify-content: center;
    -webkit-align-items: center;
    height:100%
}
.item{
    min-width: 100px;
    font-size: 50px;
    margin: 50px;
}
</style>


