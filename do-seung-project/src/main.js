import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '../node_modules/swiper/dist/css/swiper.css'

Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper,{
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
})

export const eventBus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')
