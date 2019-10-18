<style lang="less">
  @import './login.less';
</style>
<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录BNRCOIN后台管理" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit">
          </login-form>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
  import LoginForm from '_c/login-form'
  import {mapActions} from 'vuex'
  import {login} from '../../api/user'

  export default {
    components: {
      LoginForm
    },
    methods: {
      ...mapActions([
        'handleLogin',
        'getUserInfo'
      ]),
      handleSubmit(account) {
        var _this = this;
        login(account).then(res => {
          if (res.data.code == '200') {
            _this.$Message.success({
              content: '登陆成功',
              path: _this.$config.homeName
            });
            window.sessionStorage.setItem("token", JSON.stringify(res.data.result.token));

            window.sessionStorage.setItem("bnr-permissionlist", JSON.stringify(res.data.result.pression.permissionlist));
            window.sessionStorage.setItem("setToken", JSON.stringify(res.data.result));
            window.sessionStorage.setItem("adminToken", res.data.result.pression.name);

            _this.getUserInfo();

            window.setTimeout(function () {
              _this.$router.push({
                path: _this.$config.homeName
              });
            }, 800);
          } else {
            _this.$Message.warning({
              content: res.data.message
            });
          }
        });
      }
    }
  }
</script>
<style>
</style>
