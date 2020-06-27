<template>
	<div class="local-wrapper">
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
						<img class="post-image swiper-lazy" :data-src="require('@/images/posts/' + post.img)">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import Swiper from 'swiper';
import {mapGetters} from 'vuex';
import device_detection from "@/common/device_detection";

export default {
	name: 'posts-show',
	mixins: [device_detection],
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
	watch: {
		SHOWN_POSTS() {
			if (!this.swiper) return;
			this.swiper.destroy();
			this.swiper = null;
			this.$nextTick(this.initSwiper);
		},
		device(val) {
			if (!this.swiper) return;
			if (val === 'mobile') return;
			this.swiper.destroy();
			this.swiper = null;
			this.$nextTick(this.initSwiper);
		}
	},
	methods: {
		initSwiper() {
			if (this.swiper) return;
			this.swiper = new Swiper('.swiper-container', {
				loop: this.SHOWN_POSTS.length > 1 ? true: false,
				simulateTouch: false,
				autoplay: this.SHOWN_POSTS.length > 1 ? { delay: 5000 } : false,
				lazy: true,
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
	@import "../../styles/constants.scss";

	.mobile {
		.post {
			height: calc(100vw*1000/1920);
			max-height: 320px;

			&-title {
				font-size: calcFontSize(12, 25, 325, 900);
			}
		}

		.button-common {
			margin-top: 15px;
		}

		.swiper-arrow {
			width: 26px;
			height: 53px;
		}
	}

	.local-wrapper {
		width: 100%;
		position: relative;
	}
	.post {
		width: 100%;
		height: calc(100vw*600/1920);
		max-height: 600px;
		position: relative;
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		&-title {
			text-align: center;
			background: black;
			font-size: 1.8rem;
			color: white;
			padding: 10px 15px;
		}
		&-image {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		&-context {
			position: absolute;
			top: calc(25% - 25px);
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
	.button-common {
		margin-top: 10px;
	}
	.swiper-arrow {
		width: 40px;
		height: 82px;
		position: absolute;
		top: 50%;
		z-index: 2;

		&-left {
			background: url('../../images/utils/arrow-left.png') no-repeat center;
			background-size: contain;
			left: 15px;
		}

		&-right {
			background: url('../../images/utils/arrow-right.png') no-repeat center;
			background-size: contain;
			right: 15px;
		}
	}
</style>