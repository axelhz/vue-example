<template>
	<div class="posts-wrapper">
		<div class="swiper-arrow swiper-arrow-left" v-if="SHOWN_POSTS.length > 1"></div>
		<div class="swiper-arrow swiper-arrow-right" v-if="SHOWN_POSTS.length > 1"></div>
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(post, i) in SHOWN_POSTS" :key="i">
					<div class="post">
						<div class="post-context">
							<div class="post-title">{{ post.title }}</div>
							<router-link :to="{name: 'post-show', params: { id: post.id }}" class="button-common">Подробнее</router-link>
						</div>
						<img class="post-image" :src="require('@/images/' + post.img)">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import Swiper from 'swiper';
import {mapGetters} from 'vuex';

export default {
	name: 'posts-show',
	mixins: [],
	data() {
		return {
			swiper: null
		}
	},
	computed: {
		...mapGetters(['SHOWN_POSTS'])
	},
	mounted() {
		this.initSwiper();
	},
	methods: {
		initSwiper() {
			this.swiper = new Swiper('.swiper-container', {
				loop: this.SHOWN_POSTS.length > 1 ? true: false,
				simulateTouch: false,
				autoplay: this.SHOWN_POSTS.length > 1 ? { delay: 5000 } : false,
				navigation: {
					nextEl: '.swiper-arrow-right',
					prevEl: '.swiper-arrow-left',
				}

			})
		}
	}
}

</script>

<style scoped lang="scss">
	.posts-wrapper {
		width: 100%;
		position: relative;
	}
	.post {
		width: 100%;
		height: calc(100vw*600/1920);
		max-height: 600px;
		position: relative;
		color: white;
	}
	.post-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.post-context {
		position: absolute;
		top: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 50px;
	}
	.swiper-arrow {
		position: absolute;
		top: calc(50% - 41px);
		z-index: 2;

		&.swiper-arrow-left {
			background: url('../images/utils/arrow-left.png') no-repeat center;
			background-size: contain;
			width: 40px;
			height: 82px;
			left: 15px;
		}

		&.swiper-arrow-right {
			background: url('../images/utils/arrow-right.png') no-repeat center;
			background-size: contain;
			width: 40px;
			height: 82px;
			right: 15px;
		}
	}
</style>