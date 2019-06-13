<template>
    <div class="main">
        <div class="left">
            <ul>
                <li v-for="item in items" :key="item.title">
                    <a>{{item.title}}</a>
                </li>
            </ul>
        </div>
        <div class="right">
            <ul>
                <li v-for="item in list" :key="item.title">
                    <div>
                        <h2><a>{{item.title}}</a></h2>
                        <div>{{item.content}}</div>
                    </div>
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
                {title:"推荐"},
                {title:"java"},
                {title:"javascript"},
                {title:"c++"},
                {title:"其他"}
            ],
            list:[
                {title:"编程小知识之 JavaScript 文件读取",content:"文件读取在当今的编程语言中应该算是一项比较 trivial 的工作了,语言的标准库一般都会帮助我们做好文件抽象"},
                {title:"简析JavaScript 事件绑定、事件冒泡、事件捕获和事件执行顺序",content:"这篇文章主要介绍了javaScript 事件绑定、事件冒泡、事件捕获和事件执行顺序整理总结的相关资料"},
                {title:"vue 过滤器的基本使用",content:"vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化"},
                {title:"webpack入门到进阶（二）配置",content:"当webpack安装好以后，我们就要考虑webpack配置使用了。"}
            ]
        }
    }
}
</script>
<style scoped>
.main{
    width: 1180px;
    padding: 12px 0 0;
    margin-right: auto;
    margin-left: auto;
}
.left{
    float: left;
    background-color: #fff;
    margin-right: 12px;
    text-align: center;
    line-height: 32px;
    position: relative;
    padding: 6px 0;
    -webkit-box-shadow: 0 1px 2px 0 rgba(0,0,0,0.04);
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.04);
}
.left a{
    width: 100%;
    height: 100%;
    display: block;
    font-size: 14px;
    color: #707070;
    margin-bottom: 1px;
}
.left li{
    width: 96px;
    margin: 5px auto;
}
.left li :hover{
    background-color: #f44444;
}
.right{
    float: left;
    width: 760px;
    min-height: 500px;
    margin-right: 12px;
}
.right li{
    padding: 18px 24px;
    background: #fff;
    border-bottom: 1px solid #f4f4f4;
    position: relative;
    -webkit-box-shadow: 0 1px 2px 0 rgba(0,0,0,0.04);
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.04);
}
.right h2{
    font-size: 18px;
    font-weight: bold;
    line-height: 24px;
    height: 24px;
    margin-bottom: 4px;
    overflow: hidden;
    white-space: nowrap;
}
.right h2 a{
    max-width: 98%;
    color: #3d3d3d;
    display: block;
    line-height: 24px;
    height: 24px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>


