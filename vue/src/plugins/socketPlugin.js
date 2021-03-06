import Vue from 'vue';
import io from 'socket.io-client';

const socket = io('http://ec2-52-79-45-185.ap-northeast-2.compute.amazonaws.com');
// const socket = io('http://localhost:3000');


const SocketPlugin = {
  install(vue) {
    vue.mixin({
    });

    vue.prototype.$sendMessage = ($payload) => {
      socket.emit('chat', $payload);
    };

    // 인스턴스 메소드 추가
    vue.prototype.$socket = socket;
  },
};

Vue.use(SocketPlugin);