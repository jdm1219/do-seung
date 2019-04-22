<template>
  <v-app>
    <v-layout row wrap class="app_con">
      <navigation/>
      <router-view v-if="login" :feeds="feeds" :api="api"></router-view>
      <Login v-else/>
    </v-layout>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation'
import Login from './components/Login'
import { eventBus } from './main'
import axios from 'axios'

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
      test : [],
      api : ''
    }
  },
  created(){
    eventBus.$on('loginSuccess', res => {
        axios.get('https://script.google.com/macros/s/AKfycbyJp4bpa7PozGNnBqhVRv17oaupXPpSuNhMGimLytm6/dev')
        .then(res => {
          this.feeds = res.data.sort(function(a,b){
            return a.content < b.content ? 1 : a.content > b.content ? -1 : 0
          })
        })
      this.id = res.id
      this.api = res.chatApi
      this.login = true
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
