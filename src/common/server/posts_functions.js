import Vue from 'vue'
import default_posts from '@/data/default_posts.js';

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
	getAllPosts: session_hash => {	
		return new Promise((resolve, reject) => {
			getData('loggings', [])
			.then(loggings => {
				let finding = loggings.find(el => el.session_hash === session_hash);
				
				if (!finding) throw new Error('Сессия не найдена');
				else {
					if (!finding.isAdmin) resolve(JSON.stringify({success: true, data:{posts:[]}}))
					else {
						getData('posts', default_posts)
						.then(posts => {
							resolve(JSON.stringify({success: true, data:{posts: posts}}))
						})
						.catch(error => reject(error))
					}
				}
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
	createPost: post => {
		return new Promise((resolve, reject) => {
			getData('posts', default_posts)
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
					setData('posts', posts)
					.then(() => {
						resolve(JSON.stringify({success: true, data:{posts: posts, new_id: new_id}}));
					})
					.catch(error => reject(error))
				}
			})
			.catch(error => reject(error))
		})
	},
	changePost: post => {
		return new Promise((resolve, reject) => {
			getData('posts', default_posts)
			.then(posts => {
				let findingIndex = posts.findIndex(el => el.id === post.id);
					
					if (findingIndex === -1) reject(JSON.stringify({success: false, message: 'Пост не найден'}));
					else {
						post.status = posts[findingIndex].status;
						posts[findingIndex] = post;
						setData('posts', posts)
						.then(() => {
							resolve(JSON.stringify({success: true, data:{posts: posts}}));
						})
						.catch(error => reject(error))
					}
			})
			.catch(error => reject(error))
		})
	},
	savePosts: posts => {
		return new Promise((resolve, reject) => {
			for (let i = 0; i < posts.length; i++) {
				if (posts[i].deleted) {
					posts.splice(i, 1);
					i--;
				} else delete posts[i].deleted;
			}
			setData('posts', posts)
			.then(() => {
				resolve(JSON.stringify({success: true, data:{posts: posts}}));
			})
			.catch(error => reject(error))
		})
	}
	
} 