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
    <div class="app-foot" tabindex="0" v-on:keyup="change_music">
      <!--<p>这句话上面应该有一个audio标签，但是audio标签太丑陋了,完全没有美感，只能自定义按钮了</p>-->
      <my-music ref="music"></my-music>
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
  import $ from 'jquery'
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
      },
      change_music: function () {
        $('.app-foot').keydown(function (keyword) {
          if (keyword.keyCode === 38) {
            console.log('全局按键-上')
            console.log(this.$refs.music)
          } else if (keyword.keyCode === 40) {
            console.log('全局按键-下')
            console.log(this.$refs.music)
          }
        })
      }
    },
    mounted: function () {
      $('.app-foot').focus()
    }
  }

</script>

<!-- 在此建议使用了全局共享的一个设置，对于layout组件的作用域全面放开 -->
<style>
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
    background: #363636;
    color: #b2b2b2;
    height: 90px;
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
    margin-top: 20px;
  }

  .head-nav {
    float: right;
  }

  .head-nav ul {
    overflow: hidden;
  }

  .head-nav li {
    cursor: pointer;
    float: left;
  }

  .nav-pile {
    padding: 0 10px;
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

  .g-form {

  }

  .g-form-line {
    padding: 15px 0;
  }

  .g-form-label {
    width: 100px;
    font-size: 16px;
    display: inline-block;
  }

  .g-form-input {
    display: inline-block;
  }

  .g-form-input input {
    height: 30px;
    width: 200px;
    line-height: 30px;
    vertical-align: middle;
    padding: 0 10px;
    border: 1px solid #ccc;
  }

  .g-form-btn {
    padding-left: 100px;
  }

  .g-form-error {
    color: red;
    padding-left: 15px;
  }
</style>
