<template>
  <v-app>
    <navigation/>
    <v-layout row wrap class="abc">
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
  .abc {margin-left: 300px;}
</style>
