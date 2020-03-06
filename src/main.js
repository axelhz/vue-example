import Vue from 'vue';
import App from '@/App.vue';
import '@/styles/main.scss';
import store from './store';
import VueCookies from 'vue-cookies';
import VueLocalStorage from 'vue-localstorage';
import router from '@/router';
import YmapPlugin from 'vue-yandex-maps';

Vue.config.productionTip = false;

Vue.use(VueCookies);
Vue.$cookies.config('7d');
Vue.use(VueLocalStorage);

const settings = {
	apiKey: '',
	lang: 'ru_RU',
	coordorder: 'latlong',
	version: '2.1'
}

Vue.use(YmapPlugin, settings);

new Vue({
  el: '#app',
  store,
  router,		
  render: h => h(App),
})
