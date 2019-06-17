<template>
    <div class="header">
        <div class="items logo"></div>
        <div class="items inputBox">
            <input type="text" v-model="searchText">
            <label  class="iconfont">&#xe610;</label>
        </div>
        <div class="items">
            <ul>
                <li v-for="item in items" :key="item.title">
                    <router-link :to="item.path">{{item.title}}</router-link>
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
    padding: 10px 28px 10px 17px;
}
.logo{
    width: 26px;
    height: 26px;
    background-image: url("../assets/logo.png");
    background-size: cover;
    position: absolute;
    left: 100px;
    top: 12px;
}
li{
    list-style-type: none;
    display: inline-block;
}
.items{
    display: inline-block;
    margin: auto 10px;
}
.items li{
    padding: 0 10px;
}
.inputBox{
    padding: 3px;
    border: solid 1px;
    border-radius: 5px;
}
.inputBox label{
    cursor: pointer;
    z-index: 1
}
input{
    border: 0
}
</style>


