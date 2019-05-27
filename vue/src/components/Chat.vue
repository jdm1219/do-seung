<template>
    <div id="chat">
        <v-layout row wrap>
            <v-flex xs12 class="chat_container">
                <div v-for="items in chat" :key="items.no" class="chatings" :class="{me: (userId == items.id),you:(userId != items.id)}">
                    <div class="chating">
                    <small class="user_id">{{ items.id }}</small>
                    <small class="time">{{ items.datetime }}</small>
                        {{ items.msg }}
                    </div>
                </div>
            </v-flex>
            <v-flex xs8>
                <v-text-field
                v-model="msg"
                label="채팅을 써보세요"
                @keyup.13="onChat"
                ></v-text-field>
            </v-flex>
            <v-flex xs4>
                <v-btn @click="onChat" xs2>보내기</v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import io from 'socket.io-client'

export default {
    name: 'Chat',
    data(){
        return {
            msg: '',
            socket: io('localhost:3000')
        }
    },
    props: {
        chat: Array,
        userId: String
    },
    methods: {
        onChat(){
            let params = {
                "id" : this.userId,
                "msg" : this.msg
            }
            if(this.msg != ''){
                this.$http.post('/chat',params)
                .then(res => {
                    params.no = res.data.no
                    params.datetime = res.data.time
                    this.$sendMessage(params)
                })
                this.msg = ''
            }
        }
    }
}
</script>

<style scoped>
    #chat {margin: 0 auto; position: relative; width: 100%; max-width: 700px; padding-top: 50px;}
    .chat_container {height: 75vh; overflow: scroll;}
    .chatings {overflow: hidden;}
    .chating {border-radius: 10px; max-width: 400px; margin-top: 15px; padding: 5px 7px; position: relative; display: inline-block;}
    .chating .user_id {position: absolute; top: -15px;}
    .me {text-align: right;}
    .you {text-align: left;}
    .me .chating {background: yellow; margin-right: 20px;}
    .me .chating::after {content: ""; display: block; position: absolute; border: 5px solid #ff0; border-right-color: transparent; border-bottom-color: transparent; right: -7px; top: calc(50% - 7px)}
    .you .chating {background: #aaa; margin-left: 20px;}
    .you .chating::after {content: ""; display: block; position: absolute; border: 5px solid #aaa; border-left-color: transparent; border-bottom-color: transparent; left: -7px; top: calc(50% - 7px)}
    .me .chating .time {position: absolute; right: 100%;}
    .you .chating .time {position: absolute; left: 100%;}
</style>
