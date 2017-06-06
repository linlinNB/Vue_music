<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line" v-for="formLine in formData">
        <span class="g-form-label">{{ formLine.label }}</span>
        <div class="g-form-input">
          <input type="text" placeholder="请输入用户名" v-model="formLine.model">
        </div>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" v-on:click="onLogin">注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      'isShow': 'boolean'
    },
    data: function () {
      return {}
    },
    computed: {
      /*
       * 此处需要注释：
       *   1.errorText：是要显示错误的提示信息的，利用ajax方式去异步传输
       *   2.status: 是一次判断此页面的文本框输入的信息符合要求
       *
       *   userErrors() : 采用了闭包了结构，虚拟了一个userError对象
       *   passwordErrors() : 采用了闭包了结构，虚拟了一个passwordErrors()对象
       *
       * */
      userErrors () {
        let errorText, status
        if ((!/@/g.test(this.usernameModel))) {
          status = false
          errorText = '缺少@符号'
        } else {
          status = true
          errorText = ''
        }
        if (this.userFlags === false) {
          errorText = ''
          this.userFlags = true
        }
        return {
          status,
          errorText
        }
      },
      passwordErrors () {
        let errorText, status
        if ((!/^\w{1,6}$/g.test(this.passwordModel))) {
          status = false
          errorText = '密码不是1-6位'
        } else {
          status = true
          errorText = ''
        }
        if (!this.passwordFlags === false) {
          errorText = ''
          this.passwordFlags = true
        }
        return {
          status,
          errorText
        }
      }
    },
    methods: {
      closeMyself () {
        this.$emit('on-close')
      }
    }
  }
</script>

<!-- 我们设置了css作用域，一些新的样式只能在本组件中使用 -->
<style scoped>
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
    width: 50%;
    position: fixed;
    max-height: 50%;
    overflow: auto;
    background: #fff;
    top: 20%;
    left: 50%;
    margin-left: -25%;
    z-index: 10;
    border: 2px solid #464068;
    padding: 2%;
    line-height: 1.6;
  }

  .dialog-close {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;
  }

  .dialog-close:hover {
    color: #4fc08d;
  }
</style>
