import Vue from 'vue';
import user_functions from '../server/user_functions';

export default {
	state: {
		username: null
	},
	getters: {
		USERNAME: state => {
			return state.username;
		}
	},
	mutations: {
		SET_USERNAME: (state, username) => {
			state.username = username;
		}
	},
	actions: {
		GET_USERNAME: async state => {
			if (Vue.$cookies.get('vue_example_username')) {
				state.commit('SET_USERNAME', Vue.$cookies.get('vue_example_username'));
			}
		},
		AUTHETICATE_USER: (state, {login, password}) => {
			return new Promise(resolve => {
				user_functions.autheticateUser({login, password})
				.then(() => {
					state.commit('SET_USERNAME', login);
					if (state.getters.ENABLED_COOKIE) Vue.$cookies.set('vue_example_username', login);
					resolve();
				})
				.catch((error) => {
					state.dispatch('CHECK_MESSAGE_TEXT', {new_message_text: error.message, type: 'error'});
				})
			})
		},
		EXIT_USER: (state) => {
			Vue.$cookies.remove('vue_example_username');
			state.commit('SET_USERNAME', '');
		},
		SAVE_USERS: (state, {login, password}) => {
			return new Promise(resolve => {
				user_functions.saveUsers({login, password})
				.then(() => {
					state.commit('SET_USERNAME', login);
					if (state.getters.ENABLED_COOKIE) Vue.$cookies.set('vue_example_username', login);
					resolve();
				})
				.catch((error) => {
					state.dispatch('CHECK_MESSAGE_TEXT', {new_message_text: error.message, type: 'error'});
				})
			})
		}
	}
}
