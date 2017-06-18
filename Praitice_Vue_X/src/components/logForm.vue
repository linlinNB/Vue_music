<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <!-- 此处需要注意：绑定了数据部分usernameModel -->
          <input type="text" placeholder="请输入你的用户名" v-model="username">
        </div>
        <span class="g-form-error" v-if="usernameModel.status === false">{{ usernameModel.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" placeholder="请输入密码" v-model="password">
        </div>
        <span class="g-form-error" v-if="passwordModel.status === false">{{ passwordModel.errorText }}</span>
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
  import axios from 'axios'
  export default{
    data: function () {
      return {
        username: '',
        password: '',
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
      usernameModel () {
        var errorText = ''
        var status = true
        var usernameflag = /@/g
        if (usernameflag.test(this.username)) {
          errorText = ''
          status = true
        } else {
          if (this.username === '') {
            errorText = ''
          } else {
            errorText = '用户名不符合规范'
          }
          status = false
        }
        return {
          errorText,
          status
        }
      },
      passwordModel () {
        var errorText = ''
        var status = true
        var passwordflag = /^\w{1,6}$/g
        if (!passwordflag.test(this.password)) {
          if (this.password === '') {
            errorText = ''
          } else {
            errorText = '密码不符合规范'
          }
          status = false
        } else {
          errorText = ''
          status = true
        }
        return {
          errorText,
          status
        }
      }
    },
    methods: {
      onLogin: function () {
        var uname = this.username
        var upassword = this.password
        var Control_this = this.$store
        if (this.usernameModel.status || this.passwordModel.status) {
          /* 进行异步传输的编写 */
          var params = new URLSearchParams()
          params.append('username', uname)
          params.append('password', upassword)
          axios.post('http://localhost:8080/TestAudio2/loginUser', params)
            .then(function (res) {
              console.log('获取了response对象 = ' + res.data.loginres[0].username)
              /*Control_this.$emit('on-close')*/
              /*console.log(Control_this)*/
              if (res.status === 200) {
                /*var ds = eval('(' + res.responseText + ')')*/
                  let login_userInfo = {
                    username: res.data.loginres[0].username,
                    userID: res.data.loginres[0].uid
                  }
                  console.log('将登录信息放置前端页面  ！ ！ ！')
                  Control_this.dispatch('userLogin',login_userInfo)
              }
            })
            .catch(function (error) {
              console.log('账户或者密码不正确 = ' + error)
            })
        } else {
          this.errorText = '部分选项未通过'
        }
      }
    }
  }
</script>

<style scoped>
</style>
