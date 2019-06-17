<template>
    <div class="main">
        <div class="filter-box d-flex align-items-center">
            <ul class="filter-sort-box d-flex align-items-center">
                <li class="sort">排序：</li>
                <li><a href="javascript:void(0);" class="btn-filter-sort active" target="_self">默认</a></li>
                <li><a href="" class="btn-filter-sort " target="_self">按更新时间</a></li>
                <li><a href="" class="btn-filter-sort " target="_self">按访问量</a></li>
            </ul>
        </div>
        <div class="article-list">
            <div class="article-item-box csdn-tracking-statistics" v-for="item in person.articleList" :key="item.articleId">
                <h4 class="">
                    <router-link :to="getArticleUrl()">{{item.title}}</router-link>
                </h4>
                <p class="content">
                    <router-link :to="getArticleUrl()">{{item.content}}</router-link>
                </p>
                <div class="info-box d-flex align-content-center">
                    <p><span class="date">{{item.createtime}}</span></p>
                    <p class="point"></p>
                    <p><span class="read-num">阅读数 <span class="num">{{item.readnum}}</span></span></p>
                    <p class="point"></p>
                    <p><span class="read-num">评论数 <span class="num">{{item.commentsnum}}</span></span></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import service from "../libs/service";
export default {
    data (){
        return {
            person:{}
        }
    },
    props: ["userid"],
    methods:{
        getPersonInfo:function (userid) {
            var self = this;
            service
                .ajax("/static/datas/persons.json")
                .then(res => {
                if (res[userid]) {
                    self.person = res[userid];
                }
                })
                .catch();
        },
        getArticleUrl(e){
            var articleId="123456";
            return "/"+this.person.name+"/article/"+articleId;
        }
    },
    mounted (){
        this.getPersonInfo(this.userid);
    }
}
</script>
<style scoped>
.align-items-center {
    -webkit-box-align: center !important;
    -ms-flex-align: center !important;
    align-items: center !important;
}

.d-flex {
    display: -webkit-box !important;
    display: -ms-flexbox !important;
    display: flex !important;
}
.filter-box {
    padding: 0 24px;
    height: 48px;
    background: #fff;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
}
.filter-box ul.filter-sort-box li.sort{
    margin-right: 8px;
    color: #999;
}
.filter-box ul.filter-sort-box li {
    margin-right: 24px;
}
.article-list {
    margin-top: 1px;
    padding: 0;
    background-color: transparent;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
    margin-top: 1px;
    /* margin-bottom: 200px; */
}
.article-list .article-item-box {
    position: relative;
    margin-bottom: 1px;
    padding: 12px 24px;
    background-color: #fff;
    word-wrap: break-word;
}
.article-list * {
    word-wrap: break-word;
    text-align: left
}
.article-list .article-item-box h4 {
    margin-bottom: 6px;
    font-size: 18px;
    line-height: 24px;
    color: #3d3d3d;
    display: inline-block;
}
.article-list .article-item-box h4 a {
    display: block;
    word-break: break-all;
    color: #3d3d3d;
}
.article-list .article-item-box p.content {
    font-size: 14px;
    line-height: 22px;
    white-space: normal;
    color: #999;
}
.article-list .article-item-box p.content a {
    font-size: 14px;
    color: #6b6b6b;
}
.article-list .article-item-box div.info-box {
    padding-top: 4px;
    font-size: 14px;
    color: #6b6b6b;
    float: right;
    position: relative;
}
.article-list .article-item-box div.info-box {
    float: none;
}
.article-list .article-item-box div.info-box p {
    margin-right: 0;
}
.article-list .article-item-box div.info-box p .date {
    color: #6b6b6b;
}
.article-list .article-item-box div.info-box .point {
    background-color: #e0e0e0;
    width: 1px;
    height: 12px;
    margin-top: 4px;
    margin-left: 8px;
    margin-right: 8px;
}
</style>


