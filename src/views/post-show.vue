<template>
	<div class="post-wrapper" v-if="post">
		<div class="title">{{ post.title }}</div>
		<div class="description-item" v-for="(description, i) in post.description" :key="i">
			<img class="description-item-img" v-if="description.type === 'img'" :src="require('../images/' + description.value)">
			<div class="description-item-text" v-else-if="description.type === 'text'" v-html="description.value"></div>
		</div>
	</div>
</template>

<script>

import {mapGetters} from 'vuex';

export default {
	name: 'post-show',
	data() {
		return {
			post: null
		}
	},
	computed: {
		...mapGetters(['SHOWN_POSTS', 'ISADMIN'])
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
				this.$router.replace({name: 'post-show', params: {id: this.SHOWN_POSTS[0].id}});
				return;
			}
			
			this.post = null;
			this.SHOWN_POSTS.forEach(el => {
				if (el.id === id) {
					this.post = el;
				}
			});	
				
			if (!this.post) this.$router.replace({name: 'post-show', params: {id: this.SHOWN_POSTS[0].id}});
		}
	}
	
}

</script>

<style scoped lang="scss">
	.title {
		font-size: 1.6rem;
		width: 100%;
		text-align: center;
		margin-bottom: 50px;
	}
	.description-item {
		width: 100%;
		margin-bottom: 30px;
	}

	.description-item-img {
		width: 100%;
		height: calc(100vw*500/1920);
		object-fit: cover;
		max-height: 500px;
	}

	.description-item-text {
		padding: 0 20px 0px 0px;
	}

</style>