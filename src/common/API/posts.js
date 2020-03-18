import default_posts from '@/data/default_posts.js';
import {getData, setData} from './common.js';

export default {
	getAllPosts: session_hash => {
		return new Promise((resolve, reject) => {
			if (!session_hash) resolve(JSON.stringify({success: false, message: 'Пользователь не авторизован!'}));
			getData('loggings', [])
			.then(loggings => {
				let finding = loggings.find(el => el.session_hash === session_hash);

				if (!finding) throw new Error('Сессия не найдена');
				else if (!finding.isAdmin) resolve(JSON.stringify({success: true, data:{posts:[]}}))
				else return getData('posts', default_posts)
			})
			.then(posts => {
				resolve(JSON.stringify({success: true, data:{posts: posts}}))
			})
			.catch(error => reject(error))
		})
	},
	getShownPosts: () => {
		return new Promise((resolve, reject) => {
			getData('posts', default_posts)
			.then(posts => {
				resolve(JSON.stringify({success: true, data:{posts: posts.filter(el => el.status === 'shown').map(el => { delete el.status; return el})}}))
			})
			.catch(error => reject(error))
		})
	},
	createPost: (post, session_hash) => {
		return new Promise((resolve, reject) => {
			if (!session_hash) resolve(JSON.stringify({success: false, message: 'Пользователь не авторизован!'}));
			getData('loggings', [])
			.then(loggings => {
				let finding = loggings.find(el => el.session_hash === session_hash);

				if (!finding) throw new Error('Сессия не найдена');
				else if (!finding.isAdmin) resolve(JSON.stringify({success: false, message: 'У вас нет прав на создание постов!'}))
				return getData('posts', default_posts)
			})
			.then(posts => {
				let finding = posts.find(el => el.title === post.title);

				if (finding) {
					resolve(JSON.stringify({success: false, message: 'Такой заголовок уже существует!'}))
				} else {
					let new_id = posts[0].id + 1;

					post.id = new_id;
					post.status = 'confirmed';
					post.status_text = 'Подтверждён';
					posts.unshift(post);
					return setData('posts', posts)
				}
			})
			.then(() => {
				resolve(JSON.stringify({success: true, data:{post}}));
			})
			.catch(error => reject(error))
		})
	},
	changePost: (post, session_hash) => {
		return new Promise((resolve, reject) => {
			if (!session_hash) resolve(JSON.stringify({success: false, message: 'Пользователь не авторизован!'}));
			getData('loggings', [])
			.then(loggings => {
				let finding = loggings.find(el => el.session_hash === session_hash);

				if (!finding) throw new Error('Сессия не найдена');
				else if (!finding.isAdmin) resolve(JSON.stringify({success: false, message: 'У вас нет прав на изменение постов!'}))
				return getData('posts', default_posts)
			})
			.then(posts => {
				let finding_index = posts.findIndex(el => el.id === post.id);

				if (finding_index === -1) reject(JSON.stringify({success: false, message: 'Пост не найден'}));
				else {
					post.status = posts[finding_index].status;
					post.status_text = post.status === 'confirmed' ? 'Подтверждён' : 'Показываемый';
					posts[finding_index] = post;
					return setData('posts', posts)
				}
			})
			.then(() => {
				resolve(JSON.stringify({success: true, data:{post}}));
			})
			.catch(error => reject(error))
		})
	},
	savePosts: (posts, session_hash) => {
		return new Promise((resolve, reject) => {
			if (!session_hash) resolve(JSON.stringify({success: false, message: 'Пользователь не авторизован!'}));
			getData('loggings', [])
			.then(loggings => {
				let finding = loggings.find(el => el.session_hash === session_hash);

				if (!finding) throw new Error('Сессия не найдена');
				else if (!finding.isAdmin) resolve(JSON.stringify({success: false, message: 'У вас нет прав на изменение постов!'}))
				else {
					for (let i = 0; i < posts.length; i++) {
						if (posts[i].deleted) {
							posts.splice(i, 1);
							i--;
						} else delete posts[i].deleted;
					}
					return setData('posts', posts)
				}
			})
			.then((posts) => {
				resolve(JSON.stringify({success: true, data:{posts: posts}}));
			})
			.catch(error => reject(error))
		})
	}
} 