<template>
  <div class="login">
    <el-card class="login-card" shadow="hover">
      <!-- title -->
      <div class="login-card-title">
        <h3 class="title">用户登陆</h3>
      </div>
      <el-form class="login-card-form" :model="form" :rules="rules" ref="form">
        <!-- userName -->
        <el-form-item class="form-userName" prop="username">
          <!-- prop 负责绑定校验规则 -->
          <svg class="icon prefix" aria-hidden="true">
            <use xlink:href="#icon-yonghu"></use>
          </svg>
          <el-input placeholder="请输入用户名" v-model.trim="form.username"
            >用户名</el-input
          >
          <svg class="icon conceal" aria-hidden="true">
            <use xlink:href="#icon-biyan"></use>
          </svg>
        </el-form-item>
        <!-- password -->
        <el-form-item class="form-password" prop="password">
          <svg class="icon prefix" aria-hidden="true">
            <use xlink:href="#icon-mima"></use>
          </svg>
          <el-input
            placeholder="请输入密码"
            v-model.trim="form.password"
            :type="inputType"
            ref="password"
            @keyup.enter.native="handleLogin"
            >密码</el-input
          >
          <!-- 给vue组件绑定事件的时候，必须加上 native，否则会让我监听的是来自 item 组件自定义的事件 -->
          <!-- el-input 封装input，在其外部加了一个 div  -->
          <svg class="icon suffix" aria-hidden="true" @click="showPwd">
            <use
              :xlink:href="
                inputType === 'password' ? '#icon-biyan' : '#icon-yanjing'
              "
            ></use>
          </svg>
        </el-form-item>
        <!-- loginButton -->
        <el-button type="success" :loading="loading" @click="handleLogin"
          >登陆</el-button
        >
        <!-- el-button 源码中添加了 handleClick函数 -->
      </el-form>
    </el-card>
    <div class="copyright">
      Photo by
      <a href="https://unsplash.com/photos/S_IV6KqGeso" target="_blank">
        Matt Sclarandis</a
      >
      on
      <a href="https://unsplash.com/" target="_blank">Unsplash</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-view',
  data() {
    // username 验证
    const validateUsername = (rule, value, callback) => {
      // 为空
      if (!value) {
        callback(new Error('用户名不可为空'))
      } else {
        callback()
      }
    }
    // password 验证
    const validatePassword = (rule, value, callback) => {
      // 为空
      if (!value) {
        callback(new Error('密码不可为空'))
        // 长度不足 5 位
      } else if (value.length < 5) {
        callback(new Error('密码长度至少为 5 位'))
      } else {
        callback()
      }
    }
    return {
      // form
      form: {
        username: '',
        password: ''
      },
      // rules
      rules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      inputType: 'password',
      loading: false
    }
  },
  methods: {
    // password
    showPwd() {
      if (this.inputType === 'password') {
        this.inputType = ''
      } else {
        this.inputType = 'password'
      }
      // input focus
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // login
    handleLogin() {
      // username + password 统一验证
      this.$refs.form.validate(async (valid) => {
        // 验证通过
        if (valid) {
          // button 的 loading 加载
          this.loading = true
          // button 的防抖
          // 调用 vuex 中 user/login
          await this.$store
            .dispatch('user/login', this.form)
            .then(() => {
              // 关闭 loading 加载
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$loginColor: #67c23a;
@keyframes move {
  0% {
    background-position: 0 100%;
  }
  50% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 100%;
  }
}
.login {
  height: 100%;
  background: url('@/assets/bg.jpg');
  background-size: 100%;
  animation: move 100s infinite alternate forwards ease;
  &-card {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 300px;
    background-color: transparent;
    &-title {
      text-align: center;
      margin: 20px;
      font-size: 20px;
      color: $loginColor;
    }
    &-form {
      text-align: center;
      .icon {
        color: $loginColor;
      }
      .conceal {
        // display: none;  不占位置，只是不显示
        visibility: hidden;
        // 占位置且不可见
      }
      // 重置 element-input css
      .el-input {
        display: inline-block;
        width: 85%;
        border: 0px;
        ::v-deep .el-input__inner {
          border: 0;
        }
      }
      .el-form-item {
        border: 1px solid #ccc;
        border-radius: 5px;
        ::v-deep .el-form-item__content {
          line-height: 50px;
        }
      }
    }
  }
  .copyright {
    position: fixed;
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);
    color: #c4c4c4;
    font-size: 13px;
    font-weight: 600;
    a:hover {
      color: #e3eaef;
      font-weight: 700;
    }
  }
}
::v-deep .el-input__inner {
  background-color: transparent;
  color: $loginColor;
}
</style>
