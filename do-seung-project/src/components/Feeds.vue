<template>
    <v-layout class="flex newsfeed" sm12 wrap>
        <v-flex xs12>
            <swiper>
                <swiper-slide class="img" v-for="(image,i) in para.img" :key="para.content+i">
                    <div class="imgContainer">
                        <img
                        :src="`https://drive.google.com/uc?export=view&id=${image}`"
                        alt=""
                        @load="test"
                        >
                    </div>
                </swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
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
    data(){
        return {

        }
    },
    props: {
        para: Object
    },
    methods: {
        test: e =>{
            let img = e.target
            if(img.width < img.height){
                img.classList.add('horisontal')
            }else{
                img.classList.add('vertical')
            }
        }
    }
}
</script>

<style scoped>
    .imgContainer {position: absolute; top: 0; bottom: 0; left: 0; right: 0;}
    .img {width: 100%; height: 0; padding-bottom: 100%; position: relative; overflow: hidden;}
    .newsfeed {margin-bottom: 50px !important;}
    .img .vertical {width: auto; height: 100%; transform: translate(-50%,0); margin-left: 50%;}
    .img .horisontal {width: 100%; height: auto; margin-top: -100px;}

</style>