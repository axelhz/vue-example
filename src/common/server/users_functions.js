import Vue from 'vue';
import MD5 from '@/common/md5_hashing.js';

function getUsers() {
	if (Vue.localStorage) {
		if (Vue.localStorage.get('vue_example_users')) {
			return JSON.parse(Vue.localStorage.get('vue_example_users'));
		} else {
			let users =  [{username: 'admin', password: MD5('1234'), isAdmin: true}];
			Vue.localStorage.set('vue_example_users', JSON.stringify(users));
			return users;
		}
	} else {
		return [{username: 'admin', password: MD5('1234')}];
	}
}

function getLoggings() {
	if (Vue.localStorage) {
		if (Vue.localStorage.get('vue_example_loggings')) {
			return JSON.parse(Vue.localStorage.get('vue_example_loggings'));
		} else {
			Vue.localStorage.set('vue_example_loggings', JSON.stringify([]));
			return [];
		}
	} else {
		return [];
	}
}

export default {
	getUserThroughHash: session_hash => {
		return new Promise(resolve => {
			let loggings = getLoggings(),
				finding = loggings.find(el => el.session_hash === session_hash);
				
			if (!finding) throw new Error('Сессия не найдена');
			else resolve(JSON.stringify({success: true, data:{username: finding.username, isAdmin: finding.isAdmin}}));
		})
	},
	autheticateUser: ({username, password}) => {
		return new Promise(resolve => {
			let users = getUsers(),
				finding = users.find(el => JSON.stringify({username: el.username, password: el.password}) === 
											JSON.stringify({username, password}));

			if (!finding) resolve(JSON.stringify({success: false, message: 'Неверное имя пользователя/пароль!'}));
			else {
				let loggings = getLoggings(),
					session_hash = MD5(new Date().toString() + Math.random());
									
				loggings.push({username, isAdmin: finding.isAdmin, session_hash});
				Vue.localStorage.set('vue_example_loggings', JSON.stringify(loggings));
				resolve(JSON.stringify({success: true, data:{username: finding.username, isAdmin: finding.isAdmin, session_hash}}));
			}
		})
	},
	registrateUser: ({username, password}) => {
		return new Promise(resolve => {
			let users = getUsers(),
				finding = users.find(el => el.username === username);
			
			if (finding) resolve(JSON.stringify({success: false, message: 'Пользователь с таким именем уже существует!'}));
			else {
				users.push({username, password, isAdmin: false});
				Vue.localStorage.set('vue_example_users', JSON.stringify(users));
				
				let loggings = getLoggings(),
					session_hash = MD5(new Date().toString() + Math.random());
					
				loggings.push({username, isAdmin: false, session_hash});
				Vue.localStorage.set('vue_example_loggings', JSON.stringify(loggings));				
				resolve(JSON.stringify({success: true, data:{username, isAdmin:false, session_hash}}));
			}
		})
		
	},
	exitUser: session_hash => {
		return new Promise(resolve => {
			let loggings = getLoggings(),
			findingIndex = loggings.findIndex(el => el.session_hash === session_hash);
			
			if (findingIndex === -1) throw new Error('Сессия не найдена');
			else {
				loggings.splice(findingIndex, 1);
				Vue.localStorage.set('vue_example_loggings', JSON.stringify(loggings));
				resolve(JSON.stringify({success: true}));
			}
			
		})
	}
}