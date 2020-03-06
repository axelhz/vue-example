import Vue from 'vue';
import MD5 from '@/common/md5_hashing.js';

let default_users = [{username: 'admin', password: MD5('1234'), isAdmin: true}];

function getData(model, default_data) {
	return new Promise(resolve => {
		if (Vue.localStorage) {
			if (Vue.localStorage.get('vue_example_' + model )) {
				resolve(JSON.parse(Vue.localStorage.get('vue_example_' + model)));
			} else {
				Vue.localStorage.set('vue_example_' + model, JSON.stringify(default_data));
				resolve(default_data);
			}
		} else throw new Error('localStorage не найден!')
	})
}

function setData(model, data) {
	return new Promise(resolve => {
		if (Vue.localStorage) {
			Vue.localStorage.set('vue_example_' + model, JSON.stringify(data));
			resolve();
		} else throw new Error('localStorage не найден!')
	})
}

export default {
	getUserThroughHash: session_hash => {
		return new Promise((resolve, reject) => {
			getData('loggings', [])
			.then(loggings => {
				let finding = loggings.find(el => el.session_hash === session_hash);
				
				if (!finding) throw new Error('Сессия не найдена');
				else resolve(JSON.stringify({success: true, data:{username: finding.username, isAdmin: finding.isAdmin}}));
			})
			.catch(error => reject(error))
		})
	},
	autheticateUser: ({username, password}) => {
		return new Promise((resolve, reject) => {
			getData('users', default_users)
			.then(users => {			
				let finding = users.find(el => JSON.stringify({username: el.username, password: el.password}) === 
											JSON.stringify({username, password}));
											
				if (!finding) resolve(JSON.stringify({success: false, message: 'Неверное имя пользователя/пароль!'}));
				else {
					getData('loggings', [])
					.then(loggings => {
						let session_hash = MD5(new Date().toString() + Math.random());
						
						loggings.push({username, isAdmin: finding.isAdmin, session_hash});
						setData('loggings', loggings)
						.then(() => {
							resolve(JSON.stringify({success: true, data:{username: finding.username, isAdmin: finding.isAdmin, session_hash}}));
						})
						.catch(error => reject(error))
					})
					.catch(error => reject(error))
				}
			})
			.catch(error => reject(error))
		})
	},
	registrateUser: ({username, password}) => {
		return new Promise((resolve, reject) => {
			getData('users', default_users)
			.then(users => {
				let finding = users.find(el => el.username === username);
				if (finding) resolve(JSON.stringify({success: false, message: 'Пользователь с таким именем уже существует!'}));
				else {
					users.push({username, password, isAdmin: false});
					setData('users', users)
					.then(() => {
						getData('loggings', [])
						.then(loggings => {
							let session_hash = MD5(new Date().toString() + Math.random());
									
							loggings.push({username, isAdmin: false, session_hash});
							setData('loggings', loggings)
							.then(() => {
								resolve(JSON.stringify({success: true, data:{username, isAdmin:false, session_hash}}));
							})	
							.catch(error => reject(error))		
						})
						.catch(error => reject(error))
					})
					.catch(error => reject(error))
				}
			})
			.catch(error => reject(error))
		})
	},
	exitUser: session_hash => {
		return new Promise((resolve, reject) => {
			getData('loggings', [])
			.then(loggings => {
				let findingIndex = loggings.findIndex(el => el.session_hash === session_hash);
						
				if (findingIndex === -1) throw new Error('Сессия не найдена');
				else {
					loggings.splice(findingIndex, 1);
					setData('loggings', loggings)
					.then(() => {
						resolve(JSON.stringify({success: true}));
					})
					.catch(error => reject(error))
				}
			})
			.catch(error => reject(error))
		})
	}
}