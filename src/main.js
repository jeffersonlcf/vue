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

Vue.directive('click-outside', {
  bind(el, binding, vnode) {
    const ourClickEventHandler = event => {
      if (!el.contains(event.target) && el !== event.target) {
        binding.value(event);
      }
    };
    el.__vueClickEventHandler__ = ourClickEventHandler;
    document.addEventListener("click", ourClickEventHandler);
  },
  unbind: function (el) {
    document.removeEventListener("click", el.__vueClickEventHandler__);
  }
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
