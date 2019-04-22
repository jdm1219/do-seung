<template>
    <div id="chat">
        <v-layout row wrap>
            <v-flex xs12>
                <div v-for="items in chat" :key="items.no">
                    {{ items.msg }}
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Chat',
    data(){
        return {
            chat: []
        }
    },
    props: {
        api: String
    },
    created(){
        if(!this.chat.length){
            axios.post(this.api)
            .then(res => {
                this.chat = res.data.Items.sort(function(a,b){
                    return a.no < b.no ? 1 : a.no > b.no ? -1 : 0
                })
            })
        }
    }
}
</script>

<style scoped>
    #chat {margin: 0 auto; position: relative; width: 100%; max-width: 700px; padding-top: 50px;}
</style>
