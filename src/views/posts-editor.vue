<template>
	<div class="wrapper-common">
		<table class="posts-table">
			<tr class="tr-common">
				<th class="th-common">ID</th>
				<th class="th-common">Title</th>
				<th class="th-common">Статус</th>
				<th class="th-common"></th>
			</tr>
			<tr v-for="(post, i) in paged_posts" :key="i" :class="[post.deleted ? 'deleted' : '', 'tr-common']">
				<td class="td-common href"><router-link :to="{name: 'post-show', params: {id: post.id}}">{{post.id}}</router-link></td>
				<td class="td-common href"><router-link :to="{name: 'post-show', params: {id: post.id}}">{{post.title}}</router-link></td>
				<td class="td-common" @click="changeStatus(post, post.status)">{{post.status_text}}</td>
				<td class="td-common" @click="post.deleted = !post.deleted">{{post.deleted ? 'Восстановить' : 'Удалить'}}</td>
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
			this.$store.dispatch('SAVE_POSTS', posts)
			.then(() => {
				this.setDeleted(this.ALL_POSTS);
				return this.$store.dispatch('CHECK_MESSAGE_TEXT', {new_message_text: 'Посты сохранены!', type: 'success'})
			})
			.catch(({type, message}) => {
				if (type === 'user') return this.$store.dispatch('CHECK_MESSAGE_TEXT', {new_message_text: message, type: 'error'});
				console.error(message);
			}) 
		},
		pageChanged(i) {
			this.current_page = i;
		}
	}
}

</script>

<style scoped lang="scss">
	.deleted {
		text-decoration: line-through;
	}
	
	.tr-common:not(.deleted) .href {
		text-decoration: underline;
		cursor: pointer;
	}

</style>