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
        <v-layout row wrap class="layout login" v-else>
            <v-flex xs12>
                <h1>비밀번호를 입력해주세요</h1>
            </v-flex>
            <v-flex xs2>
            </v-flex>
            <v-flex xs5>
                <v-text-field v-model="pw"></v-text-field>
            </v-flex>
            <v-flex xs3>
                <v-btn @click="checkLogin">제출</v-btn>
            </v-flex>
            <v-flex xs2>
            </v-flex>
        </v-layout>
            <v-alert
            :value="loginFail"
            type="warning"
            transition="scale-transition"
            >
            잘못된 비밀번호입니다. 비밀번호를 다시 확인해주세요.
        </v-alert>
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
            login: false,
            loginFail: false
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
                }else{
                    this.loginFail = true
                    setTimeout(()=>{
                        this.loginFail = false
                        },4000)
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
