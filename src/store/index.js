import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import posts from './modules/posts';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		user,
		posts
	},
	state: {
		enabled_cookies: true,
		message_text: ''
	},
	getters: {
		ENABLED_COOKIES: state => {
			return state.enabled_cookies;
		},
		MESSAGE_TEXT: state => {
			return state.message_text;
		}
	},
	mutations: {
		SET_ENABLED_COOKIES: (state, enabled_cookies) => {
			state.enabled_cookies = enabled_cookies;
		},
		SET_MESSAGE_TEXT: (state, message_text) => {
			state.message_text = message_text;
		}
	},
	actions: {
		CHANGE_ENABLED_COOKIES: async (state, enabled_cookies) => {
			state.commit('SET_COOKIES', enabled_cookies);
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
