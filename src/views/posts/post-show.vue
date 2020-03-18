<template>
	<div class="post-wrapper" v-if="post">
		<div class="post-title">{{ post.title }}</div>
		<div class="description-item" v-for="(description, i) in post.description" :key="i">
			<img class="description-item-img" v-if="description.type === 'img' && description.value" :src="require('@/images/posts/' + description.value)">
			<div class="description-item-text" v-else-if="description.type === 'text'" v-html="description.value"></div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'post-show',
	props: ['post'],
	data() {
		return {
			
		}
	}
}

</script>

<style scoped lang="scss">
	.mobile {
		.post-title {
			margin-bottom: 30px;
			margin-top: 20px;
		}

		.description-item-img {
			min-height: 170px;
		}
	}

	.post-title {
		font-size: 1.6rem;
		width: 100%;
		text-align: center;
		margin-bottom: 50px;
		margin-top: 30px;
	}
	.description-item {
		width: 100%;
		margin-bottom: 30px;

		&-img {
			width: 100%;
			height: calc(100vw*500/1920);
			object-fit: cover;
			max-height: 500px;
		}

		&-text {
			padding: 0 20px 0px 0px;
			font-size: 1.1rem;
		}
	}
</style>