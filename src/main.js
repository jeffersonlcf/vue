import Vue from 'vue';
import VueRouter from 'vue-router';

import { BootstrapVue } from 'bootstrap-vue';

import App from './App.vue';
import router from './routes';

import 'bootstrap';

import './scss/app.scss';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.component('font-awesome-icon', FontAwesomeIcon);

// BootstrapVue
Vue.use(BootstrapVue);
Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
