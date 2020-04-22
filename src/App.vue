<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import loginService from '@/api/login/LoginService'
import { getSaltedPwd } from '@/utils/auth'
export default {
  name: 'App',
  created() {
    if (!this.$global.userInfo.userId) {
      loginService.getUserSession().then(data => {
        // console.log(data);

        if (!data.userId) {
          if (this.$route.path !== '/login') {
            this.$alert('你的登录信息已失效，请重新登录', '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$store.dispatch('user/logout').then(res => {
                  this.$router.push(`/login?redirect=${this.$route.fullPath}`)
                  return
                })
              }
            })
          }
        } else {
          this.$global.userInfo = data
          this.$store.dispatch('user/updateUserInfo', { ...{ password: getSaltedPwd() }, ...data })
        }
        console.warn(this.$global.userInfo)
      })
    }
  }
}
</script>
