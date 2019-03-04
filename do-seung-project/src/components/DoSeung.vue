<template>
    <div>
        <v-layout row wrap class="layout" v-if="login">
            <v-flex xs12 class="title">
                <CountDown/>
            </v-flex>
            <v-container grid-list-sm>
                <CreateFeed/>
                <Feeds v-for="feed in feeds" :key="feed.content" :para="feed" />
            </v-container>
        </v-layout>
        <v-layout row wrap class="layout" v-else>
            <h1>PASSWORD</h1>
            <input type="text" v-model="pw">
            <v-btn @click="checkLogin"></v-btn>
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
        CountDown
    },
    data() {
        return {
            feeds: [
            ],
            loadDone : false,
            pw : null,
            login: false
        }
    },
    methods: {
        checkLogin(){
            axios.post('https://0yunt9oocd.execute-api.ap-northeast-2.amazonaws.com/prod/users',{
                "pw": this.pw
            })
            .then(res => {
                if(res.data.access == 'success'){
                    this.login = true
                }
            })
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
            if(this.pw == "hello"){
                this.loadDone = true
            }
        })
    }
}
</script>

<style scoped>
    .title {text-align: center;}
    .layout {max-width: 700px; margin: 0 auto;}
</style>
