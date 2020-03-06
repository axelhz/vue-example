import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [
		{
			name: 'home',
			path: '/',
			component: () => import('@/views/home.vue')
		},
		{
			name: 'posts-home',
			path: '/posts',
			component: () => import('@/views/posts-home.vue'),
			children: [
				{
					name: 'posts-show',
					path: '',
					component: () => import('@/views/posts-show.vue')
				},
				{
					name: 'posts-editor',
					path: 'editor',
					component: () => import('@/views/posts-editor.vue')
				}
			]
		},
		{
			name: 'auth',
			path: '/auth',
			component: () => import('@/views/authetication.vue')
		},
		{
			name: 'registr',
			path: '/registr',
			component: () => import('@/views/registration.vue')
		},
		{
			name: 'map',
			path: '/map',
			component: () => import('@/views/map.vue')
		},
		{
			name: 'post-home',
			path: '/posts/:id',
			component: () => import('@/views/post-home.vue'),
			children: [
				{
					name: 'post-show',
					path: '',
					component: () => import('@/views/post-show.vue'),
					
				},
				{
					name: 'post-editor',		
					path: 'editor',
					component: () => import('@/views/post-editor.vue')
				}
			]
		},
	]
})