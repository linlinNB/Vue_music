<template>
  <div>
    <div class="index-left">
      <div class="nav">
        <left-bottom-nav></left-bottom-nav>
      </div>
      <div class="card-song-list">
        <left-card-songlist></left-card-songlist>
      </div>
    </div>


    <div class="index-right">
      <slide-show v-bind:slides="slides" class="show_Slide_position"></slide-show>
      <div>
        <p>这是主页的右侧导航栏</p>
      </div>
    </div>
  </div>
</template>

<script>
  import slideshow from '../components/slide-show.vue'
  import leftBottomNav from '../components/left_bottom_nav.vue'
  import ListHeader from '../components/my_songlist_card.vue'
  export default{
    components: {
      'slide-show': slideshow,
      'left-bottom-nav': leftBottomNav,
      'left-card-songlist': ListHeader
    },
    data: function () {
      return {
        slides: [
          {
            title: '第一张图片',
            src: require('../assets/slideshow/1.jpg'),
            href: 'http://www.baidu.com'
          },
          {
            title: '第二张图片',
            src: require('../assets/slideshow/2.jpg'),
            href: 'http://www.baidu.com'
          },
          {
            title: '第三张图片',
            src: require('../assets/slideshow/3.jpg'),
            href: 'http://www.baidu.com'
          },
          {
            title: '第四张图片',
            src: require('../assets/slideshow/4.jpg'),
            href: 'http://www.baidu.com'
          }
        ]
      }
    },
    /*
     * 使用了 Vue框架的一些生命周期的知识:
     *   在本次页面创建的时候应该向服务器请求必要的参数
     *
     * */
    created: function () {

    }

  }
</script>

<style scoped>
  .index-right {
    position: absolute;
    left: 450px;
    width: 70%;
    top: 0;
    bottom: 0;
  }

  .nav {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
  }

  .card-song-list {
    position: absolute;
    left: 55px;
    top: 0;
    bottom: 0px;
    width: 350px;
  }

  html {
    overflow-y: hidden;
    overflow-y: hidden;
  }

  .index-left {
    float: left;
    width: 25%;
    height: 100%;
    text-align: left;
  }

  .index-left-block .hr {
    margin-bottom: 20px;
  }

  .index-left-block h2 {
    background: #4fc08d;
    color: #fff;
    padding: 10px 15px;
    margin-bottom: 20px;
  }

  .index-left-block h3 {
    padding: 0 15px 5px 15px;
    font-weight: bold;
    color: #222;
  }

  .index-left-block ul {
    padding: 10px 15px;
  }

  .index-left-block li {
    padding: 5px;
  }

  .index-board-list {
    overflow: hidden;
  }

  .index-board-item {
    float: left;
    width: 400px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
    padding: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .index-board-item-inner {
    min-height: 125px;
    padding-left: 120px;
  }

  .index-board-car .index-board-item-inner {
    background: url(../assets/images/1.png) no-repeat;
  }

  .index-board-loud .index-board-item-inner {
    background: url(../assets/images/2.png) no-repeat;
  }

  .index-board-earth .index-board-item-inner {
    background: url(../assets/images/3.png) no-repeat;
  }

  .index-board-hill .index-board-item-inner {
    background: url(../assets/images/4.png) no-repeat;
  }

  .index-board-item h2 {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    margin-bottom: 15px;
  }

  .line-last {
    margin-right: 0;
  }

  .index-board-button {
    margin-top: 20px;
  }

  .lastest-news {
    min-height: 512px;
  }

  .hot-tag {
    background: red;
    color: #fff;
  }

  .new-item {
    display: inline-block;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
