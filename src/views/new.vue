<template>
	<div class="new-wrapper">
		<div class="title">{{ c_new.title }}</div>
		<div class="description-item" v-for="(description, i) in c_new.description" :key="i">
			<img class="description-item-img" v-if="description.type === 'img'" :src="require('../images/' + description.value)">
			<div class="description-item-text" v-else-if="description.type === 'text'" v-html="description.value"></div>
		</div>
	</div>
</template>

<script>

import c_news from '../data/news.js';

export default {
	name: 'new',
	data() {
		return {
			c_new: null,
			c_news: c_news.data
		}
	},
	watch: {
		'$route.params.id'(id) {
			this.getNew(+id);
		}
	},
	created() {
		this.getNew(+this.$route.params.id);

	},
	methods: {
		getNew(id) {
			this.c_news.forEach(el => {
				if (el.id === id) {
					this.c_new = el;
				}
			})

			if (!this.c_new) this.c_new = this.c_news[0]
		}
	}
	
}

</script>

<style scoped lang="scss">
	.new-wrapper {
		width: 100%;
		max-width: 1400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: black;
		padding-top: 60px;
	}
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