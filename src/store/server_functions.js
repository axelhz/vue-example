import Vue from 'vue';

export default {
	autheticateUser: ({login, password}) => {
		return new Promise(resolve => {
			let users = [];

			if (Vue.$cookies.get('vue_example_users')) {
				users = JSON.parse(Vue.$cookies.get('vue_example_users'));
			} else {
				users = [{login: 'admin', password: '1234'}];
				Vue.$cookies.set('vue_example_users', JSON.stringify(users));
			}

			if (users.find(user => JSON.stringify(user) === JSON.stringify({login, password}))) {
				resolve();
			} else {
				throw new Error('Неверный логин/пароль!');
			}
		})
	},
	saveUsers: ({login, password}) => {
		return new Promise(resolve => {
			let users = [];

			if (Vue.$cookies.get('vue_example_users')) {
				users = JSON.parse(Vue.$cookies.get('vue_example_users'));
			} else {
				users = [{login: 'admin', password: '1234'}];
				Vue.$cookies.set('vue_example_users', JSON.stringify(users));
			}

			if (users.find(user => user.login === login)) {
					throw new Error('Пользователь с таким логином уже существует!');
				} else {
					users.push({login, password});
					Vue.$cookies.set('vue_example_users', JSON.stringify(users));
					resolve();
				}
		})
	}
}