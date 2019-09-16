<template>
  <v-app>
    <v-layout row wrap class="app_con">
      <navigation :userId="id"/>
      <router-view v-if="login" :feeds="feeds" :chat="chat" :userId="id"></router-view>
      <Login v-else/>
    </v-layout>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation'
import Login from './components/Login'
import { eventBus } from './main'

export default {
  name: 'App',
  components: {
    Navigation,
    Login
  },
  data () {
    return {
      login: false,
      id: null,
      feeds : [],
      chat : []
    }
  },
  created(){
    // 로그인성공 후 api가져오기
    eventBus.$on('loginSuccess', res => {
      this.$http.get('/feed')
      .then(_res => {
        this.feeds = _res.data.sort(function(a,b){
          return a.no > b.no ? 1 : a.no < b.no ? -1 : 0
        })
      })
      // this.$http.get('https://script.googleusercontent.com/macros/echo?user_content_key=l52LBNWZhlCa4P9yBtPFjh_jUZfxgiVnuo34llptTJ6bpbGjTZvKMIAnu0AK2YG2Q79ZLtB2_xU8_0Me4pjIENYsJLjNRDe4m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnO-CikAhlmO6sxo6EyF3xWN3FgICoKoHfkHVgKp5rd3k_iAtV-vM3JIrWLVNrTiWCw&lib=MWBl27hf3sQu2TtzIAyBGsTSN4hXl_mY8')
      // .then(_res => {
      //   this.feeds = _res.data.sort(function(a,b){
      //     return a.content < b.content ? 1 : a.content > b.content ? -1 : 0
      //   })
      // }).catch(_err => {
      //   console.log(_err)
      // })
      this.$http.get('/chat')
      .then(_res => {
        this.chat = _res.data.sort(function(a,b){
          return a.no > b.no ? 1 : a.no < b.no ? -1 : 0
        })
      })
      this.id = res.id
      this.login = true
    })

    this.$socket.on('chat', res => {
      this.chat.push(res)
    })
  }
}
</script>

<style scoped>
    .app_con {margin-left: 300px; position: relative;}
  @media screen and (max-width: 1200px){
    .app_con {margin-left: 0; margin-top: 56px;}
  }
</style>
