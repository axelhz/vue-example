import MD5 from '@/common/md5_hashing.js';
import {getData, setData} from './common.js';

const default_users = [{id: 1, name: 'admin', password: MD5('1234'), isAdmin: true}];

export default {
	getUserThroughHash: async (session_hash) => {
		const loggings = await getData('loggings', []),
			finding = loggings.find(el => el.session_hash === session_hash);

		if (!finding) throw new Error('Сессия не найдена');
		else return JSON.stringify({success: true, data:{user: {name: finding.name, isAdmin: finding.isAdmin}}});
	},
	authenticateUser: async ({username, password}) => {
		const users = await getData('users', default_users),
			finding = users.find(el => JSON.stringify({username: el.name, password: el.password}) ===
				JSON.stringify({username, password}));

		if (!finding) return JSON.stringify({success: false, message: 'Неверное имя пользователя/пароль!'});
		else {
			let loggings = await getData('loggings', []);
			const session_hash = MD5(new Date().toString() + Math.random());

			loggings.push({id: finding.id, name: username, isAdmin: finding.isAdmin, session_hash});
			await setData('loggings', loggings);

			return JSON.stringify({success: true, data:{user: {name: username, isAdmin: finding.isAdmin}, session_hash}});
		}
	},
	registrateUser: async ({username, password}) => {
		let users = await getData('users', default_users);
		const finding = users.find(el => el.name === username);

		if (finding) return JSON.stringify({success: false, message: 'Пользователь с таким именем уже существует!'});
		else {
			const last_id = users[users.length - 1].id + 1,
				user = {id: last_id, name: username, password, isAdmin: false};

			users.push(user);
			await setData('users', users);

			let loggings = await getData('loggings', []);
			const session_hash = MD5(new Date().toString() + Math.random());

			loggings.push({user_id: user.id, name:user.name, isAdmin: user.isAdmin, session_hash});
			await setData('loggings', loggings);

			return JSON.stringify({success: true, data:{user: {name: user.name, isAdmin:user.isAdmin}, session_hash}});
		}
	},
	// registrateUser: ({username, password}) => {
	// 	return new Promise((resolve, reject) => {
	// 		getData('users', default_users)
	// 		.then(users => {
	// 			let finding = users.find(el => el.name === username);
	//
	// 			if (finding) resolve(JSON.stringify({success: false, message: 'Пользователь с таким именем уже существует!'}));
	// 			else {
	// 				let last_id = users[users.length - 1].id + 1;
	//
	// 				users.push({id: last_id, name: username, password, isAdmin: false});
	// 				return setData('users', users)
	// 			}
	// 		})
	// 		.then(users => {
	// 			let {id, name, isAdmin} = users[users.length - 1];
	//
	// 			getData('loggings', [])
	// 			.then(loggings => {
	// 				let session_hash = MD5(new Date().toString() + Math.random());
	//
	// 				loggings.push({user_id: id, name:name, isAdmin: isAdmin, session_hash});
	// 				return setData('loggings', loggings)
	// 			})
	// 			.then(loggings => {
	// 				let {name, isAdmin, session_hash} = loggings[loggings.length - 1];
	//
	// 				resolve(JSON.stringify({success: true, data:{user: {name: name, isAdmin:isAdmin}, session_hash}}));
	// 			})
	// 			.catch(error => reject(error))
	// 		})
	// 		.catch(error => reject(error))
	// 	})
	// },
	exitUser: async (session_hash) => {
		let loggings = await getData('loggings', []);
		const findingIndex = loggings.findIndex(el => el.session_hash === session_hash);

		if (findingIndex === -1) throw new Error('Сессия не найдена');
		else {
			loggings.splice(findingIndex, 1);
			await setData('loggings', loggings);

			return JSON.stringify({success: true});
		}
	}
}