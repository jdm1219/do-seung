<template>
  <v-app>
    <v-layout row wrap>
      <navigation/>
      <router-view v-if="login"></router-view>
      <Login v-else/>
    </v-layout>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation'
import Login from './components/Login'


export default {
  name: 'App',
  components: {
    Navigation,
    Login
  },
  data () {
    return {
      login: false
    }
  }
}
</script>

<style>
  @media screen and (max-width: 1200px){
    .v-navigation-drawer {display: none;}    
  }
</style>
