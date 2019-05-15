<template>
  <v-app>
    <v-layout row wrap class="app_con">
      <navigation/>
      <router-view v-if="login" :feeds="feeds" :api="api" :chat="chat" :userId="id"></router-view>
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
      this.$http.get('https://script.google.com/macros/s/AKfycbyJp4bpa7PozGNnBqhVRv17oaupXPpSuNhMGimLytm6/dev')
      .then(_res => {
        this.feeds = _res.data.sort(function(a,b){
          return a.content < b.content ? 1 : a.content > b.content ? -1 : 0
        })
      })
      this.$http.get('/chat')
      .then(_res => {
        this.chat = _res.data.Items.sort(function(a,b){
          return a.no < b.no ? 1 : a.no > b.no ? -1 : 0
        })
      })
      this.id = res.id
      this.login = true
    })

    // 
    eventBus.$on('chatSuccess', res => {
      this.chat = res
    })
    this.$socket.on('chat', res => {

    })
  }
}
</script>

<style scoped>
    .app_con {margin-left: 300px; position: relative;}
  @media screen and (max-width: 1200px){
    .app_con {margin-left: 0;}
    .v-navigation-drawer {display: none;}    
  }
</style>
