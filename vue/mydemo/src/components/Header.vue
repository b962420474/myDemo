<template>
    <div class="header">
        <div class="items logo"></div>
        <div class="items inputBox">
            <input type="text" v-model="searchText">
            <span  class="iconfont"></span>
        </div>
        <div class="items">
            <ul>
                <li v-for="item in items" :key="item.title">
                    <a><router-link :to="item.path">{{item.title}}</router-link></a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data (){
        return {
            items:[
                {path:"/",title:"写博客"},
                {path:"/",title:"登陆"},
                {path:"/",title:"注册"}
            ],
            searchText:""
        }
    }
}
</script>
<style scoped>
.header{
    position: absolute;
    top: 0px;
    color: #333;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.05);
    min-width: 1200px;
    width: 100%;
    padding: 0 28px 0 17px;
}
.logo{
    width: 26px;
    height: 26px;
    background-image: url("../assets/logo.png")
}
li{
    list-style-type: none;
    display: inline-block;
}
.items{
    display: inline-block;
}
.items li{
    padding: 0 10px;
}
</style>


