<template>
    <div class="login_con login">
        <v-layout row wrap>
            <v-flex xs12>
                <h1>로그인해주세요</h1>
            </v-flex>
        </v-layout>
        <v-layout justify-center>
            <v-flex xs6>
                <v-radio-group v-model="userId" row>
                    <v-radio key="seung" value="seung" label= "승"></v-radio>
                    <v-radio key="do" value="do" label="도"></v-radio>
                </v-radio-group>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs2>
            </v-flex>
            <v-flex xs5>
                <v-text-field v-model="pw"></v-text-field>
            </v-flex>
            <v-flex xs3>
                <v-btn @click="checkLogin">제출</v-btn>
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
import { eventBus } from '../main'

export default {
    name: 'Login',
    data() {
        return {
            loginFail: false,
            userId: "seung",
            pw: null
        }
    },
    methods: {
        checkLogin(){
            this.$http.post('/login',{
                "id": this.userId,
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
    .login_con {width: 100%;}
    .v-input__control {margin: 0 auto;}
    h1 {text-align: center;}
    .login .flex {text-align: center;}
    .login {width: 320px; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);}
    @media screen and (max-width: 640px){
        .login {width: 300px;}
        .login h1 {font-size: 24px;}
    }
</style>
