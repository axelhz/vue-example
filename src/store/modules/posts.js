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
		GET_ALL_POSTS: (state, session_hash) => {
			return new Promise((resolve, reject) => {
				posts_functions.getAllPosts(session_hash)
				.then(response => JSON.parse(response))
				.then(result => {
					if (!result.success) {
						reject({type: 'user', message: result.message});
					} else {
						state.commit('SET_ALL_POSTS', result.data.posts);
						resolve();
					}
				})
				.catch(({message}) => {
					reject({type: 'system', message})
				})
				
			})
		},
		GET_SHOWN_POSTS: state => {
			return new Promise((resolve, reject) => {
				posts_functions.getShownPosts()
				.then(response => JSON.parse(response))
				.then(result => {
					if (!result.success) reject({type: 'user', message: result.message});
					else {
						state.commit('SET_SHOWN_POSTS', result.data.posts);
						resolve();
					}	
				})
				.catch(({message}) => {
					reject({type: 'error', message})
				})
			})
		},
		CREATE_POST: (state, post) => {
			return new Promise((resolve, reject) => {
				posts_functions.createPost(post)
				.then(response => JSON.parse(response))
				.then(result => {
					if (!result.success) reject({type: 'user', message: result.message});
					else {
						state.commit('SET_ALL_POSTS', result.data.posts);
						resolve(result.data.new_id);
					}
				})
				.catch(({message}) => {
					reject({type: 'error', message})
				})
			})
		},
		CHANGE_POST: (state, post) => {
			return new Promise((resolve, reject) => {
				posts_functions.changePost(post)
				.then(response => JSON.parse(response))
				.then(result => {
					if (!result.success) reject({type: 'user', message: result.message});
					else {
						state.commit('SET_ALL_POSTS', result.data.posts);
						resolve();
					}
				})
				.catch(({message}) => {
					reject({type: 'error', message})
				})
			})
		},
		SAVE_POSTS: (state, posts) => {
			return new Promise((resolve, reject) => {
				posts_functions.savePosts(posts)
				.then(response => JSON.parse(response))
				.then(result => {
					if (!result.success) reject({type: 'user', message: result.message});
					else {
						state.commit('SET_ALL_POSTS', result.data.posts);
						posts_functions.getShownPosts()
						state.dispatch('GET_SHOWN_POSTS')
						.then(() => {
							resolve();
						})
						.catch(({message}) => {
							reject({type: 'error', message})
						})
					}
				})
				.catch(({message}) => {
					reject({type: 'error', message})
				})
			})
		},
	}
}