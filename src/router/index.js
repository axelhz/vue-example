import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [
		{
			name: 'home',
			path: '/',
			component: () => import('@/views/home.vue'),
		},
		{
			path: '/posts',
			component: () => import('@/views/posts/posts-home.vue'),
			children: [
				{
					name: 'posts-show',
					path: '',
					component: () => import('@/views/posts/posts-show.vue')
				},
				{
					name: 'posts-editor',
					path: 'editor',
					component: () => import('@/views/posts/posts-editor.vue')
				}
			]
		},
		{
			name: 'auth',
			path: '/auth',
			component: () => import('@/views/authentication.vue')
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
			path: '/posts/:id',
			component: () => import('@/views/posts//post-home.vue'),
			children: [
				{
					name: 'post-show',
					path: '',
					component: () => import('@/views/posts/post-show.vue'),
					
				},
				{
					name: 'post-editor',		
					path: 'editor',
					component: () => import('@/views/posts/post-editor.vue')
				}
			]
		},
		{
			name: 'movies-show',
			path: '/movies',
			component: () => import('@/views/movies/movies-show.vue'),
			props: { type: 'all' }
		},
		{
			name: 'movies-likes',
			path: '/likes',
			component: () => import('@/views/movies/movies-show.vue'),
			props: { type: 'likes' }
		},
		{
			path: '/movies/:id',
			component: () => import('@/views/movies/movie-home.vue'),
			children: [
				{
					name: 'movie-show',
					path: '',
					component: () => import('@/views/movies/movie-show.vue'),

				}
			]
		},
	]
})