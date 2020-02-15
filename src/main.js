import Vue from 'vue';
import App from './App.vue';
import './styles/main.scss';
import store from './store';
import VueCookies from 'vue-cookies';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueCookies);
Vue.$cookies.config('7d');

new Vue({
  el: '#app',
  store,
  router,		
  render: h => h(App),
})
