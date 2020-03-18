<template>
	<div class="local-wrapper">
		<div class="header-common" v-if="ISADMIN">{{getHeader(post)}}</div>
		<div v-if="ISADMIN" class="options-wrapper">
			<router-link :to="{name: 'post-show'}" class="link-option">Просмотр</router-link>
			<router-link :to="{name: 'post-editor'}" class="link-option">Редактирование</router-link>
		</div>
		<router-view :post="post"></router-view>
	</div>
</template>

<script>

import {mapGetters} from 'vuex';

export default {
	name: 'post-home',
	mixins: [],
	data() {
		return {
			post: null
		}
	},
	computed: {
		...mapGetters(['ISADMIN', 'ALL_POSTS', 'SHOWN_POSTS'])
	},
	watch: {
		'$route.params.id'(id) {
			this.checkPost(+id);
		}
	},
	created() {
		this.checkPost(+this.$route.params.id);
	},
	methods: {
		checkPost(id) {
			if (isNaN(id)) {
				this.$router.replace({name: 'post-show', params: {id: this.ISADMIN ? this.ALL_POSTS[0].id : this.SHOWN_POSTS[0].id}});
				return;
			} else if (id === 0) {
				if (!this.ISADMIN) this.$router.replace({name: 'post-show', params: {id: this.SHOWN_POSTS[0].id}});
				else {
					this.post = {
						title: '',
						id: 0,
						description: []						
					}
				}
			} else {
				this.post = null;
				let search_posts = (this.ISADMIN) ? this.ALL_POSTS : this.SHOWN_POSTS;
				search_posts.forEach(el => {
					if (el.id === id) {
						this.post = el;
					}
				});	
				
				if (!this.post) this.$router.replace({name: 'post-show', params: {id: this.ISADMIN ? this.ALL_POSTS[0].id : this.SHOWN_POSTS[0].id}});
			}
		},
		getHeader(post) {
			if (!post) return 'Неопределенный пост';
			else {
				if (post.id === 0) {
					return 'Новый пост'
				}
				return 'Пост №' + post.id;
			}
		}
	}
}

</script>

<style scoped lang="scss">
	.local-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: black;
	}
</style>