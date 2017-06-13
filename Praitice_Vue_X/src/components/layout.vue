<template>
  <div>
    <div class="app-head">
      <div class="app-head-inner">
        <img class="head-logo" src="../assets/logo.png">
        <div class="head-nav">
          <ul class="nav-list">
            <li v-if="" v-on:click="show_Login_Form">登录</li>
            <li class="nav-pile">|</li>
            <li v-on:click="show_Regsin_Form">注册</li>
            <li class="nav-pile">|</li>
            <li v-on:click="show_About_Form">关于</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="app-content">
      <!-- 此处因为对于主页经常访问，所以我们设置了缓存机制 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>




    <div class="app-foot">
      <!--<p>这句话上面应该有一个audio标签，但是audio标签太丑陋了,完全没有美感，只能自定义按钮了</p>-->
      <mu-paper :zDepth="1">
        <my-music ref="music"></my-music>
      </mu-paper>
    </div>




    <my-dialog v-bind:isShow="this.isShowLogin" v-on:on-close="closeDialog('isShowLogin')">
      <login-form></login-form>
    </my-dialog>
    <!-- 注册页面还有严重问题 -->
    <my-dialog v-bind:isShow="this.isShowReg" v-on:on-close="closeDialog('isShowReg')">
      <reg-form></reg-form>
    </my-dialog>
    <my-dialog v-bind:isShow="this.isShowAbout" v-on:on-close="closeDialog('isShowAbout')">
      <about-form></about-form>
    </my-dialog>
  </div>
</template>

<script>
  import mymusic from '../components/my_music.vue'
  import dialog from '../components/dialog.vue'
  import logForm from '../components/logForm.vue'
  import aboutForm from '../components/about.vue'
  import regForm from '../components/regForm.vue'
  export default{
    components: {
      'my-music': mymusic,
      'my-dialog': dialog,
      'login-form': logForm,
      'about-form': aboutForm,
      'reg-form': regForm
    },
    data: function () {
      return {
        isShowLogin: false,
        isShowReg: false,
        isShowAbout: false
      }
    },
    methods: {
      show_Login_Form: function () {
        this.isShowLogin = true
      },
      show_Regsin_Form: function () {
        this.isShowReg = true
      },
      show_About_Form: function () {
        this.isShowAbout = true
      },
      closeDialog: function (attr) {
        this[attr] = false
      }
    }
  }

</script>

<!-- 在此建议使用了全局共享的一个设置，对于layout组件的作用域全面放开 -->
<style>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  body {
    overflow-y: hidden;
    overflow-x: hidden;
  }

  .my-music {
    float: left;
  }

  .app-foot {
    position: absolute;
    text-align: center;
    height: 80px;
    width: 100%;
    background: #e3e4e8;
    clear: both;
    margin-top: 30px;
    bottom: 0px;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  html {
    overflow-y: hidden;
    overflow-y: hidden;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  body {
    background: #f0f2f5;
    font-family: "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei UI", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    font-size: 14px;
    color: #444;
  }

  .app-head {
    /*background: #363636;*/
    background-image: linear-gradient(-225deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%);
    color: #b2b2b2;
    height: 60px;
    line-height: 90px;
    width: 100%;
  }

  .app-head-inner {
    width: 1200px;
    margin: 0 auto;
  }

  .head-logo {
    float: left;
  }

  .app-head-inner img {
    width: 50px;
    margin-top: 8px;
  }

  .head-nav {
    float: right;
    height: 60px;
  }

  .head-nav ul {
    overflow: hidden;
    height: 60px;
    margin: 0px 0px 0px 0px;
  }

  .head-nav li {/*右上角登录部分*/
    cursor: pointer;/*设定网页浏览时用户鼠标指针的样式*/
    float: left;
    height: 60px;
    margin-top: -10px;
    color: black;
  }

  .nav-pile {
    padding: 0 5px;
  }

  .container {
    width: 1200px;
    margin: 0 auto;
  }

  .hr {
    height: 1px;
    width: 100%;
    background: #ddd;
  }

  .button {
    background: #4fc08d;
    color: #fff;
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
  }

  .button:hover {
    background: #4fc08d;
  }
  .g-from-img{
    height: 120px;
  }
  .g-form {

  }

  .g-form-line {
    padding: 15px 0;
  }

  .g-form-label {
    float: left;
    margin-left: -40px;
    width: 100px;
    font-size: 14px;
    display: inline-block;
  }

  .g-form-input {
    display: inline-block;
    width: 230px;
  }

  .g-form-input input {
    height: 30px;
    width: 200px;
    line-height: 60px;/*行高*/
    vertical-align: middle;
    padding: 0 10px;/*输入字符和输入框的边距*/
    border: 1px solid #ccc;
  }

  .g-form-btn {
    padding-left: 100px;
  }

  .g-form-error {
    color: red;
    padding-left: 15px;
  }
  .app-content {
    position: absolute;
    top: 90px;
    bottom: 80px;
  }
</style>
