import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'
import DoSeung from './components/DoSeung'
import Chat from './components/Chat'
import axios from 'axios'
import './plugins/vuetify'
import './plugins/socketPlugin'
import VueRouter from 'vue-router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '../node_modules/swiper/dist/css/swiper.css'

Vue.prototype.$http = axios
Vue.prototype.moment = moment
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
  mode: 'history',
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
