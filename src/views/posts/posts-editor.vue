<template>
	<div class="wrapper-common">
		<table class="table-common">
			<col class="col-common id">
			<col class="col-common title">
			<col class="col-common status">
			<col class="col-common delete">
			<tr class="tr-common">
				<th class="th-common id">ID</th>
				<th class="th-common title">Title</th>
				<th class="th-common status">Статус</th>
				<th class="th-common delete">X</th>
			</tr>
			<transition-group name="trs-appearing" @after-enter="next" tag="tbody">
				<tr v-for="post in animated_posts" :key="post.id" class="tr-common" :class="getTrClass(post)">
					<td class="td-common id" align="center"><router-link :to="{name: 'post-show', params: {id: post.id}}" class="td-link">{{post.id}}</router-link></td>
					<td class="td-common title"><router-link :to="{name: 'post-show', params: {id: post.id}}" class="td-link">{{post.title}}</router-link></td>
					<td class="td-common status" align="center" @click="changeStatus(post, post.status)">{{post.status_text}}</td>
					<td class="td-common delete" align="center" @click="post.deleted = !post.deleted">{{post.deleted ? 'Восстановить' : 'Удалить'}}</td>
				</tr>
			</transition-group>
		</table>
		<pagination :elements_length="ALL_POSTS.length" :page_size="page_size" @pageChanged="pageChanged"></pagination>
		<div class="button-common" @click="savePosts(ALL_POSTS)">Сохранить</div>
	</div>
</template>

<script>

import {mapGetters} from 'vuex';
import Pagination from '@/components/pagination.vue';

export default {
	name: 'posts-editor',
	mixins: [],
	components: {Pagination},
	data() {
		return {
			page_size: 10,
			current_page: 1,
			animated_index: -1,
			animated_posts: []
		}
	},
	computed: {
		...mapGetters(['ISADMIN', 'ALL_POSTS']),
		paged_posts() {
			return this.ALL_POSTS.slice().splice((this.current_page - 1)*this.page_size, this.page_size);
		},
	},
	watch: {
		animated_index(value) {
			this.animated_posts.push(this.paged_posts[value])
		},
	},
	created() {
		if (!this.ISADMIN) {
			this.$router.replace({name: 'posts-show'});
		} else {
			this.setDeleted(this.ALL_POSTS);
		}
	},
	mounted() {
		this.startAnimation();
	},
	methods: {
		changeStatus(post, status) {
			post.status = (status === 'confirmed') ? 'shown' : 'confirmed';
			post.status_text = (post.status === 'confirmed') ? 'Подтверждён' : 'Показываемый';
		},
		setDeleted(posts) {
			posts.forEach(el => {
				if (!el.deleted) this.$set(el, 'deleted', false);
			})
		},
		savePosts(posts) {
			let saver = this.$store.dispatch('SAVE_POSTS', {posts, session_hash: this.$cookies.get('vue_example_user')})
			saver.then(() => {
				this.setDeleted(this.ALL_POSTS);
				return this.$store.dispatch('ADD_MESSAGE', {text: 'Посты сохранены!', type: 'success'})
			})
			saver.then(() => {
				this.$store.dispatch('GET_SHOWN_POSTS')
			})
			saver.catch(({type, message}) => {
				if (type === 'user') return this.$store.dispatch('ADD_MESSAGE', {text: message, type: 'error'});
				console.error(message);
			}) 
		},
		pageChanged(i) {
			this.current_page = i;
			this.animated_index = 0;
			this.animated_posts = [];
		},
		getTrClass(post) {
			if (post.deleted) return 'deleted';
			if (post.status === 'confirmed') return 'confirmed';
			return 'shown';
		},
		startAnimation() {
			this.animated_index = 0;
		},
		next() {
			this.animated_index = Math.min(this.paged_posts.length - 1, this.animated_index + 1);
		}
	}
}

</script>

<style scoped lang="scss">
	.mobile {
		.col-common {
			&.id {
				width: 22px;
			}

			&.delete {
				width: 83px;
			}

			&.status {
				width: 96px;
			}
		}

		.td-common, .th-common {
			&.id {
				padding: 0px 3px;
			}
		}
	}

	.deleted *:not(.delete) {
		text-decoration: line-through;
	}

	.shown {
		background: #94E5B6;
	}

	.confirmed {
		background: #FBFCA8;
	}

	.col-common {
		&.id {
			width: 34px;
		}

		&.delete {
			width: 122px;
		}

		&.status {
			width: 135px;
		}
	}

	.td-common {
		&.delete, &.status {
			cursor: pointer;
		}
	}

	.trs-appearing-enter-active {
		transition: opacity 0ms;
	}

	.trs-appearing-enter {
		opacity: 0;
	}
</style>