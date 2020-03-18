import users_API from '@/common/API/users';
import MD5 from '@/common/md5_hashing.js';

export default {
	state: {
		user: {
			name: null,
			isAdmin: false
		},
		isAutheticated: false
	},
	getters: {
		USERNAME: state => {
			return state.user.name;
		},
		ISAUTHETICATED: (state, getters) => {
			return !!getters.USERNAME;
		},
		ISADMIN: state => {
			return state.user.isAdmin;
		}
	},
	mutations: {
		SET_USER: (state, user) => {
			state.user = user;
		},
		CLEAR_USER: (state) => {
			state.user = {
				name: null,
				isAdmin: false
			}
		}
	},
	actions: {
		GET_USER_THROUGH_HASH: (state, session_hash) => {
			return new Promise((resolve, reject) => {
				users_API.getUserThroughHash(session_hash)
				.then(response => JSON.parse(response))
				.then(result => {
					if (!result.success) {
						reject({type: 'user', message: result.message});
					} else {
						state.commit('SET_USER', result.data.user);
						resolve();
					}
				})
				.catch(({message}) => {
					reject({type: 'system', message});
				})
			})
		},
		AUTHETICATE_USER: (state, {username, password}) => {
			return new Promise((resolve, reject) => {
				users_API.autheticateUser({username, password: MD5(password)})
				.then(response => JSON.parse(response))
				.then(result => {
					if (!result.success) {
						reject({type: 'user', message: result.message});
					} else {
						state.commit('SET_USER', result.data.user);
						resolve(result.data.session_hash);
					}
				})
				.catch(({message}) => {
					reject({type: 'system', message});
				})
			})
		},
		EXIT_USER: (state, session_hash) => {
			return new Promise((resolve, reject) => {
				if (!session_hash) {
					state.commit('CLEAR_USER');
					resolve();
				} else {
					users_API.exitUser(session_hash)
					.then(response => JSON.parse(response))
					.then(result => {
						if (!result.success) {
							reject({type: 'user', message: result.message});
						} else {
							state.commit('CLEAR_USER');
							resolve();
						}
					})
					.catch(({message}) => {
						reject({type: 'system', message});
					})
				}
			})
		},
		REGISTRATE_USER: (state, {username, password}) => {
			return new Promise((resolve, reject) => {
				users_API.registrateUser({username,  password: MD5(password)})
				.then(response => JSON.parse(response))
				.then(result => {
					if (!result.success) {
						reject({type: 'user', message: result.message});
					} else {
						state.commit('SET_USER', result.data.user);
						resolve(result.data.session_hash);
					}
				})
				.catch(({message}) => {
					reject({type: 'system', message});
				})
			})
		}
	}
}
