<template>
    <div id="chat">
        <v-layout row wrap>
            <v-flex xs12 class="chat_container">
                <div v-for="items in chat" :key="items.no" class="chatings">
                    <div :class="{me: (userId == items.id),you:(userId != items.id)}" class="chating">
                        {{ items.msg }}
                        {{items}}
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
                this.$sendMessage(params)
                this.msg = ''
            }
        }
    }
}
</script>

<style scoped>
    #chat {margin: 0 auto; position: relative; width: 100%; max-width: 700px; padding-top: 50px;}
    .chat_container {height: 800px;}
    .chatings {overflow: hidden;}
    .chating {border-radius: 10px; max-width: 400px; padding: 5px 7px; position: relative;}
    .me {background: yellow; float: right;}
    .me::after {content: ""; display: block; position: absolute; border: 10px solid #ff0; border-left-color: transparent; border-bottom-color: transparent; right: 0; top: calc(100% - 7px)}
    .you {background: #aaa; float: left;}
    .you::after {content: ""; display: block; position: absolute; border: 10px solid #ff0; border-right-color: transparent; border-bottom-color: transparent; left: 0; top: calc(100% - 7px)}
</style>
