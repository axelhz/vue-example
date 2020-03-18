import posts_API from '@/common/API/posts.js';

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
		ADD_POST: (state, post) => {
			state.all_posts.unshift(post);
			if (post.status === 'shown') {
				state.shown_posts.unshift(post);
			}
		},
		UPDATE_POST: (state, post) => {
			state.all_posts = state.all_posts.map(el => {
				if (post.id !== el.id) return el;
				return Object.assign(el, post);
			});
			if (post.status === 'shown') {
				state.shown_posts = state.shown_posts.map(el => {
					if (post.id !== el.id) return el;
					return Object.assign(el, post);
				})
			}
		}
	},
	actions: {
		GET_ALL_POSTS: (state, session_hash) => {
			return new Promise((resolve, reject) => {
				posts_API.getAllPosts(session_hash)
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
				posts_API.getShownPosts()
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
		CREATE_POST: (state, {post, session_hash}) => {
			return new Promise((resolve, reject) => {
				posts_API.createPost(post, session_hash)
				.then(response => JSON.parse(response))
				.then(result => {
					if (!result.success) reject({type: 'user', message: result.message});
					else {
						state.commit('ADD_POST', result.data.post);
						resolve(result.data.post.id);
					}
				})
				.catch(({message}) => {
					reject({type: 'error', message})
				})
			})
		},
		CHANGE_POST: (state, {post, session_hash}) => {
			return new Promise((resolve, reject) => {
				posts_API.changePost(post, session_hash)
				.then(response => JSON.parse(response))
				.then(result => {
					if (!result.success) reject({type: 'user', message: result.message});
					else {
						state.commit('UPDATE_POST', result.data.post);
						resolve();
					}
				})
				.catch(({message}) => {
					reject({type: 'error', message})
				})
			})
		},
		SAVE_POSTS: (state, {posts, session_hash}) => {
			return new Promise((resolve, reject) => {
				posts_API.savePosts(posts, session_hash)
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
	}
}