import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [
		{
			name: 'home',
			path: '/',
			component: () => import('../views/home.vue')
		},
		{
			name: 'auth',
			path: '/auth',
			component: () => import('../views/authetication.vue')
		},
		{
			name: 'registr',
			path: '/registr',
			component: () => import('../views/registration.vue')
		},
		{
			name: 'new',
			path: '/new/:id',
			component: () => import('../views/new.vue')
		}
	]
})