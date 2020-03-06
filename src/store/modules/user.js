import users_functions from '@/common/server/users_functions';
import MD5 from '@/common/md5_hashing.js';

export default {
	state: {
		username: null,
		isAutheticated: false,
		isAdmin: false
	},
	getters: {
		USERNAME: state => {
			return state.username;
		},
		ISAUTHETICATED: (state, getters) => {
			return !!getters.USERNAME;
		},
		ISADMIN: state => {
			return state.isAdmin;
		}
	},
	mutations: {
		SET_USERNAME: (state, username) => {
			state.username = username;
		},
		SET_ISADMIN: (state, isAdmin) => {
			state.isAdmin = isAdmin;
		}
	},
	actions: {
		GET_USER_THROUGH_HASH: (state, session_hash) => {
			return new Promise((resolve, reject) => {
				users_functions.getUserThroughHash(session_hash)
				.then(response => JSON.parse(response))
				.then(result => {
					if (!result.success) {
						reject({type: 'user', message: result.message});
					} else {
						state.commit('SET_USERNAME', result.data.username);
						state.commit('SET_ISADMIN', result.data.isAdmin);
						resolve(session_hash);
					}
				})
				.catch(({message}) => {
					reject({type: 'system', message});
				})
			})
		},
		AUTHETICATE_USER: (state, {username, password}) => {
			return new Promise((resolve, reject) => {
				users_functions.autheticateUser({username, password: MD5(password)})
				.then(response => JSON.parse(response))
				.then(result => {
					if (!result.success) {
						reject({type: 'user', message: result.message});
					} else {
						state.commit('SET_USERNAME', result.data.username);
						state.commit('SET_ISADMIN', result.data.isAdmin);
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
					state.commit('SET_USERNAME', '');
					state.commit('SET_ISADMIN', false);
					resolve();
				} else {
					users_functions.exitUser(session_hash)
					.then(response => JSON.parse(response))
					.then(result => {
						if (!result.success) {
							reject({type: 'user', message: result.message});
						} else {
							state.commit('SET_USERNAME', '');
							state.commit('SET_ISADMIN', false);
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
				users_functions.registrateUser({username,  password: MD5(password)})
				.then(response => JSON.parse(response))
				.then(result => {
					if (!result.success) {
						reject({type: 'user', message: result.message});
					} else {
						state.commit('SET_USERNAME', result.data.username);
						state.commit('SET_ISADMIN', result.data.isAdmin);
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
