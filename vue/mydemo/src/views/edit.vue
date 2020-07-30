<template>
  <div class="layout">
    <div class="article-bar flex flex--row layout__panelv">
      <div class="article-bar__input-box">
        <input
          v-model="title"
          maxlength="100"
          placeholder="输入文章标题"
          class="article-bar__title article-bar__title--input text-input article-bar__title--focus"
        >
      </div>
      <div class="article-bar__user-box flex flex--row">
        <button class="btn btn-publish" @click="publish()">发布文章</button>
        <div class="user-box">
          <div class="btn-userinfo" @mouseleave="hideMenu()" @mouseover="showMenu($event)">
            <div class="avatar-box">
              <a href="/">
                <img
                  src="https://avatar.csdnimg.cn/E/8/6/1_xuexiang1234.jpg"
                  alt="xuexiang1234"
                  width="32"
                  height="32"
                  class="img-user-avatar"
                >
              </a>
            </div>
            <div class="user-option-box" @mouseover="showMenu($event)">
              <a href>我的博客</a>
              <a href>退出</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layout__panel flex flex--row">
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      ></quill-editor>
      <div class="yulan ql-container ql-snow">
        <div class="ql-editor"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import {dateFormat} from "@/libs/util"
import $ from "jquery";
import FileSaver from "file-saver";
export default {
  data() {
    return {
      title: "",
      content: null,
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], //引用，代码块

            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向

            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题

            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], //字体
            [{ align: [] }], //对齐方式

            ["clean"], //清除字体样式
            ["image", "video"] //上传图片、上传视频
          ]
          //theme:'snow'
        }
      }
    };
  },
  methods: {
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
      $(".yulan .ql-editor").html(this.content);
    },
    hideMenu() {
      $(".user-option-box").hide();
    },
    showMenu(e) {
      $(".user-option-box").show();
      e.preventDefault();
    },
    publish() {
      var ob = {
        "123456": {
          title: this.title,
          createTime: dateFormat(new Date().getTime()),
          author: {
            url: "/home/chao",
            name: "chao"
          },
          num: 14586,
          content: this.content
        }
      };
      var content = JSON.stringify(ob);
      var blob = new Blob([content ], {type: "text/plain;charset=utf-8"}); 
      FileSaver.saveAs(blob, "article.json");
    }
  }
};
</script>
<style scoped>
.layout {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}
.article-bar {
  width: 100%;
  height: 56px;
  overflow: inherit;
}
.flex--row {
  flex-direction: row;
}
.flex {
  display: flex;
}
.article-bar__input-box {
  width: 100%;
  margin: 8px 24px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
}
.text-input {
  display: block;
  font-variant-ligatures: no-common-ligatures;
  width: 100%;
  height: 36px;
  padding: 3px 12px;
  font-size: inherit;
  line-height: 1.5;
  color: inherit;
  background-color: #fff;
}
.article-bar__input-box .article-bar__title--input {
  display: inline-block;
  width: 92%;
  padding: 0px;
  font-size: 18px;
  line-height: 24px;
  background-color: #fff;
}
input {
  background-image: none;
  border: 0;
  border-radius: 4px;
  overflow: visible;
}
.article-bar__user-box {
  padding: 8px 32px 8px 0;
  width: 232px;
}
.article-bar__user-box .btn-publish {
  padding: 0 16px;
  font-size: 16px;
  color: #fff;
  border: none;
  border-radius: 4px;
  white-space: nowrap;
  background-color: #ca0c16;
}
.article-bar__user-box .user-box {
  position: relative;
  margin-left: 32px;
  margin-top: 4px;
  margin-right: 10px;
}
.article-bar__user-box .user-box .btn-userinfo {
  cursor: pointer;
}
.article-bar__user-box .user-box .btn-userinfo .avatar-box {
  position: relative;
}
.article-bar__user-box .user-box .user-option-box {
  display: none;
  position: absolute;
  top: 36px;
  left: -35px;
  padding: 16px;
  width: 96px;
  /* height: 110px; */
  background: #fff;
  border: 1px solid #ebebeb;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  z-index: 1;
}
.article-bar__user-box .user-box .user-option-box:before {
  content: "";
  display: block;
  position: absolute;
  left: 46px;
  top: -5px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #fff;
}
.article-bar__user-box .user-box .user-option-box a {
  display: block;
  margin-top: 4px;
  font-size: 14px;
  color: #3c3c3c;
  text-decoration: none;
}
.article-bar__user-box .user-box .btn-userinfo .avatar-box img {
  display: block;
  border-radius: 16px;
}
.layout__panel {
  position: relative;
  width: 100%;
  height: 100%;
  flex: none;
  overflow: hidden;
}
img {
  width: 32px;
  height: 32px;
}
.quill-editor {
  width: 50%;
}
.yulan {
  width: 50%;
  border: solid 1px gainsboro;
  overflow-y: auto;
}
</style>


