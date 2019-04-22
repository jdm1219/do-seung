import Vue from 'vue'
import './plugins/vuetify'
import VueRouter from 'vue-router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import App from './App.vue'
import DoSeung from './components/DoSeung'
import Chat from './components/Chat'
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

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {path: '/', component: DoSeung},
    {path: '/chat', component: Chat}
  ]
})


export const eventBus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
