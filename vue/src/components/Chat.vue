<template>
    <div id="chat">
        <v-layout row wrap>
            <v-flex xs12>
                <div v-for="items in chat" :key="items.no">
                    {{ items.msg }}
                </div>
                <div>{{ chat }}</div>
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
import { eventBus } from '../main';

export default {
    name: 'Chat',
    data(){
        return {
            msg: ''
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
                    eventBus.$emit('chatSuccess',res.data.Items.sort(function(a,b){
                        return a.no < b.no ? 1 : a.no > b.no ? -1 : 0
                    }))
                })
                .catch(err => {
                    throw err
                })
                this.msg = ''
            }
        }
    }
}
</script>

<style scoped>
    #chat {margin: 0 auto; position: relative; width: 100%; max-width: 700px; padding-top: 50px;}
</style>
