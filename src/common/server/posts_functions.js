import Vue from 'vue'
import default_posts from '@/data/default_posts.js';

export default {
	getAllPosts: (username) => {	
		return new Promise(resolve => {
			if (username !== 'admin') {
				resolve(JSON.stringify([]));
			} else if (Vue.localStorage.get('vue_example_posts')) {
				resolve(Vue.localStorage.get('vue_example_posts'));
			} else {
				Vue.localStorage.set('vue_example_posts', JSON.stringify(default_posts.data));
				resolve(JSON.stringify(default_posts.data));
			} 
		});
	},
	getShownPosts: () => {
		return new Promise(resolve => {
			let posts = [];
			
			if (Vue.localStorage.get('vue_example_posts')) {
				posts = JSON.parse(Vue.localStorage.get('vue_example_posts'));
			} else {
				posts = default_posts.data;
			} 
			
			resolve(JSON.stringify(posts.filter(el => el.stat === 'show')))
			
		});	
	},
	addPost: ({title, description, img}) => {
		return new Promise(resolve => {
			let posts = [];
			
			if (Vue.localStorage.get('vue_example_posts')) posts = JSON.parse(Vue.localStorage.get('vue_example_posts'));
			else posts = default_posts.data;
			
			if (posts.find(el => el.title === title)) {
				throw new Error('Пост с таким  заголовком уже существует!');
			} else {
				posts.unshift({title, description, img});
				Vue.localStorage.set('vue_example_posts', posts);
				resolve(posts);
			}
		})
	}
} 