<template>
  <v-app>
    <v-layout row wrap>
      <navigation/>
      <DoSeung/>
    </v-layout>
  </v-app>
</template>

<script>
import DoSeung from './components/DoSeung'
import Navigation from './components/Navigation'


export default {
  name: 'App',
  components: {
    DoSeung,
    Navigation
  },
  data () {
    return {
      
    }
  }
}
</script>

<style>
  @media screen and (max-width: 1200px){
    .v-navigation-drawer {display: none;}    
  }
</style>
