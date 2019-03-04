<template>
    <v-layout class="flex newsfeed" sm12 wrap>
        <v-flex xs12>
            <v-card class="img" v-for="(image,i) in para.img" :key="para.content+i">
                <img :src="`https://drive.google.com/uc?export=view&id=${image}`" alt="">
            </v-card>
        </v-flex>
        <v-flex>
            <v-card>
                <h2>{{ para.content }}</h2>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>

export default {
    name: 'Feeds',
    props: {
        para: Object
    }
}
</script>

<style scoped>
    .img {width: 100%; height: 0; padding-bottom: 100%;}
    .img img {width: 100%}
    .newsfeed {margin-bottom: 50px !important;}

</style>