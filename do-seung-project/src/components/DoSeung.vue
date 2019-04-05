<template>
    <div id="timeline">
        <v-layout row wrap>
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

export default {
    name: 'DoSeung',
    components : {
        CreateFeed,
        Feeds,
        CountDown,
    },
    data() {
        return {
            
        }
    },
    props: {
        feeds: Array
    },
    created() {
        eventBus.$on('submit', submit => {
            this.feeds.unshift({img:'random', content: submit})
        })
    }
}
</script>

<style scoped>
    #timeline {margin: 0 auto; position: relative; width: 100%; max-width: 700px; padding-top: 50px;}
    .title {text-align: center;}
    #timeline .layout {max-width: 700px;}
    h1 {text-align: center;}
    .login .flex {text-align: center;}
    .login {width: 320px; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);}
    @media screen and (max-width: 640px){
        .login {width: 300px;}
        .login h1 {font-size: 24px;}
    }
</style>
