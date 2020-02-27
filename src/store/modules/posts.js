import posts_functions from '@/common/server/posts_functions.js';

export default {
	state: {
		shown_posts: [],
		all_posts: []
	},
	getters: {
		SHOWN_POSTS: (state) => {
			return state.shown_posts;
		},
		ALL_POSTS: (state) => {
			return state.all_posts;
		}
	},
	mutations: {
		SET_SHOWN_POSTS: (state, shown_posts) => {
			state.shown_posts = shown_posts;
		},
		SET_ALL_POSTS: (state, all_posts) => {
			state.all_posts = all_posts;
		},
	},
	actions: {
		GET_ALL_POSTS: state => {
			return new Promise((resolve, reject) => {
				posts_functions.getAllPosts(state.getters.USERNAME)
				.then(all_posts => {
					state.commit('SET_ALL_POSTS', JSON.parse(all_posts));
					resolve();
				})
				.catch(error => {
					state.dispatch('CHECK_MESSAGE_TEXT', {new_message_text: error.message, type: 'error'});
					reject();
				})
			})
		},
		GET_SHOWN_POSTS: state => {
			return new Promise((resolve, reject) => {
				posts_functions.getShownPosts()
				.then(shown_posts => {
					state.commit('SET_SHOWN_POSTS', JSON.parse(shown_posts));
					resolve();
				})
				.catch(error => {
					state.dispatch('CHECK_MESSAGE_TEXT', {new_message_text: error.message, type: 'error'});
					reject();
				})
			})
		},
		ADD_POST: (state, {title, description, img}) => {
			return new Promise((resolve, reject) => {
				posts_functions.addPost({title, description, img})
				.then(all_posts => {
					state.commit('SET_ALL_POSTS', all_posts);
					resolve();
				})
				.catch(error => {
					state.dispatch('CHECK_MESSAGE_TEXT', {new_message_text: error.message, type: 'error'});
					reject();
				})
			})
		}
	}
}