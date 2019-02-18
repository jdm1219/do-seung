<template>
    <v-layout sm12 wrap justify-space-between>
        <v-flex sm9>
            <v-form
            v-on:submit.prevent="updateFeed"
            >
                <v-text-field
                v-model="title"
                label="무슨생각을 하고 계신가요"
                ></v-text-field>
            </v-form>
        </v-flex>
        <v-flex sm3>
            <v-btn @click="updateFeed" xs2>제출</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
import { eventBus } from '../main'

export default {
    name: 'CreateFeed',
    data() {
        return {
            title : null
        }
    },
    methods: {
        updateFeed() {
            eventBus.$emit('submit',this.title)
            this.title = null
        }
    }
}
</script>

<style scoped>
</style>
