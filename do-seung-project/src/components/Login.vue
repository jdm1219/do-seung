<template>
    <v-layout row wrap class="login">
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
            <v-alert
            :value="loginFail"
            type="warning"
            transition="scale-transition"
            >
            잘못된 비밀번호입니다. 비밀번호를 다시 확인해주세요.
            </v-alert>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios'
import { eventBus } from '../main'

export default {
    name: 'Login',
    data() {
        return {
            loginFail: false,
            id: null,
            pw: null
        }
    },
    methods: {
        checkLogin(){
            axios.post('https://0yunt9oocd.execute-api.ap-northeast-2.amazonaws.com/prod/users',{
                "pw": this.pw
            })
            .then(res => {
                if(res.data.access == 'success'){
                    eventBus.$emit('loginSuccess',res.data)
                }else{
                    this.loginFail = true
                    setTimeout(()=>{
                        this.loginFail = false
                        },4000)
                }
            })
        }
    },
}
</script>

<style>

    
    h1 {text-align: center;}
    .login .flex {text-align: center;}
    .login {width: 320px; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);}
    @media screen and (max-width: 640px){
        .login {width: 300px;}
        .login h1 {font-size: 24px;}
    }
</style>
