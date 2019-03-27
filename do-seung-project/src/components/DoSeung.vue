<template>
    <div id="timeline">
        <v-layout row wrap class="layout" v-if="login">
            <v-flex xs12 class="title">
                <CountDown/>
            </v-flex>
            <v-container grid-list-sm>
                <CreateFeed/>
                <Feeds v-for="feed in feeds" :key="feed.content" :para="feed" />
            </v-container>
        </v-layout>
        
    </div>
</template>


<script>
import CreateFeed from './CreateFeed'
import Feeds from './Feeds'
import CountDown from './CountDown'
import { eventBus } from '../main'
import axios from 'axios'

export default {
    name: 'DoSeung',
    components : {
        CreateFeed,
        Feeds,
        CountDown,
    },
    data() {
        return {
            feeds: [
            ],
            loadDone: false
        }
    },
    created() {
        eventBus.$on('submit', submit => {
            this.feeds.unshift({img:'random', content: submit})
        })
        axios.get('https://script.google.com/macros/s/AKfycbyJp4bpa7PozGNnBqhVRv17oaupXPpSuNhMGimLytm6/dev')
        .then(res => {
            this.feeds = res.data
        })
        .then(() => {
            this.loadDone = true
        })
    }
}
</script>

<style scoped>
    #timeline {margin: 0 auto; position: relative; width: 100%; max-width: 700px; padding-top: 50px;}
    .title {text-align: center;}
    .layout {max-width: 700px;}
    h1 {text-align: center;}
    .login .flex {text-align: center;}
    .login {width: 320px; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);}
    @media screen and (max-width: 640px){
        .login {width: 300px;}
        .login h1 {font-size: 24px;}
    }
</style>
