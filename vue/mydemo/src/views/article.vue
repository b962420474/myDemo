<template>
    <div class="main">
        <div class="blog-content-box">
            <div class="article-header-box">
                <div class="article-header">
                    <div class="article-title-box">
                        <h1 class="title-article">{{article.title}}</h1>
                    </div>
                    <div class="article-info-box">
                        <div class="article-bar-top" style="height: 24px;" v-if="article.author!=undefined">
                            <span class="time">{{article.createTime}}</span>
                            <a class="follow-nickName" :href="article.author.url" target="_blank">{{article.author.name}}</a>
                            <span class="read-count">阅读数 {{article.num}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <article v-html="article.content">
        </article>
    </div>
</template>
<script>
import service from "../libs/service";
export default {
    data (){
        return {
            article:{}
        }
    },
    props:["articleId"],
    methods:{
        getArticle:function(articleId){
            service.ajax("/static/datas/article.json").
            then(res =>{
                this.article=res[articleId];
            }).
            catch(res =>{

            });
        }
    },
    mounted (){
        this.getArticle(this.articleId)
    }
}
</script>
<style scoped>
.main div.blog-content-box {
    position: relative;
    padding: 0 24px 16px;
    background: #fff;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
}
.main div.blog-content-box .article-header-box {
    border-bottom: 1px solid #e0e0e0;
    padding-top: 16px;
    z-index: 9;
    background-color: #fff;
    text-align: left;
}
.main div.blog-content-box .article-header-box .article-header div.article-title-box {
    margin-bottom: 8px;
}
.main div.blog-content-box .article-header-box .article-header div.article-title-box .title-article {
    font-size: 24px;
    word-wrap: break-word;
}
.main div.blog-content-box .article-header-box .article-header div.article-info-box {
    padding-bottom: 14px;
    position: relative;
}
.main div.blog-content-box .article-header-box .article-header div.article-info-box div.article-bar-top {
    color: #858585;
    width: 88%;
    height: 24px;
    overflow: hidden;
}
.main div.blog-content-box .article-header-box .article-header div.article-info-box div.article-bar-top span {
    margin-right: 14px;
}
.main div.blog-content-box .article-header-box .article-header div.article-info-box div.article-bar-top .follow-nickName {
    color: #78a5f1;
    margin-right: 14px;
}
a.follow-nickName{
    display: inline-block;
}
</style>


