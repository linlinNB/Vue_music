<template>
  <div v-bind:class="{dialogshow : isShow===false}">
    <div class="dialog-wrap"></div>
    <div class="dialog-cover" v-if="isShow === true"></div>
    <transition name="drop">
      <div class="dialog-content" v-if="isShow === true">
        <p class="dialog-close" v-on:click="close_login_dialog">关闭</p>
        <slot>这里是插槽器</slot>
      </div>
    </transition>
    <div></div>
  </div>
</template>

<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {

      }
    },
    computed: {},
    methods: {
      close_login_dialog: function () {
        console.log('点击了登录浮动窗体的关闭按钮')
        this.$emit('on-close')
      }
    }
  }
</script>


<style scoped>
  .drop-enter-active {
    transition: all .5s ease;
  }

  .drop-leave-active {
    transition: all .3s ease;
  }

  .drop-enter {
    transform: translateY(-500px);
  }

  .drop-leave-active {
    transform: translateY(-500px);
  }
  .dialogshow {
    display: none;
  }

  .dialog-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
  }

  .dialog-cover {
    background: #000;
    opacity: .3;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .dialog-content {
    width: 25%;/*整体对话框宽度*/
    max-height: 65%;/*最大高度*/
    overflow: auto;/*内容溢出时是否出现滚动条显示*/
    background: #fffffa;
    position: absolute;/*设置水平居中*/
    text-align: center;
    left:0;
    right:0;
    top: -80px;
    bottom: 0;
    margin: auto;
    z-index: 10;/*元素的堆叠顺序：浮于页面上方*/
    border: 2px solid #464068;
    padding: 2%;
    line-height: 1.6;
  }

  .dialog-close {/*关闭换成Q版小×，用子太丑；换完之后再调*/
    position: absolute;
    right: 5px;
    top: 5px;
    width: 40px;
    height: 20px;
    text-align: center;
    cursor: pointer;
  }

  .dialog-close:hover {
    color: #4fc08d;
  }
</style>

