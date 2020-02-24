<template>
	<div class="news-wrapper">
		<div class="swiper-arrow swiper-arrow-left" v-if="c_news.length > 1"></div>
		<div class="swiper-arrow swiper-arrow-right" v-if="c_news.length > 1"></div>
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(c_new, i) in c_news" :key="i">
					<div class="new">
						<div class="new-context">
							<div class="new-title">{{ c_new.title }}</div>
							<router-link :to="{name: 'new', params: { id: c_new.id }}" class="button-common">Подробнее</router-link>
						</div>
						<img class="new-image" :src="require('../images/' + c_new.img)">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import c_news from '../data/news.js';
import Swiper from 'swiper';

export default {
	name: 'block-news',
	mixins: [],
	data() {
		return {
			c_news: c_news.data,
			swiper: null
		}
	},
	mounted() {
		this.initSwiper();
	},
	methods: {
		initSwiper() {
			this.swiper = new Swiper('.swiper-container', {
				loop: this.c_news.length > 1 ? true: false,
				simulateTouch: false,
				autoplay: this.c_news.length > 1 ? { delay: 5000 } : false,
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
	.news-wrapper {
		width: 100%;
		position: relative;
	}
	.new {
		width: 100%;
		height: calc(100vw*600/1920);
		max-height: 600px;
		position: relative;
		color: white;
	}
	.new-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.new-context {
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