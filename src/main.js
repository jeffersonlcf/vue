import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import router from './routes';

import 'bootstrap';

import './scss/app.scss';


Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
