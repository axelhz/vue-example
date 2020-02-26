import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		user
	},
	state: {
		enabled_cookie: true,
		message_text: ''
	},
	getters: {
		ENABLED_COOKIE: state => {
			return state.enabled_cookie;
		},
		MESSAGE_TEXT: state => {
			return state.message_text;
		}
	},
	mutations: {
		SET_COOKIE: (state, enabled_cookie) => {
			state.enabled_cookie = enabled_cookie;
		},
		SET_MESSAGE_TEXT: (state, message_text) => {
			state.message_text = message_text;
		}
	},
	actions: {
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
