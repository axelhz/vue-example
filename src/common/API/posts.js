import default_posts from '@/data/default_posts.js';
import {getData, setData} from './common.js';

export default {
	getAllPosts: async (session_hash) => {
		try {
			if (!session_hash) return JSON.stringify({success: false, message: 'Пользователь не авторизован!'});
			const loggings = await getData('loggings', []),
				finding = loggings.find(el => el.session_hash === session_hash);

			if (!finding) throw new Error('Сессия не найдена');
			else if (!finding.isAdmin) return JSON.stringify({success: true, data:{posts:[]}})
			else {
				const posts = await getData('posts', default_posts);

				return JSON.stringify({success: true, data:{posts: posts}})
			}
		} catch(err) {
			throw new Error(err)
		}
	},
	getShownPosts: async () => {
		try {
			let posts = await getData('posts', default_posts);

			return JSON.stringify({success: true, data:{posts: posts.filter(el => el.status === 'shown').map(el => { delete el.status; return el})}});
		} catch(err) {
			throw new Error(err);
		}
	},
	createPost: async (post, session_hash) => {
		try {
			if (!session_hash) return JSON.stringify({success: false, message: 'Пользователь не авторизован!'});

			const loggings = getData('loggings', []),
				finding = loggings.find(el => el.session_hash === session_hash);

			if (!finding) throw new Error('Сессия не найдена');
			else if (!finding.isAdmin) return JSON.stringify({
				success: false,
				message: 'У вас нет прав на создание постов!'
			})
			else {
				let posts = getData('posts', default_posts);
				const finding_same = posts.find(el => el.title === post.title);

				if (finding_same) {
					return JSON.stringify({success: false, message: 'Такой заголовок уже существует!'});
				} else {
					let new_id = posts[0].id + 1;

					post.id = new_id;
					post.status = 'confirmed';
					post.status_text = 'Подтверждён';
					posts.unshift(post);
					await setData('posts', posts);
					return JSON.stringify({success: true, data: {post}});
				}
			}
		} catch (err) {
			throw new Error(err);
		}
	},
	changePost: async (post, session_hash) => {
		try {
			if (!session_hash) return JSON.stringify({success: false, message: 'Пользователь не авторизован!'});

			const loggings = await getData('loggings', []),
				finding = loggings.find(el => el.session_hash === session_hash);

			if (!finding) throw new Error('Сессия не найдена');
			else if (!finding.isAdmin) return JSON.stringify({success: false, message: 'У вас нет прав на изменение постов!'})
			else {
				let posts = await getData('posts', default_posts);
				const finding_index = posts.findIndex(el => el.id === post.id);

				if (finding_index === -1) return JSON.stringify({success: false, message: 'Пост не найден'});
				else {
					post.status = posts[finding_index].status;
					post.status_text = post.status === 'confirmed' ? 'Подтверждён' : 'Показываемый';
					posts[finding_index] = post;
					await setData('posts', posts);
					return JSON.stringify({success: true, data:{post}});
				}
			}
		} catch(err) {
			throw new Error(err);
		}
	},
	savePosts: async (posts, session_hash) => {
		try {
			if (!session_hash) return JSON.stringify({success: false, message: 'Пользователь не авторизован!'});

			const loggings = await getData('loggings', []),
				finding = loggings.find(el => el.session_hash === session_hash);

			if (!finding) throw new Error('Сессия не найдена');
			else if (!finding.isAdmin) return JSON.stringify({success: false, message: 'У вас нет прав на изменение постов!'})
			else {
				for (let i = 0; i < posts.length; i++) {
					if (posts[i].deleted) {
						posts.splice(i, 1);
						i--;
					} else delete posts[i].deleted;
				}
				await setData('posts', posts);
				return JSON.stringify({success: true, data:{posts: posts}});
			}

		} catch(err) {
			throw new Error(err);
		}
	}
} 