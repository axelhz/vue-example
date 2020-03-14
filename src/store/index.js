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
		messages: []
	},
	getters: {
		MESSAGES: state => {
			return state.messages;
		}
	},
	mutations: {
		SET_MESSAGES: (state, messages) => {
			state.messages = messages;
		},
	},
	actions: {
		ADD_MESSAGE: (state, message) => {
			let messages = state.getters.MESSAGES;
			messages.push(message);
			state.commit('SET_MESSAGES', messages);
		},
		CLEAR_MESSAGES: (state) => {
			state.commit('SET_MESSAGES', []);
		}
	}
})
