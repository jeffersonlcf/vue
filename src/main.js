import { createApp } from 'vue';
import { createBootstrap } from 'bootstrap-vue-next';

import App from './App.vue';
import router from './routes';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

import './scss/app.scss';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createBootstrap());
app.use(router);

app.directive('click-outside', {
  mounted(el, binding) {
    const ourClickEventHandler = event => {
      if (!el.contains(event.target) && el !== event.target) {
        binding.value(event);
      }
    };
    el.__vueClickEventHandler__ = ourClickEventHandler;
    document.addEventListener('click', ourClickEventHandler);
  },
  unmounted(el) {
    document.removeEventListener('click', el.__vueClickEventHandler__);
  }
});

app.mount('#app');
