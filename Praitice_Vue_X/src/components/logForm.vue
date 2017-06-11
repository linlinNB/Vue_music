<template>
  <div class="login-form">
    <div class="g-from-img">

    </div>
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名</span>
        <div class="g-form-input">
          <!-- 此处需要注意：绑定了数据部分usernameModel -->
          <input type="text" placeholder="请输入你的用户名" v-model="usernameModel">
        </div>
        <span class="g-form-error">{{ userErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密&nbsp&nbsp&nbsp&nbsp码</span>
        <div class="g-form-input">
          <input type="password" placeholder="请输入密码" v-model="passwordModel">
        </div>
        <span class="g-form-error">{{ passwordErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <!--此处进行绑定click事件：触发onLogin事件-->
          <a class="button" v-on:click="onLogin">登录</a>
        </div>
      </div>
      <p>{{ errorText }}</p>
    </div>
  </div>
</template>

<script>
  export default{
    data: function () {
      return {
        usernameModel: '',
        passwordModel: '',
        errorText: ''
      }
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
      onLogin: function () {
        if (this.userErrors.status || this.passwordErrors.status) {
          this.errorText = '部分选项未通过'
        } else {
          this.errorText = ''

          this.$http.get('api/login')
            .then((res) => {
              this.$emit('has-log', res.data)
            }, (error) => {
              console.log(error)
            })
        }
      }
    }
  }
</script>

<style scoped>
</style>
