<template>
  <div class="slide-show" v-on:mouseover="clearInv" v-on:mouseout="runInv">
    <!-- 设置了滑动组件的切换形式和图片内容（主要更新了图片链接） -->
    <div class="slide-img">
      <!--没错，我就是应该被引用的滑动组件-->
      <a v-if="this.isShow===true" v-bind:src="slides[nowIndex].href">
        <!-- 设置了界面动画 -->
        <transition name="slide-photo">
          <img v-if="this.isShow === true" v-bind:src="slides[nowIndex].src"/>
        </transition>
        <transition name="slide-photo-change">
          <img v-if="this.isShow === false" v-bind:src="slides[nowIndex].src"/>
        </transition>
      </a>
    </div>
    <!-- 设置了滑动图片的标题（当鼠标悬浮在此上面会有提示） -->
    <h2>{{ slides[nowIndex].title }}</h2>
    <ul class="slide-pages">
      <li v-on:click="goto(prevIndex)"><</li>
      <li v-for="(item, index) in slides" v-on:click="goto(index)">
        <a class="{on: index === this.nowIndex}">{{ index + 1 }}</a>
      </li>
      <li v-on:click="goto(nextIndex)">></li>
    </ul>
  </div>
</template>

<script>
  export default{
    props: {
      /*
       * 设置了两个属性分别是：
       *   滑动显示的具体画面
       *   每个滑动页面的具体显示时间
       *
       * */
      slides: {
        type: Array,
        default: []
      }
    },
    data: function () {
      return {
        /*
         nowIndex:表示当前轮播是第几页
         isShow:表示是否显示
         */
        invID: '',
        inv: 2000,
        nowIndex: 0,
        isShow: true
      }
    },
    computed: {
      prevIndex: function () {
        if (this.nowIndex === 0) {
          return this.slides.length - 1
        } else {
          return this.nowIndex - 1
        }
      },
      nextIndex: function () {
        if (this.nowIndex === this.slides.length - 1) {
          return 0
        } else {
          return this.nowIndex + 1
        }
      }
    },
    methods: {
      goto: function (index) {
        this.isShow = false
        setTimeout(() => {
          this.isShow = true
          this.nowIndex = index
        }, 10)
      },
      runInv: function () {
        this.invID = setInterval(() => {
          this.goto(this.nextIndex)
        }, this.inv)
      },
      clearInv: function () {
        clearInterval(this.invID)
      }
    },
    mounted () {
      this.runInv
    }
  }
</script>

<style scoped>
  html {
    overflow-y: hidden;
    overflow-y: hidden;
  }
  .slide-photo-enter-active {
    transition: all .5s;
  }
  .slide-photo-enter {
    transform: translateX(900px);
  }
  .slide-photo-change-leave-active {
    transition: all .5s;
    transform: translateX(-900px);
  }

  .slide-show {
    position: absolute;
    margin-top: 10px;
    width: 900px;
    height: 40%;
    overflow: hidden;
    left: 5%;
  }

  .slide-img {
    width: 100%;
  }

  .slide-pages {
    position: absolute;
    bottom: 10px;
    right: 15px;
  }

  .slide-pages li {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    color: #fff;
  }

  .slide-pages li .on {
    text-decoration: underline;
  }

  .slide-show h2 {
    /* 此处使用了绝对定位，是除了static定位元素之外的第一个检查定位元素 */
    position: absolute;
    width: 100%;
    height: 100%;
    color: #fff;
    background: #000;
    opacity: .5;
    bottom: 0;
    height: 30px;
    text-align: left;
    padding-left: 15px;
  }

  .slide-img img {
    width: 100%;
    position: absolute;
    top: 0;
  }
</style>
