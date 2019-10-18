<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" clearable placeholder="请输入用户名">
      <span slot="prepend">
        <Icon :size="16" type="ios-person"></Icon>
      </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" clearable v-model="form.password" placeholder="请输入密码">
      <span slot="prepend">
        <Icon :size="14" type="md-lock"></Icon>
      </span>
      </Input>
    </FormItem>
    <FormItem prop="code">
      <Input type="text" size="large" clearable v-model="form.code" placeholder="请输入图形验证码">
        <span slot="prepend">
            <Icon :size="14" type="ios-barcode" />
        </span>
        <span slot="append">
          <img :src="codeimgsrc" style="width: 110px;height: 20px;cursor: pointer;" @click="tuxingcode($public.timestampToTime())" >
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button size="large" @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
  import {captcha} from "../../api/user";
  export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data() {
    return {
      form: {
        userName: '',
        password: '',
        code:'',
      },
      long:false,
      imgToken:"",
      codeimgsrc:null,
    }
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            'account': this.form.userName,
            'pswd': this.$md5(this.form.password),
            'code': this.form.code,
            // 'imgToken':this.imgToken
          })
        }
      })
    },
    tuxingcode(captcha1){
      var _this = this;
      _this.imgToken = captcha1;
      _this.codeimgsrc = captcha()
    }
  },
  mounted(){
    this.tuxingcode(this.$public.timestampToTime());
  }
}

</script>
