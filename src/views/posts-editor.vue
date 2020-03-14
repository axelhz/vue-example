<template>
	<div class="wrapper-common">
		<table class="table-common">
			<tr class="tr-common">
				<th class="th-common id">ID</th>
				<th class="th-common title">Title</th>
				<th class="th-common status">Статус</th>
				<th class="th-common delete">X</th>
			</tr>
			<tr v-for="(post, i) in paged_posts" :key="i" class="tr-common" :class="getTrClass(post)">
				<td class="td-common id href" align="center"><router-link :to="{name: 'post-show', params: {id: post.id}}" class="td-link">{{post.id}}</router-link></td>
				<td class="td-common title href"><router-link :to="{name: 'post-show', params: {id: post.id}}" class="td-link">{{post.title}}</router-link></td>
				<td class="td-common status" align="center" @click="changeStatus(post, post.status)">{{post.status_text}}</td>
				<td class="td-common delete" align="center" @click="post.deleted = !post.deleted">{{post.deleted ? 'Восстановить' : 'Удалить'}}</td>
			</tr>
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
			current_page: 1
		}
	},
	computed: {
		...mapGetters(['ISADMIN', 'ALL_POSTS']),
		paged_posts() {
			return this.ALL_POSTS.slice().splice((this.current_page - 1)*this.page_size, this.page_size);
		}
	},
	created() {
		if (!this.ISADMIN) {
			this.$router.replace({name: 'posts-show'});
		} else {
			this.setDeleted(this.ALL_POSTS);
		}
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
			this.$store.dispatch('SAVE_POSTS', {posts, session_hash: this.$cookies.get('vue_example_user')})
			.then(() => {
				this.setDeleted(this.ALL_POSTS);
				return this.$store.dispatch('ADD_MESSAGE', {text: 'Посты сохранены!', type: 'success'})
			})
			.catch(({type, message}) => {
				if (type === 'user') return this.$store.dispatch('ADD_MESSAGE', {text: message, type: 'error'});
				console.error(message);
			}) 
		},
		pageChanged(i) {
			this.current_page = i;
		},
		getTrClass(post) {
			if (post.deleted) return 'deleted';
			if (post.status === 'confirmed') return 'confirmed';
			return 'shown';
		}
	}
}

</script>

<style scoped lang="scss">
	.mobile {
		.td-common, .th-common {
			&.delete {
				min-width: 83px;
				max-width: 83px;
			}

			&.status {
				min-width: 96px;
				max-width: 96px;
			}

			&.id {
				min-width: 22px;
				max-width: 22px;
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
	
	.tr-common:not(.deleted) .href {
		cursor: pointer;
	}

	.td-common, .th-common {
		&.delete {
			min-width: 122px;
			max-width: 122px;
		}

		&.status {
			min-width: 135px;
			max-width: 135px;
		}

		&.id {
			min-width: 34px;
			max-width: 34px;
		}
	}

	.td-common {
		&.delete, &.status {
			cursor: pointer;
		}
	}
</style>