import Vue from 'vue';
import Vuex from 'vuex';
import server_functions from './server_functions';
//import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		username: null,
		enabled_cookie: true,
		message_text: ''
	},
	getters: {
		USERNAME: state => {
			return state.username;
		},
		ENABLED_COOKIE: state => {
			return state.enabled_cookie;
		},
		MESSAGE_TEXT: state => {
			return state.message_text;
		}
	},
	mutations: {
		SET_USERNAME: (state, username) => {
			state.username = username;
		},
		SET_COOKIE: (state, enabled_cookie) => {
			state.enabled_cookie = enabled_cookie;
		},
		SET_MESSAGE_TEXT: (state, message_text) => {
			state.message_text = message_text;
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
				server_functions.autheticateUser({login, password})
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
				server_functions.saveUsers({login, password})
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
		CHANGE_COOKIE: async (state, enabled_cookie) => {
			state.commit('SET_COOKIE', enabled_cookie);
		},
		CHECK_MESSAGE_TEXT: async (state, {new_message_text, type}) => {
			if (new_message_text) {
				if (state.getters.MESSAGE_TEXT) {
					new_message_text = state.getters.MESSAGE_TEXT + '<br>' +
						(type === 'error' ? '<span style="color: red; text-align: center;">' + new_message_text + '</span>' :
						'<span style="color: green; text-align: center;">' + new_message_text + '</span>');
				} else {
					new_message_text = (type === 'error' ? '<span style="color: red; text-align: center;">' + new_message_text + '</span>' :
						'<span style="color: green; text-align: center;">' + new_message_text + '</span>');
				}
			}

			state.commit('SET_MESSAGE_TEXT', new_message_text);
		}
	}
})
